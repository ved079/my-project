import type { NiviConversation, ConversationContext, NiviMessage, PatientInfo, PipelineAlert } from './types'

function buildInitialContext(
  intentHistory: string[],
  services: string[],
  doctors: string[]
): ConversationContext {
  return {
    intentHistory: intentHistory as NiviConversation['context']['intentHistory'],
    mentionedServices: services,
    mentionedDoctors: doctors,
    emotionalState: 'neutral',
    unresolvedCount: 0,
    turnCount: intentHistory.length,
  }
}

function msg(id: string, from: 'patient' | 'nivi' | 'human', text: string, minutesAgo: number, opts?: { intent?: string; confidence?: string }): NiviMessage {
  return {
    id,
    from,
    text,
    timestamp: new Date(Date.now() - minutesAgo * 60000),
    confidence: opts?.confidence as NiviMessage['confidence'],
    intent: opts?.intent as NiviMessage['intent'],
  }
}

function patient(
  id: string, name: string, phone: string, source: PatientInfo['source'],
  service: string, location: string, score: number, tier: PatientInfo['tier'],
  keyword: string, hours: number, missed: number, action: string,
  alerts: PipelineAlert[] = []
): PatientInfo {
  return {
    id, name, phone, source, service, location, score, tier,
    intentKeyword: keyword, hoursSinceLastTouch: hours, missedCalls: missed,
    lastAction: action, activeAlerts: alerts,
  }
}

function alert(id: string, type: PipelineAlert['type'], message: string, severity: PipelineAlert['severity'], minutesAgo: number): PipelineAlert {
  return { id, type, message, severity, createdAt: new Date(Date.now() - minutesAgo * 60000) }
}

export const MOCK_CONVERSATIONS: NiviConversation[] = [
  {
    id: 'conv-1',
    patient: patient('p1', 'Priya Mehta', '+91 98765 43789', 'google_ads', 'IVF', 'Gurugram', 82, 'HOT', 'IVF Treatment', 0.5, 0, 'Inquiry received'),
    messages: [
      msg('m1-1', 'patient', 'Hi, I wanted to know about the cost of IVF treatment at Newmi', 14, { intent: 'pricing' }),
      msg('m1-2', 'nivi', 'Thanks for asking about pricing, Priya! Our IVF packages typically range from ₹1.2L to ₹2.5L depending on the treatment plan. I can connect you with a coordinator who will share an exact quote based on your needs.', 13, { intent: 'pricing', confidence: 'high' }),
      msg('m1-3', 'patient', 'Can I pay in EMI?', 8, { intent: 'pricing' }),
      msg('m1-4', 'nivi', 'I understand you\'d like to know the costs, Priya. For a custom quote and to discuss payment options like EMI, would you like me to have our coordinator reach out within 30 minutes?', 7, { intent: 'pricing', confidence: 'high' }),
    ],
    unreadCount: 0,
    context: buildInitialContext(['pricing', 'pricing'], ['IVF'], []),
    status: 'active',
    lastActivity: new Date(Date.now() - 7 * 60000),
  },
  {
    id: 'conv-2',
    patient: patient('p2', 'Kavya Sharma', '+91 87654 32456', 'organic', 'PCOS', 'Delhi', 65, 'WARM', 'PCOS', 2.5, 0, 'Inquiry received'),
    messages: [
      msg('m2-1', 'patient', 'What are the treatment options for PCOS?', 150, { intent: 'medical_info' }),
      msg('m2-2', 'nivi', 'That\'s a good question, Kavya. While I can share general information, every patient\'s situation is unique. I\'d recommend a thorough in-person consultation where our specialist can understand your specific health needs.', 149, { intent: 'medical_info', confidence: 'high' }),
      msg('m2-3', 'patient', 'Are there any side effects of the medication?', 120, { intent: 'medical_info' }),
      msg('m2-4', 'nivi', 'I appreciate you asking, Kavya — it\'s important to be informed. In general, treatment plans are tailored after a full evaluation. Our specialists can explain all options. The best next step would be an in-person consultation.', 119, { intent: 'medical_info', confidence: 'high' }),
      msg('m2-5', 'patient', 'What about diet changes for PCOS?', 90, { intent: 'medical_info' }),
      msg('m2-6', 'nivi', 'That\'s a good question, Kavya. While I can share general information, every patient\'s situation is unique. I\'d recommend a thorough in-person consultation where our specialist can discuss diet and lifestyle approaches.', 89, { intent: 'medical_info', confidence: 'high' }),
    ],
    unreadCount: 0,
    context: buildInitialContext(['medical_info', 'medical_info', 'medical_info'], ['PCOS'], []),
    status: 'active',
    lastActivity: new Date(Date.now() - 89 * 60000),
  },
  {
    id: 'conv-3',
    patient: patient('p3', 'Ananya Reddy', '+91 76543 21123', 'practo', 'prenatal', 'Noida', 71, 'HOT', 'Pregnancy Care', 3.0, 0, 'Booking in progress'),
    messages: [
      msg('m3-1', 'patient', 'I want to book a consultation with an OB-GYN for my pregnancy checkup', 185, { intent: 'booking' }),
      msg('m3-2', 'nivi', 'Let\'s get that booked for you, Ananya! Do you have a preferred date and time in mind? Also, if you have a specific doctor you\'d like to see, just let me know — otherwise I\'ll suggest the best specialist for your needs. I\'ll confirm your slot within 30 minutes.', 184, { intent: 'booking', confidence: 'high' }),
      msg('m3-3', 'patient', 'Tomorrow at 10am works for me', 180, { intent: 'booking' }),
      msg('m3-4', 'nivi', 'I\'d be happy to help you book an appointment, Ananya. Could you let me know your preferred date and time? I\'ll check availability and confirm your slot within 30 minutes.', 179, { intent: 'booking', confidence: 'high' }),
    ],
    unreadCount: 0,
    context: buildInitialContext(['booking', 'booking'], ['prenatal'], []),
    status: 'resolved',
    lastActivity: new Date(Date.now() - 179 * 60000),
  },
  {
    id: 'conv-4',
    patient: patient('p4', 'Deepika Tyagi', '+91 65432 10890', 'meta_ads', 'general gynecology', 'Gurugram', 55, 'WARM', 'General Inquiry', 1.0, 0, 'Inquiry received'),
    messages: [
      msg('m4-1', 'patient', 'I\'m having heavy bleeding and I\'m really scared', 60, { intent: 'emotional' }),
    ],
    unreadCount: 1,
    context: buildInitialContext([], [], []),
    status: 'escalated',
    escalatedTo: 'Dr. Priya Sharma',
    escalatedAt: new Date(Date.now() - 59 * 60000),
    escalationReason: 'Medical emergency keyword detected',
    lastActivity: new Date(Date.now() - 59 * 60000),
  },
  {
    id: 'conv-5',
    patient: patient('p5', 'Sneha Patel', '+91 54321 09567', 'whatsapp', 'IVF', 'Faridabad', 68, 'WARM', 'Fertility', 4.0, 0, 'Inquiry received'),
    messages: [
      msg('m5-1', 'patient', 'How much does IVF cost at Newmi?', 250, { intent: 'pricing' }),
      msg('m5-2', 'nivi', 'Thanks for asking about pricing, Sneha. Our IVF packages typically range from ₹1.2L to ₹2.5L. I can connect you with a coordinator for an exact quote.', 249, { intent: 'pricing', confidence: 'high' }),
      msg('m5-3', 'patient', 'Which doctor is best for IVF?', 245, { intent: 'doctor_query' }),
      msg('m5-4', 'nivi', 'Great question, Sneha. For this, I\'d recommend Dr. Anita Rao, our Fertility Specialist with 11 years of experience. Would you like me to help you book a consultation with her?', 244, { intent: 'doctor_query', confidence: 'high' }),
      msg('m5-5', 'patient', 'What slots are available this week?', 240, { intent: 'booking' }),
      msg('m5-6', 'nivi', 'Let\'s get that booked for you, Sneha! Do you have a preferred date and time in mind? I\'ll confirm your slot within 30 minutes.', 239, { intent: 'booking', confidence: 'high' }),
      msg('m5-7', 'patient', 'How much did you say IVF costs again?', 235, { intent: 'pricing' }),
      msg('m5-8', 'nivi', 'Thanks for asking about pricing, Sneha. Our IVF packages typically range from ₹1.2L to ₹2.5L depending on the treatment plan.', 234, { intent: 'pricing', confidence: 'high' }),
      msg('m5-9', 'patient', 'But which doctor is best? I need a good one', 230, { intent: 'doctor_query' }),
    ],
    unreadCount: 1,
    context: buildInitialContext(['pricing', 'doctor_query', 'booking', 'pricing'], ['IVF'], ['Dr. Anita Rao']),
    status: 'escalated',
    escalationReason: 'Patient query unresolved after 3 attempts',
    lastActivity: new Date(Date.now() - 230 * 60000),
  },
  {
    id: 'conv-6',
    patient: patient('p6', 'Ritu Agarwal', '+91 43210 98234', 'organic', 'menopause', 'Delhi', 58, 'WARM', 'Menopause', 5.0, 0, 'Inquiry received'),
    messages: [
      msg('m6-1', 'patient', 'Which doctor should I see for menopause symptoms?', 310, { intent: 'doctor_query' }),
      msg('m6-2', 'nivi', 'Great question, Ritu. For this, I\'d recommend Dr. Kavitha Menon, our Reproductive Endocrinologist with 9 years of experience. She specialises in menopause and hormonal health. Would you like me to help you book a consultation with her?', 309, { intent: 'doctor_query', confidence: 'high' }),
      msg('m6-3', 'patient', 'Yes, please book an appointment', 305, { intent: 'booking' }),
      msg('m6-4', 'nivi', 'Let\'s get that booked for you, Ritu! Could you let me know your preferred date and time? I\'ll confirm your slot within 30 minutes.', 304, { intent: 'booking', confidence: 'high' }),
    ],
    unreadCount: 0,
    context: buildInitialContext(['doctor_query', 'booking'], ['menopause'], ['Dr. Kavitha Menon']),
    status: 'active',
    lastActivity: new Date(Date.now() - 304 * 60000),
  },
  {
    id: 'conv-7',
    patient: patient('p7', 'Pallavi Joshi', '+91 22109 87901', 'google_ads', 'pregnancy', 'Gurugram', 90, 'HOT', 'Pregnancy Care', 0.3, 0, 'Inquiry received'),
    messages: [
      msg('m7-1', 'patient', 'I think I\'m having a miscarriage, I\'m bleeding heavily', 18, { intent: 'emotional' }),
    ],
    unreadCount: 1,
    context: buildInitialContext([], [], []),
    status: 'escalated',
    escalatedTo: 'Dr. Sneha Agarwal',
    escalatedAt: new Date(Date.now() - 17 * 60000),
    escalationReason: 'Medical emergency keyword detected',
    lastActivity: new Date(Date.now() - 17 * 60000),
  },
  {
    id: 'conv-8',
    patient: patient('p8', 'Neha Bhatia', '+91 88765 43789', 'meta_ads', 'fertility', 'Gurgaon', 42, 'WARM', 'Fertility', 1.5, 0, 'Inquiry received'),
    messages: [
      msg('m8-1', 'patient', 'Hi I need some help', 95, { intent: 'greeting' }),
      msg('m8-2', 'nivi', 'Hello Neha! Welcome to Newmi Care. I\'m here to help with any questions about your health. What can I assist you with today?', 94, { intent: 'greeting', confidence: 'high' }),
      msg('m8-3', 'patient', 'I want to know about IVF treatment', 90, { intent: 'pricing' }),
      msg('m8-4', 'nivi', 'Thanks for asking about pricing, Neha. Our IVF packages typically range from ₹1.2L to ₹2.5L depending on the treatment plan. I can connect you with a coordinator who will share an exact quote based on your needs.', 89, { intent: 'pricing', confidence: 'high' }),
    ],
    unreadCount: 0,
    context: buildInitialContext(['greeting', 'pricing'], ['fertility'], []),
    status: 'active',
    lastActivity: new Date(Date.now() - 89 * 60000),
  },
  {
    id: 'conv-9',
    patient: patient('p9', 'Pooja Negi', '+91 21098 76678', 'practo', 'PCOS', 'Noida', 77, 'HOT', 'PCOS', 1.0, 0, 'Consultation completed'),
    messages: [
      msg('m9-1', 'patient', 'Thanks that really helped! I have all the info I need.', 130, { intent: 'feedback' }),
      msg('m9-2', 'nivi', 'Thank you so much, Pooja! That means a lot to us. We\'re always here whenever you need us — for a follow-up, a new question, or anything at all. Take care, and don\'t hesitate to reach out!', 129, { intent: 'feedback', confidence: 'high' }),
    ],
    unreadCount: 0,
    context: buildInitialContext(['feedback'], ['PCOS'], []),
    status: 'resolved',
    lastActivity: new Date(Date.now() - 129 * 60000),
  },
  {
    id: 'conv-10',
    patient: patient('p10', 'Vidya Nair', '+91 87654 32012', 'referral', 'prenatal', 'Delhi', 63, 'WARM', 'Pregnancy Care', 2.5, 0, 'Awaiting callback', [alert('a1', 'callback_due', 'Callback promised 2 hours ago — not completed', 'critical', 120)]),
    messages: [
      msg('m10-1', 'patient', 'You said someone would call me back, it\'s been 2 hours', 120, { intent: 'follow_up' }),
      msg('m10-2', 'nivi', 'Vidya, you\'re absolutely right to follow up, and I sincerely apologise that we haven\'t gotten back to you sooner. Let me make this right — I\'ll personally ensure someone from our team calls you within the next 20 minutes. Thank you for your patience.', 119, { intent: 'follow_up', confidence: 'high' }),
      msg('m10-3', 'patient', 'Okay, please make sure someone calls today', 115, { intent: 'follow_up' }),
      msg('m10-4', 'nivi', 'Vidya, I\'ve notified our team about your request. A specialist will follow up with you directly. They\'ll have the full context of what you\'ve shared with me.', 114, { intent: 'follow_up', confidence: 'high' }),
    ],
    unreadCount: 1,
    context: buildInitialContext(['follow_up', 'follow_up'], ['prenatal'], []),
    status: 'active',
    lastActivity: new Date(Date.now() - 114 * 60000),
  },
]
