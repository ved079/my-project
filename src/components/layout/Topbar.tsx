'use client'

import {
  ChevronRight, Command, Sun, Moon, Bell, RefreshCw,
} from 'lucide-react'
import type { Page, DateRange, ViewMode, ToastType } from '@/lib/types'
import { ViewToggle } from './ViewToggle'

export function Topbar({ active, dateRange, onDateRangeChange, darkMode, onToggleDark, onOpenCmd, addToast, viewMode, onViewChange }: {
  active: Page; dateRange: DateRange; onDateRangeChange: (d: DateRange) => void; darkMode: boolean; onToggleDark: () => void; onOpenCmd: () => void; addToast: (msg: string, type: ToastType) => void; viewMode: ViewMode; onViewChange: (v: ViewMode) => void
}) {
  const sectionNames: Record<Page, string> = {
    overview: 'Overview',
    channels: 'Channel Performance',
    revenue: 'Revenue Impact',
    leads: 'All Leads',
    pipeline: 'Pipeline',
    assign: 'Assign & Transfer',
    seo: 'SEO Health',
    automation: 'Automation Hub',
    alerts: 'Alerts',
    settings: 'Settings',
    goals: 'Goals',
    sla: 'SLA & Escalation',
    budget: 'Budget Pacing',
    whatsapp: 'WhatsApp Hub',
    calendar: 'Content Calendar',
    cohort: 'Cohort Analysis',
    competition: 'Competition',
    rules: 'Auto-Assign Rules',
    attribution: 'Attribution Flow',
    'roi-calc': 'ROI Calculator',
  }

  return (
    <div className="dash-topbar">
      <div className="dash-topbar-breadcrumb">
        Newmi Care <ChevronRight size={12} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 2px' }} /> <span>{sectionNames[active]}</span>
      </div>
      <div className="dash-topbar-daterange">
        {(['7D', '30D', '90D'] as DateRange[]).map(d => (
          <button key={d} className={dateRange === d ? 'active' : ''} onClick={() => onDateRangeChange(d)}>{d}</button>
        ))}
      </div>
      <div className="dash-topbar-right">
        <ViewToggle viewMode={viewMode} onViewChange={onViewChange} />
        <button className="cmd-hint" onClick={onOpenCmd}><Command size={12} />K</button>
        <button className="theme-toggle-btn" onClick={onToggleDark} aria-label="Toggle dark mode">
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <div className="dash-topbar-bell">
          <Bell size={18} />
          <span className="dash-topbar-bell-badge">3</span>
        </div>
        <span className="dash-topbar-meta">Last synced 2m ago</span>
        <button className="dash-topbar-sync" onClick={() => addToast('Data synced ✓', 'success')}><RefreshCw size={13} /> Sync</button>
      </div>
    </div>
  )
}
