'use client'

import {
  Home, ListTodo, Inbox, BarChart3, Clock, Bell, MessageSquare, Sparkles,
} from 'lucide-react'
import type { RiyaTab } from '@/lib/types'

export function RiyaSidebar({ activeTab, onTabChange }: { activeTab: RiyaTab; onTabChange: (t: RiyaTab) => void }) {
  const navItems: Array<{ tab: RiyaTab; icon: typeof Home; label: string; badge?: string }> = [
    { tab: 'command', icon: Home, label: 'Command Center' },
    { tab: 'tasks', icon: ListTodo, label: 'My Tasks', badge: '8' },
    { tab: 'inquiries', icon: Inbox, label: 'My Inquiries', badge: '5' },
    { tab: 'scoring', icon: Sparkles, label: 'Lead Scoring' },
    { tab: 'performance', icon: BarChart3, label: 'My Performance' },
  ]
  const quickItems: Array<{ tab?: RiyaTab; icon: typeof Bell; label: string; badge?: string; soon?: boolean }> = [
    { tab: 'activity', icon: Clock, label: 'My Activity' },
    { tab: 'notifications', icon: Bell, label: 'Notifications', badge: '3' },
    { icon: MessageSquare, label: 'WhatsApp', soon: false },
  ]

  return (
    <aside className="dash-sidebar riya-sidebar">
      <div className="dash-sidebar-logo">
        <img src="https://newmi.in/assets/newmi-care-Logo.svg" alt="Newmi Care" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
        <div className="dash-sidebar-logo-label">Marketing Desk</div>
      </div>
      <nav className="dash-sidebar-nav">
        <div className="dash-sidebar-group-label">My Workspace</div>
        {navItems.map(item => {
          const Icon = item.icon
          return (
            <div key={item.tab} className={`dash-sidebar-item ${activeTab === item.tab ? 'active' : ''}`} onClick={() => onTabChange(item.tab)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') onTabChange(item.tab) }}>
              <Icon size={18} className="sidebar-icon" />
              <span>{item.label}</span>
              {item.badge && <span className="dash-sidebar-badge">{item.badge}</span>}
            </div>
          )
        })}
        <div className="dash-sidebar-group-label" style={{ marginTop: 16 }}>Quick Access</div>
        {quickItems.map(item => {
          const Icon = item.icon
          return (
            <div key={item.label} className={`dash-sidebar-item ${item.tab && activeTab === item.tab ? 'active' : ''} ${item.soon ? 'riya-sidebar-soon' : ''}`}
              onClick={() => item.tab && onTabChange(item.tab)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' && item.tab) onTabChange(item.tab) }}>
              <Icon size={18} className="sidebar-icon" />
              <span>{item.label}</span>
              {item.badge && <span className="dash-sidebar-badge">{item.badge}</span>}
              {item.soon && <span style={{ fontSize: '0.6rem', color: '#6B7280', marginLeft: 'auto', fontWeight: 600 }}>Soon</span>}
            </div>
          )
        })}
      </nav>
      <div className="dash-sidebar-footer">
        <div className="dash-sidebar-avatar" style={{ background: '#FEF2F2', color: '#BB2026' }}>RS</div>
        <div className="dash-sidebar-footer-info">
          <div className="dash-sidebar-footer-name">Riya Sharma</div>
          <div className="dash-sidebar-footer-role" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>Lead Executive <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#059669', display: 'inline-block' }} /></div>
        </div>
      </div>
    </aside>
  )
}
