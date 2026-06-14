'use client'

import { useState } from 'react'
import { Zap, RefreshCw, FileText, Code, Search, Globe, LayoutTemplate, X } from 'lucide-react'
import {
  AUTO_TOOLS,
  REVENUE_SERVICES,
} from '@/lib/data'
import { useToastStore } from '@/store/toast-store'

interface LandingGenResult {
  heroHeadline: string
  heroSubheadline: string
  features: { title: string; description: string }[]
  ctas: { primary: string; secondary: string }
  colorPalette: { primary: string; secondary: string; accent: string }
  fontPairing: { heading: string; body: string }
}

export function AutomationPage() {
  const [runningTool, setRunningTool] = useState<string | null>(null)
  const [completedTools, setCompletedTools] = useState<Set<string>>(new Set())
  const [showLandingGen, setShowLandingGen] = useState(false)
  const [selectedService, setSelectedService] = useState(REVENUE_SERVICES[0]?.service || 'Pregnancy Care')
  const [practiceName, setPracticeName] = useState('Newmi Care')
  const [generating, setGenerating] = useState(false)
  const [landingResult, setLandingResult] = useState<LandingGenResult | null>(null)

  const handleRun = (id: string) => {
    setRunningTool(id)
    useToastStore.getState().addToast('Tool running...', 'info')
    setTimeout(() => {
      setRunningTool(null)
      setCompletedTools(prev => new Set([...prev, id]))
      useToastStore.getState().addToast('Tool completed ✓', 'success')
    }, 1500)
  }

  const generateLanding = async () => {
    setGenerating(true)
    setLandingResult(null)
    try {
      const res = await fetch('/api/automation/landing-gen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceSlug: selectedService, practiceName: practiceName.trim() || 'Newmi Care' }),
      })
      const data = await res.json()
      setLandingResult(data)
      useToastStore.getState().addToast('Landing page generated ✓', 'success')
    } catch {
      useToastStore.getState().addToast('Generation failed', 'error')
    } finally {
      setGenerating(false)
    }
  }

  const copyField = (label: string, value: string) => {
    navigator.clipboard.writeText(value)
    useToastStore.getState().addToast(`${label} copied`, 'success')
  }

  return (
    <div>
      <p className="section-label">AUTOMATION HUB</p>
      <h2 className="section-heading">AI-Powered Marketing Tools</h2>
      <p className="section-subtitle">Automated tools to boost your search visibility and content.</p>

      <div className="auto-grid">
        <div className="auto-card auto-card-special" onClick={() => setShowLandingGen(true)} style={{ cursor: 'pointer' }}>
          <div className="auto-card-icon"><LayoutTemplate size={22} /></div>
          <div className="auto-card-title">Landing Page Generator</div>
          <div className="auto-card-desc">Generate AI-powered landing pages for any service.</div>
          <button className="auto-run-btn" onClick={(e) => { e.stopPropagation(); setShowLandingGen(true) }}>
            <Zap size={14} /> Generate
          </button>
        </div>
        {AUTO_TOOLS.map(tool => {
          const autoIconMap: Record<string, typeof Zap> = { meta: FileText, schema: Code, content: Search, geo: Globe }
          const ToolIcon = tool.icon || autoIconMap[tool.id] || Zap
          return (
          <div key={tool.id} className="auto-card">
            <div className="auto-card-icon"><ToolIcon size={22} /></div>
            <div className="auto-card-title">{tool.title}</div>
            <div className="auto-card-desc">{tool.desc}</div>
            <button className="auto-run-btn" onClick={() => handleRun(tool.id)} disabled={runningTool === tool.id}>
              {runningTool === tool.id ? (
                <><RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> Running...</>
              ) : (
                <><Zap size={14} /> Run</>
              )
              }
            </button>
            {completedTools.has(tool.id) && (
              <div className="auto-output">{tool.output}</div>
            )}
          </div>
          )
        })}
      </div>

      {showLandingGen && (
        <div className="lp-overlay" onClick={() => setShowLandingGen(false)}>
          <div className="lp-gen-dialog" onClick={e => e.stopPropagation()}>
            <div className="lp-gen-header">
              <h3>Landing Page Generator</h3>
              <button className="lp-gen-close" onClick={() => setShowLandingGen(false)}><X size={20} /></button>
            </div>
            <div className="lp-gen-body">
              <div className="lp-gen-field">
                <label>Service</label>
                <select value={selectedService} onChange={e => setSelectedService(e.target.value)}>
                  {REVENUE_SERVICES.filter(s => s.service).map(s => (
                    <option key={s.service} value={s.service}>{s.service}</option>
                  ))}
                </select>
              </div>
              <div className="lp-gen-field">
                <label>Practice Name</label>
                <input type="text" value={practiceName} onChange={e => setPracticeName(e.target.value)} placeholder="e.g. Newmi Care" />
              </div>
              <button className="lp-gen-submit" onClick={generateLanding} disabled={generating}>
                {generating ? <><RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> Generating...</> : 'Generate Landing Page'}
              </button>

              {landingResult && (
                <div className="lp-gen-result">
                  <div className="lp-gen-result-field">
                    <label>Hero Headline</label>
                    <div className="lp-gen-value">{landingResult.heroHeadline}</div>
                    <button className="lp-gen-copy" onClick={() => copyField('Hero Headline', landingResult.heroHeadline)}><FileText size={14} /> Copy</button>
                  </div>
                  <div className="lp-gen-result-field">
                    <label>Hero Subheadline</label>
                    <div className="lp-gen-value">{landingResult.heroSubheadline}</div>
                    <button className="lp-gen-copy" onClick={() => copyField('Hero Subheadline', landingResult.heroSubheadline)}><FileText size={14} /> Copy</button>
                  </div>
                  <div className="lp-gen-result-field">
                    <label>Features</label>
                    {landingResult.features.map((f, i) => (
                      <div key={i} className="lp-gen-value" style={{ marginBottom: 4 }}>• <strong>{f.title}</strong>: {f.description}</div>
                    ))}
                    <button className="lp-gen-copy" onClick={() => copyField('Features', JSON.stringify(landingResult.features, null, 2))}><FileText size={14} /> Copy</button>
                  </div>
                  <div className="lp-gen-result-field">
                    <label>CTAs</label>
                    <div className="lp-gen-value">Primary: {landingResult.ctas.primary} / Secondary: {landingResult.ctas.secondary}</div>
                    <button className="lp-gen-copy" onClick={() => copyField('CTAs', JSON.stringify(landingResult.ctas))}><FileText size={14} /> Copy</button>
                  </div>
                  <div className="lp-gen-result-field">
                    <label>Colors</label>
                    <div className="lp-gen-value">
                      Primary <span style={{ display:'inline-block', width:16, height:16, background:landingResult.colorPalette.primary, borderRadius:4, verticalAlign:'middle' }} /> {landingResult.colorPalette.primary}
                      {' | '}Secondary <span style={{ display:'inline-block', width:16, height:16, background:landingResult.colorPalette.secondary, borderRadius:4, verticalAlign:'middle' }} /> {landingResult.colorPalette.secondary}
                      {' | '}Accent <span style={{ display:'inline-block', width:16, height:16, background:landingResult.colorPalette.accent, borderRadius:4, verticalAlign:'middle' }} /> {landingResult.colorPalette.accent}
                    </div>
                    <button className="lp-gen-copy" onClick={() => copyField('Colors', JSON.stringify(landingResult.colorPalette))}><FileText size={14} /> Copy</button>
                  </div>
                  <div className="lp-gen-result-field">
                    <label>Font Pairing</label>
                    <div className="lp-gen-value">{landingResult.fontPairing.heading} + {landingResult.fontPairing.body}</div>
                    <button className="lp-gen-copy" onClick={() => copyField('Font Pairing', JSON.stringify(landingResult.fontPairing))}><FileText size={14} /> Copy</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
