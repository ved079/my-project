'use client'

import { ArrowDown } from 'lucide-react'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip,
  AreaChart, Area,
} from 'recharts'
import {
  tooltipStyle,
  RIYA_PERFORMANCE_SCORECARD, RIYA_SERVICE_BREAKDOWN, RIYA_RESPONSE_TREND,
  RIYA_SOURCE_EFFECTIVENESS, RIYA_REVENUE_CORRELATION, RIYA_FUNNEL,
} from '@/lib/data'

export function MyPerformancePage() {
  return (
    <div className="riya-performance">
      {/* Weekly Scorecard */}
      <div className="section-label">Weekly Scorecard</div>
      <div className="section-heading">My Performance</div>
      <div className="section-subtitle">Your metrics vs targets and team averages</div>

      <div className="report-table-wrap" style={{ marginBottom: 24 }}>
        <table className="report-table">
          <thead>
            <tr>
              <th>Metric</th><th>Mine</th><th>Target</th><th>Team Avg</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {RIYA_PERFORMANCE_SCORECARD.map(row => (
              <tr key={row.metric}>
                <td style={{ fontWeight: 500, color: '#111827' }}>{row.metric}</td>
                <td style={{ fontWeight: 700, color: '#111827' }}>{row.mine}</td>
                <td>{row.target}</td>
                <td>{row.teamAvg}</td>
                <td>
                  <span className={`riya-perf-status riya-perf-${row.status}`}>
                    {row.status === 'above' ? '\u2713 Above' : row.status === 'on-track' ? '\u2192 On Track' : '\u26A0 Below'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Service-wise Breakdown + SLA Meter */}
      <div className="riya-perf-row">
        <div className="chart-panel" style={{ flex: 1 }}>
          <div className="chart-panel-title">Service-wise Breakdown</div>
          <div className="report-table-wrap" style={{ margin: 0, boxShadow: 'none', border: 'none' }}>
            <table className="report-table">
              <thead>
                <tr><th>Service</th><th>Inquiries</th><th>Converted</th><th>Revenue</th><th>CVR</th></tr>
              </thead>
              <tbody>
                {RIYA_SERVICE_BREAKDOWN.map(row => (
                  <tr key={row.service}>
                    <td style={{ fontWeight: 500, color: '#111827' }}>{row.service}</td>
                    <td>{row.inquiries}</td>
                    <td>{row.converted}</td>
                    <td style={{ fontWeight: 600, color: row.revenue !== '\u20B90' ? '#059669' : '#6B7280' }}>{row.revenue}</td>
                    <td>{row.cvr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="chart-panel" style={{ flex: 1 }}>
          <div className="chart-panel-title">SLA Compliance</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '12px 0' }}>
            <div className="riya-sla-meter">
              <svg width="100" height="100" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="#059669" strokeWidth="10"
                  strokeDasharray={`${91 * 3.14} ${100 * 3.14}`} strokeDashoffset="0"
                  strokeLinecap="round" transform="rotate(-90 60 60)" />
              </svg>
              <div className="riya-sla-meter-value">91%</div>
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#111827' }}>My Compliance: 91%</div>
            <div style={{ fontSize: '0.72rem', color: '#6B7280' }}>Team Average: 82%</div>
            <div className="riya-sla-legend">
              <div className="riya-sla-legend-item"><div style={{ width: 10, height: 10, borderRadius: '50%', background: '#059669' }} />Me (91%)</div>
              <div className="riya-sla-legend-item"><div style={{ width: 10, height: 10, borderRadius: '50%', background: '#E5E7EB' }} />Team Avg (82%)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Response Time Trend */}
      <div className="chart-panel">
        <div className="chart-panel-title">Response Time Trend (7 days)</div>
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={RIYA_RESPONSE_TREND}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} unit=" min" />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="riya" stroke="#BB2026" strokeWidth={2.5} dot={{ fill: '#BB2026', r: 4 }} name="Riya" />
              <Line type="monotone" dataKey="team" stroke="#D1D5DB" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Team Avg" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Source Effectiveness Table */}
      <div className="chart-panel" style={{ marginTop: 24 }}>
        <div className="chart-panel-title">Source Effectiveness — Which Channels Produce Best Leads</div>
        <div className="report-table-wrap" style={{ margin: 0, boxShadow: 'none', border: 'none' }}>
          <table className="report-table">
            <thead>
              <tr><th>Source</th><th>Inquiries</th><th>Converted</th><th>CVR</th><th>Avg Response</th><th>Revenue</th></tr>
            </thead>
            <tbody>
              {RIYA_SOURCE_EFFECTIVENESS.map(row => (
                <tr key={row.source}>
                  <td style={{ fontWeight: 500, color: '#111827' }}>{row.source}</td>
                  <td>{row.inquiries}</td>
                  <td>{row.converted}</td>
                  <td style={{ fontWeight: 600, color: row.cvr !== '0%' ? '#059669' : '#6B7280' }}>{row.cvr}</td>
                  <td>{row.avgResponse}</td>
                  <td style={{ fontWeight: 600, color: row.revenue !== '₹0' ? '#059669' : '#6B7280' }}>{row.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Contribution + Conversion Funnel */}
      <div className="riya-perf-row" style={{ marginTop: 24 }}>
        <div className="chart-panel" style={{ flex: 1 }}>
          <div className="chart-panel-title">Revenue Contribution vs Team</div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={RIYA_REVENUE_CORRELATION}>
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}K`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number, name: string) => [`₹${(v / 1000).toFixed(1)}K`, name]} />
                <Area type="monotone" dataKey="team" stackId="1" stroke="#D1D5DB" fill="#F3F4F6" strokeWidth={1.5} name="Team Total" />
                <Area type="monotone" dataKey="riya" stackId="2" stroke="#BB2026" fill="#FEE2E2" strokeWidth={2} name="My Revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="chart-panel" style={{ flex: 1 }}>
          <div className="chart-panel-title">My Conversion Funnel</div>
          <div className="riya-funnel">
            {RIYA_FUNNEL.map((stage, idx) => {
              const maxCount = RIYA_FUNNEL[0].count
              const widthPct = maxCount > 0 ? (stage.count / maxCount) * 100 : 0
              const colors = ['#BB2026', '#D97706', '#2563EB', '#059669']
              return (
                <div key={stage.stage} className="riya-funnel-stage">
                  <div className="riya-funnel-bar" style={{ width: `${widthPct}%`, background: colors[idx] || '#6B7280', minWidth: 80 }}>
                    <span className="riya-funnel-label">{stage.stage}</span>
                    <span className="riya-funnel-count">{stage.count}</span>
                  </div>
                  {idx < RIYA_FUNNEL.length - 1 && (
                    <div className="riya-funnel-drop">
                      <ArrowDown size={12} style={{ color: '#9CA3AF' }} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
