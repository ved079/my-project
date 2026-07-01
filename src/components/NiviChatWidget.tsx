'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, Sparkles, ChevronDown } from 'lucide-react'

interface ChatMessage {
  id: string
  from: 'nivi' | 'patient'
  text: string
  timestamp: Date
  suggestions?: string[]
}

const WELCOME: ChatMessage = {
  id: 'welcome',
  from: 'nivi',
  text: "Hi! I'm Nivi, Newmi Care's AI health assistant. 🌸 I can help you learn about our services, understand your symptoms, or book a consultation. What brings you here today?",
  timestamp: new Date(),
  suggestions: ['I have PCOS', 'I want to get pregnant', "I'm pregnant", 'What are the costs?', 'I need a specialist'],
}

const SESSION_ID = typeof crypto !== 'undefined' ? crypto.randomUUID() : `lp-${Date.now()}`

export function NiviChatWidget({ onBook }: { onBook: (condition?: string) => void }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [unread, setUnread] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const msgCounter = useRef(0)

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])

  useEffect(() => { scrollToBottom() }, [messages, isTyping, scrollToBottom])

  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return

    msgCounter.current += 1
    const id = `msg-${Date.now()}-${msgCounter.current}`

    const patientMsg: ChatMessage = { id, from: 'patient', text: trimmed, timestamp: new Date() }
    setMessages(prev => [...prev.map(m => ({ ...m, suggestions: undefined })), patientMsg])
    setInput('')
    setIsTyping(true)

    try {
      const res = await fetch('/api/nivi/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId: SESSION_ID, message: trimmed, patientName: 'Guest' }),
      })
      const data = await res.json()
      const niviMsg: ChatMessage = {
        id: `nivi-${Date.now()}`,
        from: 'nivi',
        text: data.text || "I'm here to help. Could you share a bit more?",
        timestamp: new Date(),
        suggestions: data.suggestions?.map((s: { label?: string; action?: string } | string) =>
          typeof s === 'string' ? s : s.label || s.action || ''
        ).filter(Boolean).slice(0, 4),
      }
      setMessages(prev => [...prev, niviMsg])
      if (!open) setUnread(u => u + 1)
    } catch {
      setMessages(prev => [...prev, {
        id: `nivi-err-${Date.now()}`,
        from: 'nivi' as const,
        text: "I'm having a moment — please try again or book a consultation directly.",
        timestamp: new Date(),
        suggestions: ['Book Consultation'],
      }])
    } finally {
      setIsTyping(false)
    }
  }, [isTyping, open])

  const handleOpen = () => {
    setOpen(true)
    setHasOpened(true)
    setUnread(0)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const handleSuggestion = (s: string) => {
    if (s === 'Book Consultation') { onBook(); return }
    sendMessage(s)
  }

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={handleOpen}
        aria-label="Chat with Nivi AI"
        style={{
          position: 'fixed',
          bottom: 88,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #BB2026, #9c151c)',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(187,32,38,0.4)',
          zIndex: 100,
          display: open ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(187,32,38,0.5)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(187,32,38,0.4)' }}
      >
        <Sparkles size={24} />
        {unread > 0 && (
          <span style={{ position: 'absolute', top: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: '#EF4444', color: 'white', fontSize: '0.65rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>
            {unread}
          </span>
        )}
      </button>

      {/* Intro tooltip (only before first open) */}
      {!hasOpened && (
        <div style={{ position: 'fixed', bottom: 152, right: 20, background: 'white', border: '1px solid #E5E7EB', borderRadius: 12, padding: '10px 14px', fontSize: '0.8rem', color: '#374151', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', zIndex: 99, maxWidth: 200, lineHeight: 1.4, pointerEvents: 'none' }}>
          <strong style={{ color: '#BB2026' }}>Ask Nivi</strong> — your AI health guide
          <div style={{ position: 'absolute', bottom: -6, right: 24, width: 12, height: 12, background: 'white', border: '1px solid #E5E7EB', borderTop: 'none', borderLeft: 'none', transform: 'rotate(45deg)' }} />
        </div>
      )}

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Nivi AI"
          aria-modal="true"
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            width: 'min(380px, calc(100vw - 32px))',
            height: 'min(560px, calc(100vh - 80px))',
            background: 'white',
            borderRadius: 20,
            boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 200,
            border: '1px solid #F3F4F6',
          }}
        >
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg, #BB2026, #9c151c)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={18} color="white" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem', margin: 0 }}>Nivi</p>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.72rem', margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80', display: 'inline-block' }} />
                Newmi Care AI · Online
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', flexShrink: 0 }}
            >
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Disclaimer strip */}
          <div style={{ background: '#FEF2F2', padding: '6px 14px', fontSize: '0.7rem', color: '#6B7280', textAlign: 'center', borderBottom: '1px solid #F3F4F6', flexShrink: 0 }}>
            Nivi is an AI guide — not a doctor. Always consult a specialist for medical decisions.
          </div>

          {/* Messages */}
          <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 8px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {messages.map((msg) => (
              <div key={msg.id}>
                <div style={{ display: 'flex', justifyContent: msg.from === 'patient' ? 'flex-end' : 'flex-start', marginBottom: 2 }}>
                  {msg.from === 'nivi' && (
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 6, flexShrink: 0, alignSelf: 'flex-end' }}>
                      <Sparkles size={12} color="#BB2026" />
                    </div>
                  )}
                  <div style={{
                    maxWidth: '75%',
                    padding: '10px 13px',
                    borderRadius: msg.from === 'nivi' ? '18px 18px 18px 4px' : '18px 18px 4px 18px',
                    background: msg.from === 'nivi' ? '#F9FAFB' : '#BB2026',
                    color: msg.from === 'nivi' ? '#111827' : 'white',
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                    border: msg.from === 'nivi' ? '1px solid #E5E7EB' : 'none',
                  }}>
                    {msg.text}
                  </div>
                </div>
                <p style={{ fontSize: '0.65rem', color: '#9CA3AF', textAlign: msg.from === 'patient' ? 'right' : 'left', paddingLeft: msg.from === 'nivi' ? 30 : 0, margin: '0 0 8px' }}>
                  {formatTime(msg.timestamp)}
                </p>
                {/* Quick reply chips */}
                {msg.from === 'nivi' && msg.suggestions && msg.suggestions.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingLeft: 30, marginBottom: 8 }}>
                    {msg.suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSuggestion(s)}
                        style={{
                          padding: '5px 12px',
                          borderRadius: 99,
                          border: '1.5px solid #BB2026',
                          background: s === 'Book Consultation' ? '#BB2026' : 'white',
                          color: s === 'Book Consultation' ? 'white' : '#BB2026',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          transition: 'all 0.15s',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Sparkles size={12} color="#BB2026" />
                </div>
                <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '18px 18px 18px 4px', padding: '10px 14px', display: 'flex', gap: 4, alignItems: 'center' }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#9CA3AF', display: 'inline-block', animation: 'nivi-bounce 1.2s ease-in-out infinite', animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div style={{ padding: '10px 12px', borderTop: '1px solid #F3F4F6', background: 'white', flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', background: '#F9FAFB', border: '1.5px solid #E5E7EB', borderRadius: 14, padding: '6px 8px 6px 12px', transition: 'border-color 0.15s' }}
              onFocus={() => {}} >
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => {
                  setInput(e.target.value)
                  if (inputRef.current) {
                    inputRef.current.style.height = 'auto'
                    inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 80) + 'px'
                  }
                }}
                onKeyDown={handleKeyDown}
                placeholder="Ask Nivi anything…"
                rows={1}
                aria-label="Message to Nivi"
                style={{ flex: 1, resize: 'none', border: 'none', background: 'transparent', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit', color: '#111827', lineHeight: 1.5, maxHeight: 80, overflowY: 'auto' }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                style={{ width: 32, height: 32, borderRadius: '50%', background: input.trim() && !isTyping ? '#BB2026' : '#E5E7EB', border: 'none', cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.15s' }}
              >
                <Send size={14} color={input.trim() && !isTyping ? 'white' : '#9CA3AF'} />
              </button>
            </div>
            <p style={{ fontSize: '0.65rem', color: '#9CA3AF', textAlign: 'center', marginTop: 6 }}>
              Powered by Newmi Care AI · <button onClick={() => onBook()} style={{ background: 'none', border: 'none', color: '#BB2026', cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit', fontWeight: 600 }}>Book directly</button>
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes nivi-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </>
  )
}
