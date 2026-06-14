import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'
import { db } from '@/lib/db'
import { detectSentiment, classifyIntent, shouldEscalateCheck, extractEntities, computeSuggestions } from '@/lib/nivi/engine'

const SYSTEM_PROMPT = `You are Nivi, a compassionate and knowledgeable AI assistant for Newmi Care, India's leading women's health platform based in Gurugram, Haryana.

Help women with inquiries about PCOS/PCOD, IVF, fertility, pregnancy, post-pregnancy care, menopause, and other women's health services.

Pricing: PCOS consultation ₹800-₹1,200 | IVF ₹1.2L-₹2.5L | Pregnancy ₹15K-₹25K | General ₹500-₹1,000.

Doctors: Dr. Priya Sharma (OB-GYN, 14yr), Dr. Anita Rao (Fertility, 11yr), Dr. Kavitha Menon (Reproductive Endocrinology, 9yr), Dr. Sneha Agarwal (Fetal Medicine, 8yr), Dr. Ritu Nair (Gynae Oncology, 16yr).

Clinics: Spaze Corporate Park, Sector 69 & Bestech Central Square Mall, Sector 57, Gurugram. Mon-Sat 9AM-7PM. Contact: +91-8929345355, care@newmi.in.

Rules: Escalate medical emergencies immediately. Never diagnose or prescribe. Keep responses to 2-3 sentences. Be warm and empathetic.`

export async function POST(req: NextRequest) {
  try {
    const { conversationId, message, patientName } = await req.json()
    if (!conversationId || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const sentiment = detectSentiment(message)
    const defaultContext = { intentHistory: [], mentionedServices: [], mentionedDoctors: [], emotionalState: sentiment, unresolvedCount: 0, turnCount: 1 }
    const intent = classifyIntent(message, defaultContext)
    const entities = extractEntities(message)
    const escalation = shouldEscalateCheck(message, intent, { ...defaultContext, intentHistory: [intent] })

    try {
      await db.niviMessage.create({
        data: { conversationId, from: 'patient', text: message, sentiment, intent, confidence: 'high' },
      })
      await db.niviConversation.update({
        where: { id: conversationId },
        data: { lastActivity: new Date(), unreadCount: { increment: 1 } },
      })
    } catch {
    }

    if (escalation.escalate && intent === 'complex') {
      const responseText = `I'm connecting you with our medical team right now. Please stay with us, ${patientName || 'there'}.`
      const suggestions = computeSuggestions(intent, escalation)
      try {
        await db.niviMessage.create({
          data: { conversationId, from: 'nivi', text: responseText, confidence: 'low', intent, sentiment },
        })
      } catch {
      }
      return NextResponse.json({
        text: responseText,
        confidence: 'low',
        suggestions,
        shouldEscalate: true,
        escalationReason: escalation.reason,
      })
    }

    const zai = await ZAI.create()
    const contextHint = `Current intent: ${intent}. Sentiment: ${sentiment}.${escalation.escalate ? ' ESCALATION: ' + escalation.reason : ''}`
    const patientHint = patientName ? `Patient's name: ${patientName}.` : ''

    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: `${SYSTEM_PROMPT}\n\n${patientHint}\n${contextHint}` },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 200,
    })

    const text = completion.choices[0]?.message?.content || "I'm here to help. Could you tell me more about what you're looking for?"
    const suggestions = computeSuggestions(intent, escalation)

    try {
      await db.niviMessage.create({
        data: { conversationId, from: 'nivi', text, confidence: 'high', intent, sentiment },
      })
      const lastSuggestions = JSON.stringify(suggestions)
      await db.niviConversation.update({
        where: { id: conversationId },
        data: { lastActivity: new Date(), lastSuggestions },
      })
    } catch {
    }

    return NextResponse.json({
      text,
      confidence: escalation.escalate ? 'low' : intent === 'fallback' ? 'medium' : 'high',
      suggestions,
      shouldEscalate: escalation.escalate,
      escalationReason: escalation.escalate ? escalation.reason : undefined,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error'
    console.error('Nivi chat error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
