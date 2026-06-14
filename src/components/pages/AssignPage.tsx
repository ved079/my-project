'use client'

import { useState } from 'react'
import { ArrowRightLeft } from 'lucide-react'
import {
  ACCENT, HEADING,
  ALL_LEADS, TEAM_DATA, sourcePillClass,
} from '@/lib/data'
import { useToastStore } from '@/store/toast-store'

export function AssignPage() {
  const [selectedUnassigned, setSelectedUnassigned] = useState<number[]>([])

  const unassignedLeads = ALL_LEADS.filter(l => l.assignedTo === 'Unassigned').slice(0, 6)

  const toggleSelect = (id: number) => {
    setSelectedUnassigned(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <div>
      <p className="section-label">TEAM MANAGEMENT</p>
      <h2 className="section-heading">Assign Leads. Balance the Load.</h2>
      <p className="section-subtitle">Team performance and workload distribution.</p>

      {/* Team Table */}
      <div className="report-table-wrap">
        <table className="report-table">
          <thead>
            <tr>
              <th>Team Member</th><th>Leads Assigned</th><th>Contacted</th><th>Converted</th>
              <th>Conv.%</th><th>Avg Response</th><th>Workload</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {TEAM_DATA.map((m, i) => (
              <tr key={i} className={m.workload >= 100 ? 'severity-high' : m.workload > 75 ? 'severity-medium' : ''}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="lead-assignee-avatar" style={{ width: '28px', height: '28px', fontSize: '0.65rem' }}>{m.initials}</span>
                    <span style={{ fontWeight: 600, color: HEADING }}>{m.name}</span>
                  </div>
                </td>
                <td>{m.assigned}</td>
                <td>{m.contacted}</td>
                <td>{m.converted}</td>
                <td>{m.cvr}</td>
                <td>{m.avgResponse}</td>
                <td style={{ minWidth: '120px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div className="workload-bar-wrap" style={{ flex: 1 }}>
                      <div className={`workload-bar-fill ${m.workload >= 90 ? 'overloaded' : m.workload > 75 ? 'warning' : ''}`} style={{ width: `${m.workload}%` }} />
                    </div>
                    <span style={{ fontSize: '0.68rem', fontWeight: 600, color: m.workload >= 90 ? ACCENT : HEADING }}>{m.workload}%</span>
                  </div>
                </td>
                <td>
                  <button className="action-icon-btn" title="Reassign"><ArrowRightLeft size={13} /></button>
                </td>
              </tr>
            ))}
            <tr className="severity-high">
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="lead-assignee-avatar" style={{ width: '28px', height: '28px', fontSize: '0.65rem', background: ACCENT, color: '#fff' }}>!</span>
                  <span style={{ fontWeight: 600, color: ACCENT }}>Unassigned</span>
                  <span style={{ fontSize: '0.62rem', fontWeight: 700, color: ACCENT, background: '#FEF2F2', padding: '1px 6px', borderRadius: '4px' }}>URGENT</span>
                </div>
              </td>
              <td>15 leads</td><td>{'\u2014'}</td><td>{'\u2014'}</td><td>{'\u2014'}</td><td>{'\u2014'}</td><td>{'\u2014'}</td><td></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Unassigned Leads Panel */}
      <div className="unassigned-panel">
        <div className="unassigned-panel-title">Unassigned Leads</div>
        {unassignedLeads.map(lead => {
          const hoursSinceCreated = parseInt(lead.lastActivity) || 99
          const isUrgent = hoursSinceCreated > 2
          return (
            <div key={lead.id} className="unassigned-lead-item">
              <input type="checkbox" checked={selectedUnassigned.includes(lead.id)} onChange={() => toggleSelect(lead.id)} style={{ cursor: 'pointer' }} />
              <span className="unassigned-lead-name">{lead.name}</span>
              <span className={`source-pill ${sourcePillClass(lead.source)}`}>{lead.source}</span>
              <span className="unassigned-lead-service">{lead.service}</span>
              <span className={`unassigned-lead-time ${isUrgent ? '' : 'normal'}`}>{lead.lastActivity}</span>
            </div>
          )
        })}
        {selectedUnassigned.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: HEADING, fontWeight: 600 }}>{selectedUnassigned.length} selected</span>
            <select className="filter-select">
              <option>Assign to...</option>
              {TEAM_DATA.map(t => <option key={t.name}>{t.name}</option>)}
            </select>
            <button style={{ padding: '6px 14px', borderRadius: '6px', background: ACCENT, color: 'white', border: 'none', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }} onClick={() => { useToastStore.getState().addToast('Lead assigned to Riya Sharma ✓', 'success') }}>Assign</button>
          </div>
        )}
      </div>

      {/* Suggestion Banner */}
      <div className="suggestion-banner">
        <strong>Meena Patel</strong> has the highest conversion rate (36.8%) and lowest workload. Consider assigning new PCOS leads to her.
      </div>
    </div>
  )
}
