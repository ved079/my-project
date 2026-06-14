'use client'

import { useState } from 'react'
import { ArrowUp } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts'
import {
  ORANGE, AMBER, HEADING, GRAY, CHART_1, tooltipStyle,
  CHANNEL_TABLE, CHANNEL_BAR_DATA, ROI_BAR_DATA,
} from '@/lib/data'

export function ChannelsPage() {
  const [activeChannel, setActiveChannel] = useState('All')

  return (
    <div>
      <p className="section-label">MARKETING CHANNELS</p>
      <h2 className="section-heading">What&apos;s Working, What&apos;s Not</h2>
      <p className="section-subtitle">Channel-by-channel performance breakdown.</p>

      {/* Channel Tabs */}
      <div className="channel-tabs">
        {['All', 'Google Ads', 'Meta Ads', 'Organic', 'Practo', 'WhatsApp'].map(ch => (
          <button key={ch} className={`channel-tab ${activeChannel === ch ? 'active' : ''}`} onClick={() => setActiveChannel(ch)}>{ch}</button>
        ))}
      </div>

      {/* Summary Row */}
      <div className="summary-row">
        <div className="summary-card-border" style={{ borderLeftColor: '#059669' }}>
          <div className="summary-card-border-label">Best CPL</div>
          <div className="summary-card-border-value">WhatsApp \u20B9100</div>
        </div>
        <div className="summary-card-border">
          <div className="summary-card-border-label">Highest Volume</div>
          <div className="summary-card-border-value">Google Ads 106</div>
        </div>
        <div className="summary-card-border" style={{ borderLeftColor: '#059669' }}>
          <div className="summary-card-border-label">Best Conv. Rate</div>
          <div className="summary-card-border-value">WhatsApp 22%</div>
        </div>
        <div className="summary-card-border" style={{ borderLeftColor: ORANGE }}>
          <div className="summary-card-border-label">Total Spend</div>
          <div className="summary-card-border-value">\u20B997,500</div>
        </div>
        <div className="summary-card-border" style={{ borderLeftColor: AMBER }}>
          <div className="summary-card-border-label">Blended CPL</div>
          <div className="summary-card-border-value">\u20B9313</div>
        </div>
      </div>

      {/* Channel Table */}
      <div className="report-table-wrap">
        <table className="report-table">
          <thead>
            <tr>
              <th>Channel</th><th>Budget (\u20B9)</th><th>Spend (\u20B9)</th><th>Leads</th><th>CPL (\u20B9)</th>
              <th>Contacts</th><th>Consultations</th><th>Converted</th><th>Conv.%</th><th>ROI</th><th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {CHANNEL_TABLE.map((ch, i) => {
              const sevClass = ch.roiVal >= 500 || ch.roi === '\u221E' ? 'severity-success' : ch.roiVal > 200 ? 'severity-medium' : 'severity-high'
              return (
                <tr key={i} className={sevClass}>
                  <td style={{ fontWeight: 600, color: HEADING }}>{ch.channel}</td>
                  <td>{ch.budget}</td><td>{ch.spend}</td><td>{ch.leads}</td><td>{ch.cpl}</td>
                  <td>{ch.contacts}</td><td>{ch.consultations}</td><td>{ch.converted}</td><td>{ch.cvr}</td>
                  <td style={{ fontWeight: 700 }}>{ch.roi}</td>
                  <td>{ch.trend === 'up' ? <ArrowUp size={14} style={{ color: '#059669' }} /> : <span style={{ color: GRAY }}>\u2194</span>}</td>
                </tr>
              )
            })}
            <tr className="total-row">
              <td>TOTAL</td><td>\u20B91,08,000</td><td>\u20B997,500</td><td>312</td><td>\u20B9313</td>
              <td>257</td><td>100</td><td>42</td><td>13.5%</td><td>380%</td><td></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Charts */}
      <div className="chart-row-2">
        <div className="chart-panel">
          <div className="chart-panel-title">Spend vs Leads per Channel</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={CHANNEL_BAR_DATA}>
              <XAxis dataKey="channel" tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="spend" fill={CHART_1} name="Spend (\u20B9)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="leads" fill={AMBER} name="Leads" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-panel">
          <div className="chart-panel-title">ROI by Channel</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={ROI_BAR_DATA} layout="vertical">
              <XAxis type="number" hide />
              <YAxis dataKey="channel" type="category" tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} width={80} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="roi" fill={AMBER} name="ROI %" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
