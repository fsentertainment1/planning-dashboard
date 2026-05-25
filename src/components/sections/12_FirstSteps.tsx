export default function FirstSteps() {
  const week1 = [
    { day: 'Dag 1', tasks: ['Domeinnaam controleren en registreren (nullpoint.pro of signalpath.eu)', 'Hetzner account aanmaken, CX32 VPS bestellen in Duitsland (Frankfurt/Nuremberg)', 'GitHub repository aanmaken voor Ghost theme en configuratie'], cat: 'Tech' },
    { day: 'Dag 2', tasks: ['Ubuntu 22.04 LTS server configureren', 'Docker + Docker Compose installeren', 'Fail2ban, UFW firewall, SSH-key-only login instellen (geen wachtwoorden)'], cat: 'Tech' },
    { day: 'Dag 3', tasks: ['Ghost + MySQL + Caddy via Docker Compose opstarten', 'SSL certificaat via Caddy automatisch activeren', 'Cloudflare DNS naar VPS wijzen, proxy inschakelen'], cat: 'Tech' },
    { day: 'Dag 4', tasks: ['Ghost theme installeren (Headline of Curated)', 'Primaire kleurenpalet aanpassen in theme CSS', 'Ghost Admin configureren: site info, timezone, locale (en-GB)'], cat: 'Setup' },
    { day: 'Dag 5', tasks: ['Mailgun account + domein verificatie', 'Ghost mail SMTP configureren met Mailgun', 'Test email sturen via Ghost Admin → verify delivery'], cat: 'Email' },
    { day: 'Dag 6', tasks: ['Plausible analytics script embedden in Ghost theme', 'Google Search Console: site verifiëren, sitemap indienen', 'Backup script schrijven en testen (mysqldump → R2)'], cat: 'Analytics' },
    { day: 'Dag 7', tasks: ['Eerste pillar artikel schrijven: "Cardioid Sub Arrays: The Physics, The Math, The Reality"', 'Author bio schrijven met foto en expertise-punten', 'Ghost memberships activeren (gratis tier)'], cat: 'Content' },
  ]

  const month1_actions = [
    { week: 'Week 2', focus: 'Content', actions: ['3 pillar artikelen afmaken en publiceren', 'Navigation en site structuur finaliseren', 'Cases sectie: eerste 2 FS Entertainment cases documenteren', 'LinkedIn pagina aanmaken, eerste 5 posts plannen'], kpi: 'Eerste 3 artikelen live' },
    { week: 'Week 3', focus: 'Community', actions: ['Discord server aanmaken en volledig configureren', '25 persoonlijke uitnodigingen sturen via LinkedIn/WhatsApp', 'Discord bot installeren (MEE6 of Carl-bot voor welkomstbericht)', 'Founding Members badge instellen voor eerste 50 aanmeldingen'], kpi: 'Discord live, 20+ leden' },
    { week: 'Week 4', focus: 'Growth', actions: ['5 meer supporting articles publiceren', 'Ghost Professional tier configureren en testen (€9/mnd)', 'Stripe integratie testen: simuleer upgrade flow', 'Welcome email sequence instellen (5 emails, 14 dagen)'], kpi: '10 pillar articles live, nieuwsbrief gestart' },
  ]

  const month3_sprint = [
    {
      area: 'Content',
      target: '25-30 gepubliceerde artikelen',
      actions: [
        'Publiceer 3-4 artikelen per week',
        'Focus op high-SEO-value topics (troubleshooting, d&b, Dante)',
        'Elk artikel heeft YouTube companion video (10-15 min)',
        'Alle artikelen hebben interne links naar gerelateerde content',
        'Minimaal 5 "gratis download" CTAs voor email capture',
      ],
    },
    {
      area: 'SEO',
      target: '50+ keywords in Google index, eerste top-20 rankings',
      actions: [
        'Ahrefs account activeren, competitor analysis draaien',
        'Content gap analyse: welke topics ranken concurrenten wel?',
        'Alle gepubliceerde artikelen: title, meta description, OG image perfectioneren',
        'Schema markup toevoegen aan artikel paginas',
        'Google Search Console wekelijks monitoren',
      ],
    },
    {
      area: 'Community',
      target: '200+ Discord leden, 500+ email subscribers',
      actions: [
        'Eerste maandelijkse Q&A hosten (Discord Stage, 45 min)',
        'Wekelijks 2-3 waardevolle reacties op LinkedIn posts in de niche',
        'Gastbijdrage pitchen aan ProSoundWeb (1 artikel)',
        'Discord community wekelijks stimuleren met vragen en discussies',
      ],
    },
    {
      area: 'Revenue',
      target: 'Eerste betaalde members, MRR > €0',
      actions: [
        'Professional tier live en getest',
        'Eerste upgrade-campagne sturen (14 dagen korting email)',
        'Affiliate links toevoegen aan gear-gerelateerde artikelen (Thomann)',
        'Consulting pagina live met boekingformulier',
      ],
    },
  ]

  const immediate_priorities = [
    { priority: 1, action: 'Domein registreren', why: 'Blokkeert alles. Goedkoop en snel. Vandaag.', time: '30 min' },
    { priority: 2, action: 'VPS bestellen bij Hetzner', why: 'Provisioning duurt 1-2 minuten, server beschikbaar.', time: '20 min' },
    { priority: 3, action: 'Ghost installeren', why: 'Fundament van alles. Docker Compose is straightforward.', time: '2-3 uur' },
    { priority: 4, action: 'Eerste artikel schrijven', why: 'Geen perfecte setup. Start schrijven terwijl tech loopt.', time: 'Parallel' },
    { priority: 5, action: 'Persoonlijk netwerk mailen', why: 'Je eerste 25 subscribers zijn al bereikbaar. Nu doen.', time: '1 uur' },
  ]

  return (
    <div className="space-y-10">
      <div>
        <h1 className="section-title">
          <span className="text-accent-orange">12.</span> Concrete Eerste Stappen
        </h1>
        <p className="section-subtitle">
          Praktisch actieplan voor de eerste 7 dagen, 30 dagen en 90 dagen. Uiterst concreet.
        </p>
      </div>

      {/* Immediate action */}
      <div className="highlight-box">
        <p className="text-sm font-mono text-accent-orange mb-3">⚡ VANDAAG DOEN (Top 5)</p>
        <div className="space-y-2">
          {immediate_priorities.map((p) => (
            <div key={p.priority} className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-accent-orange text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {p.priority}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-text-primary text-sm">{p.action}</p>
                  <span className="pill text-xs">{p.time}</span>
                </div>
                <p className="text-text-muted text-xs">{p.why}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Week 1 */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Week 1: Dag-voor-Dag Plan
        </h2>
        <div className="space-y-3">
          {week1.map((day) => (
            <div key={day.day} className="card-sm flex gap-4">
              <div className="flex-shrink-0">
                <span className="font-mono text-accent-orange font-bold text-sm">{day.day}</span>
                <br />
                <span className={`tag text-xs mt-1 inline-block ${
                  day.cat === 'Tech' ? 'tag-blue' :
                  day.cat === 'Email' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                  day.cat === 'Analytics' ? 'tag-green' :
                  day.cat === 'Content' ? 'tag-orange' :
                  'tag-amber'
                }`}>{day.cat}</span>
              </div>
              <ul className="space-y-1.5">
                {day.tasks.map((task) => (
                  <li key={task} className="text-xs text-text-secondary flex gap-2">
                    <span className="text-accent-orange flex-shrink-0">□</span>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Month 1 remaining weeks */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Maand 1: Weken 2-4
        </h2>
        <div className="space-y-4">
          {month1_actions.map((week) => (
            <div key={week.week} className="card">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-text-primary">{week.week}</p>
                <div className="flex gap-2">
                  <span className={`tag text-xs ${
                    week.focus === 'Content' ? 'tag-orange' :
                    week.focus === 'Community' ? 'tag-amber' : 'tag-green'
                  }`}>{week.focus}</span>
                  <span className="pill text-xs">{week.kpi}</span>
                </div>
              </div>
              <ul className="space-y-1.5">
                {week.actions.map((action) => (
                  <li key={action} className="text-xs text-text-secondary flex gap-2">
                    <span className="text-accent-orange flex-shrink-0">□</span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 90-day sprint */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> 90-Dagen Sprint: Maand 2-3
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {month3_sprint.map((area) => (
            <div key={area.area} className="card">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-text-primary">{area.area}</p>
                <span className="tag-blue text-xs">{area.target}</span>
              </div>
              <ul className="space-y-1.5">
                {area.actions.map((action) => (
                  <li key={action} className="text-xs text-text-secondary flex gap-2">
                    <span className="text-accent-orange flex-shrink-0">→</span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Anti-procrastination */}
      <div className="warning-box">
        <p className="text-sm font-semibold text-accent-red mb-2">Anti-Procrastinatie Regels</p>
        <div className="space-y-2">
          {[
            '"Perfecte" setup bestaat niet. Ghost is werkend? Publiceer. Improve later.',
            'Geen content zonder publicatiedatum. Elk artikel = datum in kalender voor het klaar is.',
            'Als een taak langer dan 2 weken staat — breek het op in kleinere stappen of verwijder het.',
            'Eerste leden komen niet vanzelf. Persoonlijk uitnodigen is de enige weg. Mass-marketing werkt niet voor cold start.',
            'Minder perfect maar live > perfect maar nooit af.',
          ].map((rule) => (
            <p key={rule} className="text-xs text-text-secondary flex gap-2">
              <span className="text-accent-red flex-shrink-0">!</span>
              {rule}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
