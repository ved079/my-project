import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const teamMemberId = searchParams.get('teamMemberId')
  const status = searchParams.get('status')
  const source = searchParams.get('source')
  const service = searchParams.get('service')

  if (!teamMemberId) {
    return NextResponse.json({ error: 'teamMemberId is required' }, { status: 400 })
  }

  const where: Record<string, unknown> = { assignedToId: teamMemberId }
  if (status && status !== 'All') where.status = status
  if (source && source !== 'All') where.source = source
  if (service && service !== 'All') where.service = service

  const leads = await db.lead.findMany({
    where,
    include: {
      client: { select: { name: true, slaMinutes: true } },
      notes: { orderBy: { createdAt: 'desc' } },
      statusHistory: { orderBy: { createdAt: 'desc' } },
    },
    orderBy: { slaDeadline: 'asc' },
  })

  return NextResponse.json(leads)
}

export async function PATCH(request: Request) {
  const body = await request.json()
  const { id, status, flaggedAs, teamMemberId } = body

  if (!id) return NextResponse.json({ error: 'Lead id is required' }, { status: 400 })

  const existing = await db.lead.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: 'Lead not found' }, { status: 404 })

  const updateData: Record<string, unknown> = {}
  if (status) updateData.status = status
  if (flaggedAs !== undefined) updateData.flaggedAs = flaggedAs

  const updated = await db.lead.update({
    where: { id },
    data: updateData,
  })

  if (status && status !== existing.status && teamMemberId) {
    await db.statusChange.create({
      data: { leadId: id, teamMemberId, fromStatus: existing.status, toStatus: status },
    })
    await db.activityLog.create({
      data: { teamMemberId, leadId: id, action: 'status_change', detail: `Updated ${existing.name} to "${status}"` },
    })
  }

  if (flaggedAs && teamMemberId) {
    await db.activityLog.create({
      data: { teamMemberId, leadId: id, action: 'flag_added', detail: `Flagged ${existing.name} as "${flaggedAs}"` },
    })
  }

  return NextResponse.json(updated)
}
