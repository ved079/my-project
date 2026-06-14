import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const message = await db.niviMessage.create({
      data: {
        conversationId: id,
        from: body.from || 'patient',
        text: body.text,
        confidence: body.confidence || null,
        intent: body.intent || null,
        sentiment: body.sentiment || null,
      },
    })
    await db.niviConversation.update({
      where: { id },
      data: { lastActivity: new Date(), unreadCount: { increment: body.from === 'patient' ? 1 : 0 } },
    })
    return NextResponse.json(message)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
