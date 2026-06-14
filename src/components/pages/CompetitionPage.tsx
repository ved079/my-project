'use client'

import { Swords } from 'lucide-react'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
} from 'recharts'
import {
  ACCENT, AMBER, GRAY, HEADING, CHART_5, tooltipStyle,
  COMPETITORS, KEYWORD_OVERLAP, SHARED_KEYWORDS_DATA, COMPETITOR_ACTIVITY,
} from '@/lib/data'

export function CompetitionPage() {
  return (
    <div>
      <p className="section-label">ANALYTICS</p>
      <h2 className="section-heading">Competitor Tracker</h2>
      <p className="section-subtitle">Monitor competitor activity, keywords, and market positioning.</p>

      <div className="kpi-grid-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {COMPETITORS.map((comp, i) => (
          <div key={i} className="chart-panel" style={{ borderLeft: `4px solid ${comp.threat === 'high' ? ACCENT : AMBER}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: HEADING }}>{comp.name}</span>
              <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: 4, background: comp.threat === 'high' ? '#FEF2F2' : '#FFFBEB', color: comp.threat === 'high' ? ACCENT : AMBER, fontWeight: 600 }}>
                {comp.threat === 'high' ? 'High Threat' : 'Medium Threat'}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                <span style={{ color: GRAY }}>Est. Ad Spend</span>
                <span style={{ fontWeight: 600, color: HEADING }}>{comp.adSpend}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                <span style={{ color: GRAY }}>Keywords Ranked</span>
                <span style={{ fontWeight: 600, color: HEADING }}>{comp.keywords}</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: GRAY, borderTop: '1px solid var(--border)', paddingTop: 6, marginTop: 2 }}>
                <span style={{ fontWeight: 500 }}>Top keywords: </span>{comp.topKeywords}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-row-2">
        <div className="report-table-wrap">
          <table className="report-table">
            <thead>
              <tr><th>Keyword</th><th>Newmi</th><th>Cloudnine</th><th>Artemis</th><th>Fortis</th></tr>
            </thead>
            <tbody>
              {KEYWORD_OVERLAP.map((kw, i) => (
                <tr key={i} className={kw.ourRank <= 10 ? 'severity-success' : kw.ourRank <= 20 ? 'severity-medium' : 'severity-high'}>
                  <td style={{ fontWeight: 600, color: HEADING, fontSize: '0.78rem' }}>{kw.keyword}</td>
                  <td style={{ fontWeight: 700, color: kw.ourRank <= 10 ? CHART_5 : kw.ourRank <= 20 ? AMBER : ACCENT }}>#{kw.ourRank}</td>
                  <td>#{kw.cloudnine}</td>
                  <td>#{kw.artemis}</td>
                  <td>#{kw.fortis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="chart-panel">
          <div className="chart-panel-title">Shared Keywords Distribution</div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={SHARED_KEYWORDS_DATA} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={2}>
                {SHARED_KEYWORDS_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="donut-legend">
            {SHARED_KEYWORDS_DATA.map((s, i) => (
              <div key={i} className="donut-legend-item">
                <div className="donut-legend-dot" style={{ background: s.color }} />
                <span>{s.name}</span>
                <span className="donut-legend-pct">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="chart-panel">
        <div className="chart-panel-title">Recent Competitor Activity</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {COMPETITOR_ACTIVITY.map((act, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'white' }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Swords size={16} style={{ color: ACCENT }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: HEADING }}>{act.competitor}</div>
                <div style={{ fontSize: '0.75rem', color: GRAY }}>{act.action}</div>
              </div>
              <span style={{ fontSize: '0.68rem', color: GRAY, whiteSpace: 'nowrap' }}>{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
