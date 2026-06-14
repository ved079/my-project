'use client'

import { ArrowUp, ArrowDown } from 'lucide-react'
import {
  AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Area,
} from 'recharts'
import {
  HEADING, CHART_1, tooltipStyle,
  REVENUE_SERVICES, REVENUE_TREND,
} from '@/lib/data'

export function RevenuePage() {
  return (
    <div>
      <p className="section-label">REVENUE INTELLIGENCE</p>
      <h2 className="section-heading">Marketing&apos;s Impact on the Bottom Line</h2>
      <p className="section-subtitle">Revenue attributed to marketing efforts and patient acquisition.</p>

      {/* KPI Row */}
      <div className="kpi-grid-4">
        {[
          { label: 'Marketing-Influenced Revenue', value: '\u20B98,40,000', delta: '18%', dir: 'up' as const },
          { label: 'Avg Revenue Per Patient', value: '\u20B922,105', delta: '6%', dir: 'up' as const },
          { label: 'Marketing ROI', value: '862%', delta: '23%', dir: 'up' as const },
          { label: 'Payback Period', value: '11 days', delta: '3 days', dir: 'up' as const },
        ].map((kpi, i) => (
          <div key={i} className="kpi-card">
            <div className="kpi-label">{kpi.label}</div>
            <div className="kpi-value">{kpi.value}</div>
            <div className={`kpi-delta ${kpi.dir === 'up' ? 'up' : 'down'}`}>
              {kpi.dir === 'up' ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
              {kpi.delta} {i === 3 ? 'improved' : 'vs last period'}
            </div>
          </div>
        ))}
      </div>

      {/* Revenue by Service Table */}
      <div className="report-table-wrap">
        <table className="report-table">
          <thead>
            <tr><th>Service</th><th>Patients</th><th>Avg Ticket</th><th>Revenue</th></tr>
          </thead>
          <tbody>
            {REVENUE_SERVICES.map((s, i) => (
              <tr key={i} className={s.patients ? 'severity-success' : ''}>
                <td style={{ fontWeight: 600, color: HEADING }}>{s.service}</td>
                <td>{s.patients ?? '\u2014'}</td>
                <td>{s.avgTicket ?? '\u2014'}</td>
                <td style={{ fontWeight: 600 }}>{s.revenue ?? '\u2014'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Revenue Trend */}
      <div className="chart-panel">
        <div className="chart-panel-title">Revenue Trend (12 Weeks)</div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={REVENUE_TREND}>
            <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`\u20B9${v.toLocaleString('en-IN')}`, 'Revenue']} />
            <Area type="monotone" dataKey="revenue" stroke={CHART_1} fill={CHART_1} fillOpacity={0.08} name="Revenue" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
