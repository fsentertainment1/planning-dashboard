export default function CommunityStrategy() {
  const discordStructure = [
    { category: 'ALGEMEEN', channels: ['#welkom', '#aankondigingen', '#introducteer-jezelf', '#algemeen-chat'], access: 'Alle leden' },
    { category: 'ENGINEERING', channels: ['#live-sound', '#system-engineering', '#db-audiotechnik', '#sub-systems', '#smaart-measurement'], access: 'Alle leden' },
    { category: 'NETWORKING & RF', channels: ['#dante-network-audio', '#rf-coordinatie', '#av-over-ip', '#troubleshooting'], access: 'Alle leden' },
    { category: 'PROFESSIONAL ★', channels: ['#premium-artikelen-discussie', '#gear-recommendations', '#tech-rider-review', '#carriere-advies'], access: 'Professional+' },
    { category: 'ENGINEERING LAB ★★', channels: ['#system-design-reviews', '#preset-bibliotheek', '#exclusieve-q&a', '#maandelijkse-call-recap'], access: 'Engineering tier' },
    { category: 'INDUSTRIE', channels: ['#vacatures', '#events-announces', '#gear-te-koop', '#samenwerkingen'], access: 'Professional+' },
    { category: 'VOICE', channels: ['🔊 Live Q&A Room', '🎧 Study Hall', '🎛️ Show Night Lounge'], access: 'Alle leden' },
  ]

  const communityActivities = [
    {
      activity: 'Maandelijkse Live Q&A',
      freq: 'Elke eerste dinsdag, 20:00 CET',
      desc: 'Ingezonden vragen beantwoorden via Discord Stage, opname naar YouTube, transcript in nieuwsbrief',
      tier: 'Engineering+',
      effort: 'Gemiddeld',
    },
    {
      activity: 'System Design Reviews',
      freq: 'Bi-weekly',
      desc: 'Leden kunnen hun system design indienen voor peer + expert review in #system-design-reviews channel',
      tier: 'Engineering+',
      effort: 'Laag',
    },
    {
      activity: 'Festival Season Wrap-ups',
      freq: 'Na grote festivals',
      desc: 'Post-festival technische breakdown: wat werkte, wat niet, system tweaks, RF uitdagingen',
      tier: 'Alle leden',
      effort: 'Laag',
    },
    {
      activity: 'Gear Swap / Job Board',
      freq: 'Doorlopend',
      desc: 'Professionals kunnen vacatures en tweedehands gear plaatsen — hoge betrokkenheid, directe waarde',
      tier: 'Professional+',
      effort: 'Laag',
    },
    {
      activity: 'Tutorial Workshop',
      freq: 'Kwartaal',
      desc: 'Gestructureerde online workshop: 90 min live, diepgaand op één onderwerp (bijv. "Dante van nul")',
      tier: 'Engineering+',
      effort: 'Hoog',
    },
    {
      activity: 'Annual Awards',
      freq: 'Jaarlijks',
      desc: '"Best Show 2024": community nomineert en stemt op beste engineering inspanningen van het jaar',
      tier: 'Alle leden',
      effort: 'Gemiddeld',
    },
    {
      activity: 'Behind-The-Stage Series',
      freq: 'Maandelijks',
      desc: 'Backstage content van echte producties: pre-show setup, FOH perspective, post-show debrief',
      tier: 'Alle leden (teaser) / Engineering (volledig)',
      effort: 'Gemiddeld',
    },
    {
      activity: 'Discord Spotlight',
      freq: 'Wekelijks',
      desc: 'Beste community post of vraag van de week uitgelicht in nieuwsbrief — stimuleert betrokkenheid',
      tier: 'Alle leden',
      effort: 'Laag',
    },
  ]

  const communityGrowthPhases = [
    {
      phase: 'Fase 1: Koude Start (Maand 1-3)',
      size: '0 → 100 leden',
      tactics: [
        'Persoonlijk netwerk als founding members uitnodigen',
        'LinkedIn post: "Ik bouw een Discord voor live sound engineers in Europa"',
        'ProductieExpert / ProSoundWeb forums: waardevolle posts plaatsen, Discord link in bio',
        'Elke nieuw lid persoonlijk begroeten',
        'Founding Member badge voor eerste 100 leden',
      ],
    },
    {
      phase: 'Fase 2: Activatie (Maand 4-6)',
      size: '100 → 500 leden',
      tactics: [
        'Eerste maandelijkse Q&A — zorg dat het echt waardevol is',
        'Shout-out beste community-bijdragen in nieuwsbrief',
        'Cross-promote met podcast-hosts of YouTube-kanalen in de niche',
        'Discord invite link standaard in alle artikelen plaatsen',
        'Eerste system design review sessie',
      ],
    },
    {
      phase: 'Fase 3: Vliegwiel (Maand 7-12)',
      size: '500 → 2000 leden',
      tactics: [
        'Community genereert eigen content (vragen, discussies)',
        'Power users organisch promotors',
        'Job board / gear swap trekt professionals die platform niet kennen',
        'Discord actief linken vanuit YouTube videos',
        'Evenement-gerelateerde real-time discussies (festival seizoen)',
      ],
    },
  ]

  return (
    <div className="space-y-10">
      <div>
        <h1 className="section-title">
          <span className="text-accent-orange">09.</span> Community Strategie
        </h1>
        <p className="section-subtitle">
          Discord architectuur, groeistrategieën, engagement activiteiten en community-building roadmap.
        </p>
      </div>

      {/* Core principle */}
      <div className="highlight-box">
        <p className="text-sm font-mono text-accent-orange mb-2">KERNPRINCIPE</p>
        <p className="text-text-secondary text-sm leading-relaxed">
          Community is de meest defensieve moat van dit platform. Content kan worden gekopieerd.
          Een community niet. De doelgroep — engineers, touring techs, rental bedrijven — zijn chronisch
          eenzaam in hun werk. Ze hebben weinig peers. Een community van gelijkgestemde professionals is
          de sterkste reden om een membership te betalen en te blijven betalen.
        </p>
      </div>

      {/* Discord structure */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Discord Server Structuur
        </h2>
        <div className="space-y-3">
          {discordStructure.map((cat) => (
            <div key={cat.category} className="card-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="font-mono text-xs text-text-muted">{cat.category}</p>
                <span
                  className={`tag text-xs ${
                    cat.access === 'Alle leden'
                      ? 'tag-green'
                      : cat.access === 'Professional+'
                      ? 'tag-blue'
                      : 'tag-orange'
                  }`}
                >
                  {cat.access}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.channels.map((channel) => (
                  <span key={channel} className="pill text-xs font-mono">
                    {channel}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community activities */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Community Activiteiten
        </h2>
        <div className="overflow-x-auto rounded-xl border border-base-500">
          <table className="data-table">
            <thead>
              <tr>
                <th>Activiteit</th>
                <th>Frequentie</th>
                <th>Beschrijving</th>
                <th>Tier</th>
                <th>Effort</th>
              </tr>
            </thead>
            <tbody>
              {communityActivities.map((a) => (
                <tr key={a.activity}>
                  <td className="font-medium text-text-primary text-sm">{a.activity}</td>
                  <td className="text-xs text-accent-amber">{a.freq}</td>
                  <td className="text-xs text-text-muted max-w-xs">{a.desc}</td>
                  <td>
                    <span
                      className={`tag text-xs ${
                        a.tier === 'Engineering+'
                          ? 'tag-orange'
                          : a.tier === 'Professional+'
                          ? 'tag-blue'
                          : 'tag-green'
                      }`}
                    >
                      {a.tier.substring(0, 15)}
                    </span>
                  </td>
                  <td className={`text-xs ${a.effort === 'Laag' ? 'text-accent-green' : a.effort === 'Gemiddeld' ? 'text-accent-amber' : 'text-accent-red'}`}>
                    {a.effort}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Growth phases */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Community Groei Fasen
        </h2>
        <div className="space-y-4">
          {communityGrowthPhases.map((phase, i) => (
            <div key={phase.phase} className="card">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    i === 0 ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/30' :
                    i === 1 ? 'bg-accent-amber/20 text-accent-amber border border-accent-amber/30' :
                    'bg-accent-orange/20 text-accent-orange border border-accent-orange/30'
                  }`}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-text-primary">{phase.phase}</p>
                  <p className="font-mono text-xs text-accent-green">{phase.size}</p>
                </div>
              </div>
              <ul className="space-y-1.5">
                {phase.tactics.map((t) => (
                  <li key={t} className="text-xs text-text-secondary flex gap-2">
                    <span className="text-accent-orange flex-shrink-0">→</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Moderation */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Moderatie & Community Gezondheid
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Nul tolerantie',
              items: [
                'Spam en ongewenste promotie',
                'Merk-bashing of onprofessioneel gedrag',
                'Verkeerd advies dat safety risico\'s oplevert',
                'Politieke of off-topic discussies',
              ],
              color: 'border-accent-red/30',
            },
            {
              title: 'Actief aanmoedigen',
              items: [
                'Eerlijke vragen, ook "domme" beginnersvragen',
                'Delen van eigen fouten en lessons learned',
                'Cross-border Europese kennisdeling',
                'Constructieve feedback op system designs',
              ],
              color: 'border-accent-green/30',
            },
          ].map((rule) => (
            <div key={rule.title} className={`card border ${rule.color}`}>
              <p className="font-semibold text-text-primary mb-3">{rule.title}</p>
              <ul className="space-y-1.5">
                {rule.items.map((item) => (
                  <li key={item} className="text-xs text-text-secondary flex gap-2">
                    <span className={rule.color.includes('red') ? 'text-accent-red' : 'text-accent-green'}>
                      {rule.color.includes('red') ? '✗' : '✓'}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
