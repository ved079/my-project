'use client'

import { useState, useMemo, useCallback, useRef } from 'react'
import type { NiviConversation, NiviMessage, NiviIntent, QuickReply } from '@/lib/nivi/types'
import { MOCK_CONVERSATIONS } from '@/lib/nivi/conversations'
import { processMessage } from '@/lib/nivi/engine'
import { ConversationList } from './ConversationList'
import { ChatView } from './ChatView'
import { LeadCard } from './LeadCard'
import { SlackSummary } from './SlackSummary'
import { Analytics } from './Analytics'

function generateId(prefix: string, counter: number): string {
  return `${prefix}-${Date.now()}-${counter}`
}

export function NiviAssistantPage() {
  const msgCounterRef = useRef(0)
  const [conversations, setConversations] = useState<NiviConversation[]>(MOCK_CONVERSATIONS)
  const [activeConversationId, setActiveConversationId] = useState(MOCK_CONVERSATIONS[0]?.id || '')
  const [isTyping, setIsTyping] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeConversationId) || null,
    [conversations, activeConversationId]
  )

  const handleSelect = useCallback((id: string) => {
    setActiveConversationId(id)
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, unreadCount: 0 } : c
      )
    )
  }, [])

  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!activeConversation) return

      msgCounterRef.current += 1
      const counter = msgCounterRef.current

      const patientMsg: NiviMessage = {
        id: generateId('msg-patient', counter),
        from: 'patient',
        text,
        timestamp: new Date(),
      }

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversation.id
            ? { ...c, messages: [...c.messages, patientMsg], lastActivity: new Date() }
            : c
        )
      )

      setIsTyping(true)

      try {
        const res = await fetch('/api/nivi/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            conversationId: activeConversation.id,
            message: text,
            patientName: activeConversation.patient.name,
          }),
        })
        const data = await res.json()

        const niviMsg: NiviMessage = {
          id: generateId('msg-nivi', counter),
          from: 'nivi',
          text: data.text,
          timestamp: new Date(),
          confidence: data.confidence,
          intent: extractIntentFromResponse(data.text) || undefined,
        }

        setConversations((prev) =>
          prev.map((c) => {
            if (c.id !== activeConversation.id) return c
            const updated = {
              ...c,
              messages: [...c.messages, niviMsg],
              lastActivity: new Date(),
              lastSuggestions: (data.suggestions || []) as QuickReply[],
              context: {
                ...c.context,
                turnCount: c.context.turnCount + 1,
                emotionalState: data.shouldEscalate ? 'distressed' as const : c.context.emotionalState,
              },
            }
            if (data.shouldEscalate) {
              return { ...updated, status: 'escalated' as const, escalationReason: data.escalationReason, escalatedAt: new Date() }
            }
            return updated
          })
        )
      } catch {
        const response = processMessage(activeConversation.id, text, activeConversation.context)

        const niviMsg: NiviMessage = {
          id: generateId('msg-nivi', counter),
          from: 'nivi',
          text: response.text,
          timestamp: new Date(),
          confidence: response.confidence,
          intent: extractIntentFromResponse(response.text) || undefined,
        }

        setConversations((prev) =>
          prev.map((c) => {
            if (c.id !== activeConversation.id) return c
            return {
              ...c,
              messages: [...c.messages, niviMsg],
              lastActivity: new Date(),
              lastSuggestions: (response.suggestions || []) as QuickReply[],
              context: { ...c.context, turnCount: c.context.turnCount + 1 },
            }
          })
        )
      } finally {
        setIsTyping(false)
      }
    },
    [activeConversation]
  )

  if (!activeConversation) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-gray-400">
        No conversations available.
      </div>
    )
  }

  return (
    <div className="flex flex-1 min-h-0">
      <div className="md:hidden flex flex-col flex-1 min-h-0">
        <div className="h-full flex flex-col">
          <ChatView conversation={activeConversation} onSendMessage={handleSendMessage} isTyping={isTyping} />
        </div>
      </div>
      <div className="hidden md:grid md:grid-cols-[280px_1fr_260px] flex-1 min-h-0">
        <ConversationList
          conversations={conversations}
          activeId={activeConversationId}
          onSelect={handleSelect}
        />
        <ChatView conversation={activeConversation} onSendMessage={handleSendMessage} isTyping={isTyping} />
        <div className="flex flex-col min-h-0 overflow-y-auto">
          <LeadCard patient={activeConversation.patient} />
          {(activeConversation.status === 'escalated' || activeConversation.status === 'handoff_required') && (
            <SlackSummary conversation={activeConversation} />
          )}
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="text-xs font-medium text-gray-500 hover:text-gray-700 px-4 py-2 border-t border-gray-200 text-left focus:outline-none"
            aria-label={showAnalytics ? 'Hide analytics' : 'Show analytics'}
          >
            {showAnalytics ? 'Hide analytics' : 'Show analytics'}
          </button>
          {showAnalytics && <Analytics />}
        </div>
      </div>
    </div>
  )
}

function extractIntentFromResponse(text: string): NiviIntent | null {
  if (/connect(ing)? you.*medical team|medical team right now/i.test(text)) return 'complex'
  if (/price|cost|range|₹/i.test(text)) return 'pricing'
  if (/book|appointment|slot|schedule/i.test(text)) return 'booking'
  if (/doctor|specialist|dr\./i.test(text)) return 'doctor_query'
  if (/welcome|namaste|hello|reach(ed)? out/i.test(text)) return 'greeting'
  if (/sorry|apologi/i.test(text)) return 'follow_up'
  if (/thank|glad|wishing/i.test(text)) return 'feedback'
  if (/understand|alone/i.test(text)) return 'emotional'
  if (/general|treatment|therapy|option/i.test(text)) return 'medical_info'
  return null
}
