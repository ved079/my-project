'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import {
  ASSIGNMENT_RULES,
} from '@/lib/data'
import { useToastStore } from '@/store/toast-store'
import { AnimatedNumber } from '@/components/shared/AnimatedNumber'

export function RulesPage() {
  const [rules, setRules] = useState(ASSIGNMENT_RULES)
  const [showForm, setShowForm] = useState(false)
  const [newSource, setNewSource] = useState('Google Ads')
  const [newService, setNewService] = useState('')
  const [newAssignee, setNewAssignee] = useState('Riya Sharma')

  const toggleRule = (id: number) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r))
  }

  const addRule = () => {
    if (!newService) return
    const rule = { id: Date.now(), conditions: [{ field: 'source', op: '=', value: newSource }, ...(newService ? [{ field: 'service', op: '=', value: newService }] : [])], action: newAssignee, active: true }
    setRules(prev => [...prev, rule])
    setShowForm(false)
    setNewService('')
    useToastStore.getState().addToast('Rule created ✓', 'success')
  }

  return (
    <div>
      <p className="section-label">AUTOMATION</p>
      <h2 className="section-heading">Auto-Assignment Rules</h2>
      <p className="section-subtitle">Visual rule builder for automatic lead assignment.</p>

      <div className="kpi-grid-4">
        <div className="kpi-card" style={{ textAlign: 'center', padding: '24px' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#059669', lineHeight: 1 }}><AnimatedNumber value="23" /></div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginTop: 4 }}>Rules Applied Today</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--meta)', marginTop: 2 }}>Auto-assigned leads</div>
        </div>
        <div className="kpi-card" style={{ textAlign: 'center', padding: '24px' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-red)', lineHeight: 1 }}>{rules.filter(r => r.active).length}</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginTop: 4 }}>Active Rules</div>
        </div>
        <div className="kpi-card" style={{ textAlign: 'center', padding: '24px' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#D97706', lineHeight: 1 }}>{rules.length}</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginTop: 4 }}>Total Rules</div>
        </div>
        <div className="kpi-card" style={{ textAlign: 'center', padding: '24px' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#059669', lineHeight: 1 }}>92%</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginTop: 4 }}>Assignment Accuracy</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div className="chart-panel-title" style={{ margin: 0 }}>Active Rules</div>
        <button style={{ padding: '6px 14px', borderRadius: '8px', background: 'var(--accent-red)', color: 'white', border: 'none', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }} onClick={() => setShowForm(!showForm)}><Plus size={14} /> Add Rule</button>
      </div>

      {showForm && (
        <div className="chart-panel" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginBottom: 12 }}>New Rule</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: '0.68rem', color: 'var(--meta)', marginBottom: 4 }}>IF Source</div>
              <select className="filter-select" value={newSource} onChange={e => setNewSource(e.target.value)}>
                {['Google Ads', 'Meta Ads', 'Organic SEO', 'Practo', 'WhatsApp'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize: '0.68rem', color: 'var(--meta)', marginBottom: 4 }}>AND Service</div>
              <input className="filter-search" placeholder="e.g. PCOS Management" value={newService} onChange={e => setNewService(e.target.value)} style={{ minWidth: 160 }} />
            </div>
            <div>
              <div style={{ fontSize: '0.68rem', color: 'var(--meta)', marginBottom: 4 }}>THEN Assign To</div>
              <select className="filter-select" value={newAssignee} onChange={e => setNewAssignee(e.target.value)}>
                {['Riya Sharma', 'Anil Kapoor', 'Priya Singh', 'Meena Patel'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <button style={{ padding: '6px 14px', borderRadius: '8px', background: 'var(--accent-red)', color: 'white', border: 'none', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }} onClick={addRule}>Save Rule</button>
          </div>
        </div>
      )}

      <div className="report-table-wrap">
        <table className="report-table">
          <thead><tr><th>Conditions</th><th>Assign To</th><th>Status</th></tr></thead>
          <tbody>
            {rules.map(rule => (
              <tr key={rule.id}>
                <td style={{ fontWeight: 500 }}>
                  {rule.conditions.map((c, i) => (
                    <span key={i}>
                      {i > 0 && <span style={{ color: 'var(--accent-red)', fontWeight: 600, margin: '0 6px' }}>AND</span>}
                      <span style={{ background: 'var(--bg-alt)', padding: '2px 8px', borderRadius: 4, fontSize: '0.75rem' }}>{c.field}={c.value}</span>
                    </span>
                  ))}
                </td>
                <td style={{ fontWeight: 600, color: 'var(--navy)' }}>{rule.action}</td>
                <td>
                  <div className={`toggle-switch ${rule.active ? 'active' : ''}`} onClick={() => toggleRule(rule.id)} role="switch" aria-checked={rule.active} tabIndex={0} onKeyDown={e => { if (e.key === 'Enter') toggleRule(rule.id) }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
