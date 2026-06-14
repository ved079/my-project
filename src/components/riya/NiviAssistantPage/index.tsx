'use client'

import { useState, useMemo, useCallback } from 'react'
import type { NiviConversation, NiviMessage, NiviIntent } from '@/lib/nivi/types'
import { MOCK_CONVERSATIONS } from '@/lib/nivi/conversations'
import { processMessage } from '@/lib/nivi/engine'
import { ConversationList } from './ConversationList'
import { ChatView } from './ChatView'
import { LeadCard } from './LeadCard'
import { SlackSummary } from './SlackSummary'
import { Analytics } from './Analytics'

let messageCounter = 0

function generateId(prefix: string): string {
  messageCounter += 1
  return `${prefix}-${Date.now()}-${messageCounter}`
}

export function NiviAssistantPage() {
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
    (text: string) => {
      if (!activeConversation) return

      const patientMsg: NiviMessage = {
        id: generateId('msg-patient'),
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

      const response = processMessage(activeConversation.id, text, activeConversation.context)

      setTimeout(() => {
        setIsTyping(false)

        const niviMsg: NiviMessage = {
          id: generateId('msg-nivi'),
          from: 'nivi',
          text: response.text,
          timestamp: new Date(),
          confidence: response.confidence,
          intent: extractIntentFromResponse(response.text) || undefined,
        }

        setConversations((prev) =>
          prev.map((c) => {
            if (c.id !== activeConversation.id) return c
            let updated = {
              ...c,
              messages: [...c.messages, niviMsg],
              lastActivity: new Date(),
              context: {
                ...c.context,
                turnCount: c.context.turnCount + 1,
                emotionalState: response.shouldEscalate ? 'distressed' : c.context.emotionalState,
              },
            }
            if (response.shouldEscalate) {
              updated = {
                ...updated,
                status: 'escalated',
                escalationReason: response.escalationReason,
                escalatedAt: new Date(),
              }
            }
            return updated
          })
        )
      }, response.delayMs)
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
      {/* Mobile: stack vertically, desktop: 3-column grid */}
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
