'use client'

import { useState } from 'react'
import { MessageCircle, Send } from 'lucide-react'
import {
  ACCENT, GRAY, HEADING, CHART_5,
  WA_CONVERSATIONS, WA_MESSAGES, WA_TEMPLATES,
  initials,
} from '@/lib/data'
import { useToastStore } from '@/store/toast-store'

export function WhatsAppPage() {
  const [selectedConv, setSelectedConv] = useState<string | null>(null)
  const messages = selectedConv ? (WA_MESSAGES[selectedConv] || []) : []

  return (
    <div>
      <p className="section-label">COMMUNICATION</p>
      <h2 className="section-heading">WhatsApp Hub</h2>
      <p className="section-subtitle">Manage conversations, templates, and response times.</p>

      <div className="kpi-grid-4">
        <div className="kpi-card"><div className="kpi-label">Avg Response</div><div className="kpi-value">4.2 min</div><div className="kpi-delta up">Under 5 min target</div></div>
        <div className="kpi-card"><div className="kpi-label">Active Conversations</div><div className="kpi-value">24</div><div className="kpi-delta up">+8 today</div></div>
        <div className="kpi-card"><div className="kpi-label">Messages Today</div><div className="kpi-value">87</div><div className="kpi-delta up">+23%</div></div>
        <div className="kpi-card"><div className="kpi-label">Unread</div><div className="kpi-value">2</div><div className="kpi-delta down">Needs attention</div></div>
      </div>

      <div className="chart-row-2">
        <div className="chart-panel" style={{ maxHeight: 480, overflowY: 'auto' }}>
          <div className="chart-panel-title">Recent Conversations</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {WA_CONVERSATIONS.map((conv, i) => (
              <div
                key={i}
                onClick={() => setSelectedConv(conv.name)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, cursor: 'pointer',
                  background: selectedConv === conv.name ? '#FEF2F2' : 'transparent',
                  borderLeft: selectedConv === conv.name ? `3px solid ${ACCENT}` : '3px solid transparent',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.68rem', fontWeight: 700, color: HEADING, flexShrink: 0 }}>
                  {initials(conv.name)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: conv.unread ? 700 : 500, color: HEADING }}>{conv.name}</span>
                    <span style={{ fontSize: '0.65rem', color: GRAY, flexShrink: 0 }}>{conv.time}</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: GRAY, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{conv.lastMessage}</div>
                  <span style={{ fontSize: '0.6rem', padding: '1px 5px', borderRadius: 3, background: '#F3F4F6', color: GRAY }}>{conv.service}</span>
                </div>
                {conv.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', background: CHART_5, flexShrink: 0 }} />}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="chart-panel" style={{ flex: 1, maxHeight: 340, overflowY: 'auto' }}>
            <div className="chart-panel-title">{selectedConv ? `Chat with ${selectedConv}` : 'Select a conversation'}</div>
            {selectedConv ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {messages.map((msg, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'us' ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      maxWidth: '80%', padding: '8px 12px', borderRadius: msg.from === 'us' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                      background: msg.from === 'us' ? '#DCFCE7' : '#F3F4F6', fontSize: '0.78rem', lineHeight: 1.5, color: HEADING,
                    }}>
                      {msg.text}
                      <div style={{ fontSize: '0.6rem', color: GRAY, marginTop: 2, textAlign: msg.from === 'us' ? 'right' : 'left' }}>{msg.time}</div>
                    </div>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                  {['Yes, sure!', 'Let me check', 'Book consultation'].map((r, i) => (
                    <button key={i} style={{ padding: '4px 10px', borderRadius: 16, border: `1px solid ${ACCENT}`, background: 'white', color: ACCENT, fontSize: '0.68rem', fontWeight: 600, cursor: 'pointer' }} onClick={() => { useToastStore.getState().addToast('Message sent ✓', 'success') }}>{r}</button>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 32, color: GRAY, fontSize: '0.82rem' }}>
                <MessageCircle size={32} style={{ margin: '0 auto 8px', opacity: 0.3 }} />
                Click a conversation to view messages
              </div>
            )}
          </div>

          <div className="chart-panel">
            <div className="chart-panel-title">Message Templates</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {WA_TEMPLATES.map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 6, border: '1px solid var(--border)', background: 'white', cursor: 'pointer' }}>
                  <Send size={12} style={{ color: CHART_5, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: HEADING }}>{t.name}</div>
                    <div style={{ fontSize: '0.65rem', color: GRAY, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.preview}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
