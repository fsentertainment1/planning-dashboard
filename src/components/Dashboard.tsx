import React, { useState } from 'react'
import dynamic from 'next/dynamic'

const sections = [
  { id: 'positioning', num: '01', label: 'Positionering', icon: '🎯', component: dynamic(() => import('./sections/01_Positioning')) },
  { id: 'branding', num: '02', label: 'Merk & Branding', icon: '✦', component: dynamic(() => import('./sections/02_Branding')) },
  { id: 'architecture', num: '03', label: 'Website Architectuur', icon: '⬡', component: dynamic(() => import('./sections/03_Architecture')) },
  { id: 'content', num: '04', label: 'Contentstrategie', icon: '✎', component: dynamic(() => import('./sections/04_ContentStrategy')) },
  { id: 'techstack', num: '05', label: 'Technische Stack', icon: '⚙', component: dynamic(() => import('./sections/05_TechStack')) },
  { id: 'ghost', num: '06', label: 'Ghost Implementatie', icon: '👻', component: dynamic(() => import('./sections/06_GhostImpl')) },
  { id: 'design', num: '07', label: 'Design Concept', icon: '◈', component: dynamic(() => import('./sections/07_DesignConcept')) },
  { id: 'revenue', num: '08', label: 'Verdienmodel', icon: '€', component: dynamic(() => import('./sections/08_RevenueModel')) },
  { id: 'community', num: '09', label: 'Community Strategie', icon: '⬡', component: dynamic(() => import('./sections/09_Community')) },
  { id: 'roadmap', num: '10', label: '12-Maanden Roadmap', icon: '⟶', component: dynamic(() => import('./sections/10_Roadmap')) },
  { id: 'ai', num: '11', label: 'AI & Automation', icon: '⚡', component: dynamic(() => import('./sections/11_AI')) },
  { id: 'firststeps', num: '12', label: 'Eerste Stappen', icon: '▶', component: dynamic(() => import('./sections/12_FirstSteps')) },
  { id: 'bonus', num: '13', label: 'Bonus & Valkuilen', icon: '★', component: dynamic(() => import('./sections/13_Bonus')) },
]

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState(sections[0].id)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const current = sections.find((s) => s.id === activeSection)
  const ActiveComponent = current?.component

  const currentIndex = sections.findIndex((s) => s.id === activeSection)
  const prev = currentIndex > 0 ? sections[currentIndex - 1] : null
  const next = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-base-900 font-sans">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-base-950 border-b border-base-500 h-14 flex items-center px-4 gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 text-text-muted hover:text-text-primary transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent-orange rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">N</span>
            </div>
            <span className="font-bold text-text-primary text-sm tracking-tight">NullPoint</span>
            <span className="text-text-muted text-xs hidden sm:inline">Pro Audio Platform</span>
          </div>
          <span className="hidden sm:block text-base-400">|</span>
          <span className="hidden sm:block text-xs text-text-muted">Strategisch Platform Plan</span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs text-text-muted hidden md:inline">
            FS Entertainment — {new Date().getFullYear()}
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span className="text-xs text-accent-green">Live</span>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-14 left-0 bottom-0 w-64 bg-base-800 border-r border-base-500 z-40 overflow-y-auto transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-3">
          <p className="text-xs font-mono text-text-dim uppercase tracking-widest px-2 py-2 mb-1">
            Strategie Secties
          </p>
          <nav className="space-y-0.5">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id)
                  setSidebarOpen(false)
                }}
                className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  activeSection === section.id
                    ? 'bg-accent-orange/15 text-accent-orange border border-accent-orange/25'
                    : 'text-text-muted hover:text-text-secondary hover:bg-base-700'
                }`}
              >
                <span className="font-mono text-xs w-6 flex-shrink-0 opacity-60">{section.num}</span>
                <span className="flex-1 truncate">{section.label}</span>
                {activeSection === section.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-orange flex-shrink-0" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-base-500 mt-4">
          <div className="card-sm py-3">
            <p className="text-xs text-text-muted mb-1">Platform</p>
            <p className="text-xs font-mono text-accent-amber">Ghost CMS + Hetzner</p>
            <p className="text-xs text-text-muted mt-2">Aanbevolen naam</p>
            <p className="text-xs font-semibold text-accent-orange">NullPoint.pro</p>
            <p className="text-xs text-text-muted mt-2">Totale infra-kosten</p>
            <p className="text-xs font-mono text-accent-green">~€25-30/maand</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-64 pt-14 min-h-screen">
        {/* Breadcrumb */}
        <div className="border-b border-base-600 bg-base-800/50 px-6 py-2 flex items-center gap-2 text-xs text-text-muted sticky top-14 z-20 backdrop-blur-sm">
          <span>Platform Strategie</span>
          <span className="text-base-400">›</span>
          <span className="text-accent-orange">{current?.num}. {current?.label}</span>
          <div className="ml-auto flex gap-2">
            {prev && (
              <button
                onClick={() => setActiveSection(prev.id)}
                className="flex items-center gap-1 px-2 py-1 rounded bg-base-700 hover:bg-base-600 text-text-muted hover:text-text-secondary transition-colors"
              >
                ← {prev.label.substring(0, 15)}{prev.label.length > 15 ? '…' : ''}
              </button>
            )}
            {next && (
              <button
                onClick={() => setActiveSection(next.id)}
                className="flex items-center gap-1 px-2 py-1 rounded bg-base-700 hover:bg-base-600 text-text-muted hover:text-text-secondary transition-colors"
              >
                {next.label.substring(0, 15)}{next.label.length > 15 ? '…' : ''} →
              </button>
            )}
          </div>
        </div>

        {/* Section content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {ActiveComponent && <ActiveComponent />}
        </div>

        {/* Bottom navigation */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex justify-between gap-4">
          {prev ? (
            <button
              onClick={() => setActiveSection(prev.id)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-base-700 border border-base-500 hover:border-base-400 text-text-secondary hover:text-text-primary transition-all"
            >
              <span>←</span>
              <div className="text-left">
                <p className="text-xs text-text-muted">Vorige</p>
                <p className="text-sm font-medium">{prev.num}. {prev.label}</p>
              </div>
            </button>
          ) : <div />}
          {next ? (
            <button
              onClick={() => setActiveSection(next.id)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-accent-orange/10 border border-accent-orange/30 hover:bg-accent-orange/20 text-text-secondary hover:text-text-primary transition-all"
            >
              <div className="text-right">
                <p className="text-xs text-text-muted">Volgende</p>
                <p className="text-sm font-medium">{next.num}. {next.label}</p>
              </div>
              <span className="text-accent-orange">→</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-accent-green/10 border border-accent-green/30 text-accent-green">
              <span>✓</span>
              <p className="text-sm font-medium">Strategie Compleet</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
