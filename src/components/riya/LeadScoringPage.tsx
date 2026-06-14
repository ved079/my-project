'use client'

import { useState, useMemo, Fragment } from 'react'
import { Zap, Flame, Snowflake, Phone, MessageCircle, ChevronDown, ChevronUp, Copy, CheckCircle, AlertTriangle, Inbox, Target, Users, ArrowUpRight } from 'lucide-react'
import { scoreLead, LEAD_MOCK } from '@/lib/scoring/scoring'
import { useToastStore } from '@/store/toast-store'

export function LeadScoringPage() {
  const [tierFilter, setTierFilter] = useState<'ALL' | 'HOT' | 'WARM' | 'COLD'>('ALL')
  const [expandedLead, setExpandedLead] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const scoredLeads = useMemo(() => {
    return LEAD_MOCK
      .map(lead => scoreLead(lead))
      .sort((a, b) => b.score - a.score)
  }, [])

  const filteredLeads = useMemo(() => {
    if (tierFilter === 'ALL') return scoredLeads
    return scoredLeads.filter(l => l.tier === tierFilter)
  }, [scoredLeads, tierFilter])

  const hotCount = scoredLeads.filter(l => l.tier === 'HOT').length
  const warmCount = scoredLeads.filter(l => l.tier === 'WARM').length
  const coldCount = scoredLeads.filter(l => l.tier === 'COLD').length

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
      useToastStore.getState().addToast('WhatsApp draft copied!', 'success')
    } catch {
      useToastStore.getState().addToast('Failed to copy', 'error')
    }
  }

  const tierIcon = (t: string) => {
    switch (t) {
      case 'HOT': return <Flame size={14} />
      case 'WARM': return <Zap size={14} />
      case 'COLD': return <Snowflake size={14} />
    }
  }
  const tierClass = (t: string) => `riya-score-tier-${t.toLowerCase()}`
  const scoreClass = (s: number) => {
    if (s >= 70) return 'score-hot'
    if (s >= 40) return 'score-warm'
    return 'score-cold'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: 14 }}>
      {/* Header */}
      <div>
        <div className="section-label" style={{ marginBottom: 2 }}>Lead Scoring AI</div>
        <div className="section-heading" style={{ marginBottom: 2 }}>Automated Lead Prioritization</div>
        <div className="section-subtitle">AI-scored from CRM data in the last 24 hours · Sorted by priority</div>
      </div>

      {/* Stats row */}
      <div className="kpi-grid-4" style={{ flexShrink: 0 }}>
        <div className="kpi-card" style={{ padding: '12px 14px' }}>
          <div className="kpi-card-top">
            <div className="riya-pulse-label" style={{ marginBottom: 0 }}>Total Scored</div>
            <Target size={16} style={{ color: '#6B7280' }} />
          </div>
          <div className="riya-pulse-value" style={{ fontSize: '1.3rem', marginTop: 4 }}>{scoredLeads.length}</div>
        </div>
        <div className="kpi-card" style={{ padding: '12px 14px' }}>
          <div className="kpi-card-top">
            <div className="riya-pulse-label" style={{ marginBottom: 0 }}>HOT</div>
            <Flame size={16} style={{ color: hotCount > 0 ? '#BB2026' : '#6B7280' }} />
          </div>
          <div className="riya-pulse-value" style={{ fontSize: '1.3rem', marginTop: 4, color: hotCount > 0 ? '#BB2026' : undefined }}>{hotCount}</div>
        </div>
        <div className="kpi-card" style={{ padding: '12px 14px' }}>
          <div className="kpi-card-top">
            <div className="riya-pulse-label" style={{ marginBottom: 0 }}>WARM</div>
            <Zap size={16} style={{ color: warmCount > 0 ? '#D97706' : '#6B7280' }} />
          </div>
          <div className="riya-pulse-value" style={{ fontSize: '1.3rem', marginTop: 4, color: warmCount > 0 ? '#D97706' : undefined }}>{warmCount}</div>
        </div>
        <div className="kpi-card" style={{ padding: '12px 14px' }}>
          <div className="kpi-card-top">
            <div className="riya-pulse-label" style={{ marginBottom: 0 }}>COLD</div>
            <Snowflake size={16} style={{ color: '#6B7280' }} />
          </div>
          <div className="riya-pulse-value" style={{ fontSize: '1.3rem', marginTop: 4 }}>{coldCount}</div>
        </div>
      </div>

      {/* Tier filter tabs */}
      <div className="riya-inquiries-tabs" style={{ flexShrink: 0 }}>
        {(['ALL', 'HOT', 'WARM', 'COLD'] as const).map(tab => (
          <button key={tab} className={`riya-inquiry-tab ${tierFilter === tab ? 'active' : ''}`} onClick={() => setTierFilter(tab)}>
            {tab === 'ALL' && <Target size={12} />}
            {tab === 'HOT' && <Flame size={12} />}
            {tab === 'WARM' && <Zap size={12} />}
            {tab === 'COLD' && <Snowflake size={12} />}
            {tab === 'ALL' ? 'All Leads' : tab}
            <span className="riya-inquiry-tab-count">{tab === 'ALL' ? scoredLeads.length : tab === 'HOT' ? hotCount : tab === 'WARM' ? warmCount : coldCount}</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ flex: 1, minHeight: 0, overflow: 'auto', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--card-bg)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', background: '#F9FAFB' }}>
              <th style={thStyle}>Lead Name</th>
              <th style={thStyle}>Source</th>
              <th style={{ ...thStyle, width: 70 }}>Score</th>
              <th style={thStyle}>Intent Keyword</th>
              <th style={thStyle}>Recommended Action</th>
              <th style={thStyle}>Assign To</th>
              <th style={{ ...thStyle, width: 80 }}>WhatsApp</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map(lead => (
              <Fragment key={lead.id}>
                <tr className={`riya-score-row ${tierClass(lead.tier)}`} style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
                  onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className={tierClass(lead.tier)} style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '2px 6px', borderRadius: 4, fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                        {tierIcon(lead.tier)}{lead.tier}
                      </span>
                      <span style={{ fontWeight: 600, color: '#111827' }}>{lead.name}</span>
                      {!lead.hasPhone && <span style={{ fontSize: '0.65rem', color: '#BB2026', fontWeight: 600 }}>NO PHONE</span>}
                    </div>
                  </td>
                  <td style={tdStyle}>{lead.source}</td>
                  <td style={tdStyle}>
                    <span className={`riya-score-badge ${scoreClass(lead.score)}`}>{lead.score}</span>
                  </td>
                  <td style={{ ...tdStyle, maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.intentKeyword}</td>
                  <td style={{ ...tdStyle, maxWidth: 260, fontSize: '0.72rem', color: '#4B5563' }}>{lead.recommendedAction}</td>
                  <td style={tdStyle}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 6px', borderRadius: 4, background: '#F3F4F6', color: '#4B5563', fontSize: '0.7rem', fontWeight: 600 }}>
                      <Users size={11} />{lead.assignTo}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    {lead.tier === 'HOT' && (
                      <button className="riya-action-btn" style={{ padding: '4px 8px', fontSize: '0.7rem' }}
                        onClick={(e) => { e.stopPropagation(); setExpandedLead(expandedLead === lead.id ? null : lead.id) }}>
                        <MessageCircle size={12} />
                        {expandedLead === lead.id ? 'Hide' : 'Draft'}
                      </button>
                    )}
                  </td>
                </tr>
                {/* Expandable WhatsApp Draft */}
                {expandedLead === lead.id && lead.tier === 'HOT' && (
                  <tr>
                    <td colSpan={7} style={{ padding: 0, borderBottom: '1px solid var(--border)' }}>
                      <div style={{ padding: '12px 16px', background: '#FFFBEB', borderTop: '1px solid #FDE68A' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <MessageCircle size={14} style={{ color: '#25D366' }} />
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#111827' }}>WhatsApp Draft for {lead.name}</span>
                          </div>
                          <button className="riya-action-btn" style={{ padding: '4px 8px', fontSize: '0.7rem' }}
                            onClick={(e) => { e.stopPropagation(); copyToClipboard(lead.whatsappDraft, lead.id) }}>
                            {copiedId === lead.id ? <CheckCircle size={12} /> : <Copy size={12} />}
                            {copiedId === lead.id ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#4B5563', lineHeight: 1.6, whiteSpace: 'pre-wrap', fontFamily: 'system-ui, sans-serif', background: '#FFFFFF', padding: '10px 14px', borderRadius: 6, border: '1px solid #FDE68A' }}>
                          {lead.whatsappDraft}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
        {filteredLeads.length === 0 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, color: '#6B7280', fontSize: '0.85rem' }}>
            No {tierFilter !== 'ALL' ? tierFilter.toLowerCase() : ''} leads found
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="riya-quick-actions" style={{ flexShrink: 0 }}>
        <button className="riya-action-btn" onClick={() => useToastStore.getState().addToast(`Exporting lead scoring report (${scoredLeads.length} leads)...`, 'info')}>
          <ArrowUpRight size={14} /> Export Report
        </button>
        <button className="riya-action-btn" onClick={() => useToastStore.getState().addToast('Running lead refresh...', 'info')}>
          <AlertTriangle size={14} /> Refresh Scores
        </button>
      </div>
    </div>
  )
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '10px 12px',
  fontSize: '0.72rem',
  fontWeight: 600,
  color: '#6B7280',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  borderBottom: '1px solid #E5E7EB',
}

const tdStyle: React.CSSProperties = {
  padding: '10px 12px',
  color: '#374151',
  fontSize: '0.78rem',
}
