'use client'

import {
  ACCENT, AMBER, GRAY, HEADING, CHART_5,
  SLA_RULES, SLA_BREACHES_LIVE, SLA_ESCALATIONS,
} from '@/lib/data'
import { LiveTimer } from '@/components/shared/LiveTimer'

export function SLAPage() {
  return (
    <div>
      <p className="section-label">OPERATIONS</p>
      <h2 className="section-heading">SLA &amp; Escalation</h2>
      <p className="section-subtitle">Response time compliance and active escalations.</p>

      <div className="kpi-grid-4">
        <div className="kpi-card" style={{ textAlign: 'center', padding: '24px' }}>
          <div style={{ fontSize: '3rem', fontWeight: 700, color: AMBER, lineHeight: 1 }}>87%</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: HEADING, marginTop: 4 }}>SLA Compliance</div>
          <div style={{ fontSize: '0.72rem', color: GRAY, marginTop: 2 }}>Overall this month</div>
        </div>
        <div className="kpi-card" style={{ textAlign: 'center', padding: '24px' }}>
          <div style={{ fontSize: '3rem', fontWeight: 700, color: ACCENT, lineHeight: 1 }}>6</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: HEADING, marginTop: 4 }}>SLA Breaches</div>
          <div style={{ fontSize: '0.72rem', color: GRAY, marginTop: 2 }}>This month</div>
        </div>
        <div className="kpi-card" style={{ textAlign: 'center', padding: '24px' }}>
          <div style={{ fontSize: '3rem', fontWeight: 700, color: CHART_5, lineHeight: 1 }}>4.2</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: HEADING, marginTop: 4 }}>Avg Response (min)</div>
          <div style={{ fontSize: '0.72rem', color: GRAY, marginTop: 2 }}>Target: &lt;15 min</div>
        </div>
        <div className="kpi-card" style={{ textAlign: 'center', padding: '24px' }}>
          <div style={{ fontSize: '3rem', fontWeight: 700, color: ACCENT, lineHeight: 1 }}>4</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: HEADING, marginTop: 4 }}>Active Escalations</div>
          <div style={{ fontSize: '0.72rem', color: GRAY, marginTop: 2 }}>3 to manager, 1 to CEO</div>
        </div>
      </div>

      <div className="report-table-wrap">
        <table className="report-table">
          <thead>
            <tr><th>SLA Rule</th><th>Threshold</th><th>Compliance</th><th>Status</th></tr>
          </thead>
          <tbody>
            {SLA_RULES.map((r, i) => (
              <tr key={i} className={r.compliance >= 90 ? 'severity-success' : r.compliance >= 75 ? 'severity-medium' : 'severity-high'}>
                <td style={{ fontWeight: 600, color: HEADING }}>{r.rule}</td>
                <td>{r.threshold}</td>
                <td style={{ fontWeight: 700 }}>{r.compliance}%</td>
                <td>
                  <span className={`status-pill ${r.compliance >= 90 ? 'status-converted' : r.compliance >= 75 ? 'status-contacted' : 'status-new'}`}>
                    {r.compliance >= 90 ? 'On Track' : r.compliance >= 75 ? 'At Risk' : 'Breached'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="chart-row-2">
        <div className="chart-panel">
          <div className="chart-panel-title">SLA Breaches</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SLA_BREACHES_LIVE.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8, background: b.severity === 'red' ? 'var(--crit-bg)' : 'var(--med-bg)', borderLeft: `3px solid ${b.severity === 'red' ? 'var(--accent-red)' : 'var(--med-border)'}` }}>
                <div className={`urgency-dot urgency-${b.severity}`} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--navy)' }}>{b.lead}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--meta)' }}>Assigned: {b.assignedTo}</div>
                </div>
                <LiveTimer thresholdMinutes={b.thresholdMinutes} elapsedMinutes={b.elapsedMinutes} />
              </div>
            ))}
          </div>
        </div>
        <div className="chart-panel">
          <div className="chart-panel-title">Active Escalations</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {SLA_ESCALATIONS.map((e, i) => (
              <div key={i} style={{ padding: '14px 16px', borderRadius: 8, border: '1px solid var(--border)', background: '#FEF2F2' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: HEADING }}>Escalated to {e.level}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: ACCENT }}>{e.count} leads</span>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {e.leads.map((l, j) => (
                    <span key={j} style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 4, background: 'white', border: '1px solid var(--border)', color: HEADING, fontWeight: 500 }}>{l}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
