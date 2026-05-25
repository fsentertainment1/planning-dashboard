export default function RevenueModel() {
  const revenueStreams = [
    {
      stream: 'Membership Subscriptions',
      tier: 'Professional (€9/mnd)',
      potential_12m: '€500-2000/mnd',
      recurring: true,
      effort: 'Laag',
      priority: '★★★★★',
      notes: 'Primaire recurring revenue. Target: 50-200 paying members jaar 1.',
    },
    {
      stream: 'Membership Subscriptions',
      tier: 'Engineering (€29/mnd)',
      potential_12m: '€290-2900/mnd',
      recurring: true,
      effort: 'Laag',
      priority: '★★★★★',
      notes: 'High-value tier. Target: 10-100 paying members jaar 1.',
    },
    {
      stream: 'One-time Courses',
      tier: 'Academy Courses (€97-497)',
      potential_12m: '€500-3000/mnd',
      recurring: false,
      effort: 'Hoog (produceren)',
      priority: '★★★★☆',
      notes: 'Jaar 2 focus. System Engineering Course (€297), d&b Deep Dive (€197), Dante Masterclass (€147).',
    },
    {
      stream: 'Downloads / Tools',
      tier: 'Premium Templates (€7-47)',
      potential_12m: '€100-500/mnd',
      recurring: false,
      effort: 'Laag',
      priority: '★★★☆☆',
      notes: 'RF coordination sheets, advance rider templates, Dante worksheets. Lage prijs, passief na productie.',
    },
    {
      stream: 'Consulting',
      tier: 'System Design Consulting (€150-300/u)',
      potential_12m: '€500-3000/mnd',
      recurring: false,
      effort: 'Hoog',
      priority: '★★★★☆',
      notes: 'Platform-autoriteit rechtvaardigt premium tarieven. Tech rider review, venue system design.',
    },
    {
      stream: 'FS Entertainment Leads',
      tier: 'Rental & Live Production',
      potential_12m: '€2000-10000/mnd extra',
      recurring: false,
      effort: 'Laag (indirect)',
      priority: '★★★★★',
      notes: 'Moeilijk te meten maar waarschijnlijk grootste ROI. Platform = 5-10 extra gekwalificeerde leads/maand.',
    },
    {
      stream: 'Sponsorships',
      tier: 'Industry Partners',
      potential_12m: '€500-2000/mnd',
      recurring: true,
      effort: 'Gemiddeld',
      priority: '★★★☆☆',
      notes: 'Pas mogelijk na 20K+ maandelijkse bezoekers. Partners: Shure, Sennheiser, DiGiCo, enz.',
    },
    {
      stream: 'Affiliate Marketing',
      tier: 'Gear Affiliate Links',
      potential_12m: '€100-500/mnd',
      recurring: true,
      effort: 'Laag',
      priority: '★★★☆☆',
      notes: 'Thomann (6%), Bax Music, Sweetwater. Gear review en comparison content. Passief na plaatsing.',
    },
    {
      stream: 'Workshops',
      tier: 'Online/In-Person Workshops',
      potential_12m: '€500-2000/event',
      recurring: false,
      effort: 'Hoog',
      priority: '★★★☆☆',
      notes: 'Jaar 2-3. Live d&b system workshop, Dante masterclass op locatie. Reputatie-builder + revenue.',
    },
  ]

  const scenarios = [
    {
      name: 'Conservatief',
      month12: {
        professional_members: 40,
        engineering_members: 10,
        consulting: '€500',
        affiliate: '€100',
        fs_extra_leads: 2,
        total: '~€760/mnd',
      },
      color: 'text-accent-blue',
    },
    {
      name: 'Realistisch',
      month12: {
        professional_members: 120,
        engineering_members: 35,
        consulting: '€1500',
        affiliate: '€300',
        fs_extra_leads: 6,
        total: '~€3600/mnd',
      },
      color: 'text-accent-green',
    },
    {
      name: 'Optimistisch',
      month12: {
        professional_members: 300,
        engineering_members: 80,
        consulting: '€3000',
        affiliate: '€700',
        fs_extra_leads: 12,
        total: '~€9700/mnd',
      },
      color: 'text-accent-orange',
    },
  ]

  const pricingPhilosophy = [
    { point: 'Europese pricing', detail: 'EUR pricing is essentieel voor EU-markt. Geen dollar-pricing die buitenlands aanvoelt.' },
    { point: 'Jaarlijkse korting', detail: '€9/mnd vs €79/jaar (27% korting) en €29/mnd vs €249/jaar (29% korting). Jaarplannen geven cashflow en reduceren churn.' },
    { point: 'iDEAL & SEPA', detail: 'Stripe ondersteunt iDEAL (NL) en SEPA direct debit. Essentieel voor Nederlandse markt.' },
    { point: 'Free tier als lead magnet', detail: 'Nooit paywallen voor content die Google indexeert. Gratis membership = email + conversie loop.' },
    { point: 'Pricing jaarlijks herzien', detail: 'Na jaar 1 met data: is er ruimte voor prijsverhoging? Engineering tier kan naar €39 groeien als waarde bewezen is.' },
  ]

  const funnels = [
    {
      name: 'SEO Funnel',
      steps: ['Google zoekt "d&b cardioid setup"', 'Landt op pillar article', 'Leest 60% → paywall', 'Newsletter popup of member wall', 'Sign up Free → 14 dagen later Professional'],
      conversion: '2-5% Google → email, 3-8% email → paid',
    },
    {
      name: 'Community Funnel',
      steps: ['LinkedIn post of YouTube video', 'Naar website', 'Sign up Free (community toegang)', 'Discord actief → ziet premium kanalen', 'Upgrade Engineering voor community access'],
      conversion: '10-20% community member → Professional',
    },
    {
      name: 'B2B Lead Funnel',
      steps: ['Zoekt "d&b systeem huren Nederland"', 'Landt op cases of rentals pagina', 'Ziet expertise bewijs (artikelen, cases)', 'Vertrouwen hoog → offerte aanvragen', 'FS Entertainment lead met premium pricing'],
      conversion: '5-15% rental page → offerte',
    },
  ]

  return (
    <div className="space-y-10">
      <div>
        <h1 className="section-title">
          <span className="text-accent-orange">08.</span> Verdienmodel
        </h1>
        <p className="section-subtitle">
          Meerdere revenue streams, funnels, pricing strategie, upsells en projecties voor jaar 1-3.
        </p>
      </div>

      {/* Revenue streams table */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Revenue Streams Overzicht
        </h2>
        <div className="overflow-x-auto rounded-xl border border-base-500">
          <table className="data-table">
            <thead>
              <tr>
                <th>Stream</th>
                <th>Product/Tier</th>
                <th>Potentieel (Maand 12)</th>
                <th>Recurring</th>
                <th>Effort</th>
                <th>Prioriteit</th>
              </tr>
            </thead>
            <tbody>
              {revenueStreams.map((r, i) => (
                <tr key={i}>
                  <td className="font-medium text-text-primary text-sm">{r.stream}</td>
                  <td className="text-xs text-accent-amber">{r.tier}</td>
                  <td className="font-mono text-accent-green text-sm font-semibold">{r.potential_12m}</td>
                  <td>{r.recurring ? <span className="tag-green text-xs">Ja</span> : <span className="text-text-muted text-xs">Eenmalig</span>}</td>
                  <td className="text-xs text-text-muted">{r.effort}</td>
                  <td className="text-accent-amber text-xs">{r.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue projections */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> 12-Maanden Revenue Scenarios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map((s) => (
            <div key={s.name} className="card">
              <p className={`text-lg font-bold mb-3 ${s.color}`}>{s.name}</p>
              <div className="space-y-2 mb-4">
                {[
                  { label: 'Professional leden', value: `${s.month12.professional_members} × €9 = €${s.month12.professional_members * 9}/mnd` },
                  { label: 'Engineering leden', value: `${s.month12.engineering_members} × €29 = €${s.month12.engineering_members * 29}/mnd` },
                  { label: 'Consulting', value: s.month12.consulting + '/mnd' },
                  { label: 'Affiliate', value: s.month12.affiliate + '/mnd' },
                  { label: 'FS extra leads', value: `+${s.month12.fs_extra_leads} leads/mnd` },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-xs">
                    <span className="text-text-muted">{row.label}</span>
                    <span className="text-text-secondary font-mono">{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-base-500 pt-3">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-text-primary">Platform Total</span>
                  <span className={`font-bold font-mono text-lg ${s.color}`}>{s.month12.total}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="info-box mt-4">
          <p className="text-xs text-text-secondary">
            <span className="text-accent-blue font-semibold">Noot:</span> FS Entertainment leads zijn niet meegeteld in platform revenue maar zijn waarschijnlijk de grootste ROI-driver.
            5-10 extra gekwalificeerde leads per maand met 30% hogere sluitingskans en premium pricing = €5000-20000+ extra omzet per maand voor FS Entertainment.
          </p>
        </div>
      </div>

      {/* Sales funnels */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Conversie Funnels
        </h2>
        <div className="space-y-4">
          {funnels.map((f) => (
            <div key={f.name} className="card">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-text-primary">{f.name}</p>
                <span className="tag-green text-xs">{f.conversion}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {f.steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`rounded px-3 py-1.5 text-xs border max-w-40 ${
                      i === 0 ? 'bg-base-600 border-base-400 text-text-secondary' :
                      i === f.steps.length - 1 ? 'bg-accent-orange/10 border-accent-orange/30 text-accent-orange' :
                      'bg-base-600 border-base-400 text-text-muted'
                    }`}>
                      {step}
                    </div>
                    {i < f.steps.length - 1 && <span className="text-accent-orange">→</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing philosophy */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Pricing Filosofie
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pricingPhilosophy.map((p) => (
            <div key={p.point} className="card-sm">
              <p className="font-semibold text-accent-orange text-sm mb-1">{p.point}</p>
              <p className="text-text-muted text-xs leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upsell matrix */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Upsell Ladder
        </h2>
        <div className="card overflow-x-auto">
          <div className="flex items-end gap-2 min-w-max">
            {[
              { level: 'Bezoeker', value: '€0', desc: 'Gratis artikel lezer', next: 'Email CTA' },
              { level: 'Free Member', value: '€0', desc: 'Nieuwsbrief subscriber', next: '14-dag sequence' },
              { level: 'Professional', value: '€9/mnd', desc: 'Betaald lid', next: 'Engineering pitch maand 2' },
              { level: 'Engineering', value: '€29/mnd', desc: 'Power user', next: 'Course upsell' },
              { level: 'Course Buyer', value: '+€97-497', desc: 'Eenmalige aankoop', next: 'Consulting pitch' },
              { level: 'Consulting Client', value: '€150-300/u', desc: 'High-value relatie', next: 'Agency/retainer' },
            ].map((rung, i) => (
              <div key={rung.level} className="flex flex-col items-center gap-1">
                <div
                  className={`rounded-lg px-3 py-3 text-center border ${
                    i === 0 ? 'bg-base-700 border-base-500 w-28' :
                    i === 1 ? 'bg-base-600 border-base-400 w-28' :
                    i === 2 ? 'bg-accent-blue/10 border-accent-blue/30 w-32' :
                    i === 3 ? 'bg-accent-orange/10 border-accent-orange/30 w-32' :
                    'bg-accent-amber/10 border-accent-amber/30 w-36'
                  }`}
                >
                  <p className="text-xs font-semibold text-text-primary mb-1">{rung.level}</p>
                  <p className={`text-sm font-bold font-mono ${i >= 2 ? 'text-accent-orange' : 'text-text-muted'}`}>{rung.value}</p>
                  <p className="text-xs text-text-muted mt-1">{rung.desc}</p>
                </div>
                {i < 5 && (
                  <div className="text-center">
                    <p className="text-accent-orange text-lg">↑</p>
                    <p className="text-xs text-text-dim w-20 text-center">{rung.next}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
