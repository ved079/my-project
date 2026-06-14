export type NiviIntent =
  | 'greeting'
  | 'pricing'
  | 'doctor_query'
  | 'booking'
  | 'medical_info'
  | 'emotional'
  | 'complex'
  | 'follow_up'
  | 'feedback'
  | 'fallback'

export type SentimentLabel =
  | 'positive'
  | 'neutral'
  | 'frustrated'
  | 'distressed'
  | 'urgent'
  | 'satisfied'

export type NiviConfidence = 'high' | 'medium' | 'low'

export type MessageFrom = 'patient' | 'nivi' | 'human'

export interface NiviMessage {
  id: string
  from: MessageFrom
  text: string
  timestamp: Date
  confidence?: NiviConfidence
  intent?: NiviIntent
  sentiment?: SentimentLabel
}

export interface QuickReply {
  label: string
  action: string
  icon?: string
}

export interface ConversationContext {
  intentHistory: NiviIntent[]
  mentionedServices: string[]
  mentionedDoctors: string[]
  emotionalState: SentimentLabel
  unresolvedCount: number
  turnCount: number
}

export interface PipelineAlert {
  id: string
  type: 'missed_call' | 'sla_breach' | 'hot_lead_idle' | 'callback_due'
  message: string
  severity: 'critical' | 'high' | 'medium'
  createdAt: Date
}

export interface PatientInfo {
  id: string
  name: string
  phone: string
  source: 'google_ads' | 'meta_ads' | 'organic' | 'practo' | 'whatsapp' | 'referral'
  service: string
  location: string
  score: number
  tier: 'HOT' | 'WARM' | 'COLD'
  intentKeyword: string
  hoursSinceLastTouch: number
  missedCalls: number
  lastAction: string
  activeAlerts: PipelineAlert[]
}

export interface NiviConversation {
  id: string
  patient: PatientInfo
  messages: NiviMessage[]
  unreadCount: number
  context: ConversationContext
  status: 'active' | 'resolved' | 'escalated' | 'handoff_required'
  escalatedTo?: string
  escalatedAt?: Date
  escalationReason?: string
  lastActivity: Date
  lastSuggestions?: QuickReply[]
}

export interface NiviResponse {
  text: string
  confidence: NiviConfidence
  suggestions: QuickReply[]
  shouldEscalate: boolean
  escalationReason?: string
  delayMs: number
}

export interface NiviAnalytics {
  conversationsToday: number
  handledByNivi: number
  escalatedCount: number
  escalationRate: number
  avgResponseTimeMs: number
  topIntents: Array<{ intent: NiviIntent; count: number; pct: number }>
  sentimentTrend: SentimentLabel[]
  hourlyVolume: Array<{ hour: number; count: number }>
}
