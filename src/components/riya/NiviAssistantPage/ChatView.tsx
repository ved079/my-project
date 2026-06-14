'use client'

import { useState, useEffect, useRef } from 'react'
import type { NiviConversation } from '@/lib/nivi/types'
import { MessageBubble } from './MessageBubble'
import { QuickReplies } from './QuickReplies'

function formatSlaTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000)
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

function SlaTimer({ lastActivity }: { lastActivity: Date }) {
  const [elapsed, setElapsed] = useState(Date.now() - lastActivity.getTime())

  useEffect(() => {
    const interval = setInterval(() => setElapsed(Date.now() - lastActivity.getTime()), 1000)
    return () => clearInterval(interval)
  }, [lastActivity])

  const hours = elapsed / 3600000
  const colorClass = hours > 2 ? 'text-red-500' : hours > 1 ? 'text-amber-500' : 'text-green-500'

  return (
    <span className={`text-xs font-medium ${colorClass}`} aria-label="SLA timer">
      {formatSlaTime(elapsed)}
    </span>
  )
}

function StatusBadge({ status }: { status: NiviConversation['status'] }) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    active: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Active' },
    escalated: { bg: 'bg-red-100', text: 'text-red-700', label: 'Escalated' },
    resolved: { bg: 'bg-green-100', text: 'text-green-700', label: 'Resolved' },
    handoff_required: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Handoff required' },
  }
  const c = config[status] || config.active
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.bg} ${c.text}`} aria-label={`Status: ${c.label}`}>
      {c.label}
    </span>
  )
}

function TypingIndicator() {
  return (
    <div className="flex justify-start my-1" aria-label="Nivi is typing" role="status">
      <div className="bg-gray-100 rounded-2xl px-4 py-3 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="nivi-typing-dot w-2 h-2 bg-gray-400 rounded-full inline-block"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  )
}

export function ChatView({
  conversation,
  onSendMessage,
  isTyping,
}: {
  conversation: NiviConversation
  onSendMessage: (text: string) => void
  isTyping: boolean
}) {
  const [inputText, setInputText] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [conversation.messages.length, isTyping])

  const handleSend = () => {
    const text = inputText.trim()
    if (!text) return
    if (conversation.status === 'escalated' || conversation.status === 'resolved') return
    onSendMessage(text)
    setInputText('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const isLocked = conversation.status === 'escalated' || conversation.status === 'resolved'

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-white shrink-0">
        <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-sm font-bold">
          {conversation.patient.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{conversation.patient.name}</p>
          <div className="flex items-center gap-2">
            <StatusBadge status={conversation.status} />
            <SlaTimer lastActivity={conversation.lastActivity} />
          </div>
        </div>
      </div>

      {/* Escalation banner */}
      {(conversation.status === 'escalated' || conversation.status === 'handoff_required') && (
        <div className="bg-red-500 text-white text-xs font-medium px-4 py-2 shrink-0" role="alert">
          Escalated to {conversation.escalatedTo || 'medical team'} — {conversation.escalationReason || 'No reason provided'}
        </div>
      )}

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-1" role="list" aria-label="Conversation messages">
        {conversation.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-sm text-gray-400">
            No messages yet. Start the conversation.
          </div>
        ) : (
          conversation.messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))
        )}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Quick Replies */}
      {!isLocked && !isTyping && (
        <div className="shrink-0 px-4 py-2 border-t border-gray-100">
          <QuickReplies suggestions={[]} onAction={() => {}} disabled />
        </div>
      )}

      {/* Input area */}
      <div className="shrink-0 px-4 py-3 border-t border-gray-200 bg-white">
        {isLocked ? (
          <p className="text-sm text-gray-400 text-center py-2">
            {conversation.status === 'escalated'
              ? 'This conversation has been handed to a human agent.'
              : 'This conversation has been resolved.'}
          </p>
        ) : (
          <div className="flex gap-2 items-end">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value)
                if (textareaRef.current) {
                  textareaRef.current.style.height = 'auto'
                  textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 72) + 'px'
                }
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              rows={1}
              className="flex-1 resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300"
              aria-label="Message input"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="shrink-0 px-4 py-2 bg-rose-500 text-white text-sm font-medium rounded-xl hover:bg-rose-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
              role="button"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
