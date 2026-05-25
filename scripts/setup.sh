#!/bin/bash
# ============================================================
# NullPoint Platform — Server Setup Script
#
# Run this on a fresh Ubuntu 22.04 LTS VPS (Hetzner CX32)
# Installs Docker, clones this repo, configures environment
#
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/fsentertainment1/planning-dashboard/main/scripts/setup.sh | bash
# Or:
#   chmod +x setup.sh && ./setup.sh
# ============================================================

set -euo pipefail

GREEN='\033[0;32m'
ORANGE='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m'

log()  { echo -e "${GREEN}[SETUP]${NC} $*"; }
warn() { echo -e "${ORANGE}[WARN]${NC}  $*"; }
err()  { echo -e "${RED}[ERROR]${NC} $*"; exit 1; }

log "NullPoint Pro Audio Platform — Server Setup"
log "Ghost open source: https://github.com/TryGhost/Ghost"
echo ""

# ---- Check OS ------------------------------------------
if [ "$(lsb_release -is 2>/dev/null)" != "Ubuntu" ]; then
  warn "This script is designed for Ubuntu 22.04. Proceed with caution on other systems."
fi

# ---- System updates ------------------------------------
log "Updating system packages..."
apt-get update -qq && apt-get upgrade -y -qq

# ---- Basic security ------------------------------------
log "Installing and configuring UFW firewall..."
apt-get install -y -qq ufw fail2ban

ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 443/udp   # HTTP/3 QUIC
ufw --force enable

log "Configuring fail2ban..."
cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local 2>/dev/null || true
systemctl enable fail2ban --now

# ---- Docker installation --------------------------------
if ! command -v docker &>/dev/null; then
  log "Installing Docker..."
  curl -fsSL https://get.docker.com | sh
  usermod -aG docker "$USER"
  systemctl enable docker --now
  log "Docker installed: $(docker --version)"
else
  log "Docker already installed: $(docker --version)"
fi

# ---- Git ------------------------------------------------
apt-get install -y -qq git

# ---- Clone repository -----------------------------------
REPO_URL="https://github.com/fsentertainment1/planning-dashboard.git"
INSTALL_DIR="/opt/nullpoint"

if [ -d "$INSTALL_DIR" ]; then
  log "Repository already cloned at $INSTALL_DIR, pulling latest..."
  git -C "$INSTALL_DIR" pull origin main
else
  log "Cloning repository to $INSTALL_DIR..."
  git clone "$REPO_URL" "$INSTALL_DIR"
fi

cd "$INSTALL_DIR/infrastructure"

# ---- Environment configuration --------------------------
if [ ! -f ".env" ]; then
  log "Creating .env from .env.example..."
  cp .env.example .env
  warn "IMPORTANT: Edit /opt/nullpoint/infrastructure/.env before starting Ghost!"
  warn "Required: GHOST_URL, MYSQL_ROOT_PASSWORD, MYSQL_PASSWORD, MAILGUN_*, STRIPE_*"
  echo ""
  echo "  nano /opt/nullpoint/infrastructure/.env"
  echo ""
else
  log ".env already exists, skipping."
fi

# ---- Backup script permissions --------------------------
chmod +x backup/backup.sh

# ---- Create necessary directories -----------------------
mkdir -p caddy/logs

# ---- Ghost version info ----------------------------------
GHOST_LATEST=$(curl -s https://api.github.com/repos/TryGhost/Ghost/releases/latest \
  | grep '"tag_name"' | head -1 | cut -d'"' -f4 2>/dev/null || echo "unknown")

log "Latest Ghost release on GitHub: $GHOST_LATEST"
log "Docker image used: ghost:5-alpine (tracks latest Ghost 5.x stable)"
log "Ghost GitHub: https://github.com/TryGhost/Ghost"

# ---- Summary -------------------------------------------
echo ""
echo "============================================================"
echo -e "${GREEN}Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Configure environment:"
echo "     nano /opt/nullpoint/infrastructure/.env"
echo ""
echo "  2. Start the platform:"
echo "     cd /opt/nullpoint/infrastructure"
echo "     docker compose up -d"
echo ""
echo "  3. Watch logs:"
echo "     docker compose logs -f ghost"
echo ""
echo "  4. Ghost admin panel (after DNS is configured):"
echo "     https://your-domain.com/ghost/"
echo ""
echo "  5. Install custom theme:"
echo "     docker compose exec ghost ghost theme install /var/lib/ghost/content/themes/nullpoint"
echo "============================================================"
