export default function AIAutomation() {
  const aiTools = [
    {
      tool: 'Claude API (claude-opus-4-7)',
      category: 'Content',
      use: 'Artikel outlines genereren, research samenvatten, technische reviews, SEO-titels brainstormen',
      cost: '~€0.02-0.10 per artikel',
      save: '2-3 uur per artikel',
      risk: 'Nooit blindelings publiceren — altijd fact-checken op technische accuraatheid',
    },
    {
      tool: 'OpenAI Whisper API',
      category: 'Transcriptie',
      use: 'YouTube video\'s en podcast-opnames transcriberen → ruw artikel als uitgangspunt',
      cost: '€0.006 per minuut audio',
      save: '1-2 uur per video',
      risk: 'Technische termen verkeerd gespeld — review vereist',
    },
    {
      tool: 'n8n (self-hosted)',
      category: 'Automation',
      use: 'Nieuw artikel gepubliceerd → LinkedIn post + Discord announcement + nieuwsbrief trigger',
      cost: '€0 (self-hosted op zelfde VPS)',
      save: '30 min per publicatie',
      risk: 'Verkeerde social post bij slecht geconfigureerde flows',
    },
    {
      tool: 'Descript',
      category: 'Video',
      use: 'Video editing met AI: overdubs, transcript-based editing, filler word removal',
      cost: '€24/maand',
      save: '50-70% video editing tijd',
      risk: 'AI-stem klinkt artificieel — gebruik voor eenvoudige correcties',
    },
    {
      tool: 'Ahrefs / Semrush',
      category: 'SEO',
      use: 'Keyword research, competitor analysis, content gap identificeren, rank tracking',
      cost: '€99-129/maand (Ahrefs Lite)',
      save: 'Onmisbaar voor strategische SEO',
      risk: 'Data is nooit 100% accuraat — altijd in context beoordelen',
    },
    {
      tool: 'Midjourney / DALL-E',
      category: 'Design',
      use: 'Article header images, social media graphics, concept illustraties',
      cost: '€10-30/maand',
      save: '1-2 uur per artikel',
      risk: 'AI-afbeeldingen in pro-audio kunnen er "goedkoop" uitzien — gebruik sparingzaam',
    },
    {
      tool: 'Notion AI + Database',
      category: 'Workflow',
      use: 'Content kalender, redactioneel overzicht, planning, briefs genereren',
      cost: '€16/maand (Plus)',
      save: 'Organisatietijd',
      risk: 'Geen — pure workflow tool',
    },
    {
      tool: 'Ghost webhooks + custom scripts',
      category: 'Platform',
      use: 'Nieuwe member → Discord role toewijzen, email tag segmenteren, analytics event triggeren',
      cost: '€0 (eigen development)',
      save: '5-10 min per signup',
      risk: 'Vereist basis scripting kennis of eenmalige developer investering',
    },
    {
      tool: 'Plausible Goals + Funnels',
      category: 'Analytics',
      use: 'Conversie tracking: gratis → email → paid, welke artikelen converteren het best?',
      cost: 'Inbegrepen in Plausible',
      save: 'Data-gedreven beslissingen',
      risk: 'Geen — essentieel voor optimalisatie',
    },
  ]

  const automationFlows = [
    {
      name: 'Publicatie Flow',
      trigger: 'Ghost: artikel gepubliceerd',
      steps: [
        'n8n webhook ontvangt notificatie',
        'LinkedIn draft genereren via Claude API',
        'Wachten op handmatige goedkeuring (optioneel)',
        'LinkedIn post publiceren via API',
        'Discord announcement in #aankondigingen',
        'Optioneel: Twitter/X post',
      ],
      tools: ['Ghost Webhooks', 'n8n', 'Claude API', 'LinkedIn API'],
    },
    {
      name: 'New Member Onboarding',
      trigger: 'Ghost: nieuwe gratis member',
      steps: [
        'Ghost stuurt welkomsmail automatisch',
        'n8n webhook: stuur Discord uitnodiging',
        'Tag member in Mailgun voor segmentatie',
        'Na 14 dagen: upgrade-email met kortingscode',
      ],
      tools: ['Ghost Memberships', 'n8n', 'Discord API', 'Mailgun'],
    },
    {
      name: 'Video → Artikel Pipeline',
      trigger: 'YouTube video geüpload',
      steps: [
        'Whisper API: video transcriberen',
        'Claude API: transcript → artikel draft',
        'Notion: draft opslaan in content kalender',
        'Notificatie in Discord: "nieuwe draft klaar voor review"',
        'Handmatige review en publicatie in Ghost',
      ],
      tools: ['Whisper API', 'Claude API', 'n8n', 'Notion', 'Discord'],
    },
    {
      name: 'Weekly Analytics Report',
      trigger: 'Cron: elke maandag 09:00',
      steps: [
        'Plausible API: haal pageviews, top artikelen, conversies op',
        'Ghost API: haal nieuwe members, MRR op',
        'Claude API: genereer samenvattend rapport',
        'Email rapport naar jezelf',
        'Discord post in prive kanaal',
      ],
      tools: ['Plausible API', 'Ghost API', 'Claude API', 'n8n'],
    },
  ]

  const contentAI = [
    { step: '1. Keyword Research', ai: 'Ahrefs/Semrush: vind zoekwoorden met hoog volume/lage concurrentie', human: 'Kies welke keywords passen bij jouw expertise en audience intent' },
    { step: '2. Outline', ai: 'Claude: genereer uitgebreide outline op basis van keyword + doelgroep brief', human: 'Review outline, voeg eigen ervaringen en technische inzichten toe' },
    { step: '3. Draft', ai: 'Claude: schrijf eerste draft op basis van outline', human: 'Volledig herschrijven vanuit eigen stem — AI draft is slechts structuur' },
    { step: '4. Technical Review', ai: 'Claude: check of technische claims logisch consistent zijn', human: 'Eigen praktijkervaring als finale verificatie — AI kan technisch falen' },
    { step: '5. SEO Optimalisatie', ai: 'Rank Math/Clearscope: analyseer SEO signalen, suggesties', human: 'Implementeer suggesties waar ze de tekst niet verslechteren' },
    { step: '6. Header Image', ai: 'Midjourney: engineering-themed illustration genereren', human: 'Beoordeel of het professioneel genoeg is voor het platform' },
    { step: '7. Social Promotion', ai: 'Claude: schrijf 3 LinkedIn-varianten voor de post', human: 'Kies beste variant, pas aan naar eigen toon, publiceer' },
  ]

  return (
    <div className="space-y-10">
      <div>
        <h1 className="section-title">
          <span className="text-accent-orange">11.</span> AI & Automation
        </h1>
        <p className="section-subtitle">
          Slimme inzet van AI voor content, SEO, workflows, automatisering en analytics.
        </p>
      </div>

      <div className="warning-box">
        <p className="text-sm font-semibold text-accent-red mb-1">Gouden Regel</p>
        <p className="text-text-secondary text-sm leading-relaxed">
          AI is een <strong className="text-text-primary">kracht-vermenigvuldiger</strong>, geen vervanger.
          In pro-audio is technische accuraatheid je reputatie. Eén verkeerd AI-gegenereerd technisch advies
          (bijv. foutieve d&b wiring instructie) vernietigt de autoriteit die je in maanden hebt opgebouwd.
          Gebruik AI voor structuur, snelheid en research — nooit als eindproduct zonder review.
        </p>
      </div>

      {/* AI Tools */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> AI & Automation Toolset
        </h2>
        <div className="space-y-3">
          {aiTools.map((tool) => (
            <div key={tool.tool} className="card-sm">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="font-semibold text-text-primary text-sm">{tool.tool}</span>
                <span className="tag-blue text-xs">{tool.category}</span>
                <span className="font-mono text-xs text-accent-green">{tool.cost}</span>
                <span className="text-xs text-text-muted">→ Bespaart {tool.save}</span>
              </div>
              <p className="text-xs text-text-secondary mb-1">{tool.use}</p>
              <p className="text-xs text-accent-amber italic">⚠ {tool.risk}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Automation flows */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Automation Flows
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {automationFlows.map((flow) => (
            <div key={flow.name} className="card">
              <p className="font-semibold text-text-primary mb-1">{flow.name}</p>
              <p className="text-xs font-mono text-accent-amber mb-3">Trigger: {flow.trigger}</p>
              <ol className="space-y-1 mb-3">
                {flow.steps.map((step, i) => (
                  <li key={i} className="text-xs text-text-secondary flex gap-2">
                    <span className="text-accent-orange flex-shrink-0 font-mono">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
              <div className="flex flex-wrap gap-1 mt-2">
                {flow.tools.map((t) => (
                  <span key={t} className="pill text-xs">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Content Workflow */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> AI-Ondersteunde Content Workflow
        </h2>
        <div className="overflow-x-auto rounded-xl border border-base-500">
          <table className="data-table">
            <thead>
              <tr>
                <th>Stap</th>
                <th>AI Doet</th>
                <th>Jij Doet</th>
              </tr>
            </thead>
            <tbody>
              {contentAI.map((row) => (
                <tr key={row.step}>
                  <td className="font-medium text-accent-orange text-sm">{row.step}</td>
                  <td className="text-xs text-text-muted">{row.ai}</td>
                  <td className="text-xs text-accent-green">{row.human}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Future AI features */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Toekomstige AI Features (Jaar 2-3)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              feature: 'Aanbevelingssysteem',
              desc: 'AI leest welke artikelen een member al heeft gelezen → beveelt volgende meest relevante content aan',
              complexity: 'Gemiddeld',
            },
            {
              feature: 'Engineering Knowledge Base',
              desc: 'RAG-systeem: alle artikelen als vector database → members kunnen technische vragen stellen aan een platformspecifieke AI',
              complexity: 'Hoog',
            },
            {
              feature: 'Automated SEO Monitoring',
              desc: 'Dagelijks SERP tracking → alert als rankings dalen → automatisch competitor analyse → content suggestie',
              complexity: 'Laag',
            },
            {
              feature: 'Slimme Nieuwsbrief Segmentatie',
              desc: 'Verstuur op basis van gedrag (welke categorie artikelen leest lid?) niet op basis van tier',
              complexity: 'Gemiddeld',
            },
            {
              feature: 'RF Calculator Tool',
              desc: 'AI-ondersteunde frequentiecoördinatie: voer beschikbaar spectrum in → AI coördineert optimale frequentieset',
              complexity: 'Hoog',
            },
            {
              feature: 'Community Moderation',
              desc: 'Automatische moderatie: flaggen van misleidend technisch advies, spam detectie, sentiment monitoring',
              complexity: 'Gemiddeld',
            },
          ].map((f) => (
            <div key={f.feature} className="card-sm">
              <p className="font-semibold text-accent-orange text-sm mb-1">{f.feature}</p>
              <p className="text-text-muted text-xs leading-relaxed mb-2">{f.desc}</p>
              <span className={`tag text-xs ${f.complexity === 'Laag' ? 'tag-green' : f.complexity === 'Gemiddeld' ? 'tag-amber' : 'tag-red'}`}>
                Complexiteit: {f.complexity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
