'use client'

import { useState } from 'react'
import { Zap, RefreshCw, FileText, Code, Search, Globe } from 'lucide-react'
import {
  AUTO_TOOLS,
} from '@/lib/data'
import { useToastStore } from '@/store/toast-store'

export function AutomationPage() {
  const [runningTool, setRunningTool] = useState<string | null>(null)
  const [completedTools, setCompletedTools] = useState<Set<string>>(new Set())

  const handleRun = (id: string) => {
    setRunningTool(id)
    useToastStore.getState().addToast('Tool running...', 'info')
    setTimeout(() => {
      setRunningTool(null)
      setCompletedTools(prev => new Set([...prev, id]))
      useToastStore.getState().addToast('Tool completed ✓', 'success')
    }, 1500)
  }

  return (
    <div>
      <p className="section-label">AUTOMATION HUB</p>
      <h2 className="section-heading">AI-Powered Marketing Tools</h2>
      <p className="section-subtitle">Automated tools to boost your search visibility and content.</p>

      <div className="auto-grid">
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

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
