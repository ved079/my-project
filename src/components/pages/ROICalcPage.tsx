'use client'

import { useState, useEffect } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts'
import type { ToastType } from '@/lib/types'
import { useToastStore } from '@/store/toast-store'
import { AnimatedNumber } from '@/components/shared/AnimatedNumber'

export function ROICalcPage() {
  const [adSpend, setAdSpend] = useState(50000)
  const [cpl, setCpl] = useState(425)
  const [consultRate, setConsultRate] = useState(14)
  const [convRate, setConvRate] = useState(12)
  const [ticketSize, setTicketSize] = useState(22000)

  const leads = Math.round(adSpend / cpl)
  const consultations = Math.round(leads * consultRate / 100)
  const conversions = Math.round(consultations * convRate / 100)
  const revenue = conversions * ticketSize
  const roi = adSpend > 0 ? Math.round(((revenue - adSpend) / adSpend) * 100) : 0
  const costPerConversion = conversions > 0 ? Math.round(adSpend / conversions) : 0

  const optConsultRate = 22
  const optConvRate = 18
  const optLeads = leads
  const optConsultations = Math.round(optLeads * optConsultRate / 100)
  const optConversions = Math.round(optConsultations * optConvRate / 100)
  const optRevenue = optConversions * ticketSize
  const optRoi = adSpend > 0 ? Math.round(((optRevenue - adSpend) / adSpend) * 100) : 0

  const fmt = (n: number) => '₹' + n.toLocaleString('en-IN')
  const scenarioData = [
    { label: 'Leads', current: leads, optimized: optLeads },
    { label: 'Consultations', current: consultations, optimized: optConsultations },
    { label: 'Conversions', current: conversions, optimized: optConversions },
    { label: 'Revenue (₹K)', current: Math.round(revenue / 1000), optimized: Math.round(optRevenue / 1000) },
  ]

  return (
    <div>
      <p className="section-label">AUTOMATION</p>
      <h2 className="section-heading">ROI Calculator</h2>
      <p className="section-subtitle">Interactive calculator for client meetings — see ROI in real time.</p>

      <div className="chart-row-2">
        <div className="chart-panel">
          <div className="chart-panel-title">Input Parameters</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Monthly Ad Spend', value: adSpend, setter: setAdSpend, min: 0, max: 200000, step: 5000, prefix: '₹' },
              { label: 'Expected CPL', value: cpl, setter: setCpl, min: 100, max: 1000, step: 25, prefix: '₹' },
              { label: 'Consultation Rate (%)', value: consultRate, setter: setConsultRate, min: 5, max: 40, step: 1, prefix: '' },
              { label: 'Conversion Rate (%)', value: convRate, setter: setConvRate, min: 5, max: 30, step: 1, prefix: '' },
              { label: 'Avg Ticket Size', value: ticketSize, setter: setTicketSize, min: 5000, max: 100000, step: 1000, prefix: '₹' },
            ].map(param => (
              <div key={param.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--body)' }}>{param.label}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy)' }}>{param.prefix}{param.value.toLocaleString('en-IN')}{param.label.includes('%') ? '%' : ''}</span>
                </div>
                <input type="range" className="roi-slider" min={param.min} max={param.max} step={param.step} value={param.value} onChange={e => param.setter(Number(e.target.value))} />
              </div>
            ))}
          </div>
        </div>

        <div className="chart-panel">
          <div className="chart-panel-title">Calculated Results</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Leads Generated', value: leads.toString(), color: 'var(--navy)' },
              { label: 'Consultations', value: consultations.toString(), color: '#D97706' },
              { label: 'Conversions', value: conversions.toString(), color: '#059669' },
              { label: 'Revenue', value: fmt(revenue), color: '#059669' },
              { label: 'ROI', value: `${roi}%`, color: roi >= 0 ? '#059669' : '#DC2626' },
              { label: 'Cost Per Conversion', value: fmt(costPerConversion), color: 'var(--body)' },
            ].map(item => (
              <div key={item.label} style={{ padding: '12px', borderRadius: 8, background: 'var(--bg-alt)' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--meta)', marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: item.color }}><AnimatedNumber value={item.value} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="chart-row-2">
        <div className="chart-panel">
          <div className="chart-panel-title">Scenario Comparison</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={scenarioData}>
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'var(--meta)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--meta)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--white)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '0.78rem' }} />
              <Bar dataKey="current" fill="var(--accent-red)" name="Current" radius={[4, 4, 0, 0]} />
              <Bar dataKey="optimized" fill="#059669" name="Optimized" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', color: 'var(--body)' }}><div style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--accent-red)' }} /> Current</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', color: 'var(--body)' }}><div style={{ width: 10, height: 10, borderRadius: 2, background: '#059669' }} /> Optimized (ROI: {optRoi}%)</div>
          </div>
        </div>
        <div className="chart-panel">
          <div className="chart-panel-title">Optimized Projection</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ padding: '12px', borderRadius: 8, background: 'rgba(5,150,105,0.05)', border: '1px solid rgba(5,150,105,0.15)' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--meta)', marginBottom: 2 }}>Opt. Consultations</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#059669' }}><AnimatedNumber value={optConsultations.toString()} /></div>
            </div>
            <div style={{ padding: '12px', borderRadius: 8, background: 'rgba(5,150,105,0.05)', border: '1px solid rgba(5,150,105,0.15)' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--meta)', marginBottom: 2 }}>Opt. Conversions</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#059669' }}><AnimatedNumber value={optConversions.toString()} /></div>
            </div>
            <div style={{ padding: '12px', borderRadius: 8, background: 'rgba(5,150,105,0.05)', border: '1px solid rgba(5,150,105,0.15)' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--meta)', marginBottom: 2 }}>Opt. Revenue</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#059669' }}><AnimatedNumber value={fmt(optRevenue)} /></div>
            </div>
            <div style={{ padding: '12px', borderRadius: 8, background: 'rgba(5,150,105,0.05)', border: '1px solid rgba(5,150,105,0.15)' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--meta)', marginBottom: 2 }}>Opt. ROI</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: optRoi >= 0 ? '#059669' : '#DC2626' }}><AnimatedNumber value={`${optRoi}%`} /></div>
            </div>
          </div>
          <button style={{ marginTop: 16, width: '100%', padding: '10px', borderRadius: 8, border: '1px solid var(--accent-red)', background: 'var(--white)', color: 'var(--accent-red)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }} onClick={() => useToastStore.getState().addToast('PDF export coming soon', 'info')}>Export as PDF</button>
        </div>
      </div>
    </div>
  )
}

function SLAHeroTimer({ slaMinutes, elapsedMinutes }: { slaMinutes: number; elapsedMinutes: number }) {
  const [remaining, setRemaining] = useState(slaMinutes * 60 - elapsedMinutes * 60)

  useEffect(() => {
    const interval = setInterval(() => setRemaining(prev => prev - 1), 1000)
    return () => clearInterval(interval)
  }, [])

  const isOverdue = remaining <= 0
  const totalSec = slaMinutes * 60
  const pctLeft = totalSec > 0 ? (remaining / totalSec) * 100 : 0
  const absR = Math.abs(remaining)
  const hh = Math.floor(absR / 3600)
  const mm = Math.floor((absR % 3600) / 60)
  const ss = absR % 60
  const pad = (n: number) => n.toString().padStart(2, '0')

  let severityClass = 'sla-safe'
  let label = ''
  if (isOverdue) {
    severityClass = 'sla-breached'
    label = hh > 0 ? `${hh}h ${pad(mm)}:${pad(ss)} OVERDUE` : `${pad(mm)}:${pad(ss)} OVERDUE`
  } else if (pctLeft <= 25) {
    severityClass = 'sla-breached'
    label = hh > 0 ? `${hh}h ${pad(mm)}:${pad(ss)} remaining` : `${pad(mm)}:${pad(ss)} remaining`
  } else if (pctLeft <= 50) {
    severityClass = 'sla-warning'
    label = hh > 0 ? `${hh}h ${pad(mm)}:${pad(ss)} remaining` : `${pad(mm)}:${pad(ss)} remaining`
  } else {
    label = hh > 0 ? `${hh}h ${pad(mm)}:${pad(ss)} remaining` : `${pad(mm)}:${pad(ss)} remaining`
  }

  return <span className={`sla-timer ${severityClass}`}>{label}</span>
}
