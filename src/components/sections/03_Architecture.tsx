export default function SiteArchitecture() {
  const siteMap = [
    {
      path: '/',
      name: 'Homepage',
      purpose: 'Authority landing, latest content, membership CTA',
      seo: 'Brand + "pro audio engineering platform"',
      cta: 'Start gratis → nieuwsbrief + free membership',
    },
    {
      path: '/articles/',
      name: 'Articles Hub',
      purpose: 'Alle engineering artikelen, gefilterd per categorie',
      seo: 'Category landing pages met hoog zoekvolume',
      cta: 'Lees meer → premium teaser → member CTA',
    },
    {
      path: '/articles/[slug]/',
      name: 'Article Detail',
      purpose: 'Enkel artikel, diepgaande engineering content',
      seo: 'Long-tail keywords, featured snippets',
      cta: 'Newsletter subscribe, premium upsell, Discord invite',
    },
    {
      path: '/academy/',
      name: 'Academy Hub',
      purpose: 'Gestructureerde leertrajecten, cursussen',
      seo: '"learn [topic] pro audio", "d&b course"',
      cta: 'Enroll nu → premium of paid course',
    },
    {
      path: '/academy/[course-slug]/',
      name: 'Course/Module',
      purpose: 'Gestructureerde cursusinhoud, gated behind membership',
      seo: 'Course-specifieke keywords',
      cta: 'Upgrade to Engineering tier',
    },
    {
      path: '/tools/',
      name: 'Tools & Calculators',
      purpose: 'Sub delay calculator, RF coordinator, Dante latency calc',
      seo: '"sub delay calculator", "dante latency calculator"',
      cta: 'Gratis basic, premium uitgebreide versie',
    },
    {
      path: '/downloads/',
      name: 'Downloads Library',
      purpose: 'Templates, presets, checklists, worksheets',
      seo: '"advance tech rider template", "dante network worksheet"',
      cta: 'Free downloads voor members, premium voor Engineering tier',
    },
    {
      path: '/cases/',
      name: 'Case Studies',
      purpose: 'Real-world FS Entertainment projecten als bewijs',
      seo: '"d&b system design case study", "festival audio case"',
      cta: 'Lead gen: "soortgelijk project? → offerte aanvragen"',
    },
    {
      path: '/rentals/',
      name: 'Rental / FS Entertainment',
      purpose: 'Verhuurbedrijf presentatie, portfoliolijst, contact',
      seo: '"d&b verhuur nederland", "line array huren"',
      cta: 'Offerte aanvragen → leads',
    },
    {
      path: '/membership/',
      name: 'Membership Page',
      purpose: 'Tier vergelijking, pricing, FAQ, sociale bewijskracht',
      seo: '"pro audio membership", "engineering community"',
      cta: 'Join nu → Ghost Portal',
    },
    {
      path: '/community/',
      name: 'Community Hub',
      purpose: 'Discord link, community richtlijnen, featured members',
      seo: '"pro audio community europe"',
      cta: 'Join Discord → premium community upgrade',
    },
    {
      path: '/newsletter/',
      name: 'Newsletter Landing',
      purpose: 'Dedicated inschrijfpagina met waardepropositie',
      seo: '"pro audio newsletter", "live sound tips"',
      cta: 'Subscribe gratis',
    },
    {
      path: '/consulting/',
      name: 'Consulting',
      purpose: 'System design consulting, tech rider review, advies',
      seo: '"audio system design consultant europe"',
      cta: 'Boek een intake gesprek',
    },
    {
      path: '/events/',
      name: 'Events & Webinars',
      purpose: 'Aankomende live Q&As, webinars, workshops',
      seo: 'Evenement-specifieke zoekwoorden',
      cta: 'Registreer / stream live',
    },
    {
      path: '/author/[slug]/',
      name: 'Author Profile',
      purpose: 'E-E-A-T signaling, expertise demonstratie',
      seo: 'Author credibility voor Google',
      cta: 'Volg schrijver, zie meer artikelen',
    },
    {
      path: '/tags/[tag]/',
      name: 'Tag Pages',
      purpose: 'Topical cluster landing pages',
      seo: '"dante audio", "d&b audiotechnik", "smaart workflow"',
      cta: 'Browse related articles',
    },
  ]

  const categories = [
    { name: 'System Engineering', slug: 'system-engineering', icon: '⚡', articles: '20+', priority: 'Pillar' },
    { name: 'd&b Audiotechnik', slug: 'db-audiotechnik', icon: '🔊', articles: '15+', priority: 'Pillar' },
    { name: 'Dante & Network Audio', slug: 'dante-network', icon: '🌐', articles: '15+', priority: 'Pillar' },
    { name: 'RF Engineering', slug: 'rf-engineering', icon: '📡', articles: '12+', priority: 'Core' },
    { name: 'SMAART & Measurement', slug: 'smaart-measurement', icon: '📊', articles: '10+', priority: 'Core' },
    { name: 'Festival Workflows', slug: 'festival-workflows', icon: '🎪', articles: '10+', priority: 'Core' },
    { name: 'FOH Engineering', slug: 'foh-engineering', icon: '🎛️', articles: '12+', priority: 'Core' },
    { name: 'Sub Systems', slug: 'sub-systems', icon: '🔉', articles: '10+', priority: 'Core' },
    { name: 'Touring Systems', slug: 'touring-systems', icon: '🚛', articles: '8+', priority: 'Growth' },
    { name: 'Signal Processing', slug: 'signal-processing', icon: '〜', articles: '8+', priority: 'Growth' },
    { name: 'Gear Reviews', slug: 'gear-reviews', icon: '🎚️', articles: '10+', priority: 'Growth' },
    { name: 'Career & Business', slug: 'career-business', icon: '💼', articles: '6+', priority: 'Support' },
    { name: 'Troubleshooting', slug: 'troubleshooting', icon: '🔧', articles: '8+', priority: 'SEO-high' },
    { name: 'Academy', slug: 'academy', icon: '🎓', articles: '20+', priority: 'Premium' },
  ]

  const userFlows = [
    {
      persona: 'System Engineer zoekt info',
      flow: [
        'Google: "d&b cardioid sub alignment"',
        'Landt op artikel /articles/cardioid-sub-setup/',
        'Leest 80% → premium paywall teaser',
        'Ziet newsletter CTA → inschrijven',
        'Ontvangt welkomstmail + 3 premium previews',
        'Upgrade naar Professional tier na 2 weken',
      ],
      conversion: 'Organisch → Email → Paid member',
    },
    {
      persona: 'Rental bedrijf zoekt gear',
      flow: [
        'Google: "d&b verhuur nederland" of "line array huren"',
        'Landt op /rentals/',
        'Ziet portfolio, cases, expertise',
        'Klikt "offerte aanvragen"',
        'Formulier → FS Entertainment lead',
      ],
      conversion: 'Organisch → B2B Lead',
    },
    {
      persona: 'Engineer wil leren',
      flow: [
        'Hoort over platform via Discord/LinkedIn',
        'Bezoekt homepage → ziet Academy',
        'Gratis artikel lezen → nieuwsbrief',
        'Academy overview bekijken → lid worden Engineering tier',
        'Community → Discord → actieve gebruiker',
      ],
      conversion: 'Social → Community → Paid member',
    },
  ]

  const internalLinking = [
    { from: 'Homepage', to: 'Top 5 artikelen, Academy, Membership, Cases', strategy: 'Authority transfer + CTA spread' },
    { from: 'Elke artikel', to: '3-5 gerelateerde artikelen, relevante tool, Academy module', strategy: 'Topical cluster building' },
    { from: 'Tools pagina', to: 'Gerelateerde artikelen (uitleg), Download templates', strategy: 'Educational crosslink' },
    { from: 'Cases', to: 'Gerelateerde tech artikelen, Rentals/contact', strategy: 'Authority + lead gen' },
    { from: 'Academy', to: 'Diepgaande artikelen per module, Downloads', strategy: 'Learning pathway' },
    { from: 'Tag pages', to: 'Alle content binnen dat onderwerp', strategy: 'Topical authority clustering' },
  ]

  return (
    <div className="space-y-10">
      <div>
        <h1 className="section-title">
          <span className="text-accent-orange">03.</span> Website Architectuur
        </h1>
        <p className="section-subtitle">
          Volledige sitestructuur, navigatie, user flows, SEO-architectuur en interne linkstrategie.
        </p>
      </div>

      {/* Navigation structure */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Primaire Navigatie
        </h2>
        <div className="card">
          <div className="flex flex-wrap gap-3 mb-4">
            {['Articles', 'Academy', 'Tools', 'Downloads', 'Community', 'Cases', 'Membership'].map((item) => (
              <div key={item} className="bg-base-600 border border-base-400 rounded px-3 py-2 text-sm font-medium text-text-primary">
                {item}
              </div>
            ))}
          </div>
          <div className="border-t border-base-500 pt-4">
            <p className="text-xs text-text-muted mb-2">Rechts in navigatie:</p>
            <div className="flex gap-3">
              <div className="bg-accent-orange/10 border border-accent-orange/30 rounded px-3 py-2 text-sm font-medium text-accent-orange">
                Sign In
              </div>
              <div className="bg-accent-orange rounded px-3 py-2 text-sm font-bold text-white">
                Join Free →
              </div>
            </div>
          </div>
          <p className="text-xs text-text-muted mt-3">
            Footer bevat: Rentals / FS Entertainment, Consulting, Events, Newsletter, About, Contact
          </p>
        </div>
      </div>

      {/* Full sitemap */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Volledige Sitestructuur
        </h2>
        <div className="overflow-x-auto rounded-xl border border-base-500">
          <table className="data-table">
            <thead>
              <tr>
                <th>URL</th>
                <th>Pagina</th>
                <th>Doel</th>
                <th>SEO Target</th>
                <th>Primaire CTA</th>
              </tr>
            </thead>
            <tbody>
              {siteMap.map((page) => (
                <tr key={page.path}>
                  <td className="font-mono text-accent-amber text-xs">{page.path}</td>
                  <td className="font-medium text-text-primary text-sm">{page.name}</td>
                  <td className="text-xs text-text-muted">{page.purpose}</td>
                  <td className="text-xs text-accent-blue italic">{page.seo}</td>
                  <td className="text-xs text-accent-green">{page.cta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Content Categorieën & Tags
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <div key={cat.name} className="card-sm flex items-start gap-3">
              <span className="text-2xl">{cat.icon}</span>
              <div>
                <p className="font-medium text-text-primary text-sm">{cat.name}</p>
                <p className="font-mono text-xs text-text-muted mb-1">/{cat.slug}/</p>
                <div className="flex gap-2">
                  <span className="pill">{cat.articles}</span>
                  <span
                    className={`tag text-xs ${
                      cat.priority === 'Pillar'
                        ? 'tag-orange'
                        : cat.priority === 'Premium'
                        ? 'tag-amber'
                        : cat.priority === 'SEO-high'
                        ? 'tag-blue'
                        : 'bg-base-500 text-text-muted border border-base-400'
                    }`}
                  >
                    {cat.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User flows */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Primaire User Flows
        </h2>
        <div className="space-y-4">
          {userFlows.map((flow) => (
            <div key={flow.persona} className="card">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-text-primary text-sm">{flow.persona}</p>
                <span className="tag-green text-xs">{flow.conversion}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {flow.flow.map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="bg-base-600 border border-base-400 rounded px-3 py-1.5 text-xs text-text-secondary max-w-48">
                      {step}
                    </div>
                    {i < flow.flow.length - 1 && (
                      <span className="text-accent-orange text-lg">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Internal linking */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Interne Linkstructuur
        </h2>
        <div className="overflow-x-auto rounded-xl border border-base-500">
          <table className="data-table">
            <thead>
              <tr>
                <th>Van</th>
                <th>Linkt naar</th>
                <th>Strategie</th>
              </tr>
            </thead>
            <tbody>
              {internalLinking.map((link) => (
                <tr key={link.from}>
                  <td className="font-medium text-accent-orange text-sm">{link.from}</td>
                  <td className="text-text-secondary text-xs">{link.to}</td>
                  <td className="text-text-muted text-xs italic">{link.strategy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO structure */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> SEO Architectuur Principes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Topical Authority Clusters',
              detail:
                'Elke categorie is een cluster. Pillar article (3000+ woorden) → 8-12 supporting articles → tag page aggregeert alles. Google ziet jou als expert op elk onderwerp.',
            },
            {
              title: 'E-E-A-T Signaling',
              detail:
                'Author bio met certificeringen, werkervaring en portfolio. Elke artikel linkt naar cases als bewijs. About-pagina met FS Entertainment portfolio.',
            },
            {
              title: 'URL Structuur',
              detail:
                'Vlak en beschrijvend: /articles/d&b-cardioid-sub-setup/ NIET /articles/2024/01/15/post-id-1234/. Korte, keyword-rijke URLs.',
            },
            {
              title: 'Schema Markup',
              detail:
                'Article schema, BreadcrumbList, FAQPage op relevante paginas, Course schema op Academy, LocalBusiness voor FS Entertainment.',
            },
            {
              title: 'Core Web Vitals',
              detail:
                'Ghost is snel by default. Aanvullend: Cloudflare CDN, lazy loading images, WebP/AVIF afbeeldingen, geen zware tracking scripts.',
            },
            {
              title: 'International SEO',
              detail:
                'Start met Engels als primaire taal. Optioneel later: hreflang voor NL content. Europese domeinkeuze (.eu of .pro) voor regionale relevantie signaling.',
            },
          ].map((s) => (
            <div key={s.title} className="card-sm">
              <p className="font-semibold text-accent-orange text-sm mb-2">{s.title}</p>
              <p className="text-text-muted text-xs leading-relaxed">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
