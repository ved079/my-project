import type { NiviIntent, SentimentLabel } from './types'

export interface ResponseTemplate {
  intent: NiviIntent
  sentiment: SentimentLabel
  templates: string[]
  empathyPrefix?: string
}

export const RESPONSE_TEMPLATES: ResponseTemplate[] = [
  {
    intent: 'greeting',
    sentiment: 'neutral',
    templates: [
      "Hello {{name}}! Welcome to Newmi Care. I'm here to help with any questions about your health. What can I assist you with today?",
      "Hi {{name}}! Thank you for reaching out to Newmi Care. We're a women's health clinic in Gurugram, and we'd love to understand how we can support you.",
      "Namaste {{name}}! This is Nivi from Newmi Care. Whether it's a consultation, treatment info, or just a question — I'm here to help. What brings you here?",
    ],
  },
  {
    intent: 'pricing',
    sentiment: 'neutral',
    templates: [
      "Thanks for asking about pricing, {{name}}. Our IVF packages typically range from ₹1.2L to ₹2.5L depending on the treatment plan. PCOS consultations start at ₹800–₹1,200, and our prenatal packages begin at ₹15,000–₹25,000. These are broad ranges — I can connect you with a coordinator who will share an exact quote based on your needs.",
      "I understand you'd like to know the costs, {{name}}. To give you a general idea — IVF treatment ranges from ₹1.2L to ₹2.5L, PCOS management consultations are ₹800–₹1,200, and comprehensive prenatal care starts at ₹15,000–₹25,000. For a custom quote, would you like me to have our coordinator reach out within 30 minutes?",
    ],
  },
  {
    intent: 'pricing',
    sentiment: 'frustrated',
    empathyPrefix: 'I completely understand that clear pricing matters. Let me give you the information upfront.',
    templates: [
      "I hear you, {{name}} — you deserve to know what things cost. Here's what we offer: IVF packages ₹1.2L–₹2.5L, PCOS consultation ₹800–₹1,200, prenatal packages ₹15,000–₹25,000. These depend on your specific needs. Our coordinator can give you an exact quote within 30 minutes — shall I connect you?",
      "You're right to ask directly, {{name}}. Let me be upfront: IVF starts from ₹1.2L and goes up to ₹2.5L, PCOS consults are ₹800–₹1,200, and our pregnancy packages are ₹15,000–₹25,000. Every case is different, which is why our coordinator provides a personalised quote. I can have them call you in the next 30 minutes.",
    ],
  },
  {
    intent: 'doctor_query',
    sentiment: 'neutral',
    templates: [
      "Great question, {{name}}. For this, I'd recommend {{doctorName}}, our {{doctorTitle}} with {{doctorExperience}} of experience. She's highly regarded in her field and would be a great fit for your needs. Would you like me to help you book a consultation with her?",
      "We have an excellent specialist for this, {{name}}. {{doctorName}} is our {{doctorTitle}} and has been practising for {{doctorExperience}}. Her patients appreciate her thorough, compassionate approach. I can check her availability if you'd like to book a session.",
    ],
  },
  {
    intent: 'booking',
    sentiment: 'neutral',
    templates: [
      "I'd be happy to help you book an appointment, {{name}}. Could you let me know your preferred date and time? I'll check availability and confirm your slot within 30 minutes.",
      "Let's get that booked for you, {{name}}. Do you have a preferred date and time in mind? Also, if you have a specific doctor you'd like to see, just let me know — otherwise I'll suggest the best specialist for your needs. I'll confirm your slot within 30 minutes.",
    ],
  },
  {
    intent: 'booking',
    sentiment: 'urgent',
    templates: [
      "I understand this is urgent, {{name}}. Let me check our earliest available slot for you — we may have an opening today or tomorrow. If you'd like, I can also connect you directly with our team for faster scheduling. What time works best for you?",
      "Noted, {{name}} — you need this soon. Let me prioritise this for you. We can offer you our earliest appointment, which may be today or tomorrow depending on availability. Could you tell me your preferred time window? I'll confirm within 30 minutes.",
    ],
  },
  {
    intent: 'medical_info',
    sentiment: 'neutral',
    templates: [
      "That's a good question, {{name}}. While I can share general information, every patient's situation is unique. I'd recommend a thorough in-person consultation where our specialist can understand your specific health needs and suggest the right approach. Would you like me to help you book an appointment?",
      "I appreciate you asking, {{name}} — it's important to be informed. In general, treatment plans are tailored after a full evaluation. Our specialists can explain all options and help you decide what's best. The best next step would be an in-person consultation. Shall I schedule one for you?",
    ],
  },
  {
    intent: 'emotional',
    sentiment: 'distressed',
    empathyPrefix: "I hear you, and I want you to know you're not alone in this.",
    templates: [
      "{{name}}, I'm really glad you reached out. What you're going through matters, and we're here to support you. I want to make sure you get the right care — would it help if I connected you with our medical team? They can provide the support you need.",
      "I can only imagine how you're feeling, {{name}}. Please know that our team is here for you. I'd like to connect you with a specialist who can give you the care and attention you deserve. Would that be okay?",
    ],
  },
  {
    intent: 'follow_up',
    sentiment: 'frustrated',
    templates: [
      "{{name}}, you're absolutely right to follow up, and I sincerely apologise that we haven't gotten back to you sooner. Let me make this right — I'll personally ensure someone from our team calls you within the next 20 minutes. Thank you for your patience.",
      "I'm sorry about this, {{name}}. You deserve a timely response, and we fell short. I'm taking ownership of this now — I'll have a team member call you within 20 minutes to address your query directly.",
    ],
  },
  {
    intent: 'feedback',
    sentiment: 'satisfied',
    templates: [
      "Thank you so much, {{name}}! That means a lot to us. We're always here whenever you need us — for a follow-up, a new question, or anything at all. Take care, and don't hesitate to reach out!",
      "I'm so glad we could help, {{name}}! Your health and comfort are what matter most to us. Feel free to reach out anytime — we're just a message away. Wishing you the very best!",
    ],
  },
  {
    intent: 'fallback',
    sentiment: 'neutral',
    templates: [
      "I want to make sure I help you correctly, {{name}}. Could you tell me a bit more about what you're looking for? Are you interested in a consultation, treatment information, or something else?",
      "I didn't quite catch that, {{name}} — my apologies! Could you share a little more detail so I can guide you to the right person or information?",
    ],
  },
]
