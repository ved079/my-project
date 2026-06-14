'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  ArrowRightLeft, StickyNote, Flag, Users, Activity, Clock,
} from 'lucide-react'
import {
  RIYA_ACTIVITY_MOCK,
} from '@/lib/data'

export function MyActivityPage({ teamMemberId }: { teamMemberId: string }) {
  const [activity, setActivity] = useState<Array<{
    id: string; action: string; detail: string; createdAt: string;
    lead: { name: string; id: string } | null;
  }>>([])
  const [filterType, setFilterType] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!teamMemberId) {
      setActivity(RIYA_ACTIVITY_MOCK)
      setLoading(false)
      return
    }
    fetch(`/api/activity?teamMemberId=${teamMemberId}&limit=30`)
      .then(r => r.json())
      .then(data => { setActivity(data.length > 0 ? data : RIYA_ACTIVITY_MOCK); setLoading(false) })
      .catch(() => { setActivity(RIYA_ACTIVITY_MOCK); setLoading(false) })
  }, [teamMemberId])

  const timeAgo = (dateStr: string): string => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const minutes = Math.floor(diff / 60000)
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    if (days < 7) return `${days}d ago`
    return `${Math.floor(days / 7)}w ago`
  }

  const filtered = filterType === 'All' ? activity : activity.filter(a => a.action === filterType)

  const todayCount = useMemo(() => {
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    return activity.filter(a => new Date(a.createdAt) >= todayStart).length
  }, [activity])

  const actionCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const a of activity) counts[a.action] = (counts[a.action] || 0) + 1
    return counts
  }, [activity])

  const iconMap: Record<string, { icon: typeof ArrowRightLeft; color: string; label: string }> = {
    'status_change': { icon: ArrowRightLeft, color: '#2563EB', label: 'Status Change' },
    'note_added': { icon: StickyNote, color: '#D97706', label: 'Note Added' },
    'flag_added': { icon: Flag, color: '#BB2026', label: 'Flag Added' },
    'lead_assigned': { icon: Users, color: '#059669', label: 'Assignment' },
  }

  const sortedFiltered = useMemo(() => {
    return [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [filtered])

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
      <div className="spinner" />
    </div>
  )

  return (
    <div>
      <div className="section-label" style={{ marginBottom: 4 }}>Activity Log</div>
      <div className="section-heading" style={{ marginBottom: 4 }}>My Activity</div>
      <div className="section-subtitle" style={{ marginBottom: 20 }}>Everything you&apos;ve done — status changes, notes, flags, and more</div>

      {/* Stats row */}
      <div className="riya-pulse-grid" style={{ marginBottom: 20 }}>
        <div className="kpi-card" style={{ padding: 14 }}>
          <div className="riya-pulse-label">Total Activities</div>
          <div className="riya-pulse-value">{activity.length}</div>
        </div>
        <div className="kpi-card" style={{ padding: 14 }}>
          <div className="riya-pulse-label">Today</div>
          <div className="riya-pulse-value">{todayCount}</div>
        </div>
        <div className="kpi-card" style={{ padding: 14 }}>
          <div className="riya-pulse-label">Status Changes</div>
          <div className="riya-pulse-value">{actionCounts['status_change'] || 0}</div>
        </div>
        <div className="kpi-card" style={{ padding: 14 }}>
          <div className="riya-pulse-label">Notes Added</div>
          <div className="riya-pulse-value">{actionCounts['note_added'] || 0}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="riya-activity-filters">
        {['All', 'status_change', 'note_added', 'flag_added', 'lead_assigned'].map(f => (
          <button key={f} className={`alert-filter-tab ${filterType === f ? 'active' : ''}`} onClick={() => setFilterType(f)}>
            {f === 'All' ? 'All' : iconMap[f]?.label || f}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div>
        {sortedFiltered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 16px', color: '#6B7280' }}>
            <Activity size={40} style={{ color: '#D1D5DB', marginBottom: 12 }} />
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#111827', marginBottom: 4 }}>No activity yet</div>
            <div style={{ fontSize: '0.82rem' }}>Activities will appear here as you work on inquiries</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {sortedFiltered.map(entry => {
              const conf = iconMap[entry.action] || { icon: Activity, color: '#6B7280', label: 'Activity' }
              const Icon = conf.icon
              return (
                <div key={entry.id} className="actv-entry" style={{ borderLeftColor: conf.color }}>
                  <div className="actv-entry-icon" style={{ color: conf.color }}>
                    <Icon size={16} />
                  </div>
                  <div className="actv-entry-body">
                    <div className="actv-entry-text">{entry.detail}</div>
                    {entry.lead && (
                      <button className="actv-entry-link">{entry.lead.name} \u2192</button>
                    )}
                  </div>
                  <div className="actv-entry-meta">
                    <div className="actv-entry-type" style={{ background: `${conf.color}14`, color: conf.color }}>{conf.label}</div>
                    <div className="actv-entry-time"><Clock size={11} style={{ marginRight: 3, verticalAlign: 'middle' }} />{timeAgo(entry.createdAt)}</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
