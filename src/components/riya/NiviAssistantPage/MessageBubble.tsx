'use client'

import type { NiviMessage } from '@/lib/nivi/types'

const INTENT_LABELS: Record<string, string> = {
  greeting: 'Greeting',
  pricing: 'Pricing',
  doctor_query: 'Doctor query',
  booking: 'Booking',
  medical_info: 'Medical info',
  emotional: 'Emotional',
  complex: 'Complex',
  follow_up: 'Follow-up',
  feedback: 'Feedback',
  fallback: 'Fallback',
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
}

function ConfidenceDot({ confidence }: { confidence: string }) {
  const colorMap: Record<string, string> = {
    high: 'bg-green-400',
    medium: 'bg-amber-400',
    low: 'bg-red-400',
  }
  const titleMap: Record<string, string> = {
    high: 'High confidence',
    medium: 'May need review',
    low: 'Needs human review',
  }
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${colorMap[confidence] || 'bg-gray-400'}`}
      title={titleMap[confidence] || ''}
      aria-label={`Confidence: ${confidence}`}
    />
  )
}

export function MessageBubble({ message }: { message: NiviMessage }) {
  if (message.from === 'human') {
    return (
      <div className="flex justify-center my-2" role="listitem">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-2 max-w-[80%]">
          <p className="text-xs text-amber-600 italic mb-1 font-medium">Human agent</p>
          <p className="text-sm text-amber-900 italic">{message.text}</p>
          <p className="text-xs text-gray-400 mt-1 text-right">{formatTime(message.timestamp)}</p>
        </div>
      </div>
    )
  }

  const isNivi = message.from === 'nivi'

  return (
    <div className={`flex ${isNivi ? 'justify-end' : 'justify-start'} my-1`} role="listitem">
      <div className={`max-w-[75%] ${isNivi ? 'order-1' : 'order-1'}`}>
        <div
          className={`relative px-3.5 py-2.5 text-sm leading-relaxed ${
            isNivi
              ? 'bg-rose-50 border border-rose-100 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl'
              : 'bg-gray-100 rounded-tr-2xl rounded-br-2xl rounded-tl-2xl'
          }`}
        >
          {isNivi && message.confidence && (
            <span className="absolute -top-1 -right-1">
              <ConfidenceDot confidence={message.confidence} />
            </span>
          )}
          <p className="text-gray-800">{message.text}</p>
        </div>
        <div className={`flex items-center gap-2 mt-0.5 ${isNivi ? 'justify-end' : 'justify-start'}`}>
          <p className="text-xs text-gray-400">{formatTime(message.timestamp)}</p>
          {isNivi && message.intent && (
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              {INTENT_LABELS[message.intent] || message.intent}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
