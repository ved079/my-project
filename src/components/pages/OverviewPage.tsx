'use client'

import { ArrowUp, ArrowDown } from 'lucide-react'
import {
  AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Area,
  PieChart, Pie, Cell,
} from 'recharts'
import {
  CHART_1, CHART_2, CHART_3, CHART_5, ORANGE, HEADING, GRAY, tooltipStyle,
  KPI_DATA, DAILY_LEAD_VOLUME, SOURCE_MIX, FUNNEL_DATA,
} from '@/lib/data'
import { AnimatedNumber } from '@/components/shared/AnimatedNumber'

export function OverviewPage() {
  return (
    <div>
      <p className="section-label">GROWTH OVERVIEW</p>
      <h2 className="section-heading">How Newmi is Growing</h2>
      <p className="section-subtitle">Key performance indicators across all marketing channels.</p>

      {/* KPI Row */}
      <div className="kpi-grid-6">
        {KPI_DATA.map((kpi, i) => (
          <div key={i} className="kpi-card">
            <div className="kpi-card-top">
              <div>
                <div className="kpi-label">{kpi.label}</div>
                <div className="kpi-value"><AnimatedNumber value={kpi.value} /></div>
                <div className={`kpi-delta ${kpi.deltaDir === 'up' ? 'up' : kpi.label === 'Cost Per Lead' ? 'down-good' : 'down'}`}>
                  {kpi.deltaDir === 'up' ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                  {kpi.delta} vs last period
                </div>
              </div>
              <div className="kpi-sparkline">
                {kpi.spark.map((v, j) => (
                  <div
                    key={j}
                    className="kpi-sparkline-bar"
                    style={{
                      height: `${Math.max(4, ((v - Math.min(...kpi.spark)) / (Math.max(...kpi.spark) - Math.min(...kpi.spark) + 0.01)) * 24)}px`,
                      opacity: j === kpi.spark.length - 1 ? 1 : 0.5,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="chart-row-3">
        {/* Daily Lead Volume */}
        <div className="chart-panel">
          <div className="chart-panel-title">Daily Lead Volume</div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={DAILY_LEAD_VOLUME}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="google" stackId="1" stroke={CHART_1} fill={CHART_1} fillOpacity={0.65} name="Google Ads" />
              <Area type="monotone" dataKey="meta" stackId="1" stroke={CHART_3} fill={CHART_3} fillOpacity={0.65} name="Meta Ads" />
              <Area type="monotone" dataKey="organic" stackId="1" stroke={CHART_2} fill={CHART_2} fillOpacity={0.55} name="Organic" />
              <Area type="monotone" dataKey="practo" stackId="1" stroke={ORANGE} fill={ORANGE} fillOpacity={0.55} name="Practo" />
              <Area type="monotone" dataKey="whatsapp" stackId="1" stroke={CHART_5} fill={CHART_5} fillOpacity={0.45} name="WhatsApp" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Source Mix */}
        <div className="chart-panel">
          <div className="chart-panel-title">Lead Source Mix</div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={SOURCE_MIX} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={2}>
                {SOURCE_MIX.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ textAlign: 'center', marginTop: '-16px', marginBottom: '8px' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 700, color: HEADING }}>312</span>
            <span style={{ fontSize: '0.68rem', color: GRAY, marginLeft: '4px' }}>Total</span>
          </div>
          <div className="donut-legend">
            {SOURCE_MIX.map((s, i) => (
              <div key={i} className="donut-legend-item">
                <div className="donut-legend-dot" style={{ background: s.color }} />
                <span>{s.name}</span>
                <span className="donut-legend-pct">{((s.value / 312) * 100).toFixed(0)}%</span>
                <span style={{ color: GRAY }}>({s.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="chart-panel">
          <div className="chart-panel-title">Conversion Funnel</div>
          <div className="funnel-container">
            {FUNNEL_DATA.map((step, i) => (
              <div key={i} className="funnel-step">
                <div className="funnel-bar-wrap">
                  <div className="funnel-bar" style={{ width: `${(step.count / 312) * 100}%` }}>
                    <span className="funnel-bar-label">{step.count}</span>
                  </div>
                </div>
                <div className="funnel-info">
                  <span className="funnel-info-name">{step.name}</span>
                </div>
                <span className="funnel-pct">{step.pct}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
