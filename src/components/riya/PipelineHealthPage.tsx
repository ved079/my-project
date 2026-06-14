'use client'

import { useState, useMemo, Fragment } from 'react'
import { AlertTriangle, Clock, Phone, MessageCircle, ChevronDown, ChevronUp, Copy, CheckCircle, Activity, Users, ArrowUpRight, Shield, Bell, AlertCircle, Zap } from 'lucide-react'
import { runPipelineScan, formatHours } from '@/lib/scoring/pipeline-health'
import { useToastStore } from '@/store/toast-store'

export function PipelineHealthPage() {
  const scanResult = useMemo(() => runPipelineScan(), [])
  const { alerts, summary, scannedAt } = scanResult
  const [levelFilter, setLevelFilter] = useState<'ALL' | 'CRITICAL' | 'HIGH' | 'MEDIUM'>('ALL')
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [showSlackPreview, setShowSlackPreview] = useState(true)

  const filtered = useMemo(() => {
    if (levelFilter === 'ALL') return alerts
    return alerts.filter(a => a.level === levelFilter)
  }, [alerts, levelFilter])

  const copySlack = async () => {
    try {
      await navigator.clipboard.writeText(summary.slackMessage)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      useToastStore.getState().addToast('Slack message copied!', 'success')
    } catch {
      useToastStore.getState().addToast('Failed to copy', 'error')
    }
  }

  const levelIcon = (l: string) => {
    switch (l) {
      case 'CRITICAL': return <AlertCircle size={14} />
      case 'HIGH': return <AlertTriangle size={14} />
      case 'MEDIUM': return <Clock size={14} />
    }
  }
  const levelClass = (l: string) => `ph-level-${l.toLowerCase()}`
  const levelBadgeClass = (l: string) => `ph-badge-${l.toLowerCase()}`
  const tierClass = (t: string) => `ph-tier-${t.toLowerCase()}`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: 14 }}>
      <div>
        <div className="section-label" style={{ marginBottom: 2 }}>Pipeline Health Monitor</div>
        <div className="section-heading" style={{ marginBottom: 2 }}>At-Risk Lead Scan</div>
        <div className="section-subtitle">Last scan: {scannedAt.toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })} · Next scan: {new Date(scannedAt.getTime() + 4 * 3600000).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
      </div>

      {/* Stats */}
      <div className="kpi-grid-4" style={{ flexShrink: 0 }}>
        <div className="kpi-card" style={{ padding: '12px 14px' }}>
          <div className="kpi-card-top">
            <div className="riya-pulse-label" style={{ marginBottom: 0 }}>At Risk Total</div>
            <Activity size={16} style={{ color: '#6B7280' }} />
          </div>
          <div className="riya-pulse-value" style={{ fontSize: '1.3rem', marginTop: 4 }}>{summary.total}</div>
        </div>
        <div className="kpi-card" style={{ padding: '12px 14px', borderLeft: '3px solid #BB2026' }}>
          <div className="kpi-card-top">
            <div className="riya-pulse-label" style={{ marginBottom: 0 }}>CRITICAL</div>
            <AlertCircle size={16} style={{ color: '#BB2026' }} />
          </div>
          <div className="riya-pulse-value" style={{ fontSize: '1.3rem', marginTop: 4, color: '#BB2026' }}>{summary.critical}</div>
        </div>
        <div className="kpi-card" style={{ padding: '12px 14px', borderLeft: '3px solid #D97706' }}>
          <div className="kpi-card-top">
            <div className="riya-pulse-label" style={{ marginBottom: 0 }}>HIGH</div>
            <AlertTriangle size={16} style={{ color: '#D97706' }} />
          </div>
          <div className="riya-pulse-value" style={{ fontSize: '1.3rem', marginTop: 4, color: '#D97706' }}>{summary.high}</div>
        </div>
        <div className="kpi-card" style={{ padding: '12px 14px', borderLeft: '3px solid #6B7280' }}>
          <div className="kpi-card-top">
            <div className="riya-pulse-label" style={{ marginBottom: 0 }}>MEDIUM</div>
            <Clock size={16} style={{ color: '#6B7280' }} />
          </div>
          <div className="riya-pulse-value" style={{ fontSize: '1.3rem', marginTop: 4 }}>{summary.medium}</div>
        </div>
      </div>

      {/* Slack summary card */}
      {showSlackPreview && (
        <div style={{ flexShrink: 0, borderRadius: 8, border: '1px solid #E5E7EB', background: '#F8FAFC', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#F1F5F9', borderBottom: '1px solid #E5E7EB' }}>
            <Bell size={14} style={{ color: '#6B7280' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Slack Summary — #marketing-ops</span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
              <button className="riya-action-btn" style={{ padding: '3px 8px', fontSize: '0.68rem' }} onClick={copySlack}>
                {copied ? <CheckCircle size={11} /> : <Copy size={11} />} {copied ? 'Copied' : 'Copy'}
              </button>
              <button className="riya-action-btn" style={{ padding: '3px 8px', fontSize: '0.68rem' }} onClick={() => setShowSlackPreview(false)}>
                <ChevronUp size={11} /> Hide
              </button>
            </div>
          </div>
          <div style={{ padding: '12px 14px', fontSize: '0.78rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', fontFamily: "'SF Mono', 'JetBrains Mono', monospace", color: '#1E293B' }}>
            {summary.slackMessage}
          </div>
        </div>
      )}
      {!showSlackPreview && (
        <button className="riya-action-btn" style={{ flexShrink: 0, alignSelf: 'flex-start' }} onClick={() => setShowSlackPreview(true)}>
          <Bell size={12} /> Show Slack Summary
        </button>
      )}

      {/* Filter tabs */}
      <div className="riya-inquiries-tabs" style={{ flexShrink: 0 }}>
        {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'] as const).map(tab => (
          <button key={tab} className={`riya-inquiry-tab ${levelFilter === tab ? 'active' : ''}`} onClick={() => setLevelFilter(tab)}>
            {tab === 'ALL' && <Activity size={12} />}
            {tab === 'CRITICAL' && <AlertCircle size={12} />}
            {tab === 'HIGH' && <AlertTriangle size={12} />}
            {tab === 'MEDIUM' && <Clock size={12} />}
            {tab === 'ALL' ? 'All Alerts' : tab}
            <span className="riya-inquiry-tab-count">{tab === 'ALL' ? alerts.length : tab === 'CRITICAL' ? summary.critical : tab === 'HIGH' ? summary.high : summary.medium}</span>
          </button>
        ))}
      </div>

      {/* Alert list */}
      <div style={{ flex: 1, minHeight: 0, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(alert => (
          <Fragment key={alert.lead.id}>
            <div className={`ph-alert-card ${levelClass(alert.level)}`}
              style={{ borderRadius: 8, border: '1px solid var(--border)', background: 'var(--card-bg)', overflow: 'hidden', cursor: 'pointer' }}
              onClick={() => setExpandedAlert(expandedAlert === alert.lead.id ? null : alert.lead.id)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px' }}>
                {/* Level indicator */}
                <div className={`ph-level-dot ${levelClass(alert.level)}`} style={{ width: 10, height: 10, borderRadius: '50%', flexShrink: 0 }} />

                {/* Tier badge */}
                <span className={tierClass(alert.lead.tier)} style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', padding: '2px 6px', borderRadius: 4, flexShrink: 0 }}>
                  {alert.lead.tier}
                </span>

                {/* Lead name */}
                <div style={{ fontWeight: 600, fontSize: '0.82rem', color: '#111827', minWidth: 120 }}>{alert.lead.name}</div>

                {/* Source */}
                <span style={{ fontSize: '0.72rem', color: '#6B7280', flexShrink: 0 }}>{alert.lead.source}</span>

                {/* Score */}
                <span className={`riya-score-badge ph-score-${alert.lead.tier.toLowerCase()}`} style={{ fontSize: '0.72rem', flexShrink: 0 }}>{alert.lead.score}</span>

                {/* Hours idle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', color: '#6B7280', flexShrink: 0 }}>
                  <Clock size={11} /> {formatHours(alert.lead.hoursSinceLastTouch)}
                </div>

                {/* CRE */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', color: '#4B5563', marginLeft: 'auto', flexShrink: 0 }}>
                  <Users size={11} /> {alert.lead.assignTo}
                </div>

                {/* Level badge */}
                <span className={`ph-level-badge ${levelBadgeClass(alert.level)}`} style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.03em', padding: '2px 8px', borderRadius: 4, display: 'inline-flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
                  {levelIcon(alert.level)}{alert.level}
                </span>

                {/* Expand */}
                <span style={{ color: '#9CA3AF', flexShrink: 0 }}>
                  {expandedAlert === alert.lead.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
              </div>

              {/* Expanded detail */}
              {expandedAlert === alert.lead.id && (
                <div style={{ padding: '0 12px 12px 12px', borderTop: '1px solid var(--border)', background: '#F9FAFB' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
                    <div>
                      <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 4 }}>Reason</div>
                      <div style={{ fontSize: '0.78rem', color: '#4B5563' }}>{alert.reason}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 4 }}>Deadline</div>
                      <div style={{ fontSize: '0.78rem', color: '#BB2026', fontWeight: 600 }}>{alert.deadline}</div>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 4 }}>Last Action</div>
                      <div style={{ fontSize: '0.78rem', color: '#4B5563' }}>{alert.lead.lastAction}</div>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 4 }}>Recommended Action</div>
                      <div style={{ fontSize: '0.78rem', color: '#111827', lineHeight: 1.5, background: '#FFF', padding: '8px 10px', borderRadius: 6, border: '1px solid #E5E7EB' }}>
                        {alert.recommendedAction}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Fragment>
        ))}
        {filtered.length === 0 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, color: '#6B7280', fontSize: '0.85rem' }}>
            No {levelFilter !== 'ALL' ? levelFilter.toLowerCase() : ''} alerts
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="riya-quick-actions" style={{ flexShrink: 0 }}>
        <button className="riya-action-btn" onClick={() => useToastStore.getState().addToast('Re-scanning pipeline...', 'info')}>
          <Zap size={14} /> Re-scan Now
        </button>
        <button className="riya-action-btn" onClick={() => useToastStore.getState().addToast(`Exporting pipeline report (${alerts.length} alerts)...`, 'info')}>
          <ArrowUpRight size={14} /> Export Report
        </button>
      </div>
    </div>
  )
}
