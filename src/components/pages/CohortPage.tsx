'use client'

import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts'
import {
  ACCENT, AMBER, GRAY, HEADING, CHART_5, tooltipStyle,
  COHORT_DATA,
} from '@/lib/data'

export function CohortPage() {
  const columns = ['Day 0', 'Day 3', 'Day 7', 'Day 14', 'Day 30']
  const maxVal = Math.max(...COHORT_DATA.flatMap(r => [r.day0, r.day3, r.day7, r.day14, r.day30]))

  const getCohortColor = (val: number, max: number) => {
    if (val === 0) return '#F9FAFB'
    const intensity = val / max
    if (intensity > 0.7) return '#BB2026'
    if (intensity > 0.5) return '#E57373'
    if (intensity > 0.3) return '#FFCDD2'
    if (intensity > 0.1) return '#FFECEE'
    return '#FFF5F5'
  }

  return (
    <div>
      <p className="section-label">ANALYTICS</p>
      <h2 className="section-heading">Cohort Analysis</h2>
      <p className="section-subtitle">Track how weekly lead cohorts convert over time.</p>

      <div className="kpi-grid-4">
        <div className="kpi-card"><div className="kpi-label">Median Time to Conversion</div><div className="kpi-value">6.5 days</div><div className="kpi-delta up">Improved from 8.2 days</div></div>
        <div className="kpi-card"><div className="kpi-label">Best Cohort Conversion</div><div className="kpi-value">W3</div><div className="kpi-delta up">29.4% at Day 30</div></div>
        <div className="kpi-card"><div className="kpi-label">Avg Retention at Day 7</div><div className="kpi-value">62%</div><div className="kpi-delta down">Needs improvement</div></div>
        <div className="kpi-card"><div className="kpi-label">Total Cohort Leads</div><div className="kpi-value">265</div><div className="kpi-delta up">+12% vs last month</div></div>
      </div>

      <div className="chart-panel" style={{ marginBottom: '24px' }}>
        <div className="chart-panel-title">Weekly Lead Cohorts — Conversion Over Time</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: HEADING, borderBottom: '2px solid var(--border)' }}>Cohort</th>
                {columns.map(col => (
                  <th key={col} style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 600, color: HEADING, borderBottom: '2px solid var(--border)' }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COHORT_DATA.map((row, i) => {
                const vals = [row.day0, row.day3, row.day7, row.day14, row.day30]
                return (
                  <tr key={i}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: HEADING, whiteSpace: 'nowrap', borderBottom: '1px solid var(--border)' }}>{row.cohort}</td>
                    {vals.map((v, j) => (
                      <td key={j} style={{ padding: '10px 14px', textAlign: 'center', borderBottom: '1px solid var(--border)', background: getCohortColor(v, maxVal), fontWeight: 600, color: v === 0 ? GRAY : HEADING }}>
                        {v > 0 ? v : '\u2014'}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
          <span style={{ fontSize: '0.68rem', color: GRAY }}>Fewer</span>
          <div style={{ width: 16, height: 16, borderRadius: 3, background: '#FFF5F5', border: '1px solid var(--border)' }} />
          <div style={{ width: 16, height: 16, borderRadius: 3, background: '#FFECEE' }} />
          <div style={{ width: 16, height: 16, borderRadius: 3, background: '#FFCDD2' }} />
          <div style={{ width: 16, height: 16, borderRadius: 3, background: '#E57373' }} />
          <div style={{ width: 16, height: 16, borderRadius: 3, background: '#BB2026' }} />
          <span style={{ fontSize: '0.68rem', color: GRAY }}>More</span>
        </div>
      </div>

      <div className="chart-panel">
        <div className="chart-panel-title">Cohort Retention Curve</div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={[{ day: 'Day 0', w1: 42, w2: 55, w3: 68 }, { day: 'Day 3', w1: 38, w2: 48, w3: 60 }, { day: 'Day 7', w1: 28, w2: 35, w3: 44 }, { day: 'Day 14', w1: 18, w2: 22, w3: 30 }, { day: 'Day 30', w1: 12, w2: 15, w3: 20 }]}>
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="w1" stroke={ACCENT} strokeWidth={2} dot={{ r: 3 }} name="W1" />
            <Line type="monotone" dataKey="w2" stroke={AMBER} strokeWidth={2} dot={{ r: 3 }} name="W2" />
            <Line type="monotone" dataKey="w3" stroke={CHART_5} strokeWidth={2} dot={{ r: 3 }} name="W3" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
