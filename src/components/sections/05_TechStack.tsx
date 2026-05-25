export default function TechStack() {
  const stackLayers = [
    {
      layer: 'DNS & Edge',
      service: 'Cloudflare Free/Pro',
      role: 'DNS, CDN, WAF, DDoS protection, caching',
      cost: '€0-25/maand',
      why: 'Marktstandaard, gratis tier is uitstekend. Pro voegt image optimization, analytics, en Web Application Firewall toe. Altijd als eerste laag voor elke publieke website.',
    },
    {
      layer: 'VPS / Compute',
      service: 'Hetzner Cloud CX32',
      role: 'Primaire server: Ghost CMS, Nginx/Caddy, MySQL',
      cost: '€13.90/maand',
      why: 'Hetzner is de beste prijs/kwaliteit in Europa. Duits datacenter = GDPR-compliant, lage latency voor EU-bezoekers. CX32 (4vCPU, 8GB RAM, 80GB NVMe) is ruim voldoende voor Ghost tot 100K+ pageviews/maand.',
    },
    {
      layer: 'Reverse Proxy',
      service: 'Caddy 2',
      role: 'HTTPS terminatie, virtual hosting, automatische SSL',
      cost: '€0 (open source)',
      why: 'Caddy handelt automatisch Let\'s Encrypt SSL af — geen certbot cron jobs. Eenvoudiger dan Nginx voor Ghost-setup. Hogere beschikbaarheid door ingebouwde automatische certificaatverlenging.',
    },
    {
      layer: 'CMS',
      service: 'Ghost v5.x (Docker)',
      role: 'Content management, memberships, newsletter, portal',
      cost: '€0 (self-hosted)',
      why: 'Ghost is gebouwd voor publishers. Memberships, newsletters, en paywalling zijn native features — geen plugins nodig. Headless-ready voor toekomstige uitbreiding. Node.js-based, licht en snel.',
    },
    {
      layer: 'Database',
      service: 'MySQL 8 (Docker)',
      role: 'Ghost database, member data',
      cost: '€0 (included in VPS)',
      why: 'Ghost ondersteunt MySQL en SQLite. MySQL voor productie vanwege schaalbaarheid en backup-tooling. Docker volume voor data persistentie.',
    },
    {
      layer: 'Object Storage',
      service: 'Cloudflare R2',
      role: 'Afbeeldingen, uploads, downloads, video thumbnails',
      cost: '~€0-5/maand (10GB gratis)',
      why: 'R2 heeft geen egress-kosten (vs S3). Perfect voor media-heavy publishing. Directe integratie met Cloudflare CDN. Alternatief: Hetzner Object Storage (compatibel met S3 API).',
    },
    {
      layer: 'Email (Transactioneel)',
      service: 'Mailgun (Flex Plan)',
      role: 'Ghost newsletter delivery, membership emails, system alerts',
      cost: '€0-35/maand (afhankelijk van volume)',
      why: 'Ghost heeft native Mailgun integratie. Excellent deliverability. Flex plan is gratis tot 5000 emails/maand — ruim voldoende voor start. Upgrade naar Foundation plan bij groei.',
    },
    {
      layer: 'Analytics',
      service: 'Plausible Analytics',
      role: 'Privacy-first web analytics, GDPR compliant',
      cost: '€9/maand (cloud) of €0 (self-hosted)',
      why: 'GDPR-compliant by design (geen cookie banner nodig). Lichtgewicht script (< 1KB). Europees bedrijf. Ghost heeft directe Plausible integratie in dashboard. Alternatief: Umami (self-hosted).',
    },
    {
      layer: 'Payments',
      service: 'Stripe',
      role: 'Ghost membership betalingen',
      cost: '1.4% + €0.25 per EU-transactie',
      why: 'Ghost heeft native Stripe integratie. Best-in-class payment UX. European presence = lage fees voor EU klanten. iDEAL, SEPA, creditcard out of the box.',
    },
    {
      layer: 'Monitoring',
      service: 'Better Uptime + UptimeRobot',
      role: 'Uptime monitoring, incident alerts',
      cost: '€0 (gratis tiers)',
      why: 'Beide hebben gratis tiers met 5-minuut checks. Better Uptime heeft mooiere status pages. UptimeRobot heeft betere alerting integraties. Gebruik beide voor redundantie.',
    },
    {
      layer: 'CI/CD',
      service: 'GitHub Actions',
      role: 'Automated deployments, theme builds',
      cost: '€0 (gratis tier)',
      why: 'Gratis voor public repos. Deploy Ghost theme updates automatisch via SSH. Geen extra tooling nodig voor een Ghost setup.',
    },
    {
      layer: 'Backup',
      service: 'Ghost backup script → Hetzner Object Storage',
      role: 'Dagelijkse MySQL dumps + content exports',
      cost: '~€1/maand',
      why: 'Automatisch script: mysqldump → gzip → upload naar S3-compatible storage. Bewaar 30 dagen roterende backups. Hetzner Object Storage is de goedkoopste optie in Europa.',
    },
  ]

  const dockerCompose = `version: '3.8'

services:
  ghost:
    image: ghost:5-alpine
    restart: always
    environment:
      url: https://nullpoint.pro
      database__client: mysql
      database__connection__host: mysql
      database__connection__user: ghost
      database__connection__password: \${GHOST_DB_PASS}
      database__connection__database: ghost
      mail__transport: SMTP
      mail__options__host: smtp.mailgun.org
      mail__options__port: 587
      mail__options__auth__user: \${MAILGUN_USER}
      mail__options__auth__pass: \${MAILGUN_PASS}
      storage__active: s3
      storage__s3__accessKeyId: \${S3_KEY}
      storage__s3__secretAccessKey: \${S3_SECRET}
      storage__s3__bucket: nullpoint-media
      storage__s3__region: auto
      storage__s3__endpoint: https://<account>.r2.cloudflarestorage.com
    volumes:
      - ghost_content:/var/lib/ghost/content
    depends_on:
      - mysql

  mysql:
    image: mysql:8
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: \${MYSQL_ROOT_PASS}
      MYSQL_DATABASE: ghost
      MYSQL_USER: ghost
      MYSQL_PASSWORD: \${GHOST_DB_PASS}
    volumes:
      - mysql_data:/var/lib/mysql

  caddy:
    image: caddy:2-alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
    depends_on:
      - ghost

volumes:
  ghost_content:
  mysql_data:
  caddy_data:`

  const caddyfile = `nullpoint.pro {
  reverse_proxy ghost:2368

  encode gzip zstd

  header {
    X-Content-Type-Options nosniff
    X-Frame-Options DENY
    Referrer-Policy strict-origin-when-cross-origin
    Permissions-Policy "camera=(), microphone=(), geolocation=()"
  }
}

www.nullpoint.pro {
  redir https://nullpoint.pro{uri} permanent
}`

  const costBreakdown = [
    { item: 'Hetzner CX32 VPS', cost: '€13.90/maand', required: true },
    { item: 'Cloudflare Free', cost: '€0/maand', required: true },
    { item: 'Plausible Analytics (cloud)', cost: '€9/maand', required: false },
    { item: 'Mailgun (Flex, tot 5K emails)', cost: '€0/maand', required: true },
    { item: 'Cloudflare R2 (< 10GB)', cost: '€0/maand', required: true },
    { item: 'Hetzner Object Storage (backup)', cost: '€1/maand', required: true },
    { item: 'Ghost theme (Headline/Curated)', cost: '€49-149 eenmalig', required: false },
    { item: 'Domein (.pro of .eu)', cost: '€15-30/jaar', required: true },
    { item: 'Stripe fees (bij €500/maand revenue)', cost: '€8/maand', required: false },
  ]

  return (
    <div className="space-y-10">
      <div>
        <h1 className="section-title">
          <span className="text-accent-orange">05.</span> Technische Stack
        </h1>
        <p className="section-subtitle">
          Volledige infrastructuur: providers, server specs, kosten, deployment flow, backups en scaling.
        </p>
      </div>

      {/* Architecture overview */}
      <div className="card border-accent-orange/30">
        <p className="text-xs font-mono text-accent-orange mb-3">INFRASTRUCTUUR OVERZICHT</p>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {['Bezoeker', '→', 'Cloudflare CDN/WAF', '→', 'Hetzner VPS', '→', 'Caddy (HTTPS)', '→', 'Ghost (Docker)', '→', 'MySQL (Docker)'].map((item, i) => (
            <span
              key={i}
              className={item === '→' ? 'text-accent-orange' : 'bg-base-600 border border-base-400 rounded px-2 py-1 font-mono text-xs'}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-text-muted">
          <span>📦 Media: Cloudflare R2 (S3-compatible)</span>
          <span>📧 Email: Mailgun SMTP</span>
          <span>💳 Payments: Stripe (via Ghost)</span>
          <span>📊 Analytics: Plausible</span>
          <span>💾 Backups: Hetzner Object Storage</span>
        </div>
      </div>

      {/* Stack details */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Stack Componenten
        </h2>
        <div className="space-y-3">
          {stackLayers.map((layer) => (
            <div key={layer.layer} className="card-sm">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="font-mono text-xs text-text-muted bg-base-600 px-2 py-0.5 rounded">{layer.layer}</span>
                <span className="font-semibold text-text-primary text-sm">{layer.service}</span>
                <span className="tag-green text-xs">{layer.cost}</span>
              </div>
              <p className="text-xs text-accent-blue mb-1">{layer.role}</p>
              <p className="text-xs text-text-muted leading-relaxed">{layer.why}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Docker Compose */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Docker Compose Setup
        </h2>
        <pre className="code-block overflow-x-auto">{dockerCompose}</pre>
      </div>

      {/* Caddyfile */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Caddyfile (Reverse Proxy + Security Headers)
        </h2>
        <pre className="code-block">{caddyfile}</pre>
      </div>

      {/* Cost breakdown */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Maandelijkse Kostenraming
        </h2>
        <div className="overflow-x-auto rounded-xl border border-base-500">
          <table className="data-table">
            <thead>
              <tr>
                <th>Component</th>
                <th>Kosten</th>
                <th>Verplicht</th>
              </tr>
            </thead>
            <tbody>
              {costBreakdown.map((item) => (
                <tr key={item.item}>
                  <td className="text-text-primary text-sm">{item.item}</td>
                  <td className="font-mono text-accent-green text-sm">{item.cost}</td>
                  <td>{item.required ? <span className="tag-orange text-xs">Ja</span> : <span className="text-text-muted text-xs">Optioneel</span>}</td>
                </tr>
              ))}
              <tr className="bg-base-600/50">
                <td className="font-bold text-text-primary">Totaal (verplicht, maandelijks)</td>
                <td className="font-bold font-mono text-accent-orange">~€25-30/maand</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-text-muted text-xs mt-2">* Eenmalige kosten (domein + theme): ~€65-180. Totale jaar 1 kosten: ~€370-540.</p>
      </div>

      {/* Scaling strategy */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Scaling Strategie
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              phase: 'Fase 1: Launch (0-50K pv/mnd)',
              spec: 'Hetzner CX32 (4vCPU, 8GB)',
              cost: '€13.90/mnd',
              action: 'Geen aanpassingen nodig. Ghost + MySQL + Caddy comfortabel binnen specs.',
            },
            {
              phase: 'Fase 2: Groei (50K-200K pv/mnd)',
              spec: 'Hetzner CX42 (8vCPU, 16GB)',
              cost: '€24.90/mnd',
              action: 'Upgrade VPS. Schakel Cloudflare Cache Rules in voor statische content. Redis caching overwegen voor Ghost.',
            },
            {
              phase: 'Fase 3: Scale (200K+ pv/mnd)',
              spec: 'Separate DB server + load balancer',
              cost: '€50-80/mnd',
              action: 'MySQL naar dedicated CX22 server. Overweeg managed Ghost.org hosting of Headless Ghost + Next.js frontend.',
            },
          ].map((p) => (
            <div key={p.phase} className="card-sm">
              <p className="font-semibold text-accent-orange text-sm mb-2">{p.phase}</p>
              <p className="font-mono text-xs text-accent-blue mb-1">{p.spec} — {p.cost}</p>
              <p className="text-text-muted text-xs leading-relaxed">{p.action}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Backup strategy */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Backup Strategie
        </h2>
        <div className="code-block">
          <p className="text-accent-amber mb-2"># Dagelijkse backup script (cron: 2:00 AM)</p>
          <p className="text-accent-green">DATE=$(date +%Y%m%d)</p>
          <p className="text-accent-green">mysqldump ghost | gzip {'>'} /tmp/ghost_db_$DATE.sql.gz</p>
          <p className="text-accent-green">tar -czf /tmp/ghost_content_$DATE.tar.gz /ghost/content</p>
          <p className="text-accent-green">aws s3 cp /tmp/ghost_db_$DATE.sql.gz s3://nullpoint-backups/db/</p>
          <p className="text-accent-green">aws s3 cp /tmp/ghost_content_$DATE.tar.gz s3://nullpoint-backups/content/</p>
          <p className="text-accent-green">find /tmp -name "ghost_*" -mtime +1 -delete</p>
          <p className="text-text-muted mt-2"># Bewaar 30 dagen roterende backups</p>
          <p className="text-text-muted"># S3_ENDPOINT=https://&lt;account&gt;.r2.cloudflarestorage.com</p>
          <p className="text-text-muted"># Kosten: ~€0.50-1/maand voor 30-day retention</p>
        </div>
      </div>
    </div>
  )
}
