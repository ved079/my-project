'use client'

import { useState } from 'react'
import type { PatientInfo } from '@/lib/nivi/types'

function initials(name: string): string {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
}

function RecommendedAction({ patient }: { patient: PatientInfo }) {
  const h = patient.hoursSinceLastTouch
  let text = ''
  if (patient.tier === 'HOT' && h > 2) {
    text = 'Call immediately — high-intent lead going cold'
  } else if (patient.tier === 'HOT') {
    text = 'Send IVF brochure + book consultation'
  } else if (patient.tier === 'WARM' && h > 6) {
    text = 'Send WhatsApp follow-up now'
  } else if (patient.tier === 'WARM') {
    text = 'Schedule callback within 4 hours'
  } else {
    text = 'Add to nurture sequence'
  }
  return (
    <div className="bg-amber-50 border-l-2 border-amber-400 px-3 py-2 text-xs rounded-r">
      <span className="text-amber-800 font-medium">{text}</span>
    </div>
  )
}

const SOURCE_LABELS: Record<string, string> = {
  google_ads: 'Google Ads',
  meta_ads: 'Meta Ads',
  organic: 'Organic',
  practo: 'Practo',
  whatsapp: 'WhatsApp',
  referral: 'Referral',
}

export function LeadCard({ patient }: { patient: PatientInfo }) {
  const [showAllAlerts, setShowAllAlerts] = useState(false)
  const hasAlerts = patient.activeAlerts.length > 0
  const displayedAlerts = showAllAlerts ? patient.activeAlerts : patient.activeAlerts.slice(0, 3)
  const hasMore = patient.activeAlerts.length > 3

  const tierBadge = (tier: string) => {
    const colors: Record<string, string> = {
      HOT: 'bg-red-100 text-red-700',
      WARM: 'bg-amber-100 text-amber-700',
      COLD: 'bg-gray-100 text-gray-600',
    }
    return colors[tier] || colors.COLD
  }

  const slaColor = patient.hoursSinceLastTouch > 6
    ? 'text-red-500'
    : patient.hoursSinceLastTouch > 2
      ? 'text-amber-500'
      : 'text-green-500'

  const severityBorder = (sev: string) => {
    switch (sev) {
      case 'critical': return 'border-l-red-500'
      case 'high': return 'border-l-amber-500'
      default: return 'border-l-gray-400'
    }
  }

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-200 overflow-y-auto">
      {/* Identity */}
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-base font-bold shrink-0">
            {initials(patient.name)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{patient.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{SOURCE_LABELS[patient.source] || patient.source}</span>
              <span className="text-xs text-gray-400 truncate">{patient.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Score */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">{patient.score}</span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded ${tierBadge(patient.tier)}`}>
            {patient.tier}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">Intent: {patient.intentKeyword}</p>
      </div>

      {/* SLA Status */}
      <div className="px-4 py-3 border-b border-gray-200 space-y-2">
        <div>
          <p className="text-xs font-medium text-gray-500">Hours idle</p>
          <p className={`text-sm font-medium ${slaColor}`}>{patient.hoursSinceLastTouch}h</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500">Missed calls</p>
          <p className={`text-sm font-medium ${patient.missedCalls > 1 ? 'text-red-500' : 'text-gray-900'}`}>
            {patient.missedCalls}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500">Last action</p>
          <p className="text-xs text-gray-700 truncate" title={patient.lastAction}>{patient.lastAction}</p>
        </div>
      </div>

      {/* Alerts */}
      {hasAlerts && (
        <div className="px-4 py-3 border-b border-gray-200">
          <p className="text-xs font-medium text-gray-500 mb-2">Alerts</p>
          <div className="space-y-1.5">
            {displayedAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`border-l-2 ${severityBorder(alert.severity)} pl-2`}
              >
                <p className="text-xs text-gray-700">{alert.message}</p>
              </div>
            ))}
          </div>
          {hasMore && (
            <button
              onClick={() => setShowAllAlerts(!showAllAlerts)}
              className="text-xs text-rose-600 font-medium mt-1.5 hover:text-rose-700 focus:outline-none"
              aria-label={showAllAlerts ? 'Show fewer alerts' : `View all ${patient.activeAlerts.length} alerts`}
            >
              {showAllAlerts ? 'Show less' : `View all (${patient.activeAlerts.length})`}
            </button>
          )}
        </div>
      )}

      {/* Recommended action */}
      <div className="px-4 py-3">
        <p className="text-xs font-medium text-gray-500 mb-2">Recommended action</p>
        <RecommendedAction patient={patient} />
      </div>
    </div>
  )
}
