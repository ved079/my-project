export type PipelineLead = {
  id: string
  name: string
  source: string
  score: number
  tier: 'HOT' | 'WARM' | 'COLD'
  service: string
  location: string
  assignTo: string
  hasPhone: boolean

  inquiryTime: Date
  lastTouchTime: Date
  lastAction: string
  hoursSinceLastTouch: number

  missedCalls: number
  saidCallMeLater: boolean
  callbackScheduled: boolean
  status: string
}

export type PipelineAlertLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM'

export type PipelineAlert = {
  lead: PipelineLead
  level: PipelineAlertLevel
  reason: string
  deadline: string
  recommendedAction: string
}

export type PipelineScanResult = {
  alerts: PipelineAlert[]
  scannedAt: Date
  summary: {
    critical: number
    high: number
    medium: number
    total: number
    slackMessage: string
  }
}

const NOW = new Date()

const PIPELINE_MOCK: PipelineLead[] = [
  { id: 'p1', name: 'Priya Mehta', source: 'Google Ads', score: 95, tier: 'HOT', service: 'Fertility Consultation', location: 'Gurgaon', assignTo: 'Riya Sharma', hasPhone: true, inquiryTime: new Date(NOW.getTime() - 3.5 * 3600000), lastTouchTime: new Date(NOW.getTime() - 3.5 * 3600000), lastAction: 'Inquiry received, no action taken', hoursSinceLastTouch: 3.5, missedCalls: 0, saidCallMeLater: false, callbackScheduled: false, status: 'New' },
  { id: 'p2', name: 'Kavya Sharma', source: 'Meta Ads', score: 82, tier: 'HOT', service: 'PCOS Management', location: 'Delhi', assignTo: 'Anil Kapoor', hasPhone: true, inquiryTime: new Date(NOW.getTime() - 2.2 * 3600000), lastTouchTime: new Date(NOW.getTime() - 2.2 * 3600000), lastAction: 'Inquiry received, no action taken', hoursSinceLastTouch: 2.2, missedCalls: 0, saidCallMeLater: false, callbackScheduled: false, status: 'New' },
  { id: 'p3', name: 'Ananya Reddy', source: 'Organic SEO', score: 58, tier: 'WARM', service: 'Fertility Consultation', location: 'Noida', assignTo: 'Riya Sharma', hasPhone: true, inquiryTime: new Date(NOW.getTime() - 28 * 3600000), lastTouchTime: new Date(NOW.getTime() - 20 * 3600000), lastAction: 'Sent WhatsApp intro message, no reply', hoursSinceLastTouch: 20, missedCalls: 1, saidCallMeLater: false, callbackScheduled: false, status: 'Contacted' },
  { id: 'p4', name: 'Deepika Tyagi', source: 'Google Ads', score: 69, tier: 'WARM', service: 'Menopause Support', location: 'Gurgaon', assignTo: 'Priya Singh', hasPhone: true, inquiryTime: new Date(NOW.getTime() - 14 * 3600000), lastTouchTime: new Date(NOW.getTime() - 10 * 3600000), lastAction: 'Left voicemail — patient did not pick up', hoursSinceLastTouch: 10, missedCalls: 2, saidCallMeLater: false, callbackScheduled: false, status: 'Contacted' },
  { id: 'p5', name: 'Sneha Patel', source: 'Practo', score: 27, tier: 'COLD', service: 'General Wellness', location: 'Delhi', assignTo: 'Meena Patel', hasPhone: false, inquiryTime: new Date(NOW.getTime() - 48 * 3600000), lastTouchTime: new Date(NOW.getTime() - 48 * 3600000), lastAction: 'Inquiry received, no action taken', hoursSinceLastTouch: 48, missedCalls: 0, saidCallMeLater: false, callbackScheduled: false, status: 'New' },
  { id: 'p6', name: 'Ritu Agarwal', source: 'Meta Ads', score: 52, tier: 'WARM', service: 'Post-Pregnancy Care', location: 'Gurgaon', assignTo: 'Riya Sharma', hasPhone: true, inquiryTime: new Date(NOW.getTime() - 8 * 3600000), lastTouchTime: new Date(NOW.getTime() - 4 * 3600000), lastAction: 'Patient said "call me later in the evening"', hoursSinceLastTouch: 4, missedCalls: 0, saidCallMeLater: true, callbackScheduled: false, status: 'Contacted' },
  { id: 'p7', name: 'Pooja Negi', source: 'Google Ads', score: 43, tier: 'WARM', service: 'Pregnancy Care', location: 'Gurgaon', assignTo: 'Riya Sharma', hasPhone: false, inquiryTime: new Date(NOW.getTime() - 16 * 3600000), lastTouchTime: new Date(NOW.getTime() - 16 * 3600000), lastAction: 'Inquiry received, no action taken', hoursSinceLastTouch: 16, missedCalls: 0, saidCallMeLater: false, callbackScheduled: false, status: 'New' },
  { id: 'p8', name: 'Divya Lakshmi', source: 'Organic SEO', score: 47, tier: 'WARM', service: 'Hormonal Health', location: 'Delhi', assignTo: 'Anil Kapoor', hasPhone: true, inquiryTime: new Date(NOW.getTime() - 26 * 3600000), lastTouchTime: new Date(NOW.getTime() - 22 * 3600000), lastAction: 'Sent WhatsApp message with service info', hoursSinceLastTouch: 22, missedCalls: 3, saidCallMeLater: false, callbackScheduled: false, status: 'Contacted' },
  { id: 'p9', name: 'Swati Chauhan', source: 'Google Ads', score: 91, tier: 'HOT', service: 'Fertility Consultation', location: 'Gurgaon', assignTo: 'Riya Sharma', hasPhone: true, inquiryTime: new Date(NOW.getTime() - 1.5 * 3600000), lastTouchTime: new Date(NOW.getTime() - 1.5 * 3600000), lastAction: 'Inquiry received, no action taken', hoursSinceLastTouch: 1.5, missedCalls: 0, saidCallMeLater: false, callbackScheduled: false, status: 'New' },
  { id: 'p10', name: 'Tanya Sethi', source: 'Practo', score: 42, tier: 'WARM', service: 'PCOS Management', location: 'Ghaziabad', assignTo: 'Anil Kapoor', hasPhone: true, inquiryTime: new Date(NOW.getTime() - 18 * 3600000), lastTouchTime: new Date(NOW.getTime() - 14 * 3600000), lastAction: 'Sent WhatsApp brochure, patient said "will check and revert"', hoursSinceLastTouch: 14, missedCalls: 0, saidCallMeLater: false, callbackScheduled: false, status: 'Contacted' },
  { id: 'p11', name: 'Vidya Nair', source: 'Google Ads', score: 87, tier: 'HOT', service: 'Fertility Consultation', location: 'Noida', assignTo: 'Riya Sharma', hasPhone: true, inquiryTime: new Date(NOW.getTime() - 0.5 * 3600000), lastTouchTime: new Date(NOW.getTime() - 0.5 * 3600000), lastAction: 'Inquiry received, no action taken', hoursSinceLastTouch: 0.5, missedCalls: 0, saidCallMeLater: false, callbackScheduled: false, status: 'New' },
  { id: 'p12', name: 'Lakshmi Gupta', source: 'Google Ads', score: 74, tier: 'HOT', service: 'Fertility Consultation', location: 'Gurgaon', assignTo: 'Riya Sharma', hasPhone: true, inquiryTime: new Date(NOW.getTime() - 2.8 * 3600000), lastTouchTime: new Date(NOW.getTime() - 2.8 * 3600000), lastAction: 'Inquiry received, no action taken', hoursSinceLastTouch: 2.8, missedCalls: 0, saidCallMeLater: false, callbackScheduled: false, status: 'New' },
  { id: 'p13', name: 'Sunita Mishra', source: 'Meta Ads', score: 65, tier: 'WARM', service: 'Pregnancy Care', location: 'Delhi', assignTo: 'Priya Singh', hasPhone: true, inquiryTime: new Date(NOW.getTime() - 6 * 3600000), lastTouchTime: new Date(NOW.getTime() - 5 * 3600000), lastAction: 'Initial call — patient asked to call tomorrow', hoursSinceLastTouch: 5, missedCalls: 0, saidCallMeLater: true, callbackScheduled: false, status: 'Contacted' },
  { id: 'p14', name: 'Komal Rana', source: 'WhatsApp', score: 38, tier: 'COLD', service: 'Post-Pregnancy Care', location: 'Faridabad', assignTo: 'Meena Patel', hasPhone: true, inquiryTime: new Date(NOW.getTime() - 72 * 3600000), lastTouchTime: new Date(NOW.getTime() - 48 * 3600000), lastAction: 'Sent WhatsApp message — read but no reply', hoursSinceLastTouch: 48, missedCalls: 0, saidCallMeLater: false, callbackScheduled: false, status: 'Contacted' },
  { id: 'p15', name: 'Neha Bhatia', source: 'Practo', score: 35, tier: 'COLD', service: 'General Wellness', location: 'Noida', assignTo: 'Meena Patel', hasPhone: true, inquiryTime: new Date(NOW.getTime() - 60 * 3600000), lastTouchTime: new Date(NOW.getTime() - 36 * 3600000), lastAction: 'Sent pricing info — patient said "will discuss with husband"', hoursSinceLastTouch: 36, missedCalls: 0, saidCallMeLater: false, callbackScheduled: false, status: 'Contacted' },
]

export function runPipelineScan(): PipelineScanResult {
  const alerts: PipelineAlert[] = []
  const alertedIds = new Set<string>()

  for (const lead of PIPELINE_MOCK) {
    const h = lead.hoursSinceLastTouch

    // Rule 1: HOT lead not contacted within 2 hours → CRITICAL
    if (lead.tier === 'HOT' && h >= 2 && !isNaN(h)) {
      if (!alertedIds.has(lead.id)) {
        alerts.push({
          lead,
          level: 'CRITICAL',
          reason: `HOT lead not contacted within SLA — ${h.toFixed(1)}h since inquiry`,
          deadline: 'Respond within 30 min',
          recommendedAction: `Call ${lead.name} immediately on ${lead.hasPhone ? 'phone' : 'WhatsApp'} — this is a high-value ${lead.service} lead scoring ${lead.score}/100. Share relevant treatment info and book consultation slot within this call.`,
        })
        alertedIds.add(lead.id)
        continue
      }
    }

    // Rule 2: WARM lead not contacted within 12 hours → HIGH
    if (lead.tier === 'WARM' && h >= 12 && !isNaN(h)) {
      if (!alertedIds.has(lead.id)) {
        alerts.push({
          lead,
          level: 'HIGH',
          reason: `WARM lead idle for ${h.toFixed(1)}h — engagement window closing`,
          deadline: 'Respond within 2 hours',
          recommendedAction: `Send WhatsApp follow-up within 2h with specific service info based on their query. If no response in 4h, attempt a phone call. Do not let this go beyond 24h without contact.`,
        })
        alertedIds.add(lead.id)
        continue
      }
    }

    // Rule 3: 2+ missed calls → escalate to senior CRE
    if (lead.missedCalls >= 2) {
      if (!alertedIds.has(lead.id)) {
        alerts.push({
          lead,
          level: 'HIGH',
          reason: `${lead.missedCalls} missed calls — lead may be losing interest or frustrated`,
          deadline: 'Escalate within 4 hours',
          recommendedAction: `Escalate to senior CRE (Priya Singh). Switch communication channel — if called twice, send a WhatsApp message instead acknowledging the missed attempts: "Hi ${lead.name.split(' ')[0]}, I tried reaching you a couple of times. Let me know a convenient time to connect — happy to share info via text in the meantime."`,
        })
        alertedIds.add(lead.id)
        continue
      }
    }

    // Rule 4: Said "call me later" but no callback scheduled → flag
    if (lead.saidCallMeLater && !lead.callbackScheduled) {
      if (!alertedIds.has(lead.id)) {
        alerts.push({
          lead,
          level: 'MEDIUM',
          reason: `Lead said "call me later" but no callback task was created`,
          deadline: 'Schedule callback within 1 hour',
          recommendedAction: `Log a callback task in CRM for ${lead.name} within the next 1h. Set a reminder for ${lead.hoursSinceLastTouch <= 4 ? 'this evening at 7pm' : 'tomorrow morning 10am'}. Send a confirmation WhatsApp: "Noted! I'll call you back at [scheduled time]. Feel free to text if anything comes up."`,
        })
        alertedIds.add(lead.id)
        continue
      }
    }
  }

  // Sort: CRITICAL first, then HIGH, then MEDIUM
  alerts.sort((a, b) => {
    const order = { CRITICAL: 0, HIGH: 1, MEDIUM: 2 }
    return order[a.level] - order[b.level]
  })

  const critical = alerts.filter(a => a.level === 'CRITICAL').length
  const high = alerts.filter(a => a.level === 'HIGH').length
  const medium = alerts.filter(a => a.level === 'MEDIUM').length

  // Build Slack message
  const creGroups: Record<string, string[]> = {}
  for (const a of alerts) {
    if (!creGroups[a.lead.assignTo]) creGroups[a.lead.assignTo] = []
    creGroups[a.lead.assignTo].push(a.lead.name)
  }
  const creMentions = Object.entries(creGroups)
    .map(([cre, leads]) => `• @${cre.replace(/\s+/g, '_')} — ${leads.join(', ')}`)
    .join('\n')

  const slackMessage = [
    `:pipeline: *Pipeline Health Scan — ${NOW.toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}*`,
    ``,
    `*${critical} CRITICAL* · *${high} HIGH* · *${medium} MEDIUM* — ${alerts.length} total leads at risk`,
    ``,
    `*HOT leads at risk:* ${critical}`,
    creMentions,
    ``,
    `Next scan at ${new Date(NOW.getTime() + 4 * 3600000).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}`,
  ].join('\n')

  return {
    alerts,
    scannedAt: NOW,
    summary: { critical, high, medium, total: alerts.length, slackMessage },
  }
}

export function formatHours(h: number): string {
  if (h < 1) return `${Math.round(h * 60)}m`
  if (h < 24) return `${h.toFixed(1)}h`
  const days = Math.floor(h / 24)
  const rem = Math.round(h % 24)
  return `${days}d ${rem}h`
}
