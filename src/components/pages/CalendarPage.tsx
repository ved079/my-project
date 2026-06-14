'use client'

import { Plus } from 'lucide-react'
import {
  ACCENT, AMBER, GRAY, HEADING, CHART_5,
  CALENDAR_ITEMS,
} from '@/lib/data'

export function CalendarPage() {
  const daysInMonth = 30
  const startDay = 6
  const statusColors: Record<string, string> = { Published: '#059669', Scheduled: '#D97706', Draft: '#6B7280' }
  const typeColors: Record<string, string> = { Blog: '#BB2026', Social: '#D97706', GBP: '#059669', Ad: '#2563EB', Web: '#6B7280' }

  const published = CALENDAR_ITEMS.filter(c => c.status === 'Published').length
  const scheduled = CALENDAR_ITEMS.filter(c => c.status === 'Scheduled').length
  const draft = CALENDAR_ITEMS.filter(c => c.status === 'Draft').length

  return (
    <div>
      <p className="section-label">COMMUNICATION</p>
      <h2 className="section-heading">Content Calendar</h2>
      <p className="section-subtitle">Plan and track all content across blog, social, and GBP.</p>

      <div className="kpi-grid-4">
        <div className="kpi-card"><div className="kpi-label">Draft</div><div className="kpi-value" style={{ color: GRAY }}>{draft}</div><div className="kpi-delta down">Needs work</div></div>
        <div className="kpi-card"><div className="kpi-label">Scheduled</div><div className="kpi-value" style={{ color: AMBER }}>{scheduled}</div><div className="kpi-delta up">Ready to go</div></div>
        <div className="kpi-card"><div className="kpi-label">Published</div><div className="kpi-value" style={{ color: CHART_5 }}>{published}</div><div className="kpi-delta up">This month</div></div>
        <div className="kpi-card">
          <div className="kpi-label">Total Items</div>
          <div className="kpi-value">{CALENDAR_ITEMS.length}</div>
          <button style={{ marginTop: 4, padding: '4px 12px', borderRadius: 6, border: `1px solid ${ACCENT}`, background: 'white', color: ACCENT, fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Plus size={12} /> Add Content
          </button>
        </div>
      </div>

      <div className="chart-panel" style={{ marginBottom: '24px' }}>
        <div className="chart-panel-title">June 2025</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} style={{ textAlign: 'center', fontSize: '0.68rem', fontWeight: 600, color: GRAY, padding: '6px 0', borderBottom: '1px solid var(--border)' }}>{d}</div>
          ))}
          {Array.from({ length: startDay }, (_, i) => <div key={`empty-${i}`} />)}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1
            const items = CALENDAR_ITEMS.filter(c => c.day === day)
            return (
              <div key={day} style={{ minHeight: 64, padding: '4px 6px', borderRadius: 6, border: '1px solid var(--border)', background: items.length ? '#FAFAFA' : 'white', fontSize: '0.68rem' }}>
                <div style={{ fontWeight: 600, color: HEADING, marginBottom: 2 }}>{day}</div>
                {items.map((item, j) => (
                  <div key={j} style={{ fontSize: '0.58rem', padding: '1px 4px', borderRadius: 3, background: typeColors[item.type] || GRAY, color: 'white', marginBottom: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>

      <div className="report-table-wrap">
        <table className="report-table">
          <thead>
            <tr><th>Day</th><th>Title</th><th>Type</th><th>Assignee</th><th>Status</th></tr>
          </thead>
          <tbody>
            {CALENDAR_ITEMS.map((item, i) => (
              <tr key={i} className={item.status === 'Published' ? 'severity-success' : item.status === 'Scheduled' ? 'severity-medium' : ''}>
                <td>Jun {item.day}</td>
                <td style={{ fontWeight: 600, color: HEADING }}>{item.title}</td>
                <td><span style={{ fontSize: '0.65rem', padding: '1px 6px', borderRadius: 4, background: typeColors[item.type] || GRAY, color: 'white', fontWeight: 600 }}>{item.type}</span></td>
                <td>{item.assignee}</td>
                <td><span style={{ fontSize: '0.68rem', fontWeight: 600, color: statusColors[item.status] }}>{item.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
