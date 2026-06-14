'use client'

import { Phone, ArrowRightLeft } from 'lucide-react'
import {
  PIPELINE_LEADS, sourcePillClass, initials,
} from '@/lib/data'

export function PipelinePage() {
  const stages = ['New', 'Contacted', 'Consultation', 'Converted'] as const
  const stagePotentials: Record<string, string> = { New: '\u20B93,20,000', Contacted: '\u20B92,45,000', Consultation: '\u20B91,80,000', Converted: '\u20B98,40,000' }

  return (
    <div>
      <p className="section-label">SALES PIPELINE</p>
      <h2 className="section-heading">Leads Moving Through the Funnel</h2>
      <p className="section-subtitle">Visual overview of lead progression.</p>

      <div className="filter-bar">
        <select className="filter-select"><option>All Sources</option>{['Google Ads', 'Meta Ads', 'Organic SEO', 'Practo', 'WhatsApp'].map(s => <option key={s}>{s}</option>)}</select>
        <select className="filter-select"><option>All Services</option>{['Pregnancy Care', 'PCOS Management', 'Fertility Consultation', 'Menopause Support', 'General Wellness'].map(s => <option key={s}>{s}</option>)}</select>
        <select className="filter-select"><option>All Assigned</option>{['Riya Sharma', 'Anil Kapoor', 'Priya Singh', 'Meena Patel', 'Unassigned'].map(s => <option key={s}>{s}</option>)}</select>
      </div>

      <div className="kanban-grid">
        {stages.map(stage => {
          const leads = PIPELINE_LEADS.filter(l => l.stage === stage)
          return (
            <div key={stage} className="kanban-col">
              <div className="kanban-col-header">
                <span>{stage}</span>
                <span className="kanban-col-count">{leads.length}</span>
              </div>
              <div style={{ fontSize: '0.62rem', color: '#6B7280', padding: '2px 12px 6px', background: '#F3F4F6' }}>{stagePotentials[stage]} potential</div>
              <div className="kanban-col-body">
                {leads.map((lead, i) => (
                  <div key={i} className="lead-card">
                    <div className="lead-card-drag"><span style={{ fontSize: '0.6rem' }}>::</span></div>
                    <div className="lead-card-inner">
                      <div className="lead-card-row">
                        <span className="lead-name">{lead.name}</span>
                        <span className={`source-pill ${sourcePillClass(lead.source)}`}>{lead.source.split(' ')[0]}</span>
                      </div>
                      <div><span className="lead-service-pill">{lead.service}</span></div>
                      <div className="lead-assignee">
                        <span className="lead-assignee-avatar">{initials(lead.assignedTo)}</span>
                        <span className="lead-assignee-name">{lead.assignedTo}</span>
                      </div>
                      <div className="lead-stage-time">
                        In stage: {lead.stageTime}
                        <span className={`urgency-dot urgency-${lead.urgency}`} />
                      </div>
                      <div className="lead-card-actions">
                        <button className="lead-card-action-btn"><Phone size={11} /></button>
                        <button className="lead-card-action-btn"><ArrowRightLeft size={11} /></button>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="kanban-add-btn">+ Add Lead</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
