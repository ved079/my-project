import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const { teamMemberId, content } = body

  if (!id || !teamMemberId || !content) {
    return NextResponse.json({ error: 'id, teamMemberId, and content are required' }, { status: 400 })
  }

  const note = await db.leadNote.create({
    data: { leadId: id, teamMemberId, content },
  })

  // Log activity
  const lead = await db.lead.findUnique({ where: { id }, select: { name: true } })
  if (lead) {
    await db.activityLog.create({
      data: {
        teamMemberId,
        leadId: id,
        action: 'note_added',
        detail: `Added note on ${lead.name}: "${content.substring(0, 50)}${content.length > 50 ? '...' : ''}"`,
      },
    })
  }

  return NextResponse.json(note)
}
