import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const conversations = await db.niviConversation.findMany({
      include: { messages: { orderBy: { createdAt: 'asc' } } },
      orderBy: { lastActivity: 'desc' },
    })
    return NextResponse.json(conversations)
  } catch {
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { patientName, patientPhone } = body
    const conversation = await db.niviConversation.create({
      data: {
        patientName: patientName || '',
        patientPhone: patientPhone || '',
        contextData: '{}',
        lastSuggestions: '[]',
      },
      include: { messages: true },
    })
    return NextResponse.json(conversation)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
