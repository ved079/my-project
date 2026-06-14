import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const teamMemberId = searchParams.get('teamMemberId')

  if (!teamMemberId) {
    return NextResponse.json({ error: 'teamMemberId is required' }, { status: 400 })
  }

  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekStart = new Date(todayStart.getTime() - 7 * 24 * 60 * 60 * 1000)

  // Leads assigned today
  const leadsAssignedToday = await db.lead.count({
    where: { assignedToId: teamMemberId, createdAt: { gte: todayStart } },
  })

  // Total active leads (not converted or lost)
  const pendingFollowUps = await db.lead.count({
    where: {
      assignedToId: teamMemberId,
      status: { in: ['New', 'Contacted'] },
    },
  })

  // Converted this week
  const convertedThisWeek = await db.lead.count({
    where: {
      assignedToId: teamMemberId,
      status: 'Converted',
      updatedAt: { gte: weekStart },
    },
  })

  // Average response time (time from inquiryTime to first status change from New to Contacted)
  const firstContacts = await db.statusChange.findMany({
    where: {
      teamMemberId,
      toStatus: 'Contacted',
      fromStatus: 'New',
    },
    include: { lead: { select: { inquiryTime: true } } },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })

  let avgResponseMin = 0
  if (firstContacts.length > 0) {
    const totalMinutes = firstContacts.reduce((acc, sc) => {
      const diff = (sc.createdAt.getTime() - sc.lead.inquiryTime.getTime()) / 60000
      return acc + Math.max(0, diff)
    }, 0)
    avgResponseMin = Math.round(totalMinutes / firstContacts.length)
  }

  // SLA breach count
  const slaBreaches = await db.lead.count({
    where: {
      assignedToId: teamMemberId,
      status: { in: ['New', 'Contacted'] },
      slaDeadline: { lt: now },
    },
  })

  // Total leads assigned
  const totalLeads = await db.lead.count({
    where: { assignedToId: teamMemberId },
  })

  // Conversion rate
  const totalConverted = await db.lead.count({
    where: { assignedToId: teamMemberId, status: 'Converted' },
  })

  const conversionRate = totalLeads > 0 ? ((totalConverted / totalLeads) * 100).toFixed(1) : '0'

  return NextResponse.json({
    leadsAssignedToday,
    pendingFollowUps,
    convertedThisWeek,
    avgResponseMin,
    slaBreaches,
    totalLeads,
    totalConverted,
    conversionRate,
  })
}
