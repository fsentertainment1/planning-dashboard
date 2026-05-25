export default function GhostImpl() {
  const ghostGitHubInfo = {
    repo: 'https://github.com/TryGhost/Ghost',
    dockerImage: 'ghost:5-alpine',
    dockerHub: 'https://hub.docker.com/_/ghost',
    latestRelease: 'github.com/TryGhost/Ghost/releases',
    license: 'MIT',
    stack: 'Node.js 20, Express, Knex, Bookshelf',
  }


  const membershipTiers = [
    {
      name: 'Free',
      price: '€0',
      ghost_tier: 'Free member',
      content: [
        'Alle publieke artikelen',
        'Wekelijkse nieuwsbrief',
        'Basis Discord toegang',
        'Free downloads (checklists)',
        'Community forum lezen',
      ],
      purpose: 'Email list opbouwen, community entry, SEO traffic opvangen',
      cta: 'Gratis lid worden',
    },
    {
      name: 'Professional',
      price: '€9/mnd of €79/jaar',
      ghost_tier: 'Paid tier 1',
      content: [
        'Alles uit Free',
        'Premium deep-dive artikelen',
        'Case study library',
        'Equipment comparison guides',
        'Priority nieuwsbrief (Engineering Briefing)',
        'Private Discord kanalen (#professional)',
      ],
      purpose: 'Eerste betaalde stap, hoge conversie van serieuze engineers',
      cta: 'Start Professional',
    },
    {
      name: 'Engineering',
      price: '€29/mnd of €249/jaar',
      ghost_tier: 'Paid tier 2',
      content: [
        'Alles uit Professional',
        'Template & preset library',
        'Dante netwerkontwerp-werkbladen',
        'RF coördinatie spreadsheets',
        'd&b preset files',
        'Maandelijkse live Q&A',
        'System design review service',
        'Exclusieve Discord: #engineering-lab',
      ],
      purpose: 'High-value subscribers, recurring revenue anchor',
      cta: 'Join Engineering Tier',
    },
  ]

  const routesYaml = `routes:
  /academy/:
    controller: channel
    filter: tag:academy
    data: tag.academy
    template: academy

  /tools/:
    controller: channel
    filter: tag:tools
    template: tools

  /cases/:
    controller: channel
    filter: tag:cases
    template: cases

  /downloads/:
    controller: channel
    filter: tag:downloads
    template: downloads

  /newsletter/:
    template: newsletter

collections:
  /articles/:
    permalink: /articles/{slug}/
    filter: tag:-hash-premium+tag:-academy+tag:-cases
    template: index

  /academy/:
    permalink: /academy/{slug}/
    filter: tag:academy

  /cases/:
    permalink: /cases/{slug}/
    filter: tag:cases

taxonomies:
  tag: /tags/{slug}/
  author: /author/{slug}/`

  const emailSequences = [
    {
      name: 'Welcome Sequence (Free)',
      emails: [
        { day: 0, subject: 'Welcome to NullPoint — here\'s where to start', content: 'Welkom, beste artikelen, Discord uitnodiging' },
        { day: 2, subject: 'The d&b resource every system engineer bookmarks', content: 'Link naar beste d&b pillar article' },
        { day: 5, subject: 'Are you getting our best content?', content: 'Professional tier pitch met social proof' },
        { day: 10, subject: 'Community spotlight + this week\'s deep dive', content: 'Community engagement, soft upsell' },
        { day: 14, subject: '14-day anniversary: here\'s a discount code', content: '20% korting op Professional tier, expires 48u' },
      ],
    },
    {
      name: 'Upgrade Sequence (Free → Professional)',
      emails: [
        { day: 0, subject: 'You unlocked Professional — here\'s your first premium article', content: 'Onboarding naar premium content' },
        { day: 1, subject: 'Your Engineering Briefing starts Thursday', content: 'Verwachting stellen voor premium nieuwsbrief' },
        { day: 3, subject: 'Have you joined the #professional Discord channel?', content: 'Community activation' },
        { day: 7, subject: 'What\'s in the Engineering tier?', content: 'Langzaam Engineering tier introduceren' },
      ],
    },
  ]

  const ghostIntegrations = [
    { name: 'Stripe', type: 'Native', purpose: 'Membership betalingen, subscriptions, eenmalige aankopen' },
    { name: 'Mailgun', type: 'Native', purpose: 'Email delivery voor alle Ghost newsletters en notificaties' },
    { name: 'Slack / Discord', type: 'Webhook', purpose: 'Notificatie bij nieuwe member signup → Discord announcement' },
    { name: 'Plausible', type: 'Script inject', purpose: 'Privacy-first analytics, GDPR compliant' },
    { name: 'Cloudflare R2 / S3', type: 'Ghost storage adapter', purpose: 'Media uploads direct naar object storage' },
    { name: 'n8n / Zapier', type: 'Webhook', purpose: 'Automation: nieuw artikel → social media posts, Discord' },
    { name: 'Commento / Coral', type: 'Embed', purpose: 'Privacy-respectvolle commentaarfunctie (optioneel)' },
    { name: 'ConvertKit', type: 'API', purpose: 'Geavanceerde email automation als Ghost\'s eigen flows te beperkt worden' },
  ]

  const seoConfig = [
    { setting: 'Ghost SEO title format', value: '{Post Title} | NullPoint', where: 'Ghost Admin → Settings → SEO' },
    { setting: 'Ghost Meta description', value: 'Engineering-first pro audio platform for system engineers, touring professionals and live sound experts.', where: 'Ghost Admin → Settings → SEO' },
    { setting: 'Twitter/OG card', value: 'summary_large_image', where: 'Custom theme partials/meta.hbs' },
    { setting: 'Sitemap', value: 'Auto-generated by Ghost at /sitemap.xml', where: 'Built-in — submit to Google Search Console' },
    { setting: 'Canonical URLs', value: 'Auto-handled by Ghost — no duplicates', where: 'Built-in' },
    { setting: 'JSON-LD Schema', value: 'Article, BreadcrumbList, WebSite auto-generated', where: 'Ghost auto — extend in theme for Course, FAQ' },
    { setting: 'robots.txt', value: 'Auto-generated — review to ensure /ghost/ is blocked', where: 'Ghost auto + custom Caddyfile rules' },
  ]

  return (
    <div className="space-y-10">
      <div>
        <h1 className="section-title">
          <span className="text-accent-orange">06.</span> Ghost Implementatie
        </h1>
        <p className="section-subtitle">
          Ghost open source (GitHub), memberships, premium content, custom routes, email automation en integraties.
        </p>
      </div>

      {/* Ghost from GitHub */}
      <div className="card border-accent-blue/30">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-accent-blue/10 border border-accent-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-lg">👻</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <p className="font-semibold text-text-primary">Ghost Open Source</p>
              <span className="tag-blue text-xs">MIT License</span>
              <span className="tag-green text-xs">Self-hosted</span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-3">
              Ghost is volledig open source op GitHub. De officiële Docker image (<code className="font-mono text-xs bg-base-600 px-1 rounded text-accent-amber">ghost:5-alpine</code>) wordt
              automatisch gebouwd vanuit elke GitHub release tag. Je gebruikt altijd de laatste stabiele versie van de source code.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { label: 'GitHub Repo', value: 'TryGhost/Ghost', link: true },
                { label: 'Docker Image', value: 'ghost:5-alpine', link: false },
                { label: 'License', value: 'MIT (volledig vrij)', link: false },
                { label: 'Stack', value: 'Node.js 20, Express, Knex', link: false },
                { label: 'Releases', value: 'github.com/TryGhost/Ghost/releases', link: true },
                { label: 'Docker Hub', value: 'hub.docker.com/_/ghost', link: true },
              ].map((item) => (
                <div key={item.label} className="bg-base-800 rounded-lg p-3">
                  <p className="text-xs text-text-muted mb-1">{item.label}</p>
                  <p className={`text-xs font-mono ${item.link ? 'text-accent-blue' : 'text-accent-amber'}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Repo structure */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Repository Structuur (Dit Project)
        </h2>
        <pre className="code-block text-xs leading-relaxed">{`planning-dashboard/
├── infrastructure/          # Server deployment configuratie
│   ├── docker-compose.yml   # Ghost + MySQL + Caddy + Backup stack
│   ├── docker-compose.dev.yml  # Dev override (SQLite, poort exposed)
│   ├── .env.example         # Alle required environment variabelen
│   ├── caddy/
│   │   └── Caddyfile        # Reverse proxy + HTTPS + security headers
│   ├── mysql/
│   │   └── my.cnf           # MySQL tuning voor Ghost workload
│   ├── backup/
│   │   └── backup.sh        # Dagelijkse backup → Cloudflare R2/S3
│   └── ghost/
│       └── routes.yaml      # Ghost URL routing configuratie
│
├── theme/                   # Custom Ghost Handlebars theme
│   ├── package.json         # Ghost theme manifest (versie, config)
│   ├── default.hbs          # Base HTML shell
│   ├── index.hbs            # Homepage template
│   ├── post.hbs             # Enkel artikel template
│   ├── partials/            # Herbruikbare template componenten
│   │   ├── header.hbs
│   │   ├── footer.hbs
│   │   ├── hero.hbs
│   │   ├── post-card.hbs
│   │   ├── paywall.hbs
│   │   ├── membership-cta.hbs
│   │   └── newsletter-cta.hbs
│   └── assets/
│       ├── css/screen.css   # Alle styling (dark engineering UI)
│       └── js/main.js       # TOC, reading progress, code copy, etc.
│
├── scripts/
│   └── setup.sh             # VPS bootstrap script (Ubuntu 22.04)
│
└── src/                     # Planning dashboard (dit Next.js dashboard)
    └── ...`}</pre>
      </div>

      {/* Membership tiers */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Membership Tiers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {membershipTiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`card flex flex-col ${i === 2 ? 'border-accent-orange/40' : ''}`}
            >
              {i === 2 && (
                <div className="text-center mb-3">
                  <span className="tag-orange text-xs">MEEST POPULAIR</span>
                </div>
              )}
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-bold text-accent-orange">{tier.price}</span>
              </div>
              <p className="text-lg font-semibold text-text-primary mb-1">{tier.name}</p>
              <p className="text-xs font-mono text-text-muted mb-4">{tier.ghost_tier}</p>
              <ul className="space-y-1.5 mb-4 flex-1">
                {tier.content.map((item) => (
                  <li key={item} className="text-xs text-text-secondary flex gap-2">
                    <span className={i === 0 ? 'text-text-muted' : i === 1 ? 'text-accent-blue' : 'text-accent-orange'}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-text-muted italic mb-3">{tier.purpose}</p>
              <button className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${
                i === 2
                  ? 'bg-accent-orange text-white hover:bg-accent-orange-dim'
                  : 'bg-base-600 text-text-primary hover:bg-base-500 border border-base-400'
              }`}>
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Content gating strategy */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Content Gating Strategie
        </h2>
        <div className="highlight-box">
          <p className="text-sm text-text-secondary leading-relaxed">
            <span className="text-accent-orange font-semibold">Ghost regel:</span> In Ghost kun je per artikel de visibility instellen op{' '}
            <code className="font-mono text-accent-amber bg-base-600 px-1 rounded">Public</code>,{' '}
            <code className="font-mono text-accent-amber bg-base-600 px-1 rounded">Members only</code> (gratis), of{' '}
            <code className="font-mono text-accent-amber bg-base-600 px-1 rounded">Paid members only</code> (specifieke tier).
            Voor de beste SEO + conversie: gebruik <strong className="text-text-primary">partial gating</strong> — de eerste 60% van een artikel is publiek,
            daarna een member-wall. Google indexeert de openbare content, engineers worden getriggerd te upgraden op het beste moment.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {[
            { type: 'Volledig publiek', example: 'Fundamentals, beginners guides, troubleshooting', reason: 'SEO traffic maximaliseren', tag: 'Gratis' },
            { type: 'Partially gated', example: 'Deep dives, advanced tutorials, case studies', reason: 'Conversie vanuit SEO-verkeer', tag: 'Gratis → Member' },
            { type: 'Volledig gated', example: 'Templates, presets, Q&A transcripts, system reviews', reason: 'Membership waarde aantonen', tag: 'Engineering+' },
          ].map((g) => (
            <div key={g.type} className="card-sm">
              <span className={`tag text-xs mb-2 inline-block ${g.tag === 'Engineering+' ? 'tag-orange' : g.tag === 'Gratis' ? 'tag-green' : 'tag-blue'}`}>
                {g.tag}
              </span>
              <p className="font-semibold text-text-primary text-sm mb-1">{g.type}</p>
              <p className="text-xs text-text-muted mb-1 italic">{g.example}</p>
              <p className="text-xs text-text-dim">{g.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Routes.yaml */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Ghost Routes.yaml
        </h2>
        <pre className="code-block">{routesYaml}</pre>
        <p className="text-xs text-text-muted mt-2">Bestand plaatsen in Ghost content/settings/routes.yaml — herstarten van Ghost activeert nieuwe routes.</p>
      </div>

      {/* Email sequences */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Email Automation Sequences
        </h2>
        <div className="space-y-6">
          {emailSequences.map((seq) => (
            <div key={seq.name} className="card">
              <h3 className="h3">{seq.name}</h3>
              <div className="space-y-2">
                {seq.emails.map((email) => (
                  <div key={email.day} className="flex gap-3 items-start">
                    <span className="font-mono text-xs text-accent-orange bg-accent-orange/10 border border-accent-orange/20 rounded px-2 py-1 flex-shrink-0">
                      Dag {email.day}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{email.subject}</p>
                      <p className="text-xs text-text-muted">{email.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integrations */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Ghost Integraties
        </h2>
        <div className="overflow-x-auto rounded-xl border border-base-500">
          <table className="data-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Integratietype</th>
                <th>Doel</th>
              </tr>
            </thead>
            <tbody>
              {ghostIntegrations.map((int) => (
                <tr key={int.name}>
                  <td className="font-medium text-text-primary">{int.name}</td>
                  <td>
                    <span className={`tag text-xs ${int.type === 'Native' ? 'tag-green' : int.type === 'Webhook' ? 'tag-blue' : 'tag-amber'}`}>
                      {int.type}
                    </span>
                  </td>
                  <td className="text-xs text-text-muted">{int.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO config */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Ghost SEO Configuratie
        </h2>
        <div className="space-y-2">
          {seoConfig.map((cfg) => (
            <div key={cfg.setting} className="card-sm flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <p className="font-medium text-text-primary text-sm">{cfg.setting}</p>
                <p className="font-mono text-xs text-accent-amber mt-0.5">{cfg.value}</p>
              </div>
              <span className="pill text-xs flex-shrink-0">{cfg.where}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Theme recommendation */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Theme Strategie
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card">
            <p className="font-semibold text-accent-orange mb-2">Optie A: Premium Theme Kopen (Aanbevolen Start)</p>
            <ul className="space-y-1">
              {[
                'Headline theme (Ghost Marketplace, ~$149): meest professioneel, membership-ready',
                'Curated (Ghost Marketplace, ~$99): clean, editorial look',
                'Snelle launch, geen custom development nodig',
                'Pas CSS aan voor eigen branding (kleuren, fonts)',
                'Investering: €100-150 eenmalig',
              ].map((item) => (
                <li key={item} className="text-xs text-text-secondary flex gap-2">
                  <span className="text-accent-orange">→</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <p className="font-semibold text-accent-blue mb-2">Optie B: Custom Theme Bouwen (Schaal)</p>
            <ul className="space-y-1">
              {[
                'Volledige controle over design en UX',
                'Handlebars templating (Ghost native)',
                'Tailwind CSS voor styling',
                'Investering: 40-80 uur of €2000-5000 freelancer',
                'Aanbevolen na 6 maanden als platform groeit',
              ].map((item) => (
                <li key={item} className="text-xs text-text-secondary flex gap-2">
                  <span className="text-accent-blue">→</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
