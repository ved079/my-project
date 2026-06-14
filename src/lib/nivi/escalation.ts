import type { NiviConversation, ConversationContext } from './types'

export function shouldEscalate(text: string, context: ConversationContext): { escalate: boolean; reason: string } {
  if (/bleeding|emergency|miscarriage|hospitalize|severe pain/i.test(text)) {
    return { escalate: true, reason: 'Medical emergency keyword detected' }
  }
  if (/pregnant.*(bleeding|pain|complication|problem)/i.test(text)) {
    return { escalate: true, reason: 'Pregnancy complication mentioned' }
  }
  if (context.unresolvedCount >= 3) {
    return { escalate: true, reason: 'Patient query unresolved after 3 attempts' }
  }
  if (context.emotionalState === 'distressed' && context.turnCount > 3) {
    return { escalate: true, reason: 'Distressed patient not calming after multiple responses' }
  }
  if (context.emotionalState === 'frustrated' && context.turnCount > 5) {
    return { escalate: true, reason: 'Patient frustration escalating' }
  }
  return { escalate: false, reason: '' }
}

export function buildHandoffSummary(conversation: NiviConversation): string {
  const { patient, escalationReason, escalatedTo, lastActivity } = conversation
  const patientMsgs = conversation.messages.filter((m) => m.from === 'patient')
  const lastPatientMsg = patientMsgs[patientMsgs.length - 1]
  const timestamp = lastActivity.toLocaleString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
  const summary = summarizeConversation(conversation)
  const recommendedAction = buildRecommendedAction(patient)
  return [
    `NIVI HANDOFF — ${patient.name} | ${timestamp}`,
    `Escalation reason: ${escalationReason || 'Not specified'}`,
    `Patient tier: ${patient.tier} | Score: ${patient.score}`,
    `Service interest: ${patient.service}`,
    `Location: ${patient.location}`,
    `Lead source: ${patient.source}`,
    `Missed calls: ${patient.missedCalls}`,
    `Hours since last touch: ${patient.hoursSinceLastTouch}`,
    ``,
    `CONVERSATION SUMMARY:`,
    summary,
    ``,
    `LAST PATIENT MESSAGE:`,
    `"${lastPatientMsg ? lastPatientMsg.text : 'No patient message'}"`,
    ``,
    `RECOMMENDED FIRST ACTION FOR AGENT:`,
    recommendedAction,
  ].join('\n')
}

function summarizeConversation(conversation: NiviConversation): string {
  const patientMsgs = conversation.messages.filter((m) => m.from === 'patient')
  if (patientMsgs.length === 0) return 'No patient messages recorded.'
  const first = patientMsgs[0].text
  const shortened = first.length > 120 ? first.substring(0, 120) + '...' : first
  return `Patient reached out about ${conversation.patient.service}. Initial query: "${shortened}"`
}

function buildRecommendedAction(patient: NiviConversation['patient']): string {
  const h = patient.hoursSinceLastTouch
  if (patient.tier === 'HOT' && h > 2) {
    return `Call within 5 minutes — high-intent lead scoring ${patient.score}/100 going cold. Discuss ${patient.service} options and book consultation.`
  }
  if (patient.tier === 'HOT') {
    return `Send detailed ${patient.service} brochure and offer to book a free consultation within the hour.`
  }
  if (patient.tier === 'WARM' && h > 6) {
    return `Send WhatsApp follow-up now — lead is still warm but engagement window is closing.`
  }
  if (patient.tier === 'WARM') {
    return `Schedule callback within 4 hours. Understand needs and move toward consultation booking.`
  }
  return 'Add to nurture sequence — low urgency, monitor for re-engagement.'
}
