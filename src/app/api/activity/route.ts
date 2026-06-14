import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const teamMemberId = searchParams.get('teamMemberId')
  const limit = parseInt(searchParams.get('limit') || '20')

  if (!teamMemberId) {
    return NextResponse.json({ error: 'teamMemberId is required' }, { status: 400 })
  }

  const activity = await db.activityLog.findMany({
    where: { teamMemberId },
    include: { lead: { select: { name: true, id: true } } },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })

  return NextResponse.json(activity)
}
