import type { NiviIntent, SentimentLabel, NiviConfidence, ConversationContext, NiviResponse, PatientInfo } from './types'
import { RESPONSE_TEMPLATES } from './templates'
import { findSpecialist, SPECIALISTS } from './specialists'

const KNOWN_SERVICES = ['IVF', 'PCOS', 'pregnancy', 'fertility', 'prenatal', 'menopause', 'ovarian', 'cervical', 'hormonal']
const KNOWN_TIMEREFS = ['today', 'tomorrow', 'this week', 'next week', 'morning', 'afternoon', 'evening']

const PRICE_RANGES: Record<string, string> = {
  ivf: '₹1.2L–₹2.5L',
  pcos: '₹800–₹1,200',
  pregnancy: '₹15,000–₹25,000',
  prenatal: '₹15,000–₹25,000',
  fertility: '₹1.2L–₹2.5L',
  menopause: '₹800–₹1,500',
  general: '₹500–₹1,000',
}

export const MESSAGE_TIMESTAMPS: Map<string, number[]> = new Map()

function getPriceRange(service: string): string {
  const lower = service.toLowerCase()
  for (const [key, range] of Object.entries(PRICE_RANGES)) {
    if (lower.includes(key)) return range
  }
  return PRICE_RANGES.general
}

function isRateLimited(conversationId: string): boolean {
  const now = Date.now()
  const timestamps = MESSAGE_TIMESTAMPS.get(conversationId) || []
  const recent = timestamps.filter((t) => now - t < 60000)
  MESSAGE_TIMESTAMPS.set(conversationId, recent)
  return recent.length >= 5
}

function recordTimestamp(conversationId: string): void {
  const timestamps = MESSAGE_TIMESTAMPS.get(conversationId) || []
  timestamps.push(Date.now())
  MESSAGE_TIMESTAMPS.set(conversationId, timestamps.slice(-50))
}

function detectSentiment(text: string): SentimentLabel {
  if (/bleeding|emergency|miscarriage|dying|severe pain|can't breathe/i.test(text)) return 'distressed'
  if (/urgent|right now|immediately|asap|need now/i.test(text)) return 'urgent'
  const upper = text.replace(/[^A-Za-z]/g, '')
  if (upper.length > 0) {
    const upperRatio = text.split('').filter((c) => c >= 'A' && c <= 'Z').length / text.length
    if (upperRatio > 0.5) return 'frustrated'
  }
  if (/\?{3,}|!{3,}/.test(text)) return 'frustrated'
  if (/thanks|thank you|perfect|got it|great|helpful/i.test(text)) return 'satisfied'
  if (/happy|good|fine|okay|better|glad/i.test(text)) return 'positive'
  return 'neutral'
}

function classifyIntent(text: string, context: ConversationContext): NiviIntent {
  if (/bleeding|emergency|miscarriage|hospitalize|severe pain/i.test(text)) return 'complex'
  if (/price|cost|charges|fees|how much|rate|package/i.test(text)) return 'pricing'
  if (/book|schedule|appointment|slot|when can|availability/i.test(text)) return 'booking'
  if (/doctor|specialist|gynecologist|which doctor|who should/i.test(text)) return 'doctor_query'
  if (/ivf|pcos|pregnancy|fertility|period|hormone|menopause|ovary|uterus/i.test(text)) return 'medical_info'
  if (/sad|scared|worried|anxious|afraid|distressed|can't cope/i.test(text)) return 'emotional'
  if (context.unresolvedCount >= 3) return 'complex'
  if (/thanks|thank you|great|helpful/i.test(text)) return 'feedback'
  if (context.intentHistory.length > 0) {
    const last = context.intentHistory[context.intentHistory.length - 1]
    if (/follow|callback|waiting|still waiting|never called|you said/i.test(text)) return 'follow_up'
  }
  return 'fallback'
}

function extractEntities(text: string): { services: string[]; doctors: string[]; timeRefs: string[] } {
  const lower = text.toLowerCase()
  const services = KNOWN_SERVICES.filter((s) => lower.includes(s.toLowerCase()))
  const doctors = findDoctorNames(lower)
  const timeRefs = KNOWN_TIMEREFS.filter((t) => lower.includes(t.toLowerCase()))
  return { services, doctors, timeRefs }
}

function findDoctorNames(lowerText: string): string[] {
  const names: string[] = []
  for (const doc of SPECIALISTS) {
    const parts = doc.name.toLowerCase().split(' ')
    if (parts.some((p) => lowerText.includes(p))) names.push(doc.name)
  }
  return names
}

function updateContext(
  context: ConversationContext,
  intent: NiviIntent,
  sentiment: SentimentLabel,
  entities: { services: string[]; doctors: string[]; timeRefs: string[] }
): ConversationContext {
  const history = [...context.intentHistory, intent].slice(-5)
  const lastIntent = context.intentHistory[context.intentHistory.length - 1]
  const isUnresolved = intent === lastIntent && intent !== 'booking' && intent !== 'feedback'
  const mergedServices = [...new Set([...context.mentionedServices, ...entities.services])]
  const mergedDoctors = [...new Set([...context.mentionedDoctors, ...entities.doctors])]
  return {
    intentHistory: history,
    mentionedServices: mergedServices,
    mentionedDoctors: mergedDoctors,
    emotionalState: sentiment,
    unresolvedCount: isUnresolved ? context.unresolvedCount + 1 : 0,
    turnCount: context.turnCount + 1,
  }
}

function shouldEscalateCheck(text: string, intent: NiviIntent, context: ConversationContext): { escalate: boolean; reason: string } {
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

function generateResponse(
  intent: NiviIntent,
  sentiment: SentimentLabel,
  patient: PatientInfo,
  context: ConversationContext,
  entities: { services: string[]; doctors: string[]; timeRefs: string[] },
  escalation: { escalate: boolean; reason: string }
): string {
  if (escalation.escalate && intent === 'complex') {
    return `I'm connecting you with our medical team right now. Please stay with us, ${patient.name}.`
  }
  if (escalation.escalate) {
    return `${patient.name}, I've notified our team about your request. A specialist will follow up with you directly. They'll have the full context of what you've shared with me.`
  }
  const templates = RESPONSE_TEMPLATES.filter((t) => t.intent === intent && t.sentiment === sentiment)
  const fallbackTemplates = RESPONSE_TEMPLATES.filter((t) => t.intent === intent && t.sentiment === 'neutral')
  const pool = templates.length > 0 ? templates : fallbackTemplates
  if (pool.length === 0) return `Thank you for reaching out, ${patient.name}. Let me connect you with someone who can help.`
  const chosen = pool[Math.floor(Math.random() * pool.length)]
  const rawTemplate = chosen.templates[Math.floor(Math.random() * chosen.templates.length)]
  let response = rawTemplate.replace(/\{\{name\}\}/g, patient.name)
  const specialist = entities.services.length > 0 ? findSpecialist(entities.services[0]) : undefined
  if (specialist) {
    response = response
      .replace(/\{\{doctorName\}\}/g, specialist.name)
      .replace(/\{\{doctorTitle\}\}/g, specialist.title)
      .replace(/\{\{doctorExperience\}\}/g, specialist.experience)
  }
  const serviceForPrice = entities.services[0] || patient.service
  const priceRange = getPriceRange(serviceForPrice)
  if (intent === 'pricing') {
    response = response.replace(/\{\{priceRange\}\}/g, priceRange)
  }
  if (chosen.empathyPrefix && context.emotionalState === 'distressed') {
    response = `${chosen.empathyPrefix} ${response}`
  }
  return response
}

function computeSuggestions(intent: NiviIntent, escalation: { escalate: boolean }): QuickReply[] {
  if (escalation.escalate) {
    return [
      { label: 'Connect to medical team', action: 'connect_medical' },
      { label: 'Call us now', action: 'call_now' },
      { label: 'Emergency contact', action: 'emergency_contact' },
    ]
  }
  switch (intent) {
    case 'pricing':
      return [
        { label: 'Get exact quote', action: 'exact_quote' },
        { label: 'Book free consultation', action: 'book_consult' },
        { label: 'Send brochure', action: 'send_brochure' },
      ]
    case 'booking':
      return [
        { label: 'Suggest 3 time slots', action: 'suggest_slots' },
        { label: 'Confirm in 30 min', action: 'confirm_30min' },
        { label: 'Transfer to human', action: 'transfer_human' },
      ]
    case 'doctor_query':
      return [
        { label: 'View doctor profile', action: 'view_profile' },
        { label: 'Book with this doctor', action: 'book_doctor' },
        { label: 'Ask about specialization', action: 'ask_specialization' },
      ]
    case 'medical_info':
      return [
        { label: 'Book consultation', action: 'book_consult' },
        { label: 'Learn more', action: 'learn_more' },
        { label: 'Talk to a specialist', action: 'talk_specialist' },
      ]
    case 'emotional':
      return [
        { label: 'Talk to a human', action: 'talk_human' },
        { label: 'Send support resources', action: 'support_resources' },
        { label: 'Schedule a call', action: 'schedule_call' },
      ]
    default:
      return [
        { label: 'Book appointment', action: 'book_consult' },
        { label: 'Ask a question', action: 'ask_question' },
        { label: 'Talk to human', action: 'talk_human' },
      ]
  }
}

export function processMessage(
  conversationId: string,
  patientText: string,
  context: ConversationContext
): NiviResponse {
  if (isRateLimited(conversationId)) {
    return {
      text: "You're sending messages very quickly. Give me a moment to catch up.",
      confidence: 'medium',
      suggestions: [],
      shouldEscalate: false,
      delayMs: 500,
    }
  }
  recordTimestamp(conversationId)

  const sentiment = detectSentiment(patientText)
  const intent = classifyIntent(patientText, context)
  const entities = extractEntities(patientText)
  const escalation = shouldEscalateCheck(patientText, intent, context)
  const dummyPatient: PatientInfo = {
    id: '', name: 'there', phone: '', source: 'organic', service: '', location: '',
    score: 0, tier: 'WARM', intentKeyword: '', hoursSinceLastTouch: 0, missedCalls: 0,
    lastAction: '', activeAlerts: [],
  }
  const text = generateResponse(intent, sentiment, dummyPatient, context, entities, escalation)
  const suggestions = computeSuggestions(intent, escalation)

  let confidence: NiviConfidence = 'high'
  if (escalation.escalate) confidence = 'low'
  else if (intent === 'fallback') confidence = 'medium'

  const delayMs = Math.floor(Math.random() * 1200) + 800

  return {
    text,
    confidence,
    suggestions,
    shouldEscalate: escalation.escalate,
    escalationReason: escalation.reason || undefined,
    delayMs,
  }
}
