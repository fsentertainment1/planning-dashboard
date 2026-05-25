export default function DesignConcept() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="section-title">
          <span className="text-accent-orange">07.</span> Design Concept
        </h1>
        <p className="section-subtitle">
          Homepage concept, hero section, article layouts, membership UX, mobile en visuele hiërarchie.
        </p>
      </div>

      {/* Design philosophy */}
      <div className="highlight-box">
        <p className="text-sm font-mono text-accent-orange mb-2">DESIGN FILOSOFIE</p>
        <p className="text-text-secondary text-sm leading-relaxed">
          Engineering-first. Denk aan hoe d&b R1, Shure Wireless Workbench, of SMAART eruitzien —
          donker, functioneel, data-gedreven. Combineer dit met de editorial elegantie van Linear.app of
          Vercel.com. Het resultaat: een platform dat eruitziet alsof het gebouwd is door engineers voor engineers.
          Geen decoratieve elementen, geen onnodig wit, geen consumentistische early-2010s "music blog" vibes.
        </p>
      </div>

      {/* Homepage layout */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Homepage Concept
        </h2>
        <div className="space-y-4">
          {[
            {
              section: 'Hero',
              description: 'Full-width dark background met subtiel grid patroon (engineering graph paper). Grote headline: "Pro Audio Engineering — No Bullshit." Subheadline: "Deep technical content for system engineers, touring professionals and live sound specialists." Twee CTAs: "Start Reading (gratis)" en "Join Engineering Tier". Optioneel: geanimeerde frequency response curve of polar pattern als achtergrond-element.',
              height: '85-100vh',
              priority: '★★★★★',
            },
            {
              section: 'Featured Articles (3 columns)',
              description: 'Meest recente of meest gelezen artikelen. Kaarten met: category tag (oranje), leesfunctie-indicatie, titel, korte beschrijving, leestijd, premium badge indien van toepassing. Donkere kaarten met subtiele hover-glow in accent-orange.',
              height: 'Auto',
              priority: '★★★★★',
            },
            {
              section: 'Category Navigator',
              description: 'Horizontale scrollbare rij met alle content clusters als klikbare pills. "d&b Audiotechnik", "Dante", "RF Engineering", etc. Met artikel-tellersbadge. Snelle navigatie naar topical clusters.',
              height: 'Auto',
              priority: '★★★★☆',
            },
            {
              section: 'Membership CTA Block',
              description: 'Donkere kaart met drie tier-cards. Minimalistisch. Duidelijke prijzen, bullet benefits. Engineering tier highlighted met oranje border. Ghost Portal triggers vanuit de knoppen.',
              height: 'Auto',
              priority: '★★★★★',
            },
            {
              section: 'Latest Cases',
              description: 'Twee of drie meest recente case studies. Laat zien dat dit geen theoretisch platform is. Foto of illustratie van de productie, systeem-specs sidebar, link naar volledig case study.',
              height: 'Auto',
              priority: '★★★★☆',
            },
            {
              section: 'Newsletter CTA',
              description: 'Minimalistische band: "Join 3,000+ engineers. Weekly technical content, no spam." Email input + subscribe knop. Ghost Portal ingebouwd — werkt direct.',
              height: 'Auto',
              priority: '★★★★★',
            },
            {
              section: 'Footer',
              description: 'Vier kolommen: Navigation, Categories, FS Entertainment, Social/Legal. Donker, clean. Geen rommel. Copyright + "Built on Ghost" credit.',
              height: 'Auto',
              priority: '★★★☆☆',
            },
          ].map((s) => (
            <div key={s.section} className="card-sm flex gap-4">
              <div className="flex-shrink-0 w-32">
                <p className="font-semibold text-accent-orange text-sm">{s.section}</p>
                <p className="font-mono text-xs text-text-muted mt-1">{s.height}</p>
                <p className="text-xs text-accent-amber mt-1">{s.priority}</p>
              </div>
              <p className="text-text-muted text-xs leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Article layout */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Article Layout
        </h2>
        <div className="card">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-8">
              <div className="border border-base-400 rounded-lg p-4 bg-base-800 h-full">
                <p className="text-xs text-text-muted mb-2 font-mono">MAIN CONTENT COLUMN (75%)</p>
                <div className="space-y-3">
                  <div className="bg-base-600 rounded h-6 w-3/4" />
                  <div className="bg-base-600 rounded h-4 w-1/2" />
                  <div className="bg-accent-orange/20 border border-accent-orange/30 rounded h-32" />
                  <div className="space-y-2">
                    {[1,2,3].map(i => <div key={i} className="bg-base-600 rounded h-3 w-full" />)}
                    <div className="bg-base-600 rounded h-3 w-4/5" />
                  </div>
                  <div className="bg-base-600 rounded h-16" />
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <div className="border border-base-400 rounded-lg p-4 bg-base-800 h-full">
                <p className="text-xs text-text-muted mb-3 font-mono">SIDEBAR (25%)</p>
                <div className="space-y-3">
                  <div className="border border-accent-orange/30 bg-accent-orange/5 rounded-lg p-3">
                    <p className="text-xs text-accent-orange font-mono mb-1">TABLE OF CONTENTS</p>
                    {['Introduction', 'The Physics', 'Setup', 'Measurement', 'Tuning'].map((item) => (
                      <div key={item} className="text-xs text-text-muted py-0.5 border-l-2 border-base-500 pl-2 mb-1">{item}</div>
                    ))}
                  </div>
                  <div className="border border-base-400 rounded-lg p-3">
                    <p className="text-xs text-text-muted font-mono mb-2">RELATED ARTICLES</p>
                    {[1,2,3].map(i => <div key={i} className="bg-base-600 rounded h-3 mb-2" />)}
                  </div>
                  <div className="border border-accent-blue/30 bg-accent-blue/5 rounded-lg p-3">
                    <p className="text-xs text-accent-blue font-semibold">Engineering Tier</p>
                    <p className="text-xs text-text-muted mt-1">Get the d&b preset files for this setup</p>
                    <div className="bg-accent-orange rounded mt-2 h-6 text-center text-xs flex items-center justify-center text-white">
                      Upgrade →
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 text-xs text-text-muted">
            ↑ Artikel-layout: reading progress bar bovenaan, sticky TOC in sidebar, inline membership CTA na paywall-punt, related articles onderaan.
          </div>
        </div>
      </div>

      {/* Color & typography system */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Visueel Systeem (Live Preview)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Typography scale */}
          <div className="card">
            <p className="text-xs font-mono text-text-muted mb-4">TYPOGRAFIE SCHAAL</p>
            <div className="space-y-3">
              <div>
                <p className="text-3xl font-bold text-text-primary leading-tight">Display Heading</p>
                <p className="text-xs font-mono text-text-muted">36px / Bold / Inter</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-text-primary">Section Title</p>
                <p className="text-xs font-mono text-text-muted">24px / Semibold</p>
              </div>
              <div>
                <p className="text-lg font-medium text-text-primary">Article Title</p>
                <p className="text-xs font-mono text-text-muted">18px / Medium</p>
              </div>
              <div>
                <p className="text-base text-text-secondary leading-relaxed">Body text. Engineering content should be readable without eye strain. Good line height, optimal measure (65-75 chars).</p>
                <p className="text-xs font-mono text-text-muted">16px / Regular / line-height: 1.7</p>
              </div>
              <div>
                <p className="font-mono text-sm text-accent-green">code_block_text = 14px</p>
                <p className="text-xs font-mono text-text-muted">14px / JetBrains Mono</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Caption and metadata text</p>
                <p className="text-xs font-mono text-text-dim">12px / Regular / text-muted</p>
              </div>
            </div>
          </div>

          {/* Component examples */}
          <div className="card">
            <p className="text-xs font-mono text-text-muted mb-4">UI COMPONENTEN</p>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-text-muted mb-2">Buttons</p>
                <div className="flex gap-2 flex-wrap">
                  <button className="bg-accent-orange text-white px-4 py-2 rounded-lg text-sm font-semibold">Primary CTA</button>
                  <button className="border border-base-400 text-text-primary px-4 py-2 rounded-lg text-sm">Secondary</button>
                  <button className="bg-base-600 border border-base-400 text-text-secondary px-4 py-2 rounded-lg text-sm">Tertiary</button>
                </div>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-2">Tags & Badges</p>
                <div className="flex flex-wrap gap-2">
                  <span className="tag-orange">d&b Systems</span>
                  <span className="tag-blue">Dante</span>
                  <span className="tag-green">Tutorial</span>
                  <span className="tag-amber">Advanced</span>
                  <span className="tag-red">Premium</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-2">Alert Boxes</p>
                <div className="highlight-box py-2 px-3 mb-2">
                  <p className="text-xs text-text-secondary">Engineering note: Dit is een technische tip.</p>
                </div>
                <div className="warning-box py-2 px-3 mb-2">
                  <p className="text-xs text-text-secondary">Waarschuwing: Controleer polariteit voor inschakelen.</p>
                </div>
                <div className="info-box py-2 px-3">
                  <p className="text-xs text-text-secondary">Info: Dit geldt voor d&b ArrayCalc v10+.</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-2">Code Block</p>
                <pre className="code-block text-xs py-2 px-3">delay_ms = distance_m / 343 * 1000</pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile UX */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Mobile UX Principes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              principle: 'Bottom Navigation Bar',
              detail: 'Vaste bottom nav op mobile: Home, Articles, Academy, Community, Account. Engineers raadplegen het platform vaak op hun telefoon op stage of tijdens advances.',
            },
            {
              principle: 'Reading Experience First',
              detail: 'Maximale leeskolom breedte op mobile. Grote fonts (minimaal 16px). Geen sidebar op mobile — TOC als collapsible accordion bovenaan artikel.',
            },
            {
              principle: 'Offline Reading (PWA)',
              detail: 'Overweeg Progressive Web App configuratie voor service worker caching. Engineers in venues met slechte wifi kunnen eerder gelezen artikelen offline raadplegen.',
            },
            {
              principle: 'Dark Mode Only',
              detail: 'Platform is dark-mode by default. Geen light/dark toggle nodig — de engineering doelgroep werkt 90% in dark mode. Vermindert complexiteit.',
            },
          ].map((p) => (
            <div key={p.principle} className="card-sm">
              <p className="font-semibold text-accent-orange text-sm mb-2">{p.principle}</p>
              <p className="text-text-muted text-xs leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Design inspiration */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Design Inspiratie Referenties
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: 'Linear.app', aspect: 'Donker UI, engineering precision, snelheid', reason: 'Algemene dark UI esthetiek' },
            { name: 'Vercel.com', aspect: 'Typografie, witruimte, technical authority', reason: 'Tech editorial toon' },
            { name: 'd&b R1 Controller', aspect: 'Dark dashboard, oranje accenten, meetinstrument UI', reason: 'Direct van doelgroep-software' },
            { name: 'SMAART', aspect: 'Data-dense, dark, frequency domain visualisatie', reason: 'Engineers kennen dit al' },
            { name: 'Stripe.com', aspect: 'Pricing pages, CTA-hiërarchie, gradients', reason: 'Membership conversie UX' },
            { name: 'The Pudding', aspect: 'Scrollytelling, data visualisatie in editorial', reason: 'Content innovatie richting' },
            { name: 'Playbook.gg', aspect: 'Community + premium content', reason: 'Membership + community model' },
            { name: 'Oxide.computer', aspect: 'Engineering company brand, technische toon', reason: 'B2B tech branding referentie' },
          ].map((ref) => (
            <div key={ref.name} className="card-sm">
              <p className="font-semibold text-accent-orange text-sm mb-1">{ref.name}</p>
              <p className="text-xs text-accent-blue mb-1">{ref.reason}</p>
              <p className="text-xs text-text-muted leading-relaxed">{ref.aspect}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
