export default function Branding() {
  const brandNames = [
    {
      name: 'NullPoint',
      domain: 'nullpoint.pro / nullpoint.audio',
      concept: 'De null in een cardioid sub-opstelling — een perfecte inside-gag voor elke system engineer. Onmiddellijk herkenbaar in de niche, volledig uniek buiten de niche.',
      score: '★★★★★',
      type: 'AANBEVOLEN',
      scalable: 'Ja',
    },
    {
      name: 'SignalPath',
      domain: 'signalpath.eu / signalpath.audio',
      concept: 'Het traject van een audiosignaal van bron naar PA. Professioneel, beschrijvend, internationaal schaalbaar. Clean en premium.',
      score: '★★★★★',
      type: 'AANBEVOLEN',
      scalable: 'Ja',
    },
    {
      name: 'CoherentAudio',
      domain: 'coherentaudio.com / coherent.audio',
      concept: 'Wave coherentie is een kernbegrip in system engineering. Intelligent, technisch maar toegankelijk, premium uitstraling.',
      score: '★★★★☆',
      type: 'STERK',
      scalable: 'Ja',
    },
    {
      name: 'GroundPlane',
      domain: 'groundplane.eu / groundplane.audio',
      concept: 'RF engineering term (antenne grondvlak). Enorm niche, perfect voor RF/wireless doelgroep. Mysterieus en intrigerend voor buitenstaanders.',
      score: '★★★★☆',
      type: 'NICHE',
      scalable: 'Beperkt',
    },
    {
      name: 'SoundBench',
      domain: 'soundbench.eu / soundbench.pro',
      concept: 'Engineering workbench. Praktisch, hands-on gevoel. Engineers herkennen de werkbank als metafoor voor hun gereedschapskist.',
      score: '★★★★☆',
      type: 'STERK',
      scalable: 'Ja',
    },
    {
      name: 'LineArray.pro',
      domain: 'linearray.pro / linearray.eu',
      concept: 'Direct en beschrijvend. Toont onmiddellijk live sound focus. Risico: te beschrijvend, moeilijker te branden als platform dan als product.',
      score: '★★★☆☆',
      type: 'BESCHRIJVEND',
      scalable: 'Beperkt',
    },
    {
      name: 'dBField',
      domain: 'dbfield.eu / dbfield.pro',
      concept: 'Speelt op twee vlakken: decibel (dB) én de "field" van een PA systeem. Technisch, compact, memorabel.',
      score: '★★★★☆',
      type: 'STERK',
      scalable: 'Ja',
    },
    {
      name: 'SoundArchitect',
      domain: 'soundarchitect.eu / soundarchitect.pro',
      concept: 'Architectuur als metafoor voor system design. Premium, creatief, professioneel. Goed voor consulting/high-end positionering.',
      score: '★★★★☆',
      type: 'PREMIUM',
      scalable: 'Ja',
    },
    {
      name: 'TourGrid',
      domain: 'tourgrid.eu / tourgrid.pro',
      concept: 'Touring + grid (elektrisch/netwerk/stage grid). Modern en specifiek voor touring professionals.',
      score: '★★★☆☆',
      type: 'NICHE',
      scalable: 'Beperkt',
    },
    {
      name: 'FreqLab',
      domain: 'freqlab.eu / freqlab.pro',
      concept: 'Frequency Laboratory. Compact, modern, tech startup-achtig. Werkt goed voor measurement/tuning content.',
      score: '★★★★☆',
      type: 'STERK',
      scalable: 'Ja',
    },
    {
      name: 'PhasePoint',
      domain: 'phasepoint.eu / phasepoint.audio',
      concept: 'Phase als centraal begrip in system engineering. Technisch correct, clean branding potential.',
      score: '★★★☆☆',
      type: 'TECHNISCH',
      scalable: 'Ja',
    },
    {
      name: 'AudioSystems.eu',
      domain: 'audiosystems.eu',
      concept: 'Breed maar direct. Goed voor SEO, minder voor branding. Klinkt institutioneel.',
      score: '★★★☆☆',
      type: 'GENERIEK',
      scalable: 'Ja',
    },
    {
      name: 'RigSpec',
      domain: 'rigspec.eu / rigspec.pro',
      concept: 'Rig specifications. Compact technisch begrip. Goed voor touring/system tech doelgroep.',
      score: '★★★☆☆',
      type: 'NICHE',
      scalable: 'Beperkt',
    },
    {
      name: 'LiveBench',
      domain: 'livebench.eu / livebench.pro',
      concept: 'Live sound × engineering workbench. Praktisch, modern, duidelijk.',
      score: '★★★★☆',
      type: 'STERK',
      scalable: 'Ja',
    },
    {
      name: 'SubAlign',
      domain: 'subalign.pro / subalign.audio',
      concept: 'Sub alignment is een van de meest gezochte pro-audio topics. Ultraniche, maar extreem gericht. Beter als contentnaam dan merk.',
      score: '★★★☆☆',
      type: 'ULTRA-NICHE',
      scalable: 'Nee',
    },
    {
      name: 'DanteField',
      domain: 'dantefield.eu / dantefield.pro',
      concept: 'Dante network audio + field. Zeer specifiek voor de netwerk audio doelgroep. Risico op merk-conflict met Audinate.',
      score: '★★★☆☆',
      type: 'NICHE',
      scalable: 'Nee',
    },
    {
      name: 'SoundDesk.eu',
      domain: 'sounddesk.eu',
      concept: 'Klassieke mengdeskmetafoor, maar modern. Herkenbaar voor alle pro-audio engineers.',
      score: '★★★☆☆',
      type: 'KLASSIEK',
      scalable: 'Ja',
    },
    {
      name: 'WaveformPro',
      domain: 'waveformpro.eu / waveform.pro',
      concept: 'Waveform als universeel audiosymbool. Pro achtervoegsel maakt het positioneren. Risico: generiek.',
      score: '★★★☆☆',
      type: 'GENERIEK',
      scalable: 'Ja',
    },
    {
      name: 'StageSystems',
      domain: 'stagesystems.eu / stagesystems.pro',
      concept: 'Stage-systemen als kern. Breed en beschrijvend, maar mist brandingkracht.',
      score: '★★★☆☆',
      type: 'BESCHRIJVEND',
      scalable: 'Beperkt',
    },
    {
      name: 'AudioMesh',
      domain: 'audiomesh.eu / audiomesh.pro',
      concept: 'Network audio mesh topology. Modern, technisch, community-implicerend (mesh = netwerk van mensen).',
      score: '★★★★☆',
      type: 'STERK',
      scalable: 'Ja',
    },
    {
      name: 'EngineerFloor',
      domain: 'engineerfloor.eu',
      concept: 'Engineer at the floor level — hands-on, no-nonsense. Sterk voor community positionering.',
      score: '★★★★☆',
      type: 'COMMUNITY',
      scalable: 'Ja',
    },
    {
      name: 'SystemTech.eu',
      domain: 'systemtech.eu',
      concept: 'System technician als centrale rol. Direct, professioneel, maar riskeert te generiek te zijn voor tech/IT sector.',
      score: '★★★☆☆',
      type: 'BESCHRIJVEND',
      scalable: 'Beperkt',
    },
    {
      name: 'SoundCore',
      domain: 'soundcore.eu / soundcore.pro',
      concept: 'De kern van sound engineering. Solide, premium, internationaal. Let op: bestaand consumentenmerk Soundcore (Anker).',
      score: '★★☆☆☆',
      type: 'MERK-CONFLICT',
      scalable: 'Nee',
    },
    {
      name: 'RFMatrix',
      domain: 'rfmatrix.eu / rfmatrix.pro',
      concept: 'RF coördinatie matrix. Ultraniche voor wireless engineers. Perfect als categorie, te specifiek als merk.',
      score: '★★★☆☆',
      type: 'ULTRA-NICHE',
      scalable: 'Nee',
    },
    {
      name: 'LiveDocs',
      domain: 'livedocs.eu / livedocs.pro',
      concept: 'Live documentation platform voor engineers. Modern, tech-startup-achtig. Goed voor templates/downloads categorie.',
      score: '★★★★☆',
      type: 'MODERN',
      scalable: 'Ja',
    },
  ]

  const topPicks = brandNames.filter((b) => b.type === 'AANBEVOLEN')

  const colorPalettes = [
    {
      name: 'Engineering Dark',
      description: 'Primaire keuze — engineering software esthetiek, d&b-orange accent',
      colors: [
        { hex: '#060608', label: 'Base 950', role: 'Diepste achtergrond' },
        { hex: '#0F0F14', label: 'Base 800', role: 'Achtergrond' },
        { hex: '#161619', label: 'Base 700', role: 'Card bg' },
        { hex: '#252529', label: 'Base 500', label2: 'Border', role: 'Borders' },
        { hex: '#F97316', label: 'Orange', role: 'Primaire accent' },
        { hex: '#3B82F6', label: 'Blue', role: 'Technisch accent' },
        { hex: '#F1F5F9', label: 'White', role: 'Body tekst' },
        { hex: '#64748B', label: 'Slate', role: 'Muted tekst' },
      ],
      recommended: true,
    },
    {
      name: 'Terminal Green',
      description: 'Alternatief — CLI/terminal esthetiek, hacker energy',
      colors: [
        { hex: '#0A0F0A', label: 'Deep Green Black', role: 'Achtergrond' },
        { hex: '#111A11', label: 'Dark Green', role: 'Surface' },
        { hex: '#22C55E', label: 'Green', role: 'Primaire accent' },
        { hex: '#86EFAC', label: 'Light Green', role: 'Highlights' },
        { hex: '#F97316', label: 'Orange', role: 'Warnings/CTA' },
        { hex: '#E2E8F0', label: 'White', role: 'Tekst' },
      ],
      recommended: false,
    },
  ]

  const typography = [
    { name: 'Inter', role: 'Body & UI', rationale: 'Industriestandaard moderne sans-serif. Clean, technisch, uitmuntende leesbaarheid.' },
    { name: 'Neue Haas Grotesk / Aktiv Grotesk', role: 'Display headings', rationale: 'Premium feel. Gebruikt door Apple, Linear, etc. Betaald font, maar rechtvaardigt zich.' },
    { name: 'JetBrains Mono', role: 'Code blocks, cijfers', rationale: 'Developer-authentiek, engineering uitstraling. Gratis, open source.' },
    { name: 'Fallback: system-ui, -apple-system', role: 'Performance fallback', rationale: 'Altijd als backup definiëren voor laadperformance.' },
  ]

  return (
    <div className="space-y-10">
      <div>
        <h1 className="section-title">
          <span className="text-accent-orange">02.</span> Merk & Branding
        </h1>
        <p className="section-subtitle">
          25 merknaam-ideeën, domein-suggesties, branding richtingen, visuele identiteit en tone of voice.
        </p>
      </div>

      {/* Top picks */}
      <div className="highlight-box">
        <p className="text-sm font-mono text-accent-orange mb-3">TOP AANBEVELINGEN</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topPicks.map((b) => (
            <div key={b.name} className="bg-base-700 border border-accent-orange/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl font-bold text-accent-orange">{b.name}</span>
                <span className="tag-orange">{b.type}</span>
              </div>
              <p className="text-xs font-mono text-accent-amber mb-2">{b.domain}</p>
              <p className="text-text-muted text-xs leading-relaxed">{b.concept}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-base-600 rounded-lg">
          <p className="text-xs text-text-secondary">
            <span className="text-accent-orange font-semibold">Advies:</span> Ga voor{' '}
            <strong className="text-text-primary">NullPoint</strong> als primaire merknaam.
            Het is een authentieke inside-referentie die alleen iemand met echte d&b/sub ervaring begrijpt.
            Dit creëert onmiddellijk credibiliteit bij de doelgroep en is volledig uniek in de markt.
            Domain: <span className="font-mono text-accent-amber">nullpoint.pro</span>
          </p>
        </div>
      </div>

      {/* All 25 names */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Alle 25 Merknaam-ideeën
        </h2>
        <div className="overflow-x-auto rounded-xl border border-base-500">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Naam</th>
                <th>Domein</th>
                <th>Score</th>
                <th>Type</th>
                <th>Internationaal</th>
                <th>Concept</th>
              </tr>
            </thead>
            <tbody>
              {brandNames.map((b, i) => (
                <tr key={b.name}>
                  <td className="font-mono text-text-muted text-xs">{String(i + 1).padStart(2, '0')}</td>
                  <td className="font-semibold text-text-primary">{b.name}</td>
                  <td className="font-mono text-accent-amber text-xs">{b.domain}</td>
                  <td className="text-accent-amber text-xs">{b.score}</td>
                  <td>
                    <span
                      className={`tag text-xs ${
                        b.type === 'AANBEVOLEN'
                          ? 'tag-orange'
                          : b.type === 'STERK' || b.type === 'PREMIUM' || b.type === 'MODERN'
                          ? 'tag-blue'
                          : b.type === 'NICHE' || b.type === 'ULTRA-NICHE'
                          ? 'tag-amber'
                          : b.type === 'MERK-CONFLICT'
                          ? 'tag-red'
                          : 'tag-green'
                      }`}
                    >
                      {b.type}
                    </span>
                  </td>
                  <td className={b.scalable === 'Ja' ? 'text-accent-green text-xs' : 'text-accent-red/70 text-xs'}>{b.scalable}</td>
                  <td className="text-text-muted text-xs max-w-xs">{b.concept.substring(0, 80)}…</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Color palettes */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Kleurenpalet
        </h2>
        <div className="space-y-6">
          {colorPalettes.map((palette) => (
            <div key={palette.name} className={`card ${palette.recommended ? 'border-accent-orange/40' : ''}`}>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="font-semibold text-text-primary">{palette.name}</h3>
                {palette.recommended && <span className="tag-orange">AANBEVOLEN</span>}
              </div>
              <p className="text-text-muted text-xs mb-4">{palette.description}</p>
              <div className="flex flex-wrap gap-3">
                {palette.colors.map((c) => (
                  <div key={c.hex} className="flex flex-col items-center gap-1">
                    <div
                      className="w-12 h-12 rounded-lg border border-base-400"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-xs font-mono text-text-muted">{c.hex}</span>
                    <span className="text-xs text-text-dim text-center">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Typografie Systeem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {typography.map((t) => (
            <div key={t.name} className="card-sm">
              <p className="font-semibold text-accent-orange text-sm mb-1">{t.name}</p>
              <p className="text-xs font-mono text-accent-blue mb-2">{t.role}</p>
              <p className="text-text-muted text-xs leading-relaxed">{t.rationale}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tone of Voice */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Tone of Voice
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="h3 text-accent-green">✓ Wél zo schrijven</h3>
            <ul className="space-y-2">
              {[
                'Technisch correct — nooit vereenvoudigen ten koste van accuraatheid',
                'Direct en opinionated — geef echte meningen, geen "het hangt ervan af"',
                'Praktijkgericht — altijd verbonden aan real-world toepassing',
                'Peer-to-peer — schrijf als collega-engineer, niet als docent',
                'Cijfers en specificaties citeren waar relevant',
                'Toegeven als iets buiten scope valt of onduidelijk is',
                'Humor is ok — pro-audio heeft goede inside jokes',
              ].map((item) => (
                <li key={item} className="text-text-secondary text-sm flex items-start gap-2">
                  <span className="text-accent-green mt-0.5 flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="h3 text-accent-red">✗ Nooit zo schrijven</h3>
            <ul className="space-y-2">
              {[
                'Marketingtaal: "revolutionair", "game-changing", "powerful solution"',
                'Vage claims zonder technische onderbouwing',
                'Gear-fanboy gedrag (alle merken verdienen eerlijke behandeling)',
                'Clickbait headlines ("Je gelooft niet wat er gebeurt met...")',
                'Passief-agressief over concurrenten',
                'Overpromise op resultaten ("met deze tip klink je 50% beter")',
                'Jargon zonder uitleg voor context-appropriate audience',
              ].map((item) => (
                <li key={item} className="text-text-secondary text-sm flex items-start gap-2">
                  <span className="text-accent-red mt-0.5 flex-shrink-0">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Logo direction */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Logo Richting (voor NullPoint)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              concept: 'Polar Pattern Null',
              description:
                'Abstract polar pattern (cirkel met null punt aan één kant). Direct verwijzing naar cardioid sub null. Technisch correct, elegant.',
              preferred: true,
            },
            {
              concept: 'Typografisch',
              description:
                'Wordmark in Neue Haas Grotesk Bold. "NULL" in wit, "POINT" in accent-orange. Minimalistische punt (·) als scheidingsteken. Clean, modern, schaalbaar.',
              preferred: true,
            },
            {
              concept: 'Waveform Dot',
              description:
                'Gestileerde sinusgolf die convergeert naar een punt. Representeert phase cancellation / null point. Abstract maar betekenisvol voor engineers.',
              preferred: false,
            },
          ].map((l) => (
            <div key={l.concept} className={`card-sm ${l.preferred ? 'border-accent-orange/40' : ''}`}>
              <div className="flex items-center gap-2 mb-2">
                <p className="font-semibold text-text-primary text-sm">{l.concept}</p>
                {l.preferred && <span className="tag-orange text-xs">Voorkeur</span>}
              </div>
              <p className="text-text-muted text-xs leading-relaxed">{l.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
