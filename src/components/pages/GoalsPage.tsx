'use client'

import { Users, TrendingUp, DollarSign, Clock } from 'lucide-react'
import {
  ACCENT, HEADING, GRAY, GOALS_DATA,
} from '@/lib/data'

export function GoalsPage() {
  const pacingPct = Math.round((GOALS_DATA[0].current / GOALS_DATA[0].target) * 100)
  const daysElapsed = 22
  const daysInMonth = 30
  const timePct = Math.round((daysElapsed / daysInMonth) * 100)
  const projectedPct = Math.round((pacingPct / timePct) * 100)

  return (
    <div>
      <p className="section-label">OPERATIONS</p>
      <h2 className="section-heading">Monthly Target Tracker</h2>
      <p className="section-subtitle">Track progress against your monthly goals. CEO-friendly visibility.</p>

      <div className="suggestion-banner" style={{ marginBottom: '20px' }}>
        <strong>Monthly Pacing:</strong> At current rate, you&apos;ll hit <strong>{projectedPct}%</strong> of target
        {projectedPct >= 100 ? ' — on track to exceed goals!' : ` — will miss by ${100 - projectedPct}%`}
        <span style={{ marginLeft: '12px', color: GRAY, fontWeight: 400 }}>| Day {daysElapsed} of {daysInMonth} ({timePct}% time elapsed)</span>
      </div>

      <div className="kpi-grid-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {GOALS_DATA.map((goal, i) => {
          const pct = Math.round((goal.current / goal.target) * 100)
          const isResponseTime = goal.label === 'Response Time'
          const displayPct = isResponseTime ? Math.round(((goal.target - goal.current) / goal.target) * 100 + 100 - ((goal.target - goal.current) / goal.target) * 100) : pct
          const actualPct = isResponseTime ? Math.round(((goal.target - goal.current + goal.target) / goal.target) * 0) : pct
          const barPct = isResponseTime ? Math.round((goal.current / goal.target) * 100) : pct
          const barColor = isResponseTime ? (barPct <= 73 ? '#059669' : barPct <= 90 ? '#D97706' : '#BB2026') : (pct >= 90 ? '#059669' : pct >= 70 ? '#D97706' : '#BB2026')
          const formattedCurrent = goal.unit === '₹' ? `₹${(goal.current / 100000).toFixed(1)}L` : `${goal.current}${goal.unit ? ` ${goal.unit}` : ''}`
          const formattedTarget = goal.unit === '₹' ? `₹${(goal.target / 100000).toFixed(0)}L` : `${goal.target}${goal.unit ? ` ${goal.unit}` : ''}`
          const goalIconMap: Record<string, typeof Users> = { Leads: Users, Conversions: TrendingUp, Revenue: DollarSign, 'Response Time': Clock }
          const GIcon = goal.icon || goalIconMap[goal.label] || Users

          return (
            <div key={i} className="chart-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: '#FEF2F2', color: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GIcon size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: HEADING }}>{goal.label}</div>
                  <div style={{ fontSize: '0.72rem', color: GRAY }}>Monthly Target</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '2rem', fontWeight: 700, color: HEADING, lineHeight: 1 }}>{formattedCurrent}</span>
                <span style={{ fontSize: '0.82rem', color: GRAY }}>of {formattedTarget}</span>
              </div>

              <div style={{ width: '100%', height: 10, background: '#F3F4F6', borderRadius: 5, overflow: 'hidden', marginBottom: '8px' }}>
                <div style={{ width: `${Math.min(barPct, 100)}%`, height: '100%', borderRadius: 5, background: barColor, transition: 'width 0.5s ease' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: GRAY, marginBottom: '16px' }}>
                <span style={{ fontWeight: 600, color: barColor }}>{isResponseTime ? `${goal.current}/${goal.target} min (lower is better)` : `${pct}% complete`}</span>
                <span>{goal.target - goal.current > 0 && !isResponseTime ? `${goal.target - goal.current} to go` : isResponseTime ? 'Under target ✓' : 'Target reached ✓'}</span>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 600, color: GRAY, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Weekly Pace</div>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: 32 }}>
                  {goal.weeklyPace.map((w, j) => {
                    const maxW = Math.max(...goal.weeklyPace)
                    return (
                      <div key={j} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                        <div style={{ width: '100%', height: `${Math.max(4, (w / (maxW + 1)) * 28)}px`, borderRadius: 3, background: j === goal.weeklyPace.length - 1 ? barColor : '#E5E7EB' }} />
                        <span style={{ fontSize: '0.58rem', color: GRAY }}>W{j + 1}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
