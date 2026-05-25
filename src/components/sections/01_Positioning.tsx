export default function Positioning() {
  const competitors = [
    {
      name: 'Production Expert',
      origin: 'UK',
      focus: 'Studio, post-productie, hybride live',
      traffic: '~400K/maand',
      weakness: 'UK-centisch, weinig live touring diepgang, te breed',
      opportunity: 'Europese live sound niche is open',
    },
    {
      name: 'ProSoundWeb',
      origin: 'VS',
      focus: 'Live sound, installatie, touring',
      traffic: '~300K/maand',
      weakness: 'Amerikaans, verouderd design, forum-gedreven, geen moderne UX',
      opportunity: 'Modern platform met EU-focus kan dit overtreffen',
    },
    {
      name: 'SoundOnSound',
      origin: 'UK',
      focus: 'Studio, consument, gear reviews',
      traffic: '~600K/maand',
      weakness: 'Niet voor engineers, consumentgericht',
      opportunity: 'Engineering-first positionering is volledig vrij',
    },
    {
      name: 'FrontOfHouse Magazine',
      origin: 'VS',
      focus: 'Live events, touring, installatie',
      traffic: '~80K/maand',
      weakness: 'Trade magazine model, geen community, geen premium content',
      opportunity: 'Community + membership model is leeg',
    },
    {
      name: 'd&b Audiotechnik Training',
      origin: 'DE',
      focus: 'd&b systemen specifiek',
      traffic: 'Intern/brand',
      weakness: 'Merk-gebonden, geen neutrale content',
      opportunity: 'Onafhankelijk d&b expert platform is uniek',
    },
    {
      name: 'Meyer Sound University',
      origin: 'VS',
      focus: 'Meyer Sound ecosysteem',
      traffic: 'Intern/brand',
      weakness: 'Brand-locked, geen community',
      opportunity: 'Multi-brand engineering perspectief',
    },
  ]

  const audiences = [
    {
      segment: 'System Engineers',
      size: 'Klein maar high-value',
      pain: 'Geen goed Europees kennisplatform, d&b/L-ISA/Dante kennis verspreid',
      willingness: 'Hoog — tools die hun werk beter maken',
      priority: '★★★★★',
    },
    {
      segment: 'FOH / Monitor Engineers',
      size: 'Groot, freelance',
      pain: 'Geen structured learning path, tips verspreid over YouTube/forums',
      willingness: 'Gemiddeld-hoog',
      priority: '★★★★☆',
    },
    {
      segment: 'Touring Technicians',
      size: 'Middelgroot',
      pain: 'Geen community, isolement, workflow kennis fragmentarisch',
      willingness: 'Gemiddeld',
      priority: '★★★★☆',
    },
    {
      segment: 'AV Rental Bedrijven (NL/EU)',
      size: 'Middelgroot B2B',
      pain: 'Geen shared resources, recruitment moeilijk, geen standaard workflows',
      willingness: 'Hoog voor B2B lead gen',
      priority: '★★★★★',
    },
    {
      segment: 'Production Managers',
      size: 'Groot',
      pain: 'Willen tech begrijpen voor betere communicatie met engineers',
      willingness: 'Gemiddeld, cursusbereid',
      priority: '★★★☆☆',
    },
    {
      segment: 'Studenten HBO/conservatorium',
      size: 'Groot, laag budget',
      pain: 'Geen praktijkgericht EU-platform, US content niet altijd relevant',
      willingness: 'Laag (betalen), hoog (traffic/community)',
      priority: '★★★☆☆',
    },
    {
      segment: 'Festival & Venue Technicians',
      size: 'Groot, seizoensgebonden',
      pain: 'Geen dedicated resource voor festival workflows',
      willingness: 'Gemiddeld',
      priority: '★★★★☆',
    },
  ]

  const advantages = [
    {
      advantage: 'Echte praktijkervaring',
      detail:
        'FS Entertainment levert real-world case studies, geen theoretische content. Engineers herkennen dit onmiddellijk.',
    },
    {
      advantage: 'Europese markt timing',
      detail:
        'De pro-audio markt in Europa groeit (Freiheit Festival, Primavera, Amsterdam Dance Event etc). Geen dominant EU platform bestaat.',
    },
    {
      advantage: 'd&b Audiotechnik specialisatie',
      detail:
        'd&b is Duits merk, dominant in Europa, maar heeft geen dedicated community platform buiten hun eigen training. Enorme niche.',
    },
    {
      advantage: 'Taalstrategie',
      detail:
        'Start in het Engels (global SEO), maar Dutch/Belgian markt als testbed en early adopter community. Unieke positie.',
    },
    {
      advantage: 'Dante/Network Audio expertise',
      detail:
        'AV-over-IP explodeert. Weinig platforms beheersen de snijvlak live sound × IT. Dit is een clear differentiator.',
    },
    {
      advantage: 'FS Entertainment als lead engine',
      detail:
        'Elke autoriteitsartikel is impliciet bewijs van expertise voor rental leads. Platform versterkt business, business versterkt platform.',
    },
    {
      advantage: 'Ghost CMS first-mover',
      detail:
        'Geen enkel serieus pro-audio platform gebruikt Ghost memberships goed. De UX is superieur aan legacy forum-platforms.',
    },
  ]

  const risks = [
    {
      risk: 'Content volume vereiste',
      level: 'HOOG',
      mitigation:
        'Start met 20 pillar articles van topkwaliteit, niet 100 middelmatige. Kwaliteit > kwantiteit in niche SEO.',
    },
    {
      risk: 'Lange SEO aanlooptijd',
      level: 'HOOG',
      mitigation:
        '6-12 maanden voor organisch verkeer. Overbruggen met LinkedIn, YouTube, en community building.',
    },
    {
      risk: 'Community koude start',
      level: 'GEMIDDELD',
      mitigation:
        'Start met persoonlijk netwerk, industry partnerships, en Discord invite campaigns.',
    },
    {
      risk: 'Tijdsinvestering vs FS Entertainment werk',
      level: 'HOOG',
      mitigation:
        'Strikte tijdsblokken. Platform-content kan deels worden gemaakt vanuit bestaand werk (case studies, projecten).',
    },
    {
      risk: 'Concurrentie van grote spelers',
      level: 'LAAG',
      mitigation:
        'Production Expert en ProSoundWeb zitten niet in jouw niche. Zelfs als ze proberen, jij hebt de EU-expertise.',
    },
    {
      risk: 'Monitisering te vroeg pushen',
      level: 'GEMIDDELD',
      mitigation:
        'Bouw 12 maanden autoriteit, dan pas agressief monetizen. Trust first, revenue second.',
    },
  ]

  return (
    <div className="space-y-10">
      <div>
        <h1 className="section-title">
          <span className="text-accent-orange">01.</span> Positionering
        </h1>
        <p className="section-subtitle">
          Strategische marktanalyse, doelgroep, concurrentie en unieke positie in de Europese pro-audio markt.
        </p>
      </div>

      {/* Core positioning statement */}
      <div className="highlight-box">
        <p className="text-sm font-mono text-accent-orange mb-1">KERN POSITIONERING</p>
        <p className="text-lg font-semibold text-text-primary leading-relaxed">
          Het eerste engineering-first pro-audio platform vanuit Europa — voor system engineers, touring
          technicians en live production professionals die dieper willen dan YouTube tutorials en
          generieke gear-reviews.
        </p>
        <p className="text-text-secondary text-sm mt-2">
          Niet een verhuurbedrijf met een blog. Een onafhankelijk kennisplatform dat toevallig ook
          verhuurt.
        </p>
      </div>

      {/* Concurrentieanalyse */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Concurrentieanalyse
        </h2>
        <div className="overflow-x-auto rounded-xl border border-base-500">
          <table className="data-table">
            <thead>
              <tr>
                <th>Platform</th>
                <th>Origin</th>
                <th>Focus</th>
                <th>Traffic</th>
                <th>Zwakte</th>
                <th>Jouw kans</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c) => (
                <tr key={c.name}>
                  <td className="font-medium text-text-primary">{c.name}</td>
                  <td>
                    <span className="pill">{c.origin}</span>
                  </td>
                  <td>{c.focus}</td>
                  <td className="font-mono text-accent-amber text-xs">{c.traffic}</td>
                  <td className="text-accent-red/80 text-xs">{c.weakness}</td>
                  <td className="text-accent-green text-xs">{c.opportunity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-text-muted text-xs mt-3 italic">
          Conclusie: De Europese live engineering niche is volledig open. Geen enkel platform combineert
          diepgaande technische content + modern platform + EU-focus + community.
        </p>
      </div>

      {/* Doelgroepen */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Doelgroep Segmentatie
        </h2>
        <div className="overflow-x-auto rounded-xl border border-base-500">
          <table className="data-table">
            <thead>
              <tr>
                <th>Segment</th>
                <th>Marktgrootte</th>
                <th>Pain Point</th>
                <th>Betalingsbereidheid</th>
                <th>Prioriteit</th>
              </tr>
            </thead>
            <tbody>
              {audiences.map((a) => (
                <tr key={a.segment}>
                  <td className="font-medium text-text-primary">{a.segment}</td>
                  <td className="text-xs">{a.size}</td>
                  <td className="text-xs text-text-muted">{a.pain}</td>
                  <td className="text-xs">{a.willingness}</td>
                  <td className="text-accent-amber font-mono text-sm">{a.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Unfair Advantages */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Unfair Advantages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {advantages.map((a) => (
            <div key={a.advantage} className="card-sm">
              <p className="font-semibold text-accent-orange text-sm mb-1">{a.advantage}</p>
              <p className="text-text-muted text-xs leading-relaxed">{a.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Risico's */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Risico-matrix
        </h2>
        <div className="space-y-3">
          {risks.map((r) => (
            <div key={r.risk} className="card-sm flex gap-4">
              <div className="flex-shrink-0">
                <span
                  className={`tag ${
                    r.level === 'HOOG'
                      ? 'tag-red'
                      : r.level === 'GEMIDDELD'
                      ? 'tag-amber'
                      : 'tag-green'
                  }`}
                >
                  {r.level}
                </span>
              </div>
              <div>
                <p className="font-medium text-text-primary text-sm mb-1">{r.risk}</p>
                <p className="text-text-muted text-xs leading-relaxed">{r.mitigation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Markt context */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Nederlandse & Europese Markt Context
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              metric: '~€2.8B',
              label: 'Europese pro-audio markt (2024)',
              sub: 'CAGR ~6.2% verwacht tot 2029',
              color: 'text-accent-green',
            },
            {
              metric: '~4,200',
              label: 'AV/audio bedrijven in NL+BE',
              sub: 'Potentiële B2B leads voor FS Entertainment',
              color: 'text-accent-blue',
            },
            {
              metric: '~18,000',
              label: 'Professionele live engineers EU',
              sub: 'Core audience voor platform membership',
              color: 'text-accent-orange',
            },
          ].map((s) => (
            <div key={s.metric} className="card text-center">
              <p className={`text-4xl font-bold font-mono mb-1 ${s.color}`}>{s.metric}</p>
              <p className="text-text-primary text-sm font-medium mb-1">{s.label}</p>
              <p className="text-text-muted text-xs">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="success-box">
        <p className="text-sm font-semibold text-accent-green mb-1">Bottom Line</p>
        <p className="text-text-secondary text-sm leading-relaxed">
          De timing is perfect. Europese pro-audio groeit. Bestaande platforms zijn Amerikaans, verouderd,
          of te breed. Jouw combinatie van echte expertise, d&b specialisatie, en EU-roots is een
          defensieve moat die grote spelers niet makkelijk kunnen kopiëren. Het risico is niet de
          concurrentie — het risico is consistent blijven publiceren de eerste 12 maanden.
        </p>
      </div>
    </div>
  )
}
