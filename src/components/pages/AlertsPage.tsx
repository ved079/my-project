'use client'

import { useState } from 'react'
import { XCircle, AlertTriangle, AlertCircle, Bell, CheckCircle } from 'lucide-react'
import {
  GRAY,
  ALERTS_DATA,
} from '@/lib/data'

export function AlertsPage() {
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? ALERTS_DATA
    : filter === 'Critical' ? ALERTS_DATA.filter(a => a.severity === 'crit')
    : filter === 'Resolved' ? []
    : ALERTS_DATA.filter(a => {
        if (filter === 'Leads') return a.category === 'Leads'
        if (filter === 'SEO') return a.category === 'SEO'
        if (filter === 'Channels') return a.category === 'Channels'
        return true
      })

  const sevIcon = (sev: string) => {
    switch (sev) {
      case 'crit': return <XCircle size={16} />
      case 'high': return <AlertTriangle size={16} />
      case 'med': return <AlertCircle size={16} />
      case 'low': return <Bell size={16} />
      case 'success': return <CheckCircle size={16} />
      default: return <AlertCircle size={16} />
    }
  }

  return (
    <div>
      <p className="section-label">SMART ALERTS</p>
      <h2 className="section-heading">Things That Need Your Attention</h2>
      <p className="section-subtitle">Automated alerts based on your marketing data.</p>

      <div className="alert-filter-tabs">
        {['All', 'Critical', 'Leads', 'SEO', 'Channels', 'Resolved'].map(f => (
          <button key={f} className={`alert-filter-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      <div className="alert-list">
        {filtered.map((alert, i) => (
          <div key={i} className={`alert-row a-${alert.severity}`}>
            <div className="alert-icon">{sevIcon(alert.severity)}</div>
            <div className="alert-body">
              <div className="alert-title">{alert.title}</div>
              <div className="alert-desc">{alert.desc}</div>
            </div>
            <div className="alert-right">
              <span className="alert-time">{alert.time}</span>
              <button className="alert-action-btn">View</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: GRAY, fontSize: '0.88rem' }}>No alerts in this category.</div>
        )}
      </div>
    </div>
  )
}
