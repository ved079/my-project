'use client'

import { useState, useEffect } from 'react'
import {
  Inbox, Clock, CheckCircle, Timer, ArrowUp, ArrowDown, Phone, Calendar,
} from 'lucide-react'
import {
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts'
import {
  RIYA_URGENT_INQUIRIES, RIYA_PULSE_STATS, RIYA_SERVICE_MIX, RIYA_WEEKLY_TARGETS,
  RIYA_DAILY_TASKS, RIYA_PIPELINE_VELOCITY,
} from '@/lib/data'

const taskTypeInfo: Record<string, { color: string; bg: string; label: string }> = {
  sla_response: { color: '#BB2026', bg: '#FEF2F2', label: 'SLA' },
  follow_up: { color: '#D97706', bg: '#FFFBEB', label: 'Follow-up' },
  consultation_prep: { color: '#2563EB', bg: '#EFF6FF', label: 'Prep' },
  consultation_confirm: { color: '#059669', bg: '#ECFDF5', label: 'Confirm' },
  callback: { color: '#6B7280', bg: '#F3F4F6', label: 'Callback' },
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
  let label = ''
  let cls = 'sla-safe'
  if (isOverdue) { cls = 'sla-breached'; label = `${hh > 0 ? `${hh}h ` : ''}${pad(mm)}:${pad(ss)} overdue` }
  else if (pctLeft <= 25) { cls = 'sla-breached'; label = `${hh > 0 ? `${hh}h ` : ''}${pad(mm)}:${pad(ss)} left` }
  else if (pctLeft <= 50) { cls = 'sla-warning'; label = `${hh > 0 ? `${hh}h ` : ''}${pad(mm)}:${pad(ss)} left` }
  else { label = `${hh > 0 ? `${hh}h ` : ''}${pad(mm)}:${pad(ss)} left` }
  return <span className={`sla-timer ${cls}`}>{label}</span>
}

const severityBorder: Record<string, string> = {
  breached: 'severity-critical',
  critical: 'severity-high',
  warning: 'severity-medium',
  safe: 'severity-low',
}

const severityLabel: Record<string, { text: string; color: string; bg: string }> = {
  breached: { text: 'BREACHED', color: '#BB2026', bg: '#FEF2F2' },
  critical: { text: 'CRITICAL', color: '#C05621', bg: '#FFFAF0' },
  warning: { text: 'WARNING', color: '#D97706', bg: '#FFFBEB' },
  safe: { text: 'SAFE', color: '#059669', bg: '#ECFDF5' },
}

export function CommandCenterPage() {
  return (
    <div>
      <div className="section-label">Command Center</div>
      <div className="section-heading">Riya&apos;s Workspace</div>
      <div className="section-subtitle">Real-time overview of your inquiries, tasks, and performance metrics</div>

      {/* ─── Urgent SLA Strip ─── */}
      <div className="section-label" style={{ marginTop: 28 }}>Urgent Inquiries</div>
      <div className="cmd-urgent-strip">
        {RIYA_URGENT_INQUIRIES.map(inq => {
          const sev = severityLabel[inq.severity]
          return (
            <div key={inq.id} className={`kpi-card cmd-urgent-card ${severityBorder[inq.severity]}`}>
              <div className="cmd-urgent-head">
                <span className="cmd-urgent-badge" style={{ background: sev.bg, color: sev.color }}>{sev.text}</span>
                <SLAHeroTimer slaMinutes={inq.slaMinutes} elapsedMinutes={inq.elapsedMinutes} />
              </div>
              <div className="cmd-urgent-name">{inq.name}</div>
              <div className="cmd-urgent-service">{inq.service}</div>
              <div className="cmd-urgent-footer">
                <span style={{ fontSize: '0.7rem', color: '#6B7280' }}>SLA: {inq.slaMinutes}min</span>
                <button className="cmd-urgent-action">Contact</button>
              </div>
            </div>
          )
        })}
      </div>

      {/* ─── Today's Pulse ─── */}
      <div className="section-label" style={{ marginTop: 28 }}>Today&apos;s Pulse</div>
      <div className="kpi-grid-4" style={{ marginBottom: 24 }}>
        {RIYA_PULSE_STATS.map((stat, i) => {
          const icons = { Inbox, Clock, CheckCircle, Timer } as const
          const Icon = icons[stat.icon as keyof typeof icons] || Inbox
          const vals = stat.spark.map(v => typeof v === 'string' ? parseFloat(v) : v)
          const min = Math.min(...vals)
          const max = Math.max(...vals)
          const range = max - min || 1
          return (
            <div key={i} className="kpi-card">
              <div className="kpi-card-top">
                <div>
                  <div className="riya-pulse-label">{stat.label}</div>
                  <div className="kpi-value" style={{ fontSize: '1.55rem', fontWeight: 700, color: '#111827', letterSpacing: '-0.02em', lineHeight: 1.1, margin: '4px 0' }}>{stat.value}</div>
                  <div className={`kpi-delta ${stat.deltaDir === 'up' ? 'up' : 'down'}`}>
                    {stat.deltaDir === 'up' ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                    {stat.delta}
                  </div>
                </div>
                <div>
                  <div className="riya-pulse-icon" style={{ background: stat.bg, color: stat.color, marginBottom: 8 }}><Icon size={16} /></div>
                  <div className="cmd-sparkline">
                    {stat.spark.map((v, j) => (
                      <div key={j} className="cmd-sparkline-bar" style={{
                        height: `${Math.max(4, ((v - min) / range) * 28)}px`,
                        background: j === stat.spark.length - 1 ? stat.color : stat.color,
                        opacity: j === stat.spark.length - 1 ? 1 : 0.35,
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ─── Service Mix + Weekly Targets ─── */}
      <div className="section-label" style={{ marginTop: 28 }}>Performance Overview</div>
      <div className="riya-command-row" style={{ marginBottom: 24 }}>
        <div className="chart-panel riya-chart-panel">
          <div className="chart-panel-title">Service Mix</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ width: 180, height: 180, flexShrink: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={RIYA_SERVICE_MIX} cx="50%" cy="50%" innerRadius={48} outerRadius={78} dataKey="value" stroke="none">
                    {RIYA_SERVICE_MIX.map((entry, j) => <Cell key={j} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="donut-legend">
              {RIYA_SERVICE_MIX.map(s => (
                <div key={s.name} className="donut-legend-item">
                  <div className="donut-legend-dot" style={{ background: s.color }} />
                  {s.name}
                  <span className="donut-legend-pct">{Math.round(s.value / RIYA_SERVICE_MIX.reduce((a, b) => a + b.value, 0) * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="chart-panel riya-chart-panel">
          <div className="chart-panel-title">Weekly Target Tracker</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {RIYA_WEEKLY_TARGETS.map(t => (
              <div key={t.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 500, color: '#111827' }}>{t.label}</span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#111827' }}>{t.current}/{t.target} <span style={{ color: '#6B7280', fontWeight: 400 }}>({t.pct}%)</span></span>
                </div>
                <div className="riya-target-bar-wrap">
                  <div className="riya-target-bar-fill" style={{ width: `${t.pct}%`, background: t.pct >= 80 ? '#059669' : t.pct >= 60 ? '#D97706' : '#EF4444' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Priority Queue + Pipeline Velocity ─── */}
      <div className="section-label" style={{ marginTop: 28 }}>Focus Queue</div>
      <div className="riya-command-row" style={{ marginBottom: 24 }}>
        <div className="chart-panel riya-chart-panel">
          <div className="chart-panel-title">Priority Task Queue</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {RIYA_DAILY_TASKS.slice(0, 5).map(task => {
              const conf = taskTypeInfo[task.type] || { color: '#6B7280', bg: '#F3F4F6', label: 'Task' }
              const severityClass = task.priority === 'critical' ? 'severity-critical' : task.priority === 'high' ? 'severity-high' : task.priority === 'medium' ? 'severity-medium' : 'severity-low'
              return (
                <div key={task.id} className={`actv-entry ${severityClass}`} style={{ cursor: 'default', padding: '10px 12px' }}>
                  <div className="actv-entry-icon" style={{ color: conf.color, background: conf.bg }}>
                    <Phone size={14} />
                  </div>
                  <div className="actv-entry-body">
                    <div className="actv-entry-text" style={{ fontWeight: 500, fontSize: '0.8rem' }}>{task.title}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                      {task.service && <span className="task-svc-pill">{task.service}</span>}
                      <span style={{ fontSize: '0.68rem', color: task.status === 'overdue' ? '#EF4444' : '#6B7280', fontWeight: task.status === 'overdue' ? 600 : 400 }}>
                        {task.dueIn}
                      </span>
                    </div>
                  </div>
                  <div className="actv-entry-meta">
                    <div className="actv-entry-type" style={{ background: `${conf.color}14`, color: conf.color }}>{conf.label}</div>
                    <button className="cmd-start-btn">Start</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="chart-panel riya-chart-panel">
          <div className="chart-panel-title">Pipeline Velocity (hrs)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {RIYA_PIPELINE_VELOCITY.map(v => {
              const maxH = Math.max(v.avgHours, v.teamAvg)
              const myPct = maxH > 0 ? (v.avgHours / maxH) * 100 : 0
              const teamPct = maxH > 0 ? (v.teamAvg / maxH) * 100 : 0
              return (
                <div key={v.stage}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 500, color: '#111827', marginBottom: 6 }}>{v.stage}</div>
                  <div className="riya-velocity-bar-group">
                    <div className="riya-velocity-row">
                      <span style={{ fontSize: '0.68rem', color: '#6B7280', width: 44 }}>Me</span>
                      <div className="riya-velocity-track">
                        <div className="riya-velocity-fill riya-velocity-me" style={{ width: `${myPct}%` }} />
                      </div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#BB2026', width: 32, textAlign: 'right' }}>{v.avgHours}h</span>
                    </div>
                    <div className="riya-velocity-row">
                      <span style={{ fontSize: '0.68rem', color: '#6B7280', width: 44 }}>Team</span>
                      <div className="riya-velocity-track">
                        <div className="riya-velocity-fill riya-velocity-team" style={{ width: `${teamPct}%` }} />
                      </div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#6B7280', width: 32, textAlign: 'right' }}>{v.teamAvg}h</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ─── Quick Actions ─── */}
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        {['View All Tasks', 'My Activity', 'Performance Report'].map(label => (
          <button key={label} className="cmd-quick-btn">{label} \u2192</button>
        ))}
      </div>
    </div>
  )
}
