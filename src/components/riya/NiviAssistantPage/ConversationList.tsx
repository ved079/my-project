'use client'

import { useState, useMemo } from 'react'
import type { NiviConversation } from '@/lib/nivi/types'

function relativeTime(date: Date): string {
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'Yesterday'
  return `${days}d ago`
}

function initials(name: string): string {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
}

const INTENT_LABELS_SHORT: Record<string, string> = {
  greeting: 'Greeting',
  pricing: 'Pricing',
  doctor_query: 'Doctor',
  booking: 'Booking',
  medical_info: 'Medical',
  emotional: 'Emotional',
  complex: 'Complex',
  follow_up: 'Follow-up',
  feedback: 'Feedback',
  fallback: 'Fallback',
}

type FilterMode = 'all' | 'unread' | 'escalated' | 'resolved'

export function ConversationList({
  conversations,
  activeId,
  onSelect,
}: {
  conversations: NiviConversation[]
  activeId: string
  onSelect: (id: string) => void
}) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterMode>('all')

  const filtered = useMemo(() => {
    let result = conversations
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (c) =>
          c.patient.name.toLowerCase().includes(q) ||
          c.messages.some((m) => m.text.toLowerCase().includes(q))
      )
    }
    switch (filter) {
      case 'unread':
        result = result.filter((c) => c.unreadCount > 0)
        break
      case 'escalated':
        result = result.filter((c) => c.status === 'escalated' || c.status === 'handoff_required')
        break
      case 'resolved':
        result = result.filter((c) => c.status === 'resolved')
        break
    }
    return result.sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime())
  }, [conversations, search, filter])

  const lastMessagePreview = (conv: NiviConversation): string => {
    if (conv.messages.length === 0) return 'No messages'
    const last = conv.messages[conv.messages.length - 1]
    return last.text.length > 60 ? last.text.substring(0, 60) + '...' : last.text
  }

  const lastIntent = (conv: NiviConversation): string => {
    const niviMsgs = conv.messages.filter((m) => m.from === 'nivi')
    if (niviMsgs.length === 0) return ''
    const intent = niviMsgs[niviMsgs.length - 1].intent
    return intent ? (INTENT_LABELS_SHORT[intent] || intent) : ''
  }

  const FILTERS: Array<{ key: FilterMode; label: string }> = [
    { key: 'all', label: 'All' },
    { key: 'unread', label: 'Unread' },
    { key: 'escalated', label: 'Escalated' },
    { key: 'resolved', label: 'Resolved' },
  ]

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Search */}
      <div className="p-3 border-b border-gray-200">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search conversations..."
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300"
          aria-label="Search conversations"
        />
      </div>

      {/* Filter chips */}
      <div className="flex gap-1.5 px-3 py-2 border-b border-gray-100 overflow-x-auto" role="tablist" aria-label="Filter conversations">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
              filter === f.key
                ? 'bg-rose-100 text-rose-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            role="tab"
            aria-selected={filter === f.key}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto" role="listbox" aria-label="Conversation list">
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-full text-sm text-gray-400 px-4 text-center">
            {search ? 'No conversations match your search.' : 'No conversations found.'}
          </div>
        ) : (
          filtered.map((conv) => {
            const isActive = conv.id === activeId
            const tierColors: Record<string, string> = {
              HOT: 'bg-red-100 text-red-700',
              WARM: 'bg-amber-100 text-amber-700',
              COLD: 'bg-gray-100 text-gray-600',
            }
            return (
              <div
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                onKeyDown={(e) => { if (e.key === 'Enter') onSelect(conv.id) }}
                className={`flex items-start gap-3 px-3 py-3 cursor-pointer border-l-2 transition-colors ${
                  isActive
                    ? 'bg-rose-50 border-l-rose-400'
                    : 'border-l-transparent hover:bg-gray-50'
                }`}
                role="option"
                aria-selected={isActive}
                tabIndex={0}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-sm font-bold">
                    {initials(conv.patient.name)}
                  </div>
                  {conv.unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white" aria-label={`${conv.unreadCount} unread messages`} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium text-gray-900 truncate">{conv.patient.name}</p>
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${tierColors[conv.patient.tier] || 'bg-gray-100 text-gray-600'}`}>
                      {conv.patient.tier}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {lastMessagePreview(conv)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {lastIntent(conv) && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                        {lastIntent(conv)}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">{relativeTime(conv.lastActivity)}</span>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
