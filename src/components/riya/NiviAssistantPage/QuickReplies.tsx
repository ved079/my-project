'use client'

import type { QuickReply } from '@/lib/nivi/types'

export function QuickReplies({
  suggestions,
  onAction,
  disabled,
}: {
  suggestions: QuickReply[]
  onAction: (action: string) => void
  disabled: boolean
}) {
  if (disabled || suggestions.length === 0) {
    return null
  }

  const items = suggestions.slice(0, 3)

  return (
    <div className="flex gap-2 overflow-x-auto py-1" role="toolbar" aria-label="Quick actions">
      {items.map((s) => (
        <button
          key={s.action}
          onClick={() => onAction(s.action)}
          className="shrink-0 rounded-full border border-gray-200 text-sm px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-200"
          aria-label={s.label}
          role="button"
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}
