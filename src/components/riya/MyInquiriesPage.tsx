'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import {
  Search, Inbox, Lightbulb, Phone, Eye, CheckCircle, Calendar, Tag, Copy,
  AlertTriangle, Clock, ChevronRight, X, MessageCircle, Mail, Flag, Send, Zap, XCircle, User, ChevronDown, Download, Users, RefreshCw,
} from 'lucide-react'
import type { ToastType } from '@/lib/types'
import {
  SERVICE_INTELLIGENCE,
} from '@/lib/data'
import { useToastStore } from '@/store/toast-store'

type Inquiry = {
  id: string; name: string; phone: string; phoneMasked: string; service: string;
  source: string; location: string; status: string; inquiryTime: string;
  slaDeadline: string; cost: number; flaggedAs: string;
  client: { name: string; slaMinutes: number };
  notes: Array<{ id: string; content: string; createdAt: string; teamMemberId: string }>;
  statusHistory: Array<{ id: string; fromStatus: string; toStatus: string; createdAt: string }>;
}

const MOCK_INQUIRIES: Inquiry[] = [
  { id: 'i1', name: 'Priya Mehta', phone: '+91 98765 43789', phoneMasked: '+91 98XXX XX789', service: 'Pregnancy Care', source: 'Google Ads', location: 'Gurgaon', status: 'New', inquiryTime: new Date(Date.now() - 2 * 60000).toISOString(), slaDeadline: new Date(Date.now() + 8 * 60000).toISOString(), cost: 450, flaggedAs: '', client: { name: 'Newmi Care', slaMinutes: 15 }, notes: [], statusHistory: [{ id: 'sh0', fromStatus: 'New', toStatus: 'New', createdAt: new Date(Date.now() - 2 * 60000).toISOString() }] },
  { id: 'i2', name: 'Kavya Sharma', phone: '+91 87654 32456', phoneMasked: '+91 87XXX XX456', service: 'PCOS Management', source: 'Meta Ads', location: 'Delhi', status: 'New', inquiryTime: new Date(Date.now() - 15 * 60000).toISOString(), slaDeadline: new Date(Date.now() + 4 * 60000).toISOString(), cost: 380, flaggedAs: '', client: { name: 'Newmi Care', slaMinutes: 15 }, notes: [], statusHistory: [{ id: 'sh1', fromStatus: 'New', toStatus: 'New', createdAt: new Date(Date.now() - 15 * 60000).toISOString() }] },
  { id: 'i3', name: 'Ananya Reddy', phone: '+91 76543 21123', phoneMasked: '+91 76XXX XX123', service: 'Fertility Consultation', source: 'Organic SEO', location: 'Noida', status: 'Contacted', inquiryTime: new Date(Date.now() - 2 * 3600000).toISOString(), slaDeadline: new Date(Date.now() - 30 * 60000).toISOString(), cost: 550, flaggedAs: 'Needs Attention', client: { name: 'Newmi Care', slaMinutes: 15 }, notes: [{ id: 'n1', content: 'Patient prefers WhatsApp communication', createdAt: new Date(Date.now() - 1 * 3600000).toISOString(), teamMemberId: '' }], statusHistory: [{ id: 'sh2', fromStatus: 'New', toStatus: 'Contacted', createdAt: new Date(Date.now() - 1.5 * 3600000).toISOString() }] },
  { id: 'i4', name: 'Deepika Tyagi', phone: '+91 65432 10890', phoneMasked: '+91 65XXX XX890', service: 'Menopause Support', source: 'Google Ads', location: 'Gurgaon', status: 'Consultation Booked', inquiryTime: new Date(Date.now() - 5 * 3600000).toISOString(), slaDeadline: new Date(Date.now() - 2 * 3600000).toISOString(), cost: 320, flaggedAs: '', client: { name: 'Newmi Care', slaMinutes: 15 }, notes: [], statusHistory: [{ id: 'sh3', fromStatus: 'New', toStatus: 'Contacted', createdAt: new Date(Date.now() - 4 * 3600000).toISOString() }, { id: 'sh4', fromStatus: 'Contacted', toStatus: 'Consultation Booked', createdAt: new Date(Date.now() - 3 * 3600000).toISOString() }] },
  { id: 'i5', name: 'Sneha Patel', phone: '+91 54321 09567', phoneMasked: '+91 54XXX XX567', service: 'General Wellness', source: 'Practo', location: 'Delhi', status: 'Converted', inquiryTime: new Date(Date.now() - 1 * 86400000).toISOString(), slaDeadline: new Date(Date.now() - 1 * 86400000 + 15 * 60000).toISOString(), cost: 200, flaggedAs: '', client: { name: 'Newmi Care', slaMinutes: 15 }, notes: [], statusHistory: [{ id: 'sh5', fromStatus: 'New', toStatus: 'Contacted', createdAt: new Date(Date.now() - 1 * 86400000 + 2 * 3600000).toISOString() }, { id: 'sh6', fromStatus: 'Contacted', toStatus: 'Converted', createdAt: new Date(Date.now() - 1 * 86400000 + 6 * 3600000).toISOString() }] },
]

function InlineFilter({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState({ top: 0, right: 0 })
  const btnRef = useRef<HTMLButtonElement>(null)
  const ddRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node) && btnRef.current && !btnRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])
  return (
    <>
      <button ref={btnRef} className="riya-inline-filter-btn" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setCoords({ top: r.bottom + 4, right: r.right }); setOpen(!open) }}>
        {label} <ChevronDown size={12} />
      </button>
      {open && (
        <div ref={ddRef} className="riya-inline-filter-dropdown" style={{ position: 'fixed', top: coords.top, right: coords.right }}>
          {options.map(o => (
            <button key={o} className={`riya-inline-filter-option ${value === o ? 'active' : ''}`} onClick={() => { onChange(o); setOpen(false) }}>
              {o === 'All' ? (label === 'Source' ? 'All Sources' : 'All Services') : o}
            </button>
          ))}
        </div>
      )}
    </>
  )
}

export function MyInquiriesPage() {
  const [teamMemberId, setTeamMemberId] = useState('')
  const [leads, setLeads] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [viewTab, setViewTab] = useState('All')
  const [sourceFilter, setSourceFilter] = useState('All')
  const [serviceFilter, setServiceFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [showPhone, setShowPhone] = useState<Record<string, boolean>>({})
  const [selectedLead, setSelectedLead] = useState<typeof leads[0] | null>(null)
  const [noteText, setNoteText] = useState('')

  const STATUS_OPTIONS = ['New', 'Contacted', 'Consultation Booked', 'Converted', 'Lost'] as const
  const STATUS_CONFIG: Record<string, { bg: string; text: string; border: string; icon: typeof CheckCircle }> = {
    'New': { bg: '#FEF2F2', text: '#BB2026', border: '#BB2026', icon: Zap },
    'Contacted': { bg: '#FFFBEB', text: '#92400E', border: '#D97706', icon: Phone },
    'Consultation Booked': { bg: '#EFF6FF', text: '#2563EB', border: '#2563EB', icon: Calendar },
    'Converted': { bg: '#ECFDF5', text: '#065F46', border: '#059669', icon: CheckCircle },
    'Lost': { bg: '#F9FAFB', text: '#4B5563', border: '#6B7280', icon: XCircle },
  }
  const SOURCE_CONFIG: Record<string, { bg: string; text: string }> = {
    'Google Ads': { bg: '#EFF6FF', text: '#2563EB' },
    'Meta Ads': { bg: '#FFFBEB', text: '#92400E' },
    'Organic SEO': { bg: '#F3F4F6', text: '#4B5563' },
    'Practo': { bg: '#FFFAF0', text: '#C05621' },
    'WhatsApp': { bg: '#F0FFF4', text: '#276749' },
  }

  useEffect(() => {
    fetch('/api/team')
      .then(r => r.json())
      .then((members: Array<{id: string; name: string}>) => {
        const riya = members.find((m) => m.name === 'Riya Sharma')
        if (riya) setTeamMemberId(riya.id)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!teamMemberId) {
      setLeads(MOCK_INQUIRIES); setLoading(false); return
    }
    setLoading(true)
    fetch(`/api/leads?teamMemberId=${teamMemberId}`)
      .then(r => r.json())
      .then(data => { setLeads(data); setLoading(false) })
      .catch(() => { setLeads(MOCK_INQUIRIES); setLoading(false) })
  }, [teamMemberId])

  const getUrgency = useCallback((lead: Inquiry) => {
    if (lead.status === 'Converted' || lead.status === 'Lost') return 'done' as const
    const remaining = new Date(lead.slaDeadline).getTime() - Date.now()
    if (remaining <= 0) return 'breached' as const
    const total = new Date(lead.slaDeadline).getTime() - new Date(lead.inquiryTime).getTime()
    const pct = remaining / total
    if (pct <= 0.25) return 'critical' as const
    if (pct <= 0.5) return 'warning' as const
    return 'safe' as const
  }, [])

  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = { All: leads.length }
    for (const l of leads) {
      counts[l.status] = (counts[l.status] || 0) + 1
    }
    counts['Urgent'] = leads.filter(l => {
      const u = getUrgency(l)
      return u === 'breached' || u === 'critical'
    }).length
    return counts
  }, [leads, getUrgency])

  const TAB_ORDER = ['All', 'Urgent', 'New', 'Contacted', 'Consultation Booked', 'Converted', 'Lost']

  const filteredLeads = useMemo(() => {
    let filtered = leads
    if (viewTab === 'Urgent') {
      filtered = leads.filter(l => { const u = getUrgency(l); return u === 'breached' || u === 'critical' })
    } else if (viewTab !== 'All') {
      filtered = leads.filter(l => l.status === viewTab)
    }
    return filtered.filter(lead => {
      if (sourceFilter !== 'All' && lead.source !== sourceFilter) return false
      if (serviceFilter !== 'All' && lead.service !== serviceFilter) return false
      if (searchQuery && !lead.name.toLowerCase().includes(searchQuery.toLowerCase()) && !lead.service.toLowerCase().includes(searchQuery.toLowerCase())) return false
      return true
    })
  }, [leads, viewTab, sourceFilter, serviceFilter, searchQuery, getUrgency])

  const sortedLeads = useMemo(() => {
    return [...filteredLeads].sort((a, b) => {
      const aOverdue = new Date(a.slaDeadline).getTime() < Date.now() && (a.status === 'New' || a.status === 'Contacted')
      const bOverdue = new Date(b.slaDeadline).getTime() < Date.now() && (b.status === 'New' || b.status === 'Contacted')
      if (aOverdue && !bOverdue) return -1
      if (!aOverdue && bOverdue) return 1
      return new Date(a.slaDeadline).getTime() - new Date(b.slaDeadline).getTime()
    })
  }, [filteredLeads])

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

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/leads', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: leadId, status: newStatus, teamMemberId }) })
      if (!res.ok) throw new Error()
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l))
      if (selectedLead?.id === leadId) setSelectedLead(prev => prev ? { ...prev, status: newStatus } : prev)
      useToastStore.getState().addToast(`Status updated to "${newStatus}"`, 'success')
    } catch { useToastStore.getState().addToast('Failed to update status', 'error') }
  }

  const addNote = async (leadId: string) => {
    if (!noteText.trim()) return
    try {
      const res = await fetch(`/api/leads/${leadId}/notes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ teamMemberId, content: noteText.trim() }) })
      if (!res.ok) throw new Error()
      const note = await res.json()
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, notes: [note, ...l.notes] } : l))
      if (selectedLead?.id === leadId) setSelectedLead(prev => prev ? { ...prev, notes: [note, ...prev.notes] } : prev)
      setNoteText('')
      useToastStore.getState().addToast('Note added', 'success')
    } catch { useToastStore.getState().addToast('Failed to add note', 'error') }
  }

  const flagLead = async (leadId: string, flag: string) => {
    try {
      const res = await fetch('/api/leads', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: leadId, flaggedAs: flag, teamMemberId }) })
      if (!res.ok) throw new Error()
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, flaggedAs: flag } : l))
      if (selectedLead?.id === leadId) setSelectedLead(prev => prev ? { ...prev, flaggedAs: flag } : prev)
      useToastStore.getState().addToast(`Flagged as "${flag}"`, 'success')
    } catch { useToastStore.getState().addToast('Failed to flag', 'error') }
  }

  const SLATimerSmall = ({ slaDeadline, inquiryTime }: { slaDeadline: string; inquiryTime: string }) => {
    const [remaining, setRemaining] = useState(0)
    useEffect(() => {
      const calc = () => setRemaining(new Date(slaDeadline).getTime() - Date.now())
      calc()
      const interval = setInterval(calc, 1000)
      return () => clearInterval(interval)
    }, [slaDeadline])
    const isOverdue = remaining <= 0
    const totalSla = new Date(slaDeadline).getTime() - new Date(inquiryTime).getTime()
    const pctLeft = totalSla > 0 ? (remaining / totalSla) * 100 : 0
    const absRemaining = Math.abs(remaining)
    const hours = Math.floor(absRemaining / 3600000)
    const minutes = Math.floor((absRemaining % 3600000) / 60000)
    const seconds = Math.floor((absRemaining % 60000) / 1000)
    const pad = (n: number) => n.toString().padStart(2, '0')
    let label = ''
    let cls = 'sla-safe'
    if (isOverdue) { cls = 'sla-breached'; label = `${hours > 0 ? hours + 'h ' : ''}${pad(minutes)}:${pad(seconds)} OVERDUE` }
    else if (pctLeft <= 25) { cls = 'sla-breached'; label = `${hours > 0 ? hours + 'h ' : ''}${pad(minutes)}:${pad(seconds)} left` }
    else if (pctLeft <= 50) { cls = 'sla-warning'; label = `${hours > 0 ? hours + 'h ' : ''}${pad(minutes)}:${pad(seconds)} left` }
    else { label = `${hours > 0 ? hours + 'h ' : ''}${pad(minutes)}:${pad(seconds)} left` }
    return <span className={`riya-card-sla ${cls}`}>{label}</span>
  }

  const sources = ['All', ...Array.from(new Set(leads.map(l => l.source)))]
  const services = ['All', ...Array.from(new Set(leads.map(l => l.service)))]

  const totalInquiries = leads.length
  const urgentCount = leads.filter(l => { const u = getUrgency(l); return u === 'breached' || u === 'critical' }).length
  const newCount = leads.filter(l => l.status === 'New').length
  const convertedCount = leads.filter(l => l.status === 'Converted').length
  const conversionRate = totalInquiries > 0 ? Math.round((convertedCount / totalInquiries) * 100) : 0

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: 16 }}>
      <div className="spinner" />
      <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>Loading inquiries...</div>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {/* Stats row */}
      <div className="kpi-grid-4" style={{ marginBottom: 14, flexShrink: 0 }}>
        <div className="kpi-card" style={{ padding: '12px 14px' }}>
          <div className="kpi-card-top">
            <div className="riya-pulse-label" style={{ marginBottom: 0 }}>Total Inquiries</div>
            <Inbox size={16} style={{ color: '#6B7280' }} />
          </div>
          <div className="riya-pulse-value" style={{ fontSize: '1.3rem', marginTop: 4 }}>{totalInquiries}</div>
        </div>
        <div className="kpi-card" style={{ padding: '12px 14px' }}>
          <div className="kpi-card-top">
            <div className="riya-pulse-label" style={{ marginBottom: 0 }}>Urgent</div>
            <AlertTriangle size={16} style={{ color: urgentCount > 0 ? '#BB2026' : '#6B7280' }} />
          </div>
          <div className="riya-pulse-value" style={{ fontSize: '1.3rem', marginTop: 4, color: urgentCount > 0 ? '#BB2026' : undefined }}>{urgentCount}</div>
        </div>
        <div className="kpi-card" style={{ padding: '12px 14px' }}>
          <div className="kpi-card-top">
            <div className="riya-pulse-label" style={{ marginBottom: 0 }}>New</div>
            <Zap size={16} style={{ color: newCount > 0 ? '#BB2026' : '#6B7280' }} />
          </div>
          <div className="riya-pulse-value" style={{ fontSize: '1.3rem', marginTop: 4 }}>{newCount}</div>
        </div>
        <div className="kpi-card" style={{ padding: '12px 14px' }}>
          <div className="kpi-card-top">
            <div className="riya-pulse-label" style={{ marginBottom: 0 }}>Conversion Rate</div>
            <CheckCircle size={16} style={{ color: '#059669' }} />
          </div>
          <div className="riya-pulse-value" style={{ fontSize: '1.3rem', marginTop: 4 }}>{conversionRate}%</div>
        </div>
      </div>

      <div className="riya-inquiries-split">
        {/* ─── MASTER PANE (left) ─── */}
        <div className="riya-inquiries-master">
        <div className="riya-inquiries-master-header">
          {/* Tabs */}
          <div className="riya-inquiries-tabs">
            {TAB_ORDER.map(tab => (
              <button key={tab} className={`riya-inquiry-tab ${viewTab === tab ? 'active' : ''}`} onClick={() => setViewTab(tab)}>
                {tab === 'Urgent' && <AlertTriangle size={12} />}
                {tab === 'New' && <Zap size={12} />}
                {tab === 'Contacted' && <Phone size={12} />}
                {tab === 'Consultation Booked' && <Calendar size={12} />}
                {tab === 'Converted' && <CheckCircle size={12} />}
                {tab === 'Lost' && <XCircle size={12} />}
                {tab === 'All' ? 'All' : tab === 'Consultation Booked' ? 'Booked' : tab}
                <span className="riya-inquiry-tab-count">{tabCounts[tab] || 0}</span>
              </button>
            ))}
          </div>
          {/* Filters */}
          <div className="riya-inquiries-filter-row">
            <div className="riya-filter-search-wrap">
              <Search size={14} className="riya-search-icon" />
              <input className="riya-filter-search-input" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <InlineFilter label={sourceFilter === 'All' ? 'Source' : sourceFilter} options={sources} value={sourceFilter} onChange={setSourceFilter} />
            <InlineFilter label={serviceFilter === 'All' ? 'Service' : serviceFilter} options={services} value={serviceFilter} onChange={setServiceFilter} />
          </div>
        </div>
        {/* Cards */}
        <div className="riya-inquiries-master-list">
          {sortedLeads.length === 0 ? (
            <div className="riya-empty-state">
              <Inbox size={40} style={{ color: '#D1D5DB', marginBottom: 8 }} />
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111827', marginBottom: 2 }}>No inquiries found</div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Try adjusting your filters</div>
            </div>
          ) : sortedLeads.map(lead => {
            const urgency = getUrgency(lead)
            const statusConf = STATUS_CONFIG[lead.status] || STATUS_CONFIG['New']
            const StatusIcon = statusConf.icon
            const sourceConf = SOURCE_CONFIG[lead.source] || { bg: '#F3F4F6', text: '#4B5563' }
            const isSelected = selectedLead?.id === lead.id
            return (
              <div key={lead.id}
                className={`riya-inquiry-card-compact ${urgency === 'breached' ? 'severity-critical' : urgency === 'critical' ? 'severity-high' : urgency === 'warning' ? 'severity-medium' : urgency === 'safe' ? 'severity-low' : 'severity-success'} ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedLead(lead)}>
                <div className="riya-card-top-row">
                  <div className="riya-card-name">
                    {lead.name}
                    {lead.flaggedAs && <span className="riya-card-flag-pill"><Flag size={9} />{lead.flaggedAs === 'Needs Attention' ? 'Attn' : lead.flaggedAs}</span>}
                  </div>
                  {(lead.status === 'New' || lead.status === 'Contacted') && (
                    <SLATimerSmall slaDeadline={lead.slaDeadline} inquiryTime={lead.inquiryTime} />
                  )}
                </div>
                <div className="riya-card-meta-row">
                  <span className="riya-card-meta-pill" style={{ background: sourceConf.bg, color: sourceConf.text }}>{lead.source}</span>
                  <span>{lead.service}</span>
                  <span style={{ marginLeft: 'auto', color: '#6B7280' }}>{timeAgo(lead.inquiryTime)}</span>
                </div>
                <div className="riya-card-bottom-row">
                  <span className="riya-card-status" style={{ background: statusConf.bg, color: statusConf.text, borderLeftColor: statusConf.border }}>
                    <StatusIcon size={11} />{lead.status}
                  </span>
                  <button className="riya-card-qaction" onClick={e => { e.stopPropagation(); setShowPhone(prev => ({ ...prev, [lead.id]: !prev[lead.id] })) }}>
                    <Eye size={10} /> {showPhone[lead.id] ? 'Hide' : 'Phone'}
                  </button>
                  <div className="riya-card-quick-actions" onClick={e => e.stopPropagation()}>
                    {lead.status === 'New' && (
                      <button className="riya-card-qaction" onClick={() => updateLeadStatus(lead.id, 'Contacted')}>
                        <CheckCircle size={10} /> Contact
                      </button>
                    )}
                    {(lead.status === 'Contacted' || lead.status === 'New') && (
                      <button className="riya-card-qaction" onClick={() => updateLeadStatus(lead.id, 'Consultation Booked')}>
                        <Calendar size={10} /> Book
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ─── DETAIL PANE (right) ─── */}
      <div className={`riya-inquiries-detail ${selectedLead ? 'open' : ''}`}>
        {!selectedLead ? (
          <div className="riya-detail-empty">
            <div className="riya-detail-empty-icon"><Inbox size={32} /></div>
            <div className="riya-detail-empty-title">Select an inquiry</div>
            <div className="riya-detail-empty-sub">Choose a patient from the list to view their details and take action</div>
          </div>
        ) : (
          <>
            {/* Detail Header */}
            <div className="riya-detail-header">
              <div className="riya-detail-header-info">
                <h2>{selectedLead.name}</h2>
                <div className="riya-detail-subtitle">{selectedLead.service} \u00B7 {selectedLead.client.name}</div>
              </div>
              <button className="riya-detail-close" onClick={() => setSelectedLead(null)}><X size={14} /></button>
            </div>
            {/* Detail Body */}
            <div className="riya-detail-content">
              <div className="riya-detail-body">
                {/* SLA Timer */}
                {(selectedLead.status === 'New' || selectedLead.status === 'Contacted') && (
                  <div className="riya-detail-section">
                    <div className="riya-detail-timer">
                      <div className="riya-detail-timer-label">SLA Timer</div>
                      <SLATimerSmall slaDeadline={selectedLead.slaDeadline} inquiryTime={selectedLead.inquiryTime} />
                    </div>
                  </div>
                )}
                {/* Quick Contact */}
                <div className="riya-detail-section">
                  <div className="riya-detail-section-title">Quick Contact</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="riya-contact-btn" onClick={() => useToastStore.getState().addToast('Calling ' + selectedLead.name + '...', 'info')}>
                      <Phone size={14} /> Call
                    </button>
                    <button className="riya-contact-btn" onClick={() => useToastStore.getState().addToast('Opening WhatsApp for ' + selectedLead.name, 'info')}>
                      <MessageCircle size={14} /> WhatsApp
                    </button>
                    <button className="riya-contact-btn" onClick={() => useToastStore.getState().addToast('Opening email...', 'info')}>
                      <Mail size={14} /> Email
                    </button>
                  </div>
                </div>
                {/* Status Change */}
                <div className="riya-detail-section">
                  <div className="riya-detail-section-title">Change Status</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {STATUS_OPTIONS.map(status => {
                      const conf = STATUS_CONFIG[status]
                      const Icon = conf.icon
                      const isActive = selectedLead.status === status
                      return (
                        <button key={status} className={`riya-status-btn ${isActive ? 'riya-status-btn-active' : ''}`}
                          style={isActive ? { background: conf.bg, color: conf.text, borderColor: conf.border } : {}}
                          onClick={() => { if (!isActive) updateLeadStatus(selectedLead.id, status) }} disabled={isActive}>
                          <Icon size={13} />{status}
                        </button>
                      )
                    })}
                  </div>
                </div>
                {/* Patient Info */}
                <div className="riya-detail-section">
                  <div className="riya-detail-section-title">Patient Information</div>
                  <div className="riya-detail-info-grid">
                    <div className="riya-detail-info-item">
                      <span className="riya-detail-info-label">Phone</span>
                      <span className="riya-detail-info-value" style={{ cursor: 'pointer' }}
                        onClick={() => setShowPhone(prev => ({ ...prev, [selectedLead.id]: !prev[selectedLead.id] }))}>
                        {showPhone[selectedLead.id] ? selectedLead.phone : selectedLead.phoneMasked} <Eye size={11} style={{ color: '#6B7280' }} />
                      </span>
                    </div>
                    <div className="riya-detail-info-item">
                      <span className="riya-detail-info-label">Inquiry Time</span>
                      <span className="riya-detail-info-value">{new Date(selectedLead.inquiryTime).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="riya-detail-info-item">
                      <span className="riya-detail-info-label">Service</span>
                      <span className="riya-detail-info-value">{selectedLead.service}</span>
                    </div>
                    <div className="riya-detail-info-item">
                      <span className="riya-detail-info-label">Location</span>
                      <span className="riya-detail-info-value">{selectedLead.location}</span>
                    </div>
                    <div className="riya-detail-info-item">
                      <span className="riya-detail-info-label">Source</span>
                      <span className="riya-detail-info-value">{selectedLead.source}</span>
                    </div>
                    {selectedLead.cost > 0 && (
                      <div className="riya-detail-info-item">
                        <span className="riya-detail-info-label">Acq. Cost</span>
                        <span className="riya-detail-info-value" style={{ color: '#BB2026', fontWeight: 600 }}>\u20B9{selectedLead.cost.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                  </div>
                </div>
                {/* Service Intelligence */}
                {SERVICE_INTELLIGENCE[selectedLead.service] && (
                  <div className="riya-detail-section">
                    <div className="riya-detail-section-title">Service Quick Reference</div>
                    <div className="riya-service-intel">
                      <div style={{ fontSize: '0.78rem', color: '#4B5563', lineHeight: 1.5 }}>{SERVICE_INTELLIGENCE[selectedLead.service].tip}</div>
                      <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
                        <span style={{ fontSize: '0.72rem', color: '#6B7280' }}>Preferred: {SERVICE_INTELLIGENCE[selectedLead.service].preferred}</span>
                        <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 600 }}>Avg Value: {SERVICE_INTELLIGENCE[selectedLead.service].avgValue}</span>
                      </div>
                    </div>
                  </div>
                )}
                {/* Notes */}
                <div className="riya-detail-section">
                  <div className="riya-detail-section-title">Conversation Notes ({selectedLead.notes.length})</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input className="riya-note-input" placeholder="Add a note..." value={noteText} onChange={e => setNoteText(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && noteText.trim()) addNote(selectedLead.id) }} />
                    <button className="riya-note-send-btn" onClick={() => addNote(selectedLead.id)} disabled={!noteText.trim()}><Send size={16} /></button>
                  </div>
                  {selectedLead.notes.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {selectedLead.notes.map(note => (
                        <div key={note.id} className="riya-note-item">
                          <div style={{ fontSize: '0.78rem', color: '#4B5563' }}>{note.content}</div>
                          <div style={{ fontSize: '0.68rem', color: '#6B7280', marginTop: 2 }}>{timeAgo(note.createdAt)}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Status History */}
                {selectedLead.statusHistory.length > 0 && (
                  <div className="riya-detail-section">
                    <div className="riya-detail-section-title">Status History</div>
                    <div className="timeline">
                      {selectedLead.statusHistory.map(sc => (
                        <div key={sc.id} className="timeline-item">
                          <div className="timeline-dot" style={{ background: '#6B7280' }} />
                          <div className="timeline-content">
                            <div className="timeline-text"><span style={{ color: '#6B7280' }}>{sc.fromStatus}</span>{' \u2192 '}<span style={{ fontWeight: 600, color: '#111827' }}>{sc.toStatus}</span></div>
                            <div className="timeline-time">{timeAgo(sc.createdAt)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Flags */}
                <div className="riya-detail-section">
                  <div className="riya-detail-section-title">Flag</div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {['Spam', 'Duplicate', 'Needs Attention'].map(flag => (
                      <button key={flag} className={`riya-flag-btn ${selectedLead.flaggedAs === flag ? 'riya-flag-btn-active' : ''}`}
                        onClick={() => flagLead(selectedLead.id, selectedLead.flaggedAs === flag ? '' : flag)}>
                        <Flag size={12} />{flag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      </div>

      {/* Quick Actions */}
      <div className="riya-quick-actions" style={{ marginTop: 10, flexShrink: 0 }}>
        <button className="riya-action-btn" onClick={() => useToastStore.getState().addToast('Opening bulk assign...', 'info')}>
          <Users size={14} /> Bulk Assign
        </button>
        <button className="riya-action-btn" onClick={() => useToastStore.getState().addToast('Exporting inquiry report...', 'info')}>
          <Download size={14} /> Export
        </button>
        <button className="riya-action-btn" onClick={() => {
          setSourceFilter('All'); setServiceFilter('All'); setSearchQuery(''); setViewTab('All')
          useToastStore.getState().addToast('Filters reset', 'success')
        }}>
          <RefreshCw size={14} /> Reset Filters
        </button>
      </div>
    </div>
  )
}
