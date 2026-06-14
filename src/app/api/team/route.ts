import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const members = await db.teamMember.findMany({
    select: { id: true, name: true, email: true, role: true, initials: true },
  })
  return NextResponse.json(members)
}
