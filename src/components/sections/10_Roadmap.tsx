export default function Roadmap() {
  const months = [
    {
      month: 1,
      title: 'Fundament',
      phase: 'MVP',
      focus: 'Tech setup + 10 pillar articles',
      tasks: [
        { task: 'Domein registreren (nullpoint.pro)', cat: 'Tech', done: false },
        { task: 'Hetzner VPS opzetten, Docker installeren', cat: 'Tech', done: false },
        { task: 'Ghost + MySQL + Caddy configureren', cat: 'Tech', done: false },
        { task: 'Cloudflare DNS instellen', cat: 'Tech', done: false },
        { task: 'Premium Ghost theme kopen + installeren', cat: 'Design', done: false },
        { task: 'Branding: logo, kleurenpalet definitief maken', cat: 'Design', done: false },
        { task: 'Mailgun configureren voor Ghost email', cat: 'Tech', done: false },
        { task: 'Plausible analytics instellen', cat: 'Tech', done: false },
        { task: '3 pillar articles schrijven (d&b, Dante, Sub Systems)', cat: 'Content', done: false },
        { task: 'Google Search Console + sitemap indienen', cat: 'SEO', done: false },
      ],
      kpi: 'Platform live, eerste 3 artikelen gepubliceerd',
      milestone: '🚀 Soft Launch',
    },
    {
      month: 2,
      title: 'Content Engine',
      phase: 'MVP',
      focus: '10 meer artikelen, Discord launch, nieuwsbrief start',
      tasks: [
        { task: '5 supporting articles per cluster schrijven', cat: 'Content', done: false },
        { task: 'Discord server opzetten en structureren', cat: 'Community', done: false },
        { task: 'Founding Member uitnodigingen sturen (persoonlijk netwerk)', cat: 'Community', done: false },
        { task: 'Ghost memberships activeren (Free + Professional tiers)', cat: 'Revenue', done: false },
        { task: 'Stripe koppelen, betalingsflow testen', cat: 'Revenue', done: false },
        { task: 'Welcome email sequence schrijven (5 emails)', cat: 'Email', done: false },
        { task: 'LinkedIn company page + eerste 5 posts', cat: 'Marketing', done: false },
        { task: 'Cases-sectie: 2 FS Entertainment cases documenteren', cat: 'Content', done: false },
      ],
      kpi: '100+ email subscribers, Discord live met 30+ leden',
      milestone: '📧 Nieuwsbrief Launch',
    },
    {
      month: 3,
      title: 'SEO Momentum',
      phase: 'Groei',
      focus: 'Organisch verkeer opbouwen, eerste betaalde members',
      tasks: [
        { task: '10 meer artikelen (focus op high-SEO-value topics)', cat: 'Content', done: false },
        { task: 'Troubleshooting sectie opbouwen (hoog zoekvolume)', cat: 'Content', done: false },
        { task: 'Google Search Console analyseren: welke queries werken?', cat: 'SEO', done: false },
        { task: 'Interne linkstructuur optimaliseren', cat: 'SEO', done: false },
        { task: 'Eerste YouTube video opnemen en publiceren', cat: 'YouTube', done: false },
        { task: 'RF Engineering cluster starten', cat: 'Content', done: false },
        { task: 'Eerste maandelijkse Discord Q&A hosten', cat: 'Community', done: false },
      ],
      kpi: '500+ email subscribers, 5-10 betaalde members, 2K+ organische bezoekers',
      milestone: '💰 Eerste Revenue',
    },
    {
      month: 4,
      title: 'Authority Building',
      phase: 'Groei',
      focus: 'Gastuploads, partnerships, YouTube groei',
      tasks: [
        { task: 'Gast-artikel pitchen aan ProSoundWeb of productie-websites', cat: 'PR', done: false },
        { task: 'LinkedIn: 3x per week posten (tips, uittreksels)', cat: 'Marketing', done: false },
        { task: '3 YouTube videos publiceren', cat: 'YouTube', done: false },
        { task: 'Partnership gesprek met accessoire-merken (Shure, Sennheiser)', cat: 'Business', done: false },
        { task: 'Engineering tier content voorbereiden (templates)', cat: 'Content', done: false },
        { task: 'Festival season content serie starten', cat: 'Content', done: false },
      ],
      kpi: '1K+ email subscribers, 10K+ maandelijkse bezoekers',
      milestone: '🤝 Eerste Partnerships',
    },
    {
      month: 5,
      title: 'Engineering Tier Launch',
      phase: 'Revenue',
      focus: 'Engineering tier actief, eerste templates beschikbaar',
      tasks: [
        { task: 'Engineering tier activeren in Ghost', cat: 'Revenue', done: false },
        { task: 'Template library opbouwen: RF spreadsheet, Dante worksheet', cat: 'Content', done: false },
        { task: 'd&b preset files catalogiseren en uploaden', cat: 'Content', done: false },
        { task: 'Upgrade sequence instellen voor Professional → Engineering', cat: 'Email', done: false },
        { task: 'Discord Engineering-kanalen activeren', cat: 'Community', done: false },
        { task: 'Eerste system design review sessie hosten', cat: 'Community', done: false },
      ],
      kpi: 'Engineering tier live, 20+ Engineering leden, €1000+ MRR',
      milestone: '⭐ Engineering Tier Live',
    },
    {
      month: 6,
      title: '6-Maanden Review',
      phase: 'Review',
      focus: 'Data-gedreven optimalisatie van alle kanalen',
      tasks: [
        { task: 'Analytics review: beste content, conversie-paden, SEO-rankings', cat: 'Analytics', done: false },
        { task: 'Churn analyse: waarom cancellen members?', cat: 'Revenue', done: false },
        { task: 'SEO gap analyse: welke zoekwoorden ontbreken?', cat: 'SEO', done: false },
        { task: 'Community health check: actieve leden, betrokkenheid', cat: 'Community', done: false },
        { task: 'Content kalender voor Q3 en Q4 plannen', cat: 'Content', done: false },
        { task: 'Eerste affiliate partnerships activeren', cat: 'Revenue', done: false },
      ],
      kpi: '2K+ email subscribers, 25K+ bezoekers/mnd, €1500+ MRR',
      milestone: '📊 Mid-Year Review',
    },
    {
      month: 7,
      title: 'YouTube Strategie',
      phase: 'Scale',
      focus: 'YouTube als second traffic channel activeren',
      tasks: [
        { task: 'YouTube kanaal optimaliseren (SEO, branding, beschrijvingen)', cat: 'YouTube', done: false },
        { task: 'Video production workflow stroomlijnen', cat: 'YouTube', done: false },
        { task: '2 videos/maand ritme vasthouden', cat: 'YouTube', done: false },
        { task: 'Transcriptie pipeline: Whisper → blogpost', cat: 'AI', done: false },
        { task: 'YouTube Shorts experimenteren voor bereik', cat: 'YouTube', done: false },
        { task: 'Cursus-outline schrijven voor Academy', cat: 'Academy', done: false },
      ],
      kpi: '500+ YouTube subscribers, 1 Academy cursus in ontwikkeling',
      milestone: '📹 YouTube Groei',
    },
    {
      month: 8,
      title: 'Festival Season Content',
      phase: 'Scale',
      focus: 'Zomerfestival content op volle snelheid',
      tasks: [
        { task: 'Festival case studies live publiceren', cat: 'Content', done: false },
        { task: 'Behind-the-stage video serie van FS Entertainment projecten', cat: 'YouTube', done: false },
        { task: 'Real-time Discord activiteit tijdens grote festivals', cat: 'Community', done: false },
        { task: 'Festival RF coördinatie content cluster voltooien', cat: 'Content', done: false },
        { task: 'Sponsorship gesprekken starten bij relevante merken', cat: 'Business', done: false },
      ],
      kpi: '40K+ bezoekers/mnd, 2500+ email subscribers',
      milestone: '🎪 Festival Season Peak',
    },
    {
      month: 9,
      title: 'Academy Launch',
      phase: 'Revenue',
      focus: 'Eerste betaalde cursus lanceren',
      tasks: [
        { task: 'Eerste Academy cursus produceren (bijv. "Dante From Zero")', cat: 'Academy', done: false },
        { task: 'Course landing page bouwen in Ghost', cat: 'Tech', done: false },
        { task: 'Launch email sequence schrijven', cat: 'Email', done: false },
        { task: 'Beta cursus aan Engineering leden aanbieden', cat: 'Revenue', done: false },
        { task: 'Affiliate tracking instellen voor course sales', cat: 'Revenue', done: false },
      ],
      kpi: 'Eerste cursus verkocht, €2000+ MRR totaal',
      milestone: '🎓 Academy Launch',
    },
    {
      month: 10,
      title: 'Automation',
      phase: 'Efficiency',
      focus: 'Workflows automatiseren voor schaalbaarheid',
      tasks: [
        { task: 'n8n opzetten voor artikel → social media automation', cat: 'AI', done: false },
        { task: 'New member → Discord invite automatisering', cat: 'AI', done: false },
        { task: 'Wekelijkse analytics rapport automatiseren', cat: 'AI', done: false },
        { task: 'Transcriptie pipeline voor alle video content', cat: 'AI', done: false },
        { task: 'Content kalender tool bouwen in Notion/Airtable', cat: 'Workflow', done: false },
        { task: 'Tweede cursus in pre-productie starten', cat: 'Academy', done: false },
      ],
      kpi: '50K+ bezoekers/mnd, automation flows actief',
      milestone: '⚡ Automation Live',
    },
    {
      month: 11,
      title: 'Scale & Partnerships',
      phase: 'Scale',
      focus: 'Betaalde acquisitie testen, partnerships sluiten',
      tasks: [
        { task: 'Eerste Google Ads test (€200-500 budget)', cat: 'Marketing', done: false },
        { task: 'Gesprekken met potentiële sponsors afronden', cat: 'Business', done: false },
        { task: 'Industry podcast gastoptredens plannen', cat: 'PR', done: false },
        { task: 'Overweeg deeltijdse redacteur/bijdrager inschakelen', cat: 'Team', done: false },
        { task: 'International expansion: meer Engelstalige content', cat: 'SEO', done: false },
      ],
      kpi: '3K+ email subscribers, €3000+ MRR',
      milestone: '🌍 Eerste Sponsorships',
    },
    {
      month: 12,
      title: 'Jaar 1 Review & Jaar 2 Plan',
      phase: 'Planning',
      focus: 'Complete audit, jaar 2 strategie bepalen',
      tasks: [
        { task: 'Volledige revenue analyse: welke kanalen presteren?', cat: 'Analytics', done: false },
        { task: 'SEO-portfolio: hoeveel keywords in top 10?', cat: 'SEO', done: false },
        { task: 'Community NPS meting bij leden', cat: 'Community', done: false },
        { task: 'Team uitbreiding evalueren (redacteur, developer)', cat: 'Team', done: false },
        { task: 'Custom Ghost theme development plannen voor jaar 2', cat: 'Tech', done: false },
        { task: 'Jaar 2 roadmap en revenue targets opstellen', cat: 'Planning', done: false },
      ],
      kpi: '60K+ bezoekers/mnd, 3K+ email, €4000+ MRR, 10+ industry relaties',
      milestone: '🏆 Jaar 1 Afgerond',
    },
  ]

  const catColors: Record<string, string> = {
    Tech: 'tag-blue',
    Content: 'tag-green',
    Community: 'tag-amber',
    Revenue: 'tag-orange',
    SEO: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    Marketing: 'bg-pink-500/10 text-pink-400 border border-pink-500/20',
    Email: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
    Design: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    YouTube: 'bg-red-500/10 text-red-400 border border-red-500/20',
    Academy: 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
    AI: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    PR: 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
    Business: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    Team: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
    Analytics: 'bg-teal-500/10 text-teal-400 border border-teal-500/20',
    Workflow: 'bg-lime-500/10 text-lime-400 border border-lime-500/20',
    Planning: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
  }

  const phaseColors: Record<string, string> = {
    MVP: 'tag-blue',
    Groei: 'tag-green',
    Revenue: 'tag-orange',
    Review: 'tag-amber',
    Scale: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    Efficiency: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
    Planning: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="section-title">
          <span className="text-accent-orange">10.</span> 12-Maanden Roadmap
        </h1>
        <p className="section-subtitle">
          Maand-voor-maand actieplan: prioriteiten, MVP, launch strategie, SEO milestones en groei.
        </p>
      </div>

      {/* Timeline overview */}
      <div className="card overflow-x-auto">
        <p className="text-xs font-mono text-text-muted mb-4">JAAR 1 OVERZICHT</p>
        <div className="flex gap-1 min-w-max">
          {months.map((m) => (
            <div key={m.month} className="flex flex-col items-center">
              <div
                className={`w-16 h-2 rounded-full mb-1 ${
                  m.phase === 'MVP' ? 'bg-accent-blue' :
                  m.phase === 'Groei' ? 'bg-accent-green' :
                  m.phase === 'Revenue' ? 'bg-accent-orange' :
                  m.phase === 'Review' ? 'bg-accent-amber' :
                  m.phase === 'Scale' ? 'bg-purple-500' :
                  m.phase === 'Efficiency' ? 'bg-cyan-500' :
                  'bg-pink-500'
                }`}
              />
              <p className="text-xs font-mono text-text-muted">M{m.month}</p>
              <p className="text-xs text-text-dim text-center w-16 leading-tight">{m.title}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-4">
          {[['MVP', 'bg-accent-blue'], ['Groei', 'bg-accent-green'], ['Revenue', 'bg-accent-orange'], ['Review', 'bg-accent-amber'], ['Scale', 'bg-purple-500'], ['Efficiency', 'bg-cyan-500'], ['Planning', 'bg-pink-500']].map(([phase, color]) => (
            <div key={phase} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-full ${color}`} />
              <span className="text-xs text-text-muted">{phase}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Month detail cards */}
      <div className="space-y-6">
        {months.map((m) => (
          <div key={m.month} className="card">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-3xl font-bold text-accent-orange">M{m.month}</span>
                <div>
                  <p className="font-semibold text-text-primary text-lg">{m.title}</p>
                  <p className="text-text-muted text-sm">{m.focus}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`tag text-xs ${phaseColors[m.phase] || 'tag-blue'}`}>{m.phase}</span>
                <span className="tag-orange text-xs">{m.milestone}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <p className="text-xs font-mono text-text-muted mb-2">TAKEN</p>
                <div className="space-y-1.5">
                  {m.tasks.map((t) => (
                    <div key={t.task} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border border-base-400 flex-shrink-0" />
                      <span className={`tag text-xs flex-shrink-0 ${catColors[t.cat] || 'tag-green'}`}>{t.cat}</span>
                      <span className="text-text-secondary text-xs">{t.task}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-mono text-text-muted mb-2">KPI DOEL</p>
                <div className="success-box p-3">
                  <p className="text-xs text-text-secondary leading-relaxed">{m.kpi}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
