'use client'

import { useState } from 'react'
import type { NiviConversation } from '@/lib/nivi/types'
import { buildHandoffSummary } from '@/lib/nivi/escalation'

export function SlackSummary({ conversation }: { conversation: NiviConversation }) {
  const [copied, setCopied] = useState(false)

  const summary = buildHandoffSummary(conversation)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // silently fail
    }
  }

  return (
    <div className="px-4 py-3 bg-white border-t border-gray-200">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Handoff summary</span>
        <span className="text-xs font-medium bg-red-100 text-red-700 px-1.5 py-0.5 rounded">ESCALATED</span>
      </div>
      <pre className="text-xs font-mono bg-gray-50 border border-gray-200 rounded-lg p-3 whitespace-pre-wrap text-gray-700 leading-relaxed max-h-48 overflow-y-auto">
        {summary}
      </pre>
      <button
        onClick={copyToClipboard}
        className="mt-2 text-xs font-medium text-rose-600 hover:text-rose-700 focus:outline-none"
        aria-label={copied ? 'Copied' : 'Copy for Slack'}
      >
        {copied ? 'Copied!' : 'Copy for Slack'}
      </button>
    </div>
  )
}
