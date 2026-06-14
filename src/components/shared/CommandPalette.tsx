'use client'

import { useState, useRef } from 'react'
import {
  LayoutDashboard, Users, BarChart2, TrendingUp, ArrowRightLeft,
  Target, Clock, DollarSign, MessageCircle, Calendar,
  Activity, Zap, Bell, Settings, Swords, Shield, Calculator,
  FileText,
} from 'lucide-react'
import type { Page } from '@/lib/types'
import { ALL_LEADS } from '@/lib/data'

export function CommandPalette({ open, onClose, onNavigate, onLeadSelect }: {
  open: boolean; onClose: () => void; onNavigate: (p: Page) => void; onLeadSelect: (lead: typeof ALL_LEADS[0]) => void
}) {
  return open ? (
    <CommandPaletteInner onClose={onClose} onNavigate={onNavigate} onLeadSelect={onLeadSelect} />
  ) : null
}

function CommandPaletteInner({ onClose, onNavigate, onLeadSelect }: {
  onClose: () => void; onNavigate: (p: Page) => void; onLeadSelect: (lead: typeof ALL_LEADS[0]) => void
}) {
  const [query, setQueryState] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const pages: Array<{ id: Page; label: string; icon: typeof LayoutDashboard }> = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'channels', label: 'Channel Performance', icon: BarChart2 },
    { id: 'revenue', label: 'Revenue Impact', icon: TrendingUp },
    { id: 'leads', label: 'All Leads', icon: Users },
    { id: 'pipeline', label: 'Pipeline', icon: LayoutDashboard },
    { id: 'assign', label: 'Assign & Transfer', icon: ArrowRightLeft },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'sla', label: 'SLA & Escalation', icon: Shield },
    { id: 'budget', label: 'Budget Pacing', icon: DollarSign },
    { id: 'whatsapp', label: 'WhatsApp Hub', icon: MessageCircle },
    { id: 'calendar', label: 'Content Calendar', icon: Calendar },
    { id: 'seo', label: 'SEO Health', icon: Activity },
    { id: 'automation', label: 'Automation Hub', icon: Zap },
    { id: 'cohort', label: 'Cohort Analysis', icon: BarChart2 },
    { id: 'competition', label: 'Competition', icon: Swords },
    { id: 'rules', label: 'Auto-Assign Rules', icon: Shield },
    { id: 'attribution', label: 'Attribution Flow', icon: ArrowRightLeft },
    { id: 'roi-calc', label: 'ROI Calculator', icon: Calculator },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const actions = [
    { label: 'Assign Lead', icon: Users, action: () => { onNavigate('assign'); onClose() } },
    { label: 'Create Rule', icon: Shield, action: () => { onNavigate('rules'); onClose() } },
    { label: 'Run Audit', icon: Activity, action: () => { onNavigate('seo'); onClose() } },
    { label: 'Export Report', icon: FileText, action: () => { onNavigate('channels'); onClose() } },
  ]

  const filteredPages = query ? pages.filter(p => p.label.toLowerCase().includes(query.toLowerCase())) : pages
  const filteredLeads = query ? ALL_LEADS.filter(l => l.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5) : []
  const filteredActions = query ? actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase())) : actions

  const allItems = [
    ...filteredPages.map(p => ({ type: 'page' as const, ...p })),
    ...filteredLeads.map(l => ({ type: 'lead' as const, id: l.id, label: l.name, icon: Users, meta: l.source, lead: l })),
    ...filteredActions.map(a => ({ type: 'action' as const, id: a.label, label: a.label, icon: a.icon, action: a.action })),
  ]

  const setQuery = (val: string) => {
    setQueryState(val)
    setActiveIdx(0)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, allItems.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter' && allItems[activeIdx]) {
      const item = allItems[activeIdx]
      if (item.type === 'page') { onNavigate(item.id as Page); onClose() }
      else if (item.type === 'lead' && 'lead' in item) { onLeadSelect(item.lead); onClose() }
      else if (item.type === 'action' && 'action' in item) { (item as { action: () => void }).action() }
    }
  }

  return (
    <div className="cmd-overlay" onClick={onClose}>
      <div className="cmd-card" onClick={e => e.stopPropagation()} onKeyDown={handleKeyDown}>
        <input ref={inputRef} className="cmd-input" placeholder="Search pages, leads, actions..." value={query} onChange={e => setQuery(e.target.value)} autoFocus />
        <div className="cmd-results">
          {filteredPages.length > 0 && (
            <>
              <div className="cmd-group-label">Pages</div>
              {filteredPages.map((p, i) => {
                const idx = allItems.findIndex(a => a.type === 'page' && a.id === p.id)
                return (
                  <div key={p.id} className={`cmd-item ${idx === activeIdx ? 'active' : ''}`} onClick={() => { onNavigate(p.id); onClose() }} onMouseEnter={() => setActiveIdx(idx)}>
                    <p.icon className="cmd-item-icon" /><span>{p.label}</span>
                  </div>
                )
              })}
            </>
          )}
          {filteredLeads.length > 0 && (
            <>
              <div className="cmd-group-label">Leads</div>
              {filteredLeads.map((l, i) => {
                const idx = allItems.findIndex(a => a.type === 'lead' && a.id === l.id)
                return (
                  <div key={l.id} className={`cmd-item ${idx === activeIdx ? 'active' : ''}`} onClick={() => { onLeadSelect(l); onClose() }} onMouseEnter={() => setActiveIdx(idx)}>
                    <Users className="cmd-item-icon" /><span>{l.name}</span><span className="cmd-item-meta">{l.source}</span>
                  </div>
                )
              })}
            </>
          )}
          {filteredActions.length > 0 && (
            <>
              <div className="cmd-group-label">Quick Actions</div>
              {filteredActions.map((a, i) => {
                const idx = allItems.findIndex(ai => ai.type === 'action' && ai.id === a.label)
                return (
                  <div key={a.label} className={`cmd-item ${idx === activeIdx ? 'active' : ''}`} onClick={a.action} onMouseEnter={() => setActiveIdx(idx)}>
                    <a.icon className="cmd-item-icon" /><span>{a.label}</span>
                  </div>
                )
              })}
            </>
          )}
          {allItems.length === 0 && <div style={{ padding: '20px', textAlign: 'center', color: 'var(--meta)', fontSize: '0.82rem' }}>No results found</div>}
        </div>
      </div>
    </div>
  )
}
