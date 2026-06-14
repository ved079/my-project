import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const { status, unreadCount, lastSuggestions, contextData } = body
    const data: Record<string, unknown> = { lastActivity: new Date() }
    if (status !== undefined) data.status = status
    if (unreadCount !== undefined) data.unreadCount = unreadCount
    if (lastSuggestions !== undefined) data.lastSuggestions = JSON.stringify(lastSuggestions)
    if (contextData !== undefined) data.contextData = JSON.stringify(contextData)
    if (body.escalatedTo !== undefined) data.escalatedTo = body.escalatedTo
    if (body.escalatedAt !== undefined) data.escalatedAt = new Date(body.escalatedAt)
    if (body.escalationReason !== undefined) data.escalationReason = body.escalationReason
    const conversation = await db.niviConversation.update({ where: { id }, data })
    return NextResponse.json(conversation)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const conversation = await db.niviConversation.findUnique({
      where: { id },
      include: { messages: { orderBy: { createdAt: 'asc' } } },
    })
    if (!conversation) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(conversation)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
