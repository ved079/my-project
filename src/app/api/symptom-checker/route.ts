import { NextResponse } from 'next/server'

const SYMPTOM_MAP: Record<string, { condition: string; carePlan: string; urgency: string; recommendation: string }> = {
  'irregular periods': { condition: 'Irregular Menstrual Cycle', carePlan: 'PCOS/PCOD', urgency: 'routine', recommendation: 'Track your cycle and consult a gynecologist for hormone evaluation.' },
  'heavy bleeding': { condition: 'Menorrhagia', carePlan: 'PCOS/PCOD', urgency: 'soon', recommendation: 'Schedule a consultation within this week for evaluation.' },
  'missed period': { condition: 'Amenorrhea', carePlan: 'PCOS/PCOD', urgency: 'routine', recommendation: 'Could be pregnancy, stress, or hormonal imbalance. Consult for evaluation.' },
  'weight gain': { condition: 'Unexplained Weight Gain', carePlan: 'Weight Management', urgency: 'routine', recommendation: 'Often linked to hormonal changes. Our weight management plan can help.' },
  'acne': { condition: 'Hormonal Acne', carePlan: 'PCOS/PCOD', urgency: 'routine', recommendation: 'Hormonal acne is common in PCOS. Consult our dermatology partner.' },
  'hair loss': { condition: 'Hair Thinning', carePlan: 'PCOS/PCOD', urgency: 'routine', recommendation: 'Can be linked to hormonal imbalance or nutrition. Get evaluated.' },
  'facial hair': { condition: 'Hirsutism', carePlan: 'PCOS/PCOD', urgency: 'routine', recommendation: 'Excess facial hair is a common PCOS symptom. Consult for treatment.' },
  'infertility': { condition: 'Difficulty Conceiving', carePlan: 'Fertility', urgency: 'soon', recommendation: 'Our fertility specialists can help. Book a consultation soon.' },
  'trying to conceive': { condition: 'Preconception', carePlan: 'Fertility', urgency: 'routine', recommendation: 'Start with a preconception health assessment for best outcomes.' },
  'miscarriage': { condition: 'Recurrent Pregnancy Loss', carePlan: 'Fertility', urgency: 'urgent', recommendation: 'Please consult immediately. Our fertility team can provide specialized care.' },
  'pregnancy symptoms': { condition: 'Early Pregnancy', carePlan: 'Pregnancy', urgency: 'soon', recommendation: 'Confirm pregnancy and start prenatal care within the first trimester.' },
  'morning sickness': { condition: 'Nausea in Pregnancy', carePlan: 'Pregnancy', urgency: 'routine', recommendation: 'Stay hydrated and eat small meals. Consult if severe.' },
  'abdominal pain': { condition: 'Pelvic Pain', carePlan: 'General', urgency: 'urgent', recommendation: 'Please consult immediately. Pelvic pain needs urgent evaluation.' },
  'pelvic pain': { condition: 'Pelvic Pain', carePlan: 'General', urgency: 'urgent', recommendation: 'Please seek medical attention for proper diagnosis.' },
  'mood swings': { condition: 'Mood Changes', carePlan: 'Mental Health', urgency: 'routine', recommendation: 'Hormonal changes can affect mood. Our mental health plan offers support.' },
  'anxiety': { condition: 'Anxiety', carePlan: 'Mental Health', urgency: 'soon', recommendation: 'You don\'t have to face this alone. Consult a mental health specialist.' },
  'depression': { condition: 'Depression', carePlan: 'Mental Health', urgency: 'urgent', recommendation: 'Please reach out to a mental health professional today. We are here for you.' },
  'insomnia': { condition: 'Sleep Issues', carePlan: 'Mental Health', urgency: 'routine', recommendation: 'Sleep issues are common. Our wellness programs can help improve sleep.' },
  'hot flashes': { condition: 'Hot Flashes', carePlan: 'Menopause', urgency: 'routine', recommendation: 'Common during perimenopause. Our menopause plan offers relief options.' },
  'night sweats': { condition: 'Night Sweats', carePlan: 'Menopause', urgency: 'routine', recommendation: 'Can disrupt sleep. Consult about hormone therapy options.' },
  'vaginal dryness': { condition: 'Vaginal Dryness', carePlan: 'Menopause', urgency: 'routine', recommendation: 'Very common in menopause. Treatment options are available.' },
  'low libido': { condition: 'Low Sex Drive', carePlan: 'Menopause', urgency: 'routine', recommendation: 'Can be hormonal. Consult for assessment and treatment options.' },
  'breast pain': { condition: 'Mastalgia', carePlan: 'General', urgency: 'soon', recommendation: 'Get evaluated. Could be hormonal or require further investigation.' },
  'breast lump': { condition: 'Breast Lump', carePlan: 'Cancer Support', urgency: 'urgent', recommendation: 'Please consult immediately. Early detection is key.' },
  'discharge': { condition: 'Abnormal Discharge', carePlan: 'General', urgency: 'soon', recommendation: 'Could indicate infection. Consult for proper diagnosis.' },
  'burning urination': { condition: 'UTI', carePlan: 'General', urgency: 'soon', recommendation: 'Likely a urinary tract infection. Consult for antibiotics.' },
  'frequent urination': { condition: 'Frequent Urination', carePlan: 'General', urgency: 'routine', recommendation: 'Could be UTI, diabetes, or hormonal. Get evaluated.' },
  'bloating': { condition: 'Bloating', carePlan: 'PCOS/PCOD', urgency: 'routine', recommendation: 'Common in PCOS. Dietary changes and consultation can help.' },
  'fatigue': { condition: 'Chronic Fatigue', carePlan: 'General', urgency: 'routine', recommendation: 'Many causes including hormonal. Get a comprehensive checkup.' },
  'headaches': { condition: 'Headaches', carePlan: 'Mental Health', urgency: 'routine', recommendation: 'Could be tension, hormonal, or migraine. Track triggers.' },
  'back pain': { condition: 'Back Pain', carePlan: 'Pregnancy', urgency: 'routine', recommendation: 'Common in pregnancy. Gentle exercise and proper posture help.' },
}

export async function POST(request: Request) {
  try {
    const { symptoms, age, additionalInfo } = await request.json()
    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return NextResponse.json({ error: 'Please describe at least one symptom' }, { status: 400 })
    }

    const symptomText = symptoms.join(' ').toLowerCase()
    const matched: Array<{ keyword: string; result: typeof SYMPTOM_MAP[string] }> = []
    for (const [keyword, result] of Object.entries(SYMPTOM_MAP)) {
      if (symptomText.includes(keyword)) {
        matched.push({ keyword, result })
      }
    }

    const deduped = matched.filter((m, i, a) => a.findIndex(x => x.result.condition === m.result.condition) === i)
    const hasUrgent = deduped.some(m => m.result.urgency === 'urgent')
    const topResult = deduped[0]?.result || { condition: 'General Health', carePlan: 'General Consultation', urgency: 'routine', recommendation: 'Book a general health consultation for personalized advice.' }

    return NextResponse.json({
      possibleCondition: topResult.condition,
      recommendedCarePlan: topResult.carePlan,
      urgency: topResult.urgency,
      recommendation: topResult.recommendation,
      matches: deduped.map(m => ({ symptom: m.keyword, condition: m.result.condition })),
      matchedCount: deduped.length,
      urgent: hasUrgent,
      disclaimer: 'This is not a medical diagnosis. Always consult with a qualified healthcare provider.',
    })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
