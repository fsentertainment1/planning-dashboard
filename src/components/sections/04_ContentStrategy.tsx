export default function ContentStrategy() {
  const contentIdeas = [
    // System Engineering / d&b
    { id: 1, title: 'Gain Structure From Mic To PA: The Complete Engineer\'s Guide', cluster: 'System Engineering', type: 'Pillar', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 2, title: 'd&b ArrayCalc 10 Workflow: Step-by-Step From Zero to Export', cluster: 'd&b Audiotechnik', type: 'Tutorial', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 3, title: 'Cardioid Sub Arrays: The Physics, The Math, The Reality', cluster: 'Sub Systems', type: 'Deep Dive', difficulty: 'Advanced', seoValue: 'HIGH', premium: false },
    { id: 4, title: 'd&b GSL vs SL Series: Which System For Which Application?', cluster: 'd&b Audiotechnik', type: 'Comparison', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 5, title: 'Sub Alignment With SMAART: Complete Measurement Workflow', cluster: 'SMAART & Measurement', type: 'Tutorial', difficulty: 'Advanced', seoValue: 'HIGH', premium: true },
    { id: 6, title: 'd&b R1 Remote Control: Advanced Tips Most Engineers Miss', cluster: 'd&b Audiotechnik', type: 'Tips', difficulty: 'Advanced', seoValue: 'MEDIUM', premium: true },
    { id: 7, title: 'End-Fire vs Cardioid Sub Arrays: When To Use Each', cluster: 'Sub Systems', type: 'Comparison', difficulty: 'Advanced', seoValue: 'HIGH', premium: false },
    { id: 8, title: 'Understanding Group Delay in Sub/Top Alignment', cluster: 'Signal Processing', type: 'Deep Dive', difficulty: 'Advanced', seoValue: 'MEDIUM', premium: true },
    { id: 9, title: 'SPL Mapping Before The Show: Prediction Vs Reality', cluster: 'System Engineering', type: 'Tutorial', difficulty: 'Intermediate', seoValue: 'MEDIUM', premium: false },
    { id: 10, title: 'd&b V-Series For Corporate Events: Complete Setup Guide', cluster: 'd&b Audiotechnik', type: 'Tutorial', difficulty: 'Beginner', seoValue: 'HIGH', premium: false },
    // Dante / Network Audio
    { id: 11, title: 'Dante 101: Your First Dante Network In 30 Minutes', cluster: 'Dante & Network Audio', type: 'Tutorial', difficulty: 'Beginner', seoValue: 'HIGH', premium: false },
    { id: 12, title: 'Dante Controller Deep Dive: Routing, Clocking, Latency', cluster: 'Dante & Network Audio', type: 'Deep Dive', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 13, title: 'Building A Redundant Dante Network For Touring', cluster: 'Dante & Network Audio', type: 'Tutorial', difficulty: 'Advanced', seoValue: 'HIGH', premium: true },
    { id: 14, title: 'Dante vs AES67 vs AVB: The 2024 Honest Comparison', cluster: 'Dante & Network Audio', type: 'Comparison', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 15, title: 'VLAN Design For Audio Networks: Practical Live Sound Guide', cluster: 'Dante & Network Audio', type: 'Tutorial', difficulty: 'Advanced', seoValue: 'MEDIUM', premium: true },
    { id: 16, title: 'Troubleshooting Dante Dropouts: Systematic Diagnosis Guide', cluster: 'Dante & Network Audio', type: 'Troubleshooting', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 17, title: 'Managed Switches For Dante: Cisco SG350 vs Netgear M4250', cluster: 'Dante & Network Audio', type: 'Comparison', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 18, title: 'AES67 Interoperability With Dante: What Actually Works', cluster: 'Dante & Network Audio', type: 'Technical', difficulty: 'Advanced', seoValue: 'MEDIUM', premium: true },
    { id: 19, title: 'Dante Latency Calculator: Understanding The Numbers', cluster: 'Dante & Network Audio', type: 'Reference', difficulty: 'Intermediate', seoValue: 'MEDIUM', premium: false },
    { id: 20, title: 'Building A Show Network: Switches, VLANs, QoS', cluster: 'Dante & Network Audio', type: 'Tutorial', difficulty: 'Advanced', seoValue: 'HIGH', premium: true },
    // RF Engineering
    { id: 21, title: 'IEM Frequency Coordination: Complete Workflow With IAS', cluster: 'RF Engineering', type: 'Tutorial', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 22, title: 'RF Propagation In Large Venues: What Engineers Need To Know', cluster: 'RF Engineering', type: 'Deep Dive', difficulty: 'Advanced', seoValue: 'MEDIUM', premium: true },
    { id: 23, title: 'Shure Axient Digital vs Sennheiser 6000: Touring Comparison', cluster: 'RF Engineering', type: 'Comparison', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 24, title: 'RF Antenna Distribution: Passive vs Active — When To Use Each', cluster: 'RF Engineering', type: 'Educational', difficulty: 'Intermediate', seoValue: 'MEDIUM', premium: false },
    { id: 25, title: 'European 700MHz Spectrum Clearance: 2024 Practical Guide', cluster: 'RF Engineering', type: 'Reference', difficulty: 'Beginner', seoValue: 'HIGH', premium: false },
    { id: 26, title: 'Multi-Stage Festival RF Coordination: How To Plan For 80+ Frequencies', cluster: 'RF Engineering', type: 'Deep Dive', difficulty: 'Advanced', seoValue: 'HIGH', premium: true },
    { id: 27, title: 'RF Dropout Troubleshooting: Signal Chain Approach', cluster: 'RF Engineering', type: 'Troubleshooting', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 28, title: 'Best Directional Antennas For Touring In 2024', cluster: 'RF Engineering', type: 'Gear Guide', difficulty: 'Intermediate', seoValue: 'MEDIUM', premium: false },
    // SMAART & Measurement
    { id: 29, title: 'SMAART 9 For System Tuning: Start-to-Finish Workflow', cluster: 'SMAART & Measurement', type: 'Tutorial', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 30, title: 'Understanding Transfer Function Measurements In Live Sound', cluster: 'SMAART & Measurement', type: 'Educational', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 31, title: 'Measurement Microphone Placement: Where, How, Why', cluster: 'SMAART & Measurement', type: 'Tutorial', difficulty: 'Beginner', seoValue: 'HIGH', premium: false },
    { id: 32, title: 'FIR vs IIR Filters: What Live Engineers Actually Need To Know', cluster: 'Signal Processing', type: 'Educational', difficulty: 'Advanced', seoValue: 'MEDIUM', premium: false },
    { id: 33, title: 'Understanding Phase Response In PA Processing', cluster: 'Signal Processing', type: 'Deep Dive', difficulty: 'Advanced', seoValue: 'MEDIUM', premium: true },
    { id: 34, title: 'Source-Independent Measurement With SMAART', cluster: 'SMAART & Measurement', type: 'Tutorial', difficulty: 'Advanced', seoValue: 'MEDIUM', premium: true },
    { id: 35, title: 'Impulse Response vs Transfer Function: Cleared Up Once And For All', cluster: 'SMAART & Measurement', type: 'Educational', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    // Festival / Live workflows
    { id: 36, title: 'Festival Main Stage Setup: System Tech Workflow From Advance To Show', cluster: 'Festival Workflows', type: 'Workflow', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 37, title: 'Writing A Festival Advance Tech Rider That Gets Results', cluster: 'Festival Workflows', type: 'Practical', difficulty: 'Intermediate', seoValue: 'HIGH', premium: true },
    { id: 38, title: 'FOH Position Design: Sightlines, Cable Routes, RF', cluster: 'Festival Workflows', type: 'Tutorial', difficulty: 'Intermediate', seoValue: 'MEDIUM', premium: false },
    { id: 39, title: 'Stage Plot & I/O List Best Practices In 2024', cluster: 'FOH Engineering', type: 'Reference', difficulty: 'Beginner', seoValue: 'HIGH', premium: false },
    { id: 40, title: 'Multi-Console Workflows: DiGiCo/Avid Session Sharing', cluster: 'FOH Engineering', type: 'Tutorial', difficulty: 'Advanced', seoValue: 'MEDIUM', premium: true },
    // System Design & Acoustics
    { id: 41, title: 'Reading Architectural Drawings For System Design', cluster: 'System Engineering', type: 'Educational', difficulty: 'Intermediate', seoValue: 'MEDIUM', premium: false },
    { id: 42, title: 'Speaker Delay Timing: The Math Behind It', cluster: 'System Engineering', type: 'Educational', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 43, title: 'Designing Delay Fills: When, Why, and How', cluster: 'System Engineering', type: 'Tutorial', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 44, title: 'PA Placement In Difficult Venues: Warehouses, Churches, Courtyards', cluster: 'System Engineering', type: 'Case-based', difficulty: 'Advanced', seoValue: 'HIGH', premium: false },
    { id: 45, title: 'Understanding Q Factor And Beamwidth In Practice', cluster: 'System Engineering', type: 'Educational', difficulty: 'Advanced', seoValue: 'MEDIUM', premium: true },
    // Touring
    { id: 46, title: 'Touring Production Advance: FOH Engineer Checklist', cluster: 'Touring Systems', type: 'Reference', difficulty: 'Intermediate', seoValue: 'HIGH', premium: true },
    { id: 47, title: 'Show File Management Across Productions', cluster: 'Touring Systems', type: 'Practical', difficulty: 'Intermediate', seoValue: 'MEDIUM', premium: true },
    { id: 48, title: 'FOH Console Comparison 2024: SD12 vs S6L vs Quantum 7', cluster: 'FOH Engineering', type: 'Comparison', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 49, title: 'Monitor World: IEM vs Wedge Hybrid Systems', cluster: 'FOH Engineering', type: 'Educational', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 50, title: 'Line Check Protocol For Touring Systems', cluster: 'Touring Systems', type: 'Reference', difficulty: 'Beginner', seoValue: 'HIGH', premium: false },
    // Signal Processing
    { id: 51, title: 'Lake LM44 As System Processor: Complete Configuration Guide', cluster: 'Signal Processing', type: 'Tutorial', difficulty: 'Advanced', seoValue: 'MEDIUM', premium: true },
    { id: 52, title: 'Polarity vs Phase: Finally Explained Clearly', cluster: 'Signal Processing', type: 'Educational', difficulty: 'Beginner', seoValue: 'HIGH', premium: false },
    { id: 53, title: 'Dynamic Range In Live Sound: The Complete Reference', cluster: 'Signal Processing', type: 'Reference', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 54, title: 'How Crossovers Work: Active vs Passive In Live Sound', cluster: 'Signal Processing', type: 'Educational', difficulty: 'Beginner', seoValue: 'HIGH', premium: false },
    { id: 55, title: 'Outboard Gear In 2024: What\'s Still Worth Racking?', cluster: 'Gear Reviews', type: 'Opinion', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    // Troubleshooting
    { id: 56, title: 'Diagnosing PA Noise Floor Issues: Systematic Approach', cluster: 'Troubleshooting', type: 'Troubleshooting', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 57, title: 'Troubleshooting Dante Clock Source Conflicts', cluster: 'Troubleshooting', type: 'Troubleshooting', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 58, title: 'Fixing Comb Filtering In Problematic Venues', cluster: 'Troubleshooting', type: 'Troubleshooting', difficulty: 'Advanced', seoValue: 'HIGH', premium: false },
    { id: 59, title: 'Ground Loops: Finding Them And Eliminating Them For Good', cluster: 'Troubleshooting', type: 'Troubleshooting', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 60, title: 'Why Your Sub Bass Sounds Bad: 5 Most Common Mistakes', cluster: 'Sub Systems', type: 'Troubleshooting', difficulty: 'Beginner', seoValue: 'HIGH', premium: false },
    // Gear Reviews
    { id: 61, title: 'd&b B6 Cardioid Sub: Real-World Review After 50 Shows', cluster: 'Gear Reviews', type: 'Review', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 62, title: 'DiGiCo SD12 In 2024: Still The Best Touring Console?', cluster: 'Gear Reviews', type: 'Review', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 63, title: 'Dante-Enabled Stageboxes Comparison 2024', cluster: 'Gear Reviews', type: 'Comparison', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 64, title: 'Coda Audio LA12 vs d&b Y10P: Head-To-Head', cluster: 'Gear Reviews', type: 'Comparison', difficulty: 'Advanced', seoValue: 'MEDIUM', premium: true },
    { id: 65, title: 'd&b vs L-Acoustics vs Meyer: The Honest, Unsponsored Comparison', cluster: 'Gear Reviews', type: 'Comparison', difficulty: 'Advanced', seoValue: 'HIGH', premium: false },
    // Case Studies
    { id: 66, title: 'Case Study: d&b System Design For 3000-Cap Venue', cluster: 'System Engineering', type: 'Case Study', difficulty: 'Advanced', seoValue: 'HIGH', premium: true },
    { id: 67, title: 'Case Study: Festival RF With 80+ Active Frequencies', cluster: 'RF Engineering', type: 'Case Study', difficulty: 'Advanced', seoValue: 'HIGH', premium: true },
    { id: 68, title: 'Case Study: Dante Network For A Touring Musical Production', cluster: 'Dante & Network Audio', type: 'Case Study', difficulty: 'Advanced', seoValue: 'MEDIUM', premium: true },
    { id: 69, title: 'Case Study: Outdoor Concert In A Reflective Courtyard', cluster: 'System Engineering', type: 'Case Study', difficulty: 'Advanced', seoValue: 'HIGH', premium: true },
    { id: 70, title: 'Case Study: Corporate Event System Design For 800 Pax', cluster: 'System Engineering', type: 'Case Study', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    // Business / Career
    { id: 71, title: 'Day Rates For System Engineers In Europe: What To Charge In 2024', cluster: 'Career & Business', type: 'Reference', difficulty: 'Beginner', seoValue: 'HIGH', premium: false },
    { id: 72, title: 'Building A Freelance Live Sound Career In The Netherlands', cluster: 'Career & Business', type: 'Guide', difficulty: 'Beginner', seoValue: 'HIGH', premium: false },
    { id: 73, title: 'Starting An AV Rental Company: What I Wish I Knew', cluster: 'Career & Business', type: 'Opinion', difficulty: 'Beginner', seoValue: 'HIGH', premium: false },
    { id: 74, title: 'Tech Rider Negotiation: Getting What You Need Without Burning Bridges', cluster: 'Career & Business', type: 'Practical', difficulty: 'Intermediate', seoValue: 'MEDIUM', premium: false },
    { id: 75, title: 'Insurance & Liability For Live Events: What Rental Companies Need', cluster: 'Career & Business', type: 'Reference', difficulty: 'Beginner', seoValue: 'HIGH', premium: false },
    // Education / Fundamentals
    { id: 76, title: 'What Is A System Tech? The Role Explained', cluster: 'System Engineering', type: 'Educational', difficulty: 'Beginner', seoValue: 'HIGH', premium: false },
    { id: 77, title: 'dBSPL, dBu, dBFS, dBV: The Complete Reference Guide', cluster: 'Signal Processing', type: 'Reference', difficulty: 'Beginner', seoValue: 'HIGH', premium: false },
    { id: 78, title: 'PA Impedance For Live Engineers: What You Actually Need To Know', cluster: 'System Engineering', type: 'Educational', difficulty: 'Beginner', seoValue: 'HIGH', premium: false },
    { id: 79, title: 'IT For Audio Engineers: The Essential Networking Primer', cluster: 'Dante & Network Audio', type: 'Educational', difficulty: 'Beginner', seoValue: 'HIGH', premium: false },
    { id: 80, title: 'Understanding Subwoofer Loading: Horn, Bandpass, Bass Reflex', cluster: 'Sub Systems', type: 'Educational', difficulty: 'Intermediate', seoValue: 'MEDIUM', premium: false },
    // Advanced / Niche
    { id: 81, title: 'Prediction Software vs Reality: Calibrating Your Expectations', cluster: 'System Engineering', type: 'Deep Dive', difficulty: 'Advanced', seoValue: 'MEDIUM', premium: true },
    { id: 82, title: 'Advanced IEM Mixes: Clinical vs Musical Approach', cluster: 'FOH Engineering', type: 'Advanced', difficulty: 'Advanced', seoValue: 'MEDIUM', premium: true },
    { id: 83, title: 'Sub Cardioid With Delay: Calculating The Exact Offset', cluster: 'Sub Systems', type: 'Technical', difficulty: 'Advanced', seoValue: 'HIGH', premium: true },
    { id: 84, title: 'Using EASE/dBNexus For PA System Prediction', cluster: 'System Engineering', type: 'Tutorial', difficulty: 'Advanced', seoValue: 'MEDIUM', premium: true },
    { id: 85, title: 'The State Of Live Sound In Europe 2024: Market Analysis', cluster: 'Career & Business', type: 'Analysis', difficulty: 'Intermediate', seoValue: 'MEDIUM', premium: false },
    // Templates / Downloads (Premium)
    { id: 86, title: 'Festival Advance Tech Rider Template [Free Download]', cluster: 'Downloads', type: 'Template', difficulty: 'Beginner', seoValue: 'HIGH', premium: false },
    { id: 87, title: 'Pre-Show System Check Checklist [PDF Download]', cluster: 'Downloads', type: 'Checklist', difficulty: 'Beginner', seoValue: 'HIGH', premium: false },
    { id: 88, title: 'Dante Network Design Worksheet [Excel Template]', cluster: 'Downloads', type: 'Template', difficulty: 'Intermediate', seoValue: 'HIGH', premium: true },
    { id: 89, title: 'RF Coordination Spreadsheet Template [Free]', cluster: 'Downloads', type: 'Template', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 90, title: 'Speaker Placement Calculation Worksheet', cluster: 'Downloads', type: 'Template', difficulty: 'Intermediate', seoValue: 'MEDIUM', premium: true },
    // Viral / high-engagement potential
    { id: 91, title: 'Why Dutch Engineers Are Shaping European Touring Sound', cluster: 'Industry', type: 'Opinion', difficulty: 'Beginner', seoValue: 'MEDIUM', premium: false },
    { id: 92, title: 'The Worst Festival Gigs I\'ve Ever Worked (And What I Learned)', cluster: 'Career & Business', type: 'Story', difficulty: 'Beginner', seoValue: 'HIGH', premium: false },
    { id: 93, title: 'Is AVB Replacing Dante? An Honest Assessment', cluster: 'Dante & Network Audio', type: 'Opinion', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 94, title: 'The Future Of Immersive Audio In Live Events: Realistic Outlook', cluster: 'Industry', type: 'Analysis', difficulty: 'Intermediate', seoValue: 'HIGH', premium: false },
    { id: 95, title: 'What I Learned After Tuning 500 PA Systems', cluster: 'System Engineering', type: 'Reflection', difficulty: 'Beginner', seoValue: 'HIGH', premium: false },
    { id: 96, title: 'Things FOH Engineers Say That Sound Insane To Everyone Else', cluster: 'Community', type: 'Humor', difficulty: 'Beginner', seoValue: 'MEDIUM', premium: false },
    { id: 97, title: 'The d&b B22 Sub: Why Everyone Uses It And What They Get Wrong', cluster: 'd&b Audiotechnik', type: 'Opinion', difficulty: 'Advanced', seoValue: 'HIGH', premium: false },
    { id: 98, title: 'Rental Company Pricing In 2024: Are You Charging Enough?', cluster: 'Career & Business', type: 'Practical', difficulty: 'Beginner', seoValue: 'HIGH', premium: false },
    { id: 99, title: 'How To Get Your First System Engineer Job In Europe', cluster: 'Career & Business', type: 'Guide', difficulty: 'Beginner', seoValue: 'HIGH', premium: false },
    { id: 100, title: 'The Complete d&b Audiotechnik Knowledge Hub [Resource Page]', cluster: 'd&b Audiotechnik', type: 'Resource Page', difficulty: 'All levels', seoValue: 'HIGH', premium: false },
  ]

  const clusters = [
    { cluster: 'System Engineering', count: contentIdeas.filter(c => c.cluster === 'System Engineering').length, priority: 'P1' },
    { cluster: 'd&b Audiotechnik', count: contentIdeas.filter(c => c.cluster === 'd&b Audiotechnik').length, priority: 'P1' },
    { cluster: 'Dante & Network Audio', count: contentIdeas.filter(c => c.cluster === 'Dante & Network Audio').length, priority: 'P1' },
    { cluster: 'RF Engineering', count: contentIdeas.filter(c => c.cluster === 'RF Engineering').length, priority: 'P2' },
    { cluster: 'SMAART & Measurement', count: contentIdeas.filter(c => c.cluster === 'SMAART & Measurement').length, priority: 'P2' },
    { cluster: 'Sub Systems', count: contentIdeas.filter(c => c.cluster === 'Sub Systems').length, priority: 'P2' },
    { cluster: 'FOH Engineering', count: contentIdeas.filter(c => c.cluster === 'FOH Engineering').length, priority: 'P2' },
    { cluster: 'Signal Processing', count: contentIdeas.filter(c => c.cluster === 'Signal Processing').length, priority: 'P3' },
    { cluster: 'Festival Workflows', count: contentIdeas.filter(c => c.cluster === 'Festival Workflows').length, priority: 'P3' },
    { cluster: 'Touring Systems', count: contentIdeas.filter(c => c.cluster === 'Touring Systems').length, priority: 'P3' },
    { cluster: 'Gear Reviews', count: contentIdeas.filter(c => c.cluster === 'Gear Reviews').length, priority: 'P3' },
    { cluster: 'Troubleshooting', count: contentIdeas.filter(c => c.cluster === 'Troubleshooting').length, priority: 'P2' },
    { cluster: 'Career & Business', count: contentIdeas.filter(c => c.cluster === 'Career & Business').length, priority: 'P4' },
    { cluster: 'Downloads', count: contentIdeas.filter(c => c.cluster === 'Downloads').length, priority: 'P2' },
  ]

  const [activeCluster, setActiveCluster] = React.useState<string | null>(null)

  const filtered = activeCluster
    ? contentIdeas.filter((c) => c.cluster === activeCluster)
    : contentIdeas

  return (
    <div className="space-y-10">
      <div>
        <h1 className="section-title">
          <span className="text-accent-orange">04.</span> Contentstrategie
        </h1>
        <p className="section-subtitle">
          100 contentideeën, SEO clusters, pillar content strategie, YouTube, nieuwsbrief en autoriteitsopbouw.
        </p>
      </div>

      {/* Pillar content strategy */}
      <div className="highlight-box">
        <p className="text-sm font-mono text-accent-orange mb-2">PILLAR CONTENT STRATEGIE</p>
        <p className="text-text-secondary text-sm leading-relaxed mb-3">
          Bouw per cluster één uitgebreide pillar article (3000-6000 woorden) die het onderwerp volledig
          dekt. Ondersteun met 8-12 supporting articles die dieper inzoomen op specifieke aspecten.
          De pillar linkt naar alle supporting articles, elk supporting article linkt terug naar de pillar.
          Dit creëert topical authority die Google beloont met cluster-wide ranking boosts.
        </p>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { level: 'Pillar', words: '3000-6000 woorden', count: '3-4 per cluster', color: 'text-accent-orange' },
            { level: 'Supporting', words: '1500-3000 woorden', count: '8-12 per cluster', color: 'text-accent-blue' },
            { level: 'Quick Reference', words: '500-1000 woorden', count: 'Onbeperkt', color: 'text-accent-green' },
          ].map((l) => (
            <div key={l.level} className="bg-base-600 rounded-lg p-3">
              <p className={`font-semibold text-sm mb-1 ${l.color}`}>{l.level}</p>
              <p className="text-xs text-text-muted">{l.words}</p>
              <p className="text-xs text-text-dim">{l.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cluster overview */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Content Clusters
        </h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setActiveCluster(null)}
            className={`pill cursor-pointer transition-colors ${!activeCluster ? 'bg-accent-orange/20 border-accent-orange/40 text-accent-orange' : 'hover:bg-base-500'}`}
          >
            Alle ({contentIdeas.length})
          </button>
          {clusters.map((c) => (
            <button
              key={c.cluster}
              onClick={() => setActiveCluster(activeCluster === c.cluster ? null : c.cluster)}
              className={`pill cursor-pointer transition-colors ${
                activeCluster === c.cluster
                  ? 'bg-accent-orange/20 border-accent-orange/40 text-accent-orange'
                  : 'hover:bg-base-500'
              }`}
            >
              {c.cluster} ({c.count})
              <span
                className={`ml-1 text-xs font-bold ${
                  c.priority === 'P1' ? 'text-accent-orange' : c.priority === 'P2' ? 'text-accent-amber' : 'text-text-muted'
                }`}
              >
                {c.priority}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 100 content ideas */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> {filtered.length} Content Ideeën
        </h2>
        <div className="overflow-x-auto rounded-xl border border-base-500">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Titel</th>
                <th>Cluster</th>
                <th>Type</th>
                <th>Niveau</th>
                <th>SEO</th>
                <th>Premium</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td className="font-mono text-text-muted text-xs">{String(item.id).padStart(3, '0')}</td>
                  <td className="text-text-primary text-xs font-medium max-w-xs">{item.title}</td>
                  <td className="text-xs">
                    <span className="pill text-xs">{item.cluster}</span>
                  </td>
                  <td className="text-xs text-text-muted">{item.type}</td>
                  <td className="text-xs">
                    <span
                      className={`tag ${
                        item.difficulty === 'Beginner'
                          ? 'tag-green'
                          : item.difficulty === 'Intermediate'
                          ? 'tag-blue'
                          : 'tag-amber'
                      }`}
                    >
                      {item.difficulty}
                    </span>
                  </td>
                  <td className="text-xs">
                    <span className={item.seoValue === 'HIGH' ? 'text-accent-green font-semibold' : 'text-text-muted'}>
                      {item.seoValue}
                    </span>
                  </td>
                  <td className="text-xs">
                    {item.premium ? (
                      <span className="tag-orange">Premium</span>
                    ) : (
                      <span className="text-text-muted">Gratis</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* YouTube strategy */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> YouTube Strategie
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card">
            <h3 className="h3">Content formaten</h3>
            <ul className="space-y-2">
              {[
                'System Teardowns: "How I Set Up A d&b System For 3000 People"',
                'Tutorial Series: "Dante From Zero" (5-part series)',
                'Q&A Sessions: Community questions beantwoorden',
                'Festival Vlogs: Behind-the-scenes van productie',
                'Gear Reviews: Eerlijke 10-min reviews',
                'Troubleshooting Live: Real problems, real solutions',
                'Comparison Videos: d&b vs alternatieven',
              ].map((item) => (
                <li key={item} className="text-xs text-text-secondary flex gap-2">
                  <span className="text-accent-orange">▶</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="h3">Strategie principes</h3>
            <ul className="space-y-2">
              {[
                'Elk artikel heeft een companion YouTube video',
                'Video transcriptie → SEO-rijke blog post',
                'YouTube Shorts voor snelle tips en technische facts',
                'Playlists per cluster (Dante Series, d&b Deep Dives)',
                'Chapters in elke video voor watch time en SEO',
                'Community tab voor polls en vragen',
                'Verwijzing naar nieuwsbrief in elke descriptiebox',
              ].map((item) => (
                <li key={item} className="text-xs text-text-secondary flex gap-2">
                  <span className="text-accent-blue">→</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter strategy */}
      <div>
        <h2 className="h2">
          <span className="text-accent-orange">⟶</span> Nieuwsbriefstrategie
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: 'Weekly Dispatch',
              freq: 'Wekelijks (donderdag)',
              content: '1 technisch artikel, 1 industrie update, 1 tool tip, 1 community spotlight',
              tier: 'Gratis',
            },
            {
              name: 'Engineering Briefing',
              freq: 'Maandelijks',
              content: 'Diepgaande technical breakdown, premium content preview, exclusieve download, community Q&A samenvatting',
              tier: 'Professional',
            },
            {
              name: 'System Digest',
              freq: 'Bi-weekly',
              content: 'System design cases, preset updates, d&b firmware nieuws, exclusive access tot tools',
              tier: 'Engineering',
            },
          ].map((n) => (
            <div key={n.name} className="card-sm">
              <p className="font-semibold text-text-primary text-sm mb-1">{n.name}</p>
              <div className="flex gap-2 mb-2">
                <span className="pill text-xs">{n.freq}</span>
                <span className={`tag text-xs ${n.tier === 'Gratis' ? 'tag-green' : n.tier === 'Professional' ? 'tag-blue' : 'tag-orange'}`}>
                  {n.tier}
                </span>
              </div>
              <p className="text-text-muted text-xs leading-relaxed">{n.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import React from 'react'
