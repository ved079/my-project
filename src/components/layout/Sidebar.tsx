'use client'

import Image from 'next/image'
import {
  LayoutDashboard, BarChart2, TrendingUp, Users, ArrowRightLeft,
  Target, Shield, DollarSign, MessageCircle, Calendar,
  Activity, Zap, Bell, Settings, Swords, Calculator,
} from 'lucide-react'
import type { Page } from '@/lib/types'

export function Sidebar({ active, onNavigate }: { active: Page; onNavigate: (p: Page) => void }) {
  const navGroups = [
    {
      label: 'ANALYTICS',
      items: [
        { id: 'overview' as Page, label: 'Overview', icon: LayoutDashboard },
        { id: 'channels' as Page, label: 'Channel Performance', icon: BarChart2 },
        { id: 'revenue' as Page, label: 'Revenue Impact', icon: TrendingUp },
        { id: 'cohort' as Page, label: 'Cohort Analysis', icon: BarChart2 },
        { id: 'competition' as Page, label: 'Competition', icon: Swords },
      ]
    },
    {
      label: 'LEADS',
      items: [
        { id: 'leads' as Page, label: 'All Leads', icon: Users },
        { id: 'pipeline' as Page, label: 'Pipeline', icon: LayoutDashboard },
        { id: 'assign' as Page, label: 'Assign & Transfer', icon: ArrowRightLeft },
      ]
    },
    {
      label: 'OPERATIONS',
      items: [
        { id: 'goals' as Page, label: 'Goals', icon: Target },
        { id: 'sla' as Page, label: 'SLA & Escalation', icon: Shield },
        { id: 'budget' as Page, label: 'Budget Pacing', icon: DollarSign },
      ]
    },
    {
      label: 'AUTOMATION',
      items: [
        { id: 'rules' as Page, label: 'Auto-Assign Rules', icon: Shield },
        { id: 'attribution' as Page, label: 'Attribution Flow', icon: ArrowRightLeft },
        { id: 'roi-calc' as Page, label: 'ROI Calculator', icon: Calculator },
      ]
    },
    {
      label: 'COMMUNICATION',
      items: [
        { id: 'whatsapp' as Page, label: 'WhatsApp Hub', icon: MessageCircle },
        { id: 'calendar' as Page, label: 'Content Calendar', icon: Calendar },
      ]
    },
    {
      label: 'CONTENT & SEO',
      items: [
        { id: 'seo' as Page, label: 'SEO Health', icon: Activity },
        { id: 'automation' as Page, label: 'Automation Hub', icon: Zap },
      ]
    },
    {
      label: 'SYSTEM',
      items: [
        { id: 'alerts' as Page, label: 'Alerts', icon: Bell, badge: '3' },
        { id: 'settings' as Page, label: 'Settings', icon: Settings },
      ]
    },
  ]

  return (
    <aside className="dash-sidebar">
      <div className="dash-sidebar-logo">
        <Image src="/logo.svg" alt="Newmi Care" width={100} height={28} style={{ height: 28, width: 'auto' }} />
        <div className="dash-sidebar-logo-label">Marketing OS</div>
      </div>

      <nav className="dash-sidebar-nav">
        {navGroups.map(group => (
          <div key={group.label}>
            <div className="dash-sidebar-group-label">{group.label}</div>
            {group.items.map(item => (
              <div
                key={item.id}
                className={`dash-sidebar-item ${active === item.id ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') onNavigate(item.id) }}
              >
                <item.icon className="sidebar-icon" />
                <span>{item.label}</span>
                {'badge' in item && item.badge && <span className="dash-sidebar-badge">{item.badge}</span>}
              </div>
            ))}
          </div>
        ))}
      </nav>

      <div className="dash-sidebar-footer">
        <div className="dash-sidebar-avatar">NM</div>
        <div className="dash-sidebar-footer-info">
          <div className="dash-sidebar-footer-name">Newmi Care</div>
          <div className="dash-sidebar-footer-role">Gurugram · Marketing</div>
        </div>
      </div>
    </aside>
  )
}
