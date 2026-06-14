'use client'

import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts'
import {
  ACCENT, AMBER, GRAY, HEADING, CHART_1, CHART_2, CHART_3, CHART_5, ORANGE, tooltipStyle,
  BUDGET_CHANNELS, DAILY_SPEND_TREND,
} from '@/lib/data'

export function BudgetPage() {
  const totalBudget = BUDGET_CHANNELS.reduce((s, c) => s + c.budget, 0)
  const totalSpent = BUDGET_CHANNELS.reduce((s, c) => s + c.spent, 0)
  const totalPct = Math.round((totalSpent / totalBudget) * 100)

  return (
    <div>
      <p className="section-label">OPERATIONS</p>
      <h2 className="section-heading">Budget Pacing Engine</h2>
      <p className="section-subtitle">Per-channel budget vs spend with auto-pause warnings.</p>

      <div className="kpi-grid-4">
        <div className="kpi-card">
          <div className="kpi-label">Total Budget</div>
          <div className="kpi-value">₹{(totalBudget / 1000).toFixed(0)}K</div>
          <div className="kpi-delta up">This month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Spent</div>
          <div className="kpi-value">₹{(totalSpent / 1000).toFixed(0)}K</div>
          <div className={`kpi-delta ${totalPct > 85 ? 'down' : 'up'}`}>{totalPct}% of budget</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Remaining</div>
          <div className="kpi-value">₹{((totalBudget - totalSpent) / 1000).toFixed(0)}K</div>
          <div className="kpi-delta up">8 days left</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg Daily Spend</div>
          <div className="kpi-value">₹{(totalSpent / 22 / 1000).toFixed(1)}K</div>
          <div className="kpi-delta up">Last 22 days</div>
        </div>
      </div>

      <div className="chart-panel" style={{ marginBottom: '24px' }}>
        <div className="chart-panel-title">Budget vs Spend by Channel</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {BUDGET_CHANNELS.map((ch, i) => {
            const pct = Math.round((ch.spent / ch.budget) * 100)
            const barColor = ch.status === 'warning' ? ACCENT : ch.status === 'under' ? CHART_5 : AMBER
            return (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: HEADING }}>{ch.channel}</span>
                    {ch.status === 'warning' && <span style={{ fontSize: '0.65rem', padding: '1px 6px', borderRadius: 4, background: '#FEF2F2', color: ACCENT, fontWeight: 600 }}>⚠ Will pause in 2 days</span>}
                    {ch.status === 'under' && <span style={{ fontSize: '0.65rem', padding: '1px 6px', borderRadius: 4, background: '#ECFDF5', color: '#059669', fontWeight: 600 }}>Under-spending</span>}
                  </div>
                  <div style={{ display: 'flex', gap: 16, fontSize: '0.72rem', color: GRAY }}>
                    <span>₹{(ch.spent / 1000).toFixed(1)}K / ₹{(ch.budget / 1000).toFixed(0)}K</span>
                    <span style={{ fontWeight: 600, color: barColor }}>{pct}%</span>
                  </div>
                </div>
                <div style={{ width: '100%', height: 8, background: '#F3F4F6', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', borderRadius: 4, background: barColor, transition: 'width 0.5s ease' }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="chart-panel">
        <div className="chart-panel-title">Daily Spend Trend</div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={DAILY_SPEND_TREND}>
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} label={{ value: 'Day of Month', position: 'insideBottom', offset: -2, fontSize: 10, fill: '#6B7280' }} />
            <YAxis hide />
            <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`, '']} />
            <Area type="monotone" dataKey="google" stackId="1" stroke={CHART_1} fill={CHART_1} fillOpacity={0.6} name="Google Ads" />
            <Area type="monotone" dataKey="meta" stackId="1" stroke={CHART_3} fill={CHART_3} fillOpacity={0.6} name="Meta Ads" />
            <Area type="monotone" dataKey="practo" stackId="1" stroke={ORANGE} fill={ORANGE} fillOpacity={0.5} name="Practo" />
            <Area type="monotone" dataKey="whatsapp" stackId="1" stroke={CHART_5} fill={CHART_5} fillOpacity={0.4} name="WhatsApp" />
            <Area type="monotone" dataKey="content" stackId="1" stroke={CHART_2} fill={CHART_2} fillOpacity={0.4} name="Content/SEO" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
