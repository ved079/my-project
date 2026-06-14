'use client'

import { useState, useMemo, useEffect } from 'react'
import { Eye, ArrowRightLeft, Phone, X, Search } from 'lucide-react'
import {
  ACCENT, HEADING, GRAY,
  ALL_LEADS, sourcePillClass, statusPillClass,
} from '@/lib/data'
import { useToastStore } from '@/store/toast-store'

export function LeadsPage() {
  const [search, setSearch] = useState('')
  const [filterSource, setFilterSource] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterAssigned, setFilterAssigned] = useState('')
  const [page, setPage] = useState(1)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<typeof ALL_LEADS[0] | null>(null)
  const [realLeads, setRealLeads] = useState<typeof ALL_LEADS | null>(null)

  useEffect(() => {
    async function fetchLeads() {
      try {
        const teamRes = await fetch('/api/team')
        const members: Array<{id: string; name: string}> = await teamRes.json()
        if (members.length === 0) return
        const leadsRes = await fetch(`/api/leads?teamMemberId=${members[0].id}`)
        const data = await leadsRes.json()
        if (Array.isArray(data) && data.length > 0) setRealLeads(data)
      } catch { /* fall back to mock */ }
    }
    fetchLeads()
  }, [])

  const perPage = 20

  const leads = realLeads || ALL_LEADS

  const filtered = useMemo(() => {
    return leads.filter(l => {
      if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.phone.includes(search)) return false
      if (filterSource && l.source !== filterSource) return false
      if (filterStatus && l.status !== filterStatus) return false
      if (filterAssigned && l.assignedTo !== filterAssigned) return false
      return true
    })
  }, [search, filterSource, filterStatus, filterAssigned, leads])

  const exportCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Service', 'Source', 'Status', 'Location', 'Inquiry Time', 'Cost']
    const rows = filtered.map(l => [l.name, l.phone, '', l.service, l.source, l.status, l.location, '', String(0)])
    const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `newmi-leads-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    useToastStore.getState().addToast('CSV exported', 'success')
  }

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  const openDrawer = (lead: typeof ALL_LEADS[0]) => {
    setSelectedLead(lead)
    setDrawerOpen(true)
  }

  return (
    <div>
      <p className="section-label">LEAD MANAGEMENT</p>
      <h2 className="section-heading">Every Lead. One Place.</h2>
      <p className="section-subtitle">Complete lead database with full contact and activity details.</p>

      {/* Filter Bar */}
      <div className="filter-bar">
        <input className="filter-search" placeholder="Search by name or phone..." value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
        <select className="filter-select" value={filterSource} onChange={e => { setFilterSource(e.target.value); setPage(1) }}>
          <option value="">All Sources</option>
          {['Google Ads', 'Meta Ads', 'Organic SEO', 'Practo', 'WhatsApp'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="filter-select" value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1) }}>
          <option value="">All Statuses</option>
          {['New', 'Contacted', 'Consultation Booked', 'Converted', 'Lost', 'No Response'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="filter-select" value={filterAssigned} onChange={e => { setFilterAssigned(e.target.value); setPage(1) }}>
          <option value="">All Assigned</option>
          {['Riya Sharma', 'Anil Kapoor', 'Priya Singh', 'Meena Patel', 'Unassigned'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className="filter-export-btn" onClick={exportCSV}>Export CSV</button>
      </div>

      {/* Leads Table */}
      <div className="report-table-wrap">
        <table className="report-table">
          <thead>
            <tr>
              <th>#</th><th>Patient Name</th><th>Phone</th><th>Source</th><th>Service</th>
              <th>Location</th><th>Status</th><th>Assigned To</th><th>Created</th><th>Last Activity</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.map(lead => (
              <tr key={lead.id}>
                <td style={{ color: GRAY }}>{lead.id}</td>
                <td style={{ fontWeight: 600, color: HEADING }}>{lead.name}</td>
                <td style={{ fontVariantNumeric: 'tabular-nums' }}>{lead.phone}</td>
                <td><span className={`source-pill ${sourcePillClass(lead.source)}`}>{lead.source}</span></td>
                <td>{lead.service}</td>
                <td>{lead.location}</td>
                <td><span className={`status-pill ${statusPillClass(lead.status)}`}>{lead.status}</span></td>
                <td>{lead.assignedTo === 'Unassigned' ? <span style={{ color: ACCENT, fontWeight: 600 }}>{lead.assignedTo}</span> : lead.assignedTo}</td>
                <td style={{ fontSize: '0.72rem', color: GRAY }}>{lead.created}</td>
                <td style={{ fontSize: '0.72rem', color: GRAY }}>{lead.lastActivity}</td>
                <td>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button className="action-icon-btn" onClick={() => openDrawer(lead)} title="View details"><Eye size={13} /></button>
                    <button className="action-icon-btn" title="Reassign"><ArrowRightLeft size={13} /></button>
                    <button className="action-icon-btn" title="Call log"><Phone size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <span>Showing {((page - 1) * perPage) + 1}-{Math.min(page * perPage, filtered.length)} of {filtered.length} leads</span>
        <div className="pagination-btns">
          <button className="pagination-btn" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} className={`pagination-btn ${page === i + 1 ? 'active' : ''}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
          ))}
          <button className="pagination-btn" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
        </div>
      </div>

      {/* Lead Drawer */}
      {drawerOpen && selectedLead && (
        <>
          <div className="lead-drawer-overlay" onClick={() => setDrawerOpen(false)} />
          <div className="lead-drawer">
            <div className="lead-drawer-header">
              <h3>{selectedLead.name}</h3>
              <button className="lead-drawer-close" onClick={() => setDrawerOpen(false)}><X size={14} /></button>
            </div>

            <div className="lead-drawer-section">
              <div className="lead-drawer-section-title">Patient Info</div>
              <div className="lead-drawer-row"><span className="lead-drawer-row-label">Phone</span><span className="lead-drawer-row-value">{selectedLead.phoneUnmasked}</span></div>
              <div className="lead-drawer-row"><span className="lead-drawer-row-label">Location</span><span className="lead-drawer-row-value">{selectedLead.location}</span></div>
              <div className="lead-drawer-row"><span className="lead-drawer-row-label">Created</span><span className="lead-drawer-row-value">{selectedLead.created}</span></div>
            </div>

            <div className="lead-drawer-section">
              <div className="lead-drawer-section-title">Lead Source</div>
              <div className="lead-drawer-row"><span className="lead-drawer-row-label">Source</span><span className="lead-drawer-row-value">{selectedLead.source}</span></div>
              {selectedLead.utm && <div className="lead-drawer-row"><span className="lead-drawer-row-label">UTM</span><span className="lead-drawer-row-value" style={{ fontSize: '0.72rem' }}>{selectedLead.utm}</span></div>}
            </div>

            <div className="lead-drawer-section">
              <div className="lead-drawer-section-title">Service Interest</div>
              <div className="lead-drawer-row"><span className="lead-drawer-row-label">Service</span><span className="lead-drawer-row-value">{selectedLead.service}</span></div>
              <div className="lead-drawer-row"><span className="lead-drawer-row-label">Status</span><span className={`status-pill ${statusPillClass(selectedLead.status)}`}>{selectedLead.status}</span></div>
            </div>

            <div className="lead-drawer-section">
              <div className="lead-drawer-section-title">Activity Timeline</div>
              <div className="timeline">
                <div className="timeline-item"><div className="timeline-dot" /><div className="timeline-content"><div className="timeline-text">Lead created via {selectedLead.source} form</div><div className="timeline-time">{selectedLead.created}</div></div></div>
                <div className="timeline-item"><div className="timeline-dot" /><div className="timeline-content"><div className="timeline-text">Auto WhatsApp sent</div><div className="timeline-time">{selectedLead.created} +1m</div></div></div>
                {selectedLead.assignedTo !== 'Unassigned' && (
                  <div className="timeline-item"><div className="timeline-dot" /><div className="timeline-content"><div className="timeline-text">Called by {selectedLead.assignedTo} (2m 14sec)</div><div className="timeline-time">Next day, 11:00am</div></div></div>
                )}
                {selectedLead.status === 'Consultation Booked' && (
                  <div className="timeline-item"><div className="timeline-dot" /><div className="timeline-content"><div className="timeline-text">Consultation booked</div><div className="timeline-time">Same call</div></div></div>
                )}
                {selectedLead.status === 'Converted' && (
                  <>
                    <div className="timeline-item"><div className="timeline-dot" /><div className="timeline-content"><div className="timeline-text">Consultation completed</div><div className="timeline-time">2 days later</div></div></div>
                    <div className="timeline-item"><div className="timeline-dot" style={{ background: '#059669' }} /><div className="timeline-content"><div className="timeline-text" style={{ color: '#059669', fontWeight: 600 }}>Patient converted</div><div className="timeline-time">Same day</div></div></div>
                  </>
                )}
              </div>
            </div>

            <div className="lead-drawer-section">
              <div className="lead-drawer-section-title">Notes</div>
              <textarea style={{ width: '100%', minHeight: '60px', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '8px', fontSize: '0.8rem', fontFamily: 'inherit', resize: 'vertical' }} placeholder="Add a note..." />
              <button style={{ marginTop: '6px', padding: '6px 14px', borderRadius: '6px', background: ACCENT, color: 'white', border: 'none', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }} onClick={() => useToastStore.getState().addToast('Note added ✓', 'success')}>Add Note</button>
            </div>

            <div className="lead-drawer-section">
              <div className="lead-drawer-section-title">Transfer Lead</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <select className="filter-select" style={{ flex: 1 }} defaultValue={selectedLead.assignedTo}>
                  {['Riya Sharma', 'Anil Kapoor', 'Priya Singh', 'Meena Patel', 'Unassigned'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <button style={{ padding: '6px 14px', borderRadius: '6px', background: ACCENT, color: 'white', border: 'none', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }} onClick={() => { useToastStore.getState().addToast('Lead transferred ✓', 'success') }}>Transfer</button>
              </div>
            </div>

            <div className="lead-drawer-section">
              <div className="lead-drawer-section-title">Update Status</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <select className="filter-select" style={{ flex: 1 }} defaultValue={selectedLead.status}>
                  {['New', 'Contacted', 'Consultation Booked', 'Converted', 'Lost', 'No Response'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <button style={{ padding: '6px 14px', borderRadius: '6px', background: ACCENT, color: 'white', border: 'none', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }} onClick={() => { useToastStore.getState().addToast('Status updated ✓', 'success') }}>Update</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
