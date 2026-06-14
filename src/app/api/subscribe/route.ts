import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    const existing = await db.subscriber.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ message: 'Already subscribed' }, { status: 200 })
    }
    await db.subscriber.create({ data: { email } })
    return NextResponse.json({ message: 'Subscribed' }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
