'use client'

import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts'
import {
  ATTRIBUTION_JOURNEYS,
} from '@/lib/data'
import { AnimatedNumber } from '@/components/shared/AnimatedNumber'

export function AttributionPage() {
  const [model, setModel] = useState<'first' | 'last' | 'linear'>('first')

  return (
    <div>
      <p className="section-label">AUTOMATION</p>
      <h2 className="section-heading">Multi-Touch Attribution</h2>
      <p className="section-subtitle">Visual journey flow showing how leads convert through multiple touchpoints.</p>

      <div className="kpi-grid-4">
        <div className="kpi-card" style={{ textAlign: 'center', padding: '24px' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#059669', lineHeight: 1 }}><AnimatedNumber value="2.8" /></div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginTop: 4 }}>Avg Touchpoints</div>
        </div>
        <div className="kpi-card" style={{ textAlign: 'center', padding: '24px' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-red)', lineHeight: 1 }}>42%</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginTop: 4 }}>Top First Touch: Google Ads</div>
        </div>
        <div className="kpi-card" style={{ textAlign: 'center', padding: '24px' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#D97706', lineHeight: 1 }}>35%</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginTop: 4 }}>Top Last Touch: WhatsApp</div>
        </div>
        <div className="kpi-card" style={{ textAlign: 'center', padding: '24px' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#059669', lineHeight: 1 }}>₹96K</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginTop: 4 }}>Attributed Revenue</div>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--navy)', marginBottom: 8 }}>Attribution Model</div>
        <div className="channel-tabs">
          {(['first', 'last', 'linear'] as const).map(m => (
            <button key={m} className={`channel-tab ${model === m ? 'active' : ''}`} onClick={() => setModel(m)}>
              {m === 'first' ? 'First Touch' : m === 'last' ? 'Last Touch' : 'Linear'}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-panel" style={{ marginBottom: 24 }}>
        <div className="chart-panel-title">Attribution Journeys</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ATTRIBUTION_JOURNEYS.map(journey => (
            <div key={journey.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)', background: journey.converted ? 'var(--success-bg)' : 'var(--crit-bg)' }}>
              <div className="attribution-flow">
                {journey.touchpoints.map((tp, i) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <span className={`attribution-node ${tp === 'Converted' ? 'node-converted' : tp === 'Lost' ? 'node-lost' : ''}`}>{tp}</span>
                    {i < journey.touchpoints.length - 1 && <span className="attribution-arrow">→</span>}
                  </span>
                ))}
                <span className="attribution-value" style={{ color: journey.converted ? '#059669' : '#DC2626' }}>{journey.revenue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chart-row-2">
        <div className="chart-panel">
          <div className="chart-panel-title">First Touch Attribution</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={[{ channel: 'Google Ads', value: 42 }, { channel: 'Meta Ads', value: 28 }, { channel: 'Organic', value: 18 }, { channel: 'Practo', value: 8 }, { channel: 'WhatsApp', value: 4 }]} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--meta)' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="channel" tick={{ fontSize: 11, fill: 'var(--body)' }} axisLine={false} tickLine={false} width={80} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--white)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '0.78rem' }} />
              <Bar dataKey="value" fill="var(--accent-red)" radius={[0, 4, 4, 0]} name="%" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-panel">
          <div className="chart-panel-title">Last Touch Attribution</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={[{ channel: 'WhatsApp', value: 35 }, { channel: 'Consultation', value: 30 }, { channel: 'Phone Call', value: 20 }, { channel: 'Direct', value: 10 }, { channel: 'Other', value: 5 }]} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--meta)' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="channel" tick={{ fontSize: 11, fill: 'var(--body)' }} axisLine={false} tickLine={false} width={80} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--white)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '0.78rem' }} />
              <Bar dataKey="value" fill="#D97706" radius={[0, 4, 4, 0]} name="%" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
