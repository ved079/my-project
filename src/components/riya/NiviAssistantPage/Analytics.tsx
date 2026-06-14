'use client'

import { useMemo } from 'react'
import type { NiviAnalytics, NiviIntent, NiviConversation } from '@/lib/nivi/types'
import { MOCK_CONVERSATIONS } from '@/lib/nivi/conversations'

function computeAnalytics(conversations: NiviConversation[]): NiviAnalytics {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const todayConvs = conversations.filter((c) => c.lastActivity >= today)
  const total = conversations.length
  const escalated = conversations.filter((c) => c.status === 'escalated' || c.status === 'handoff_required').length
  const handled = total - escalated

  const intentCounts = new Map<NiviIntent, number>()
  for (const conv of conversations) {
    for (const msg of conv.messages) {
      if (msg.from === 'nivi' && msg.intent) {
        intentCounts.set(msg.intent, (intentCounts.get(msg.intent) || 0) + 1)
      }
    }
  }
  const totalIntents = Array.from(intentCounts.values()).reduce((a, b) => a + b, 0) || 1
  const topIntents = Array.from(intentCounts.entries())
    .map(([intent, count]) => ({ intent, count, pct: Math.round((count / totalIntents) * 100) }))
    .sort((a, b) => b.count - a.count)

  const sentiments: string[] = []
  for (const conv of conversations) {
    const last = conv.messages[conv.messages.length - 1]
    if (last?.sentiment) sentiments.push(last.sentiment)
  }

  const hourlyVolume: Array<{ hour: number; count: number }> = []
  for (let h = 0; h < 24; h++) {
    hourlyVolume.push({
      hour: h,
      count: conversations.filter((c) => c.lastActivity.getHours() === h).length,
    })
  }

  return {
    conversationsToday: todayConvs.length,
    handledByNivi: handled,
    escalatedCount: escalated,
    escalationRate: Math.round((escalated / Math.max(total, 1)) * 100),
    avgResponseTimeMs: 1200,
    topIntents,
    sentimentTrend: sentiments as NiviAnalytics['sentimentTrend'],
    hourlyVolume,
  }
}

export function Analytics() {
  const analytics = useMemo(() => computeAnalytics(MOCK_CONVERSATIONS), [])

  const METRICS = [
    { label: 'Conversations today', value: analytics.conversationsToday.toString(), color: 'text-gray-900' },
    { label: 'Handled by Nivi', value: analytics.handledByNivi.toString(), color: 'text-green-600' },
    { label: 'Escalated', value: analytics.escalatedCount.toString(), color: 'text-red-600' },
    { label: 'Escalation rate', value: `${analytics.escalationRate}%`, color: analytics.escalationRate > 20 ? 'text-red-600' : 'text-green-600' },
  ]

  return (
    <div className="p-4 bg-white" aria-label="Nivi performance analytics">
      <p className="text-sm font-medium text-gray-900 mb-3">Nivi Performance</p>

      {/* Metric cards */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {METRICS.map((m) => (
          <div key={m.label} className="bg-gray-50 rounded-lg px-3 py-2.5">
            <p className="text-xs text-gray-500">{m.label}</p>
            <p className={`text-lg font-bold ${m.color}`}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* Top intents bar chart */}
      {analytics.topIntents.length > 0 && (
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">Top intents</p>
          <div className="space-y-1.5">
            {analytics.topIntents.slice(0, 5).map((item) => (
              <div key={item.intent} className="flex items-center gap-2">
                <span className="text-xs text-gray-600 w-20 truncate shrink-0">{item.intent}</span>
                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-400 rounded-full transition-all"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-8 text-right shrink-0">{item.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
