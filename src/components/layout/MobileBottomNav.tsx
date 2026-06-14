'use client'

import {
  Home, ListTodo, Inbox, BarChart3, Clock,
} from 'lucide-react'
import type { RiyaTab } from '@/lib/types'

export function MobileBottomNav({ activeTab, onTabChange }: { activeTab: RiyaTab; onTabChange: (t: RiyaTab) => void }) {
  const tabs: Array<{ tab: RiyaTab; icon: typeof Home; label: string }> = [
    { tab: 'command', icon: Home, label: 'Command' },
    { tab: 'tasks', icon: ListTodo, label: 'Tasks' },
    { tab: 'inquiries', icon: Inbox, label: 'Inquiries' },
    { tab: 'performance', icon: BarChart3, label: 'Performance' },
    { tab: 'activity', icon: Clock, label: 'Activity' },
  ]
  return (
    <nav className="riya-mobile-nav">
      {tabs.map(t => {
        const Icon = t.icon
        return (
          <button key={t.tab} className={`riya-mobile-nav-btn ${activeTab === t.tab ? 'active' : ''}`} onClick={() => onTabChange(t.tab)}>
            <Icon size={18} />
            <span>{t.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
