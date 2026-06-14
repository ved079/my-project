'use client'

import { ChevronRight } from 'lucide-react'
import type { ViewMode, RiyaTab } from '@/lib/types'
import { ViewToggle } from './ViewToggle'

const RIYA_TAB_LABELS: Record<RiyaTab, string> = {
  command: 'Command Center',
  tasks: 'My Tasks',
  inquiries: 'My Inquiries',
  performance: 'My Performance',
  activity: 'My Activity',
  notifications: 'Notifications',
}

export function RiyaTopbar({ activeTab, viewMode, onViewChange }: { activeTab: RiyaTab; viewMode: ViewMode; onViewChange: (v: ViewMode) => void }) {
  return (
    <div className="dash-topbar">
      <div className="dash-topbar-breadcrumb">
        My Workspace <ChevronRight size={12} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 4px' }} />{' '}
        <span>{RIYA_TAB_LABELS[activeTab]}</span>
      </div>
      <div className="dash-topbar-right">
        <ViewToggle viewMode={viewMode} onViewChange={onViewChange} />
        <span className="dash-topbar-meta">
          {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
      </div>
    </div>
  )
}
