#!/bin/sh
# ============================================================
# NullPoint — Automated Backup Script
# Runs daily at 02:00 via cron inside backup container
#
# Backs up:
#   1. MySQL dump (ghost database)
#   2. Ghost content directory (themes, images, data)
#
# Destination: S3-compatible storage (Cloudflare R2 / Hetzner)
# Retention: RETENTION_DAYS rolling (default 30)
# ============================================================

set -e

DATE=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_DIR="/tmp/backups/${DATE}"
mkdir -p "${BACKUP_DIR}"

echo "[$(date)] Starting backup..."

# ---- 1. MySQL dump ----------------------------------------
echo "[$(date)] Dumping MySQL..."
mysqldump \
  --host="${MYSQL_HOST}" \
  --user="${MYSQL_USER}" \
  --password="${MYSQL_PASSWORD}" \
  --single-transaction \
  --quick \
  --lock-tables=false \
  "${MYSQL_DATABASE}" \
  | gzip > "${BACKUP_DIR}/mysql_${DATE}.sql.gz"

echo "[$(date)] MySQL dump done: $(du -sh ${BACKUP_DIR}/mysql_*.gz | cut -f1)"

# ---- 2. Ghost content directory --------------------------
echo "[$(date)] Archiving Ghost content..."
tar -czf "${BACKUP_DIR}/content_${DATE}.tar.gz" \
  --exclude='/ghost_content/logs' \
  --exclude='/ghost_content/adapters' \
  /ghost_content

echo "[$(date)] Content archive done: $(du -sh ${BACKUP_DIR}/content_*.tar.gz | cut -f1)"

# ---- 3. Upload to S3/R2 ----------------------------------
echo "[$(date)] Uploading to ${S3_BUCKET}..."
aws s3 cp "${BACKUP_DIR}/mysql_${DATE}.sql.gz" \
  "s3://${S3_BUCKET}/db/mysql_${DATE}.sql.gz" \
  --endpoint-url "${S3_ENDPOINT}"

aws s3 cp "${BACKUP_DIR}/content_${DATE}.tar.gz" \
  "s3://${S3_BUCKET}/content/content_${DATE}.tar.gz" \
  --endpoint-url "${S3_ENDPOINT}"

echo "[$(date)] Upload complete."

# ---- 4. Cleanup local temp files -------------------------
rm -rf "${BACKUP_DIR}"
echo "[$(date)] Local temp cleanup done."

# ---- 5. Delete old backups (rolling retention) -----------
CUTOFF=$(date -d "${RETENTION_DAYS:-30} days ago" +%Y-%m-%d 2>/dev/null || \
         date -v-${RETENTION_DAYS:-30}d +%Y-%m-%d)  # macOS fallback

echo "[$(date)] Cleaning backups older than ${RETENTION_DAYS:-30} days (before ${CUTOFF})..."

for PREFIX in db content; do
  aws s3 ls "s3://${S3_BUCKET}/${PREFIX}/" \
    --endpoint-url "${S3_ENDPOINT}" \
    | awk '{print $4}' \
    | while read FILE; do
        FILE_DATE=$(echo "${FILE}" | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}' | head -1)
        if [ -n "${FILE_DATE}" ] && [ "${FILE_DATE}" \< "${CUTOFF}" ]; then
          echo "[$(date)] Deleting old backup: ${PREFIX}/${FILE}"
          aws s3 rm "s3://${S3_BUCKET}/${PREFIX}/${FILE}" \
            --endpoint-url "${S3_ENDPOINT}"
        fi
      done
done

echo "[$(date)] Backup complete. ✓"
