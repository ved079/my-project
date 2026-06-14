export type ScoredLead = {
  id: string
  name: string
  phone: string
  phoneMasked: string
  source: string
  query: string
  service: string
  location: string
  cityTier: number
  inquiryTime: Date
  hasPhone: boolean
  status: string

  score: number
  tier: 'HOT' | 'WARM' | 'COLD'
  intentKeyword: string
  recommendedAction: string
  assignTo: string
  whatsappDraft: string
}

export const LEAD_MOCK: Array<Omit<ScoredLead, 'score' | 'tier' | 'intentKeyword' | 'recommendedAction' | 'assignTo' | 'whatsappDraft'>> = [
  { id: 'ls1', name: 'Priya Mehta', phone: '+91 98765 43789', phoneMasked: '+91 98XXX XX789', source: 'Google Ads', query: 'What is the cost of IVF treatment in Gurgaon?', service: 'Fertility Consultation', location: 'Gurgaon', cityTier: 1, inquiryTime: new Date(Date.now() - 2 * 60000), hasPhone: true, status: 'New' },
  { id: 'ls2', name: 'Kavya Sharma', phone: '+91 87654 32456', phoneMasked: '+91 87XXX XX456', source: 'Meta Ads', query: 'PCOS treatment options and cost', service: 'PCOS Management', location: 'Delhi', cityTier: 1, inquiryTime: new Date(Date.now() - 15 * 60000), hasPhone: true, status: 'New' },
  { id: 'ls3', name: 'Ananya Reddy', phone: '+91 76543 21123', phoneMasked: '+91 76XXX XX123', source: 'Organic SEO', query: 'Best fertility specialist near me', service: 'Fertility Consultation', location: 'Noida', cityTier: 1, inquiryTime: new Date(Date.now() - 2 * 3600000), hasPhone: true, status: 'Contacted' },
  { id: 'ls4', name: 'Deepika Tyagi', phone: '+91 65432 10890', phoneMasked: '+91 65XXX XX890', source: 'Google Ads', query: 'Menopause specialist in Gurgaon', service: 'Menopause Support', location: 'Gurgaon', cityTier: 1, inquiryTime: new Date(Date.now() - 5 * 3600000), hasPhone: true, status: 'Consultation Booked' },
  { id: 'ls5', name: 'Sneha Patel', phone: '', phoneMasked: '', source: 'Practo', query: 'General health checkup for women', service: 'General Wellness', location: 'Delhi', cityTier: 1, inquiryTime: new Date(Date.now() - 1 * 86400000), hasPhone: false, status: 'New' },
  { id: 'ls6', name: 'Ritu Agarwal', phone: '+91 43210 98234', phoneMasked: '+91 43XXX XX234', source: 'Meta Ads', query: 'Post pregnancy weight loss program', service: 'Post-Pregnancy Care', location: 'Gurgaon', cityTier: 1, inquiryTime: new Date(Date.now() - 3 * 3600000), hasPhone: true, status: 'Contacted' },
  { id: 'ls7', name: 'Meera Krishnan', phone: '+91 32109 87901', phoneMasked: '+91 32XXX XX901', source: 'WhatsApp', query: 'PCOS diet plan and medication', service: 'PCOS Management', location: 'Noida', cityTier: 1, inquiryTime: new Date(Date.now() - 12 * 3600000), hasPhone: true, status: 'Converted' },
  { id: 'ls8', name: 'Pooja Negi', phone: '', phoneMasked: '', source: 'Google Ads', query: 'Pregnancy doctor', service: 'Pregnancy Care', location: 'Gurgaon', cityTier: 1, inquiryTime: new Date(Date.now() - 4 * 3600000), hasPhone: false, status: 'New' },
  { id: 'ls9', name: 'Divya Lakshmi', phone: '+91 10987 65345', phoneMasked: '+91 10XXX XX345', source: 'Organic SEO', query: 'Hormonal imbalance treatment for women', service: 'Hormonal Health', location: 'Delhi', cityTier: 1, inquiryTime: new Date(Date.now() - 8 * 3600000), hasPhone: true, status: 'New' },
  { id: 'ls10', name: 'Swati Chauhan', phone: '+91 99876 54012', phoneMasked: '+91 99XXX XX012', source: 'Google Ads', query: 'Best IVF clinic in Delhi NCR with success rates', service: 'Fertility Consultation', location: 'Gurgaon', cityTier: 1, inquiryTime: new Date(Date.now() - 30 * 60000), hasPhone: true, status: 'New' },
  { id: 'ls11', name: 'Neha Bhatia', phone: '+91 88765 43789', phoneMasked: '+91 88XXX XX789', source: 'Practo', query: 'General wellness consultation fees', service: 'General Wellness', location: 'Noida', cityTier: 1, inquiryTime: new Date(Date.now() - 6 * 3600000), hasPhone: true, status: 'Contacted' },
  { id: 'ls12', name: 'Asha Verma', phone: '+91 77654 32456', phoneMasked: '+91 77XXX XX456', source: 'Meta Ads', query: 'PCOS and fertility treatment cost', service: 'PCOS Management', location: 'Delhi', cityTier: 1, inquiryTime: new Date(Date.now() - 14 * 3600000), hasPhone: true, status: 'New' },
  { id: 'ls13', name: 'Rekha Das', phone: '', phoneMasked: '', source: 'WhatsApp', query: 'pcos', service: 'PCOS Management', location: 'Gurgaon', cityTier: 1, inquiryTime: new Date(Date.now() - 60000), hasPhone: false, status: 'New' },
  { id: 'ls14', name: 'Sunita Mishra', phone: '+91 55432 10890', phoneMasked: '+91 55XXX XX890', source: 'Meta Ads', query: 'Pregnancy care packages and cost', service: 'Pregnancy Care', location: 'Delhi', cityTier: 1, inquiryTime: new Date(Date.now() - 20 * 60000), hasPhone: true, status: 'New' },
  { id: 'ls15', name: 'Lakshmi Gupta', phone: '+91 44321 09567', phoneMasked: '+91 44XXX XX567', source: 'Google Ads', query: 'Fertility doctor consultation near Gurgaon sector 56', service: 'Fertility Consultation', location: 'Gurgaon', cityTier: 1, inquiryTime: new Date(Date.now() - 45 * 60000), hasPhone: true, status: 'Contacted' },
  { id: 'ls16', name: 'Pallavi Joshi', phone: '+91 22109 87901', phoneMasked: '+91 22XXX XX901', source: 'Organic SEO', query: 'What is the best treatment for menopause symptoms?', service: 'Menopause Support', location: 'Jaipur', cityTier: 2, inquiryTime: new Date(Date.now() - 60 * 60000), hasPhone: true, status: 'New' },
  { id: 'ls17', name: 'Tanya Sethi', phone: '+91 76543 21789', phoneMasked: '+91 76XXX XX789', source: 'Practo', query: 'PCOS acne treatment dermatologist', service: 'PCOS Management', location: 'Ghaziabad', cityTier: 2, inquiryTime: new Date(Date.now() - 90 * 60000), hasPhone: true, status: 'New' },
  { id: 'ls18', name: 'Shruti Rao', phone: '', phoneMasked: '', source: 'Meta Ads', query: 'period pain', service: 'Period Care', location: 'Delhi', cityTier: 1, inquiryTime: new Date(Date.now() - 3 * 86400000), hasPhone: false, status: 'Contacted' },
  { id: 'ls19', name: 'Komal Rana', phone: '+91 43210 98890', phoneMasked: '+91 43XXX XX890', source: 'WhatsApp', query: 'Post pregnancy back pain relief', service: 'Post-Pregnancy Care', location: 'Faridabad', cityTier: 2, inquiryTime: new Date(Date.now() - 2 * 86400000), hasPhone: true, status: 'New' },
  { id: 'ls20', name: 'Vidya Nair', phone: '+91 87654 32012', phoneMasked: '+91 87XXX XX012', source: 'Google Ads', query: 'Second opinion on IVF treatment plan', service: 'Fertility Consultation', location: 'Noida', cityTier: 1, inquiryTime: new Date(Date.now() - 10 * 60000), hasPhone: true, status: 'New' },
]

const SOURCE_SCORE: Record<string, number> = {
  'Google Ads': 20,
  'Meta Ads': 15,
  'Practo': 12,
  'Organic SEO': 10,
  'WhatsApp': 8,
}

const HIGH_INTENT_KW: Array<{ pattern: RegExp; keyword: string; points: number }> = [
  { pattern: /ivf/i, keyword: 'IVF Treatment', points: 25 },
  { pattern: /fertility/i, keyword: 'Fertility', points: 22 },
  { pattern: /pcos/i, keyword: 'PCOS', points: 20 },
  { pattern: /pregnancy/i, keyword: 'Pregnancy Care', points: 18 },
  { pattern: /cost/i, keyword: 'Cost Inquiry', points: 15 },
  { pattern: /best|top|highest rated|review/i, keyword: 'Decision Stage', points: 20 },
  { pattern: /specialist|doctor|gynecologist|clinic/i, keyword: 'Service Search', points: 15 },
  { pattern: /treatment|therapy|management/i, keyword: 'Treatment Intent', points: 15 },
  { pattern: /near me|nearby/i, keyword: 'Location Intent', points: 12 },
  { pattern: /hormon/i, keyword: 'Hormonal Health', points: 12 },
  { pattern: /menopause/i, keyword: 'Menopause', points: 10 },
  { pattern: /period|pain|cramp/i, keyword: 'Period Care', points: 8 },
  { pattern: /weight/i, keyword: 'Weight Management', points: 8 },
  { pattern: /diet|nutrition/i, keyword: 'Diet/Nutrition', points: 8 },
  { pattern: /general|checkup|wellness/i, keyword: 'General Inquiry', points: 5 },
]

const CITY_TIER_SCORE: Record<number, number> = {
  1: 10,
  2: 7,
  3: 3,
}

function scoreTimeOfDay(date: Date): number {
  const h = date.getHours()
  if (h >= 9 && h < 18) return 15
  if (h >= 18 && h < 21) return 10
  return 5
}

export function scoreLead(raw: Omit<ScoredLead, 'score' | 'tier' | 'intentKeyword' | 'recommendedAction' | 'assignTo' | 'whatsappDraft'>): ScoredLead {
  const sourceScore = SOURCE_SCORE[raw.source] || 5
  const timeScore = scoreTimeOfDay(raw.inquiryTime)
  const cityScore = CITY_TIER_SCORE[raw.cityTier] || 3
  const phoneScore = raw.hasPhone ? 20 : 0

  let intentScore = 0
  let matchedKeyword = 'General'

  for (const kw of HIGH_INTENT_KW) {
    if (kw.pattern.test(raw.query || '')) {
      intentScore = Math.max(intentScore, kw.points)
      matchedKeyword = kw.keyword
      break
    }
  }

  let score = 5 + sourceScore + timeScore + intentScore + cityScore + phoneScore
  score = Math.min(score, 100)
  score = Math.round(score)

  let tier: 'HOT' | 'WARM' | 'COLD'
  if (score >= 70 && raw.hasPhone) {
    tier = 'HOT'
  } else if (score >= 40) {
    tier = 'WARM'
  } else {
    tier = 'COLD'
  }

  let recommendedAction: string
  if (tier === 'HOT') {
    if (matchedKeyword.includes('IVF') || matchedKeyword.includes('Fertility')) {
      recommendedAction = 'Call within 30 min — share IVF cost brochure and book consultation slot'
    } else if (matchedKeyword.includes('PCOS')) {
      recommendedAction = 'Call within 30 min — discuss PCOS management plans and schedule initial consult'
    } else if (matchedKeyword.includes('Pregnancy')) {
      recommendedAction = 'Call within 30 min — share pregnancy care package details and book appointment'
    } else if (matchedKeyword.includes('Cost') || matchedKeyword.includes('Decision')) {
      recommendedAction = 'Call within 1 hr — discuss pricing options and overcome objections'
    } else {
      recommendedAction = 'Call within 1 hr — qualify lead and book consultation'
    }
  } else if (tier === 'WARM') {
    if (matchedKeyword.includes('General') || matchedKeyword.includes('Period')) {
      recommendedAction = 'Send WhatsApp within 2 hrs with service info and pricing'
    } else {
      recommendedAction = 'Call within 4 hrs — understand needs and schedule consultation'
    }
  } else {
    if (!raw.hasPhone) {
      recommendedAction = 'Request phone number via WhatsApp or email callback form'
    } else {
      recommendedAction = 'Send automated WhatsApp intro and monitor response for 24 hrs'
    }
  }

  let assignTo: string
  if (raw.service === 'Fertility Consultation' || raw.service === 'Pregnancy Care') {
    assignTo = 'Riya Sharma'
  } else if (raw.service === 'PCOS Management' || raw.service === 'Hormonal Health') {
    assignTo = 'Anil Kapoor'
  } else if (raw.service === 'Menopause Support' || raw.service === 'General Wellness') {
    assignTo = 'Priya Singh'
  } else {
    assignTo = 'Meena Patel'
  }

  const leadName = raw.name.split(' ')[0]
  const clinicName = 'Newmi Care'
  const serviceName = raw.service

  const timeContext = scoreTimeOfDay(raw.inquiryTime) >= 10 ? 'Good evening' : 'Good morning'

  let whatsappDraft = ''
  if (tier === 'HOT') {
    if (matchedKeyword.includes('IVF') || matchedKeyword.includes('Fertility')) {
      whatsappDraft = `${timeContext} ${leadName}! 👋\n\nI just received your query about fertility treatment at ${clinicName}. I understand this is an important decision — we offer comprehensive fertility evaluations and IVF packages starting from ₹1.5L with a dedicated care coordinator.\n\nWould you like to:\n1️⃣ Book a free 15-min consultation call with our fertility specialist\n2️⃣ Receive our detailed IVF cost breakdown via email\n3️⃣ Visit our clinic for a tour this week\n\nI\'d recommend option 1 — our specialist can answer your specific questions and help you understand the best path forward.\n\nLooking forward to hearing from you!\n- Riya, ${clinicName}`
    } else if (matchedKeyword.includes('PCOS')) {
      whatsappDraft = `${timeContext} ${leadName}! 🌸\n\nThank you for reaching out to ${clinicName} about PCOS management. Our approach combines evidence-based treatment with lifestyle coaching — our patients typically see improvement within 8-12 weeks.\n\nHere\'s what I\'d suggest:\n1️⃣ Quick 10-min call with our PCOS specialist to understand your specific concerns\n2️⃣ Personalized management plan including diet, medication & monitoring\n3️⃣ Connect with our nutritionist for a customized meal plan\n\nShall I schedule a call for you this afternoon?\n\nWarmly,\n- Riya, ${clinicName}`
    } else if (matchedKeyword.includes('Pregnancy')) {
      whatsappDraft = `${timeContext} ${leadName}! 🤰\n\nCongratulations on your journey! I received your inquiry about pregnancy care at ${clinicName}. We offer comprehensive maternity packages starting from ₹25,000 including all scans, consultations, and delivery coordination.\n\nWould you like to:\n1️⃣ Schedule a free consultation with our OB-GYN\n2️⃣ Get our complete pregnancy care brochure with pricing\n3️⃣ Visit our maternity wing this week\n\nWe\'d love to be part of your journey!\n- Riya, ${clinicName}`
    } else {
      whatsappDraft = `${timeContext} ${leadName}! 😊\n\nThank you for your interest in ${clinicName}. We specialize in women\'s health services including ${serviceName}.\n\nI\'d be happy to:\n1️⃣ Schedule a free consultation with our specialist\n2️⃣ Share detailed information about our services and pricing\n3️⃣ Answer any questions you have right here\n\nWhat works best for you?\n\nLooking forward to connecting!\n- Riya, ${clinicName}`
    }
  }

  return {
    ...raw,
    score,
    tier,
    intentKeyword: matchedKeyword,
    recommendedAction,
    assignTo,
    whatsappDraft,
  }
}
