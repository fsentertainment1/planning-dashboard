export default function Bonus() {
  const likelyFailures = [
    {
      failure: 'Te snel te veel willen',
      probability: 'ZEER HOOG',
      detail: 'Je start met 10 content-categorieën, een Discord, een YouTube kanaal, een podcast én een nieuwsbrief tegelijk. Alles wordt middelmatig. Beter: 1 kanaal perfect, dan uitbreiden.',
      fix: 'Kies 1 primaire content-format (geschreven artikelen), 1 distributiekanaal (email), 1 community-platform (Discord). Dat is het voor 6 maanden.',
    },
    {
      failure: 'Content kwaliteit degradeert door volume-druk',
      probability: 'HOOG',
      detail: 'Na 3 maanden voel je druk om te publiceren. Je schrijft een half-gedacht artikel om het "volume" bij te houden. Engineers doorprikken snel wat filler is.',
      fix: 'Liever 2 uitmuntende artikelen per maand dan 8 middelmatige. Kwaliteit is je moat. Volume is secondair.',
    },
    {
      failure: 'Community sterft door gebrek aan moderatie-energie',
      probability: 'GEMIDDELD',
      detail: 'Een Discord is makkelijk te starten, moeilijk levendig te houden. Zonder actieve eigenaar-aanwezigheid sterft een community snel.',
      fix: 'Wees elke dag 15 minuten aanwezig in Discord. Stel een vraag, reageer op posts. Zelfs kleine activiteit houdt het levend in de beginfase.',
    },
    {
      failure: 'SEO duurt langer dan verwacht',
      probability: 'HOOG',
      detail: 'Nieuwe sites duren 6-12 maanden voor significante organische traffic. Verwacht in maand 3 niet honderden bezoekers per dag via Google.',
      fix: 'LinkedIn en community zijn je vroege distributiekanalen. Plan budget voor 12 maanden content zonder SEO-ROI-verwachting.',
    },
    {
      failure: 'Membership churn hoger dan verwacht',
      probability: 'GEMIDDELD',
      detail: 'Engineers melden zich aan bij de launch maar cancellen na 2-3 maanden als er te weinig nieuwe content is die hun tier rechtvaardigt.',
      fix: 'Premium content plan 4-6 weken vooruit. Engineering tier altijd meer waard dan betaald. Maandelijkse Q&A is een sterke retentie-driver.',
    },
  ]

  const pitfalls = [
    { pitfall: 'Platform voelt als marketing voor FS Entertainment', solution: 'Strikte scheiding: platform-content is editorial-first. FS is één pagina, niet de focus. Vertrouwen komt vóór leads.' },
    { pitfall: 'Schrijven over dingen die je niet zelf hebt gedaan', solution: 'Schrijf alleen over ervaringen die je echt hebt. Engineers herkennen theoretische kennis onmiddellijk. Je echte cases zijn goud.' },
    { pitfall: 'Te brede niche kiezen om iedereen aan te spreken', solution: '"Pro audio voor iedereen" is nergens goed in. d&b system engineering is jouw niche. Verdedig die keuze ook als het smal voelt.' },
    { pitfall: 'Advertentiemateriaal vermomd als content', solution: 'Markeer gesponsorde content altijd duidelijk. Eén ongemarkeerde sponsorbijdrage vernietigt je editorial reputatie.' },
    { pitfall: 'Geen backup strategie tot het te laat is', solution: 'Dag 1: automatische backups instellen. Ghost-data verlies is existentieel voor een content-business.' },
    { pitfall: 'LinkedIn verwaarlozen als distribution channel', solution: 'LinkedIn is de meest directe weg naar B2B en professionals. Elke publicatie → LinkedIn post. Altijd.' },
  ]

  const underratedOpportunities = [
    {
      opp: 'Nederlandstalig content',
      detail: 'Er bestaat bijna geen hoogwaardige Nederlandstalige pro-audio content. Een categorie NL-artikelen trekt de volledige DACH/Benelux markt die in het Engels minder comfortabel is. Enorme first-mover kans.',
      potential: 'HOOG',
    },
    {
      opp: 'Freelance Engineer Database',
      detail: 'Een betaalde gids van gekwalificeerde freelance system engineers in Europa. Bedrijven zoeken dit, engineers willen gevonden worden. Enorme netwerkwaarde.',
      potential: 'HOOG',
    },
    {
      opp: 'Advance Document Templates',
      detail: 'Festival advance riders, tech spec sheets, FOH layout templates. Engineers zoeken actief naar herbruikbare documenten. Downloads zijn de easiest low-ticket product.',
      potential: 'GEMIDDELD',
    },
    {
      opp: 'Europese live sound kalender',
      detail: 'Geen enkel platform heeft een goede kalender van Europese festivals, tours en events voor de tech-community. Eenvoudig te bouwen, hoge engagement.',
      potential: 'GEMIDDELD',
    },
    {
      opp: 'AI-Powered RF Coordinator',
      detail: 'Een webgebaseerde tool die op basis van venue-locatie en band beschikbaarheid automatisch een frequentiecoördinatie doet. Iets wat engineers uren kost in 60 seconden. Hoog potentieel als tool.',
      potential: 'HOOG',
    },
    {
      opp: 'Equipment Database',
      detail: 'Een doorzoekbare database van PA-systeem specificaties (SPL, coverage angle, gewicht, etc.) vergelijkbaar met Apple\'s Spec Comparison tool. SEO-goudmijn.',
      potential: 'HOOG',
    },
  ]

  const viralPotential = [
    { title: '"Things FOH Engineers Say" — curated LinkedIn/Discord content', reason: 'Inside humor werkt viraal in niches. Engineers retweeten dit aan collega\'s.' },
    { title: '"d&b vs L-Acoustics vs Meyer: The Fully Unsponsored Comparison"', reason: 'Iedere pro-audio engineer heeft een mening. Discussie-bait die authentiek is.' },
    { title: '"What I Learned After Working 300 Festivals"', reason: 'Lessons-learned content presteert altijd goed op LinkedIn. Persoonlijk + praktisch.' },
    { title: '"Why Your Subs Sound Muddy: 5 Physics-Based Explanations"', reason: 'Antwoord op een universeel probleem, technisch onderbouwd. Hoog zoekvolume, deelbaar.' },
    { title: '"The Advanced Rider That Got Us Fired (And What We Learned)"', reason: 'Kwetsbaarheid + practisch advies = enorme engagement in engineer-communities.' },
    { title: '"Real-time Festival Setup Video" (YouTube Short serie)', reason: 'Time-lapses van PA-setup zijn fascinerend voor én buiten de industrie. Hoog YouTube-bereik.' },
    { title: '"Dante Network Fails: Real Horror Stories From Touring Engineers"', reason: 'Faalverhalen zijn universeel geliefd. Engineers voelen zich begrepen én leren ervan.' },
    { title: '"European System Engineers Under 30 To Watch"', reason: '"Awards" content wordt gedeeld door iedereen die genomineerd is — instant community-building.' },
  ]

  const differentiators = [
    'Enige engineering-first pro-audio platform in Europees eigendom en perspectief',
    'Eerste platform dat Ghost memberships combineert met pro-audio niche',
    'd&b Audiotechnik expertise is een unfair advantage — geen ander platform heeft dit als core focus',
    'FS Entertainment bewijst de expertise — je schrijft niet over theorie maar over shows die echt hebben plaatsgevonden',
    'Taal-voordeel: NL/EN bilinguaal content trekt Benelux+DACH market die US-platforms niet bereiken',
    'Network audio (Dante/AES67) als onderscheidend cluster — groeiende vraag, weinig supply',
    'Community-first: Ghost + Discord + YouTube is een compound moat die legacy forums niet kunnen evenaren',
  ]

  return (
    <div className="space-y-10">
      <div>
        <h1 className="section-title">
          <span className="text-accent-orange">13.</span> Bonus: Valkuilen & Kansen
        </h1>
        <p className="section-subtitle">
          Dingen die waarschijnlijk misgaan, valkuilen, onderschatte kansen, differentiators en viral content.
        </p>
      </div>

      {/* Likely failures */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Dingen Die Waarschijnlijk Misgaan
        </h2>
        <div className="space-y-3">
          {likelyFailures.map((f) => (
            <div key={f.failure} className="card warning-box border-0 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <span className={`tag text-xs ${f.probability === 'ZEER HOOG' ? 'tag-red' : f.probability === 'HOOG' ? 'tag-amber' : 'tag-blue'}`}>
                  {f.probability}
                </span>
                <p className="font-semibold text-text-primary text-sm">{f.failure}</p>
              </div>
              <p className="text-xs text-text-muted mb-2">{f.detail}</p>
              <p className="text-xs text-accent-green flex gap-2">
                <span className="flex-shrink-0">✓ Fix:</span>
                {f.fix}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pitfalls */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Valkuilen & Hoe Ze Te Vermijden
        </h2>
        <div className="overflow-x-auto rounded-xl border border-base-500">
          <table className="data-table">
            <thead>
              <tr>
                <th>Valkuil</th>
                <th>Oplossing</th>
              </tr>
            </thead>
            <tbody>
              {pitfalls.map((p) => (
                <tr key={p.pitfall}>
                  <td className="text-sm text-accent-red/80 font-medium">{p.pitfall}</td>
                  <td className="text-xs text-accent-green">{p.solution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Underrated opportunities */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Onderschatte Kansen
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {underratedOpportunities.map((o) => (
            <div key={o.opp} className="card-sm">
              <div className="flex items-center gap-2 mb-2">
                <p className="font-semibold text-accent-orange text-sm">{o.opp}</p>
                <span className={`tag text-xs ${o.potential === 'HOOG' ? 'tag-orange' : 'tag-amber'}`}>{o.potential}</span>
              </div>
              <p className="text-text-muted text-xs leading-relaxed">{o.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Differentiators */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Echte Differentiators (Moat)
        </h2>
        <div className="success-box">
          <ul className="space-y-2">
            {differentiators.map((d, i) => (
              <li key={i} className="text-sm text-text-secondary flex gap-3">
                <span className="text-accent-green font-bold flex-shrink-0">{i + 1}.</span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Viral content */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Content Die Waarschijnlijk Viral Gaat
        </h2>
        <div className="space-y-3">
          {viralPotential.map((v) => (
            <div key={v.title} className="card-sm flex gap-4">
              <span className="text-2xl flex-shrink-0">🚀</span>
              <div>
                <p className="font-semibold text-text-primary text-sm mb-1">"{v.title}"</p>
                <p className="text-text-muted text-xs leading-relaxed">{v.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final message */}
      <div className="card border-accent-orange/40 text-center py-8">
        <p className="text-3xl font-bold text-accent-orange mb-3">NullPoint</p>
        <p className="text-text-secondary text-base max-w-2xl mx-auto leading-relaxed mb-4">
          De naam die alleen iemand begrijpt die weet wat een cardioid subwoofer-null punt is.
          Dat is je doelgroep. Schrijf voor hen. Bouw voor hen. De markt is vrij, de timing is perfect,
          en de expertise is aanwezig.
        </p>
        <p className="text-text-muted text-sm">
          Stap 1: Registreer het domein. Vandaag. Nu.
        </p>
        <div className="flex justify-center gap-3 mt-4">
          <span className="tag-orange">nullpoint.pro</span>
          <span className="tag-blue">signalpath.eu</span>
          <span className="tag-green">coherentaudio.com</span>
        </div>
      </div>
    </div>
  )
}
