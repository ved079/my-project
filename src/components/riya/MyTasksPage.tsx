'use client'

import { useState, useMemo } from 'react'
import {
  Phone, Clock, Calendar, StickyNote, FileText, CheckCircle, AlertCircle, Inbox, ListChecks,
} from 'lucide-react'
import { RIYA_DAILY_TASKS, RIYA_SHIFT_GOALS } from '@/lib/data'
import { useToastStore } from '@/store/toast-store'

const taskTypeIcon: Record<string, { icon: typeof Phone; color: string; bg: string; label: string }> = {
  sla_response: { icon: Phone, color: '#BB2026', bg: '#FEF2F2', label: 'SLA Response' },
  follow_up: { icon: Clock, color: '#D97706', bg: '#FFFBEB', label: 'Follow Up' },
  consultation_prep: { icon: Calendar, color: '#2563EB', bg: '#EFF6FF', label: 'Consultation Prep' },
  consultation_confirm: { icon: Calendar, color: '#059669', bg: '#ECFDF5', label: 'Confirm Booking' },
  callback: { icon: Phone, color: '#6B7280', bg: '#F3F4F6', label: 'Callback' },
  note_followup: { icon: StickyNote, color: '#C05621', bg: '#FFFAF0', label: 'Note Follow-up' },
  daily_digest: { icon: FileText, color: '#6B7280', bg: '#F3F4F6', label: 'Digest' },
}

const priorityLabel: Record<string, { label: string; color: string; bg: string }> = {
  critical: { label: 'Critical', color: '#BB2026', bg: '#FEF2F2' },
  high: { label: 'High', color: '#C05621', bg: '#FFFAF0' },
  medium: { label: 'Medium', color: '#D97706', bg: '#FFFBEB' },
  low: { label: 'Low', color: '#059669', bg: '#ECFDF5' },
}

export function MyTasksPage() {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set())

  const toggleTask = (id: string) => {
    setCompletedTasks(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else { next.add(id); useToastStore.getState().addToast('Task completed', 'success') }
      return next
    })
  }

  const totalTasks = RIYA_DAILY_TASKS.length
  const completedCount = completedTasks.size
  const overdueCount = RIYA_DAILY_TASKS.filter(t => t.status === 'overdue' && !completedTasks.has(t.id)).length
  const completionPct = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0

  const sorted = useMemo(() => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 }
    return [...RIYA_DAILY_TASKS].sort((a, b) => (order[a.priority] || 99) - (order[b.priority] || 99))
  }, [])

  return (
    <div>
      <div className="section-label" style={{ marginBottom: 4 }}>Daily Tasks</div>
      <div className="section-heading" style={{ marginBottom: 4 }}>Today&apos;s Task Queue</div>
      <div className="section-subtitle" style={{ marginBottom: 20 }}>Actionable items ordered by priority and deadline</div>

      {/* Stats */}
      <div className="riya-pulse-grid" style={{ marginBottom: 20 }}>
        <div className="kpi-card" style={{ padding: 14 }}>
          <div className="riya-pulse-label">Total Tasks</div>
          <div className="riya-pulse-value">{totalTasks}</div>
        </div>
        <div className="kpi-card" style={{ padding: 14 }}>
          <div className="riya-pulse-label">Completed</div>
          <div className="riya-pulse-value" style={{ color: '#059669' }}>{completedCount}</div>
        </div>
        <div className="kpi-card" style={{ padding: 14 }}>
          <div className="riya-pulse-label">Overdue</div>
          <div className="riya-pulse-value" style={{ color: overdueCount > 0 ? '#BB2026' : '#059669' }}>{overdueCount}</div>
        </div>
        <div className="kpi-card" style={{ padding: 14 }}>
          <div className="riya-pulse-label">Completion</div>
          <div className="riya-pulse-value">{completionPct}%</div>
        </div>
      </div>

      {/* Task list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
        {sorted.map(task => {
          const conf = taskTypeIcon[task.type] || { icon: Phone, color: '#6B7280', bg: '#F3F4F6', label: 'Task' }
          const Icon = conf.icon
          const isCompleted = completedTasks.has(task.id)
          const prio = priorityLabel[task.priority] || { label: 'Normal', color: '#6B7280', bg: '#F3F4F6' }
          const severityClass = task.priority === 'critical' ? 'severity-critical' : task.priority === 'high' ? 'severity-high' : task.priority === 'medium' ? 'severity-medium' : 'severity-low'
          return (
            <div key={task.id} className={`actv-entry ${severityClass} ${isCompleted ? 'task-done' : ''}`}
              style={{ borderLeftColor: isCompleted ? '#D1D5DB' : undefined, cursor: 'default' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, paddingTop: 2 }}>
                <button
                  className={`task-check-circle ${isCompleted ? 'task-checked' : ''}`}
                  onClick={() => toggleTask(task.id)}>
                  {isCompleted && <CheckCircle size={16} />}
                </button>
                <div className="actv-entry-icon" style={{ color: conf.color, background: isCompleted ? '#F3F4F6' : conf.bg }}>
                  <Icon size={16} />
                </div>
              </div>
              <div className="actv-entry-body">
                <div className="actv-entry-text" style={{ fontWeight: isCompleted ? 400 : 500 }}>
                  {task.title}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                  {task.service && <span className="task-svc-pill">{task.service}</span>}
                  <span style={{ fontSize: '0.7rem', color: task.status === 'overdue' && !isCompleted ? '#EF4444' : '#6B7280', fontWeight: task.status === 'overdue' && !isCompleted ? 600 : 400 }}>
                    {task.status === 'overdue' && !isCompleted && <AlertCircle size={11} style={{ marginRight: 2, verticalAlign: 'middle' }} />}
                    {task.dueIn}
                  </span>
                </div>
              </div>
              <div className="actv-entry-meta">
                <div className="actv-entry-type" style={{ background: prio.bg, color: prio.color }}>{prio.label}</div>
                <div className="actv-entry-type" style={{ background: `${conf.color}12`, color: conf.color }}>{conf.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Shift Goals + Completion Rate */}
      <div className="riya-command-row" style={{ marginTop: 8 }}>
        <div className="chart-panel riya-chart-panel">
          <div className="chart-panel-title" style={{ marginBottom: 16 }}>Shift Goals</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {RIYA_SHIFT_GOALS.map(g => {
              const goalIconMap: Record<string, typeof Phone> = { 'Inquiries to Handle': Inbox, 'Calls to Make': Phone, 'Consultations to Book': Calendar, 'Notes to Add': StickyNote }
              const GIcon = g.icon || goalIconMap[g.label] || Phone
              const pct = g.target > 0 ? Math.round((g.current / g.target) * 100) : 0
              return (
                <div key={g.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, alignItems: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', fontWeight: 500, color: '#111827' }}>
                      <GIcon size={14} style={{ color: '#6B7280' }} />
                      {g.label}
                    </span>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#111827' }}>{g.current}/{g.target} <span style={{ color: '#6B7280', fontWeight: 400 }}>({pct}%)</span></span>
                  </div>
                  <div className="riya-target-bar-wrap">
                    <div className="riya-target-bar-fill" style={{ width: `${pct}%`, background: pct >= 80 ? '#059669' : pct >= 60 ? '#D97706' : '#EF4444' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="chart-panel riya-chart-panel">
          <div className="chart-panel-title" style={{ marginBottom: 16 }}>Task Completion Rate</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '4px 0' }}>
            <div className="riya-sla-meter">
              <svg width="100" height="100" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                <circle cx="60" cy="60" r="50" fill="none" stroke={completionPct >= 80 ? '#059669' : completionPct >= 60 ? '#D97706' : '#BB2026'} strokeWidth="10"
                  strokeDasharray={`${Math.max(completionPct, 1) * 3.14} ${100 * 3.14}`} strokeDashoffset="0"
                  strokeLinecap="round" transform="rotate(-90 60 60)" />
              </svg>
              <div className="riya-sla-meter-value">{completionPct}%</div>
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#111827' }}>{completedCount} of {totalTasks} completed</div>
            <div style={{ fontSize: '0.72rem', color: '#6B7280' }}>Today&apos;s progress</div>
            <div className="riya-sla-legend" style={{ marginTop: 8 }}>
              <div className="riya-sla-legend-item">
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#059669' }} />
                Done ({completedCount})
              </div>
              <div className="riya-sla-legend-item">
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#E5E7EB' }} />
                Remaining ({totalTasks - completedCount})
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
