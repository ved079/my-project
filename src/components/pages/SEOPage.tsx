'use client'

import { Search, FileText, Code, Globe, Unlink, Activity } from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts'
import {
  ACCENT, ORANGE, AMBER,
  SEO_METRICS, SEO_ISSUES,
} from '@/lib/data'

export function SEOPage() {
  return (
    <div>
      <p className="section-label">SEO HEALTH</p>
      <h2 className="section-heading">Your Search Visibility Score</h2>
      <p className="section-subtitle">How well Newmi can be found by patients searching online.</p>

      {/* Score */}
      <div style={{ marginBottom: '24px' }}>
        <div className="health-score-number">5<span style={{ fontSize: '1.5rem', color: '#6B7280' }}>/100</span></div>
        <div className="health-score-label">Critical — Immediate action required</div>
      </div>

      {/* Metric Cards */}
      <div className="health-grid">
        {SEO_METRICS.map((m, i) => {
          const seoIconMap: Record<string, typeof Search> = { 'Pages Indexed': FileText, 'Core Web Vitals': Activity, 'Schema Markup': Code, 'Mobile Score': Globe, 'Broken Links': Unlink, 'GEO Readiness': Activity }
          const MetricIcon = m.icon || seoIconMap[m.label] || Activity
          return (
          <div key={i} className={`health-card hc-${m.severity}`}>
            <div className="health-card-icon"><MetricIcon size={18} /></div>
            <div style={{ flex: 1 }}>
              <div className="health-card-label">{m.label}</div>
              <div className="health-card-value">{m.value}</div>
              <div className="health-card-delta">{m.severity === 'crit' ? 'Critical' : m.severity === 'high' ? 'Needs attention' : 'Monitor'}</div>
            </div>
            <div style={{ width: '60px', height: '28px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={m.spark.map((v, j) => ({ week: `W${j + 1}`, score: v }))}>
                  <Line type="monotone" dataKey="score" stroke={m.severity === 'crit' ? ACCENT : m.severity === 'high' ? ORANGE : AMBER} strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          )
        })}
      </div>

      {/* Issues Table */}
      <div className="report-table-wrap">
        <table className="report-table">
          <thead>
            <tr><th>Priority</th><th>Issue</th><th>Page</th><th>Fix</th><th>Effort</th><th>Impact</th></tr>
          </thead>
          <tbody>
            {SEO_ISSUES.map((issue, i) => {
              const sevClass = issue.priority === 'Critical' ? 'severity-critical' : issue.priority === 'High' ? 'severity-high' : issue.priority === 'Medium' ? 'severity-medium' : 'severity-low'
              return (
                <tr key={i} className={sevClass}>
                  <td style={{ fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase' }}>{issue.priority}</td>
                  <td>{issue.issue}</td>
                  <td style={{ fontSize: '0.75rem', fontFamily: 'monospace', opacity: 0.8 }}>{issue.page}</td>
                  <td>{issue.fix}</td>
                  <td>{issue.effort}</td>
                  <td style={{ fontWeight: 600 }}>{issue.impact}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
