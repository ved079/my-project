'use client'

import { useState } from 'react'
import {
  Bell, Inbox, Timer, AlertTriangle, ArrowRightLeft, CheckCircle, FileText,
} from 'lucide-react'
import {
  RIYA_NOTIFICATIONS,
} from '@/lib/data'

export function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const filtered = filter === 'all' ? RIYA_NOTIFICATIONS : RIYA_NOTIFICATIONS.filter(n => !n.read)

  const typeIcon: Record<string, { icon: typeof Bell; color: string }> = {
    'inquiry': { icon: Inbox, color: '#059669' },
    'sla': { icon: Timer, color: '#BB2026' },
    'escalation': { icon: AlertTriangle, color: '#EF4444' },
    'transfer': { icon: ArrowRightLeft, color: '#2563EB' },
    'consultation': { icon: CheckCircle, color: '#059669' },
    'digest': { icon: FileText, color: '#6B7280' },
  }

  return (
    <div className="riya-notifications">
      <div className="section-label">Alerts</div>
      <div className="section-heading">Notifications</div>
      <div className="section-subtitle">Real-time alerts for your inquiries and tasks</div>

      <div className="riya-notif-filters">
        <button className={`alert-filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All ({RIYA_NOTIFICATIONS.length})</button>
        <button className={`alert-filter-tab ${filter === 'unread' ? 'active' : ''}`} onClick={() => setFilter('unread')}>Unread ({RIYA_NOTIFICATIONS.filter(n => !n.read).length})</button>
      </div>

      <div className="riya-notif-list">
        {filtered.map(notif => {
          const conf = typeIcon[notif.type] || { icon: Bell, color: '#6B7280' }
          const Icon = conf.icon
          return (
            <div key={notif.id} className={`riya-notif-card ${notif.type === 'sla' || notif.type === 'escalation' ? 'a-crit' : notif.type === 'inquiry' ? 'a-med' : notif.type === 'transfer' ? 'a-high' : notif.type === 'consultation' ? 'a-success' : 'a-low'}`}>
              <div className="alert-icon"><Icon size={18} /></div>
              <div className="riya-notif-body">
                <div className="riya-notif-title">{notif.title}</div>
                <div className="riya-notif-detail">{notif.detail}</div>
              </div>
              <div className="riya-notif-right">
                <span className="riya-notif-time">{notif.time}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
