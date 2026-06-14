'use client'

import { useState, useEffect } from 'react'

export function LiveTimer({ thresholdMinutes, elapsedMinutes }: { thresholdMinutes: number; elapsedMinutes: number }) {
  const [remaining, setRemaining] = useState(thresholdMinutes * 60 - elapsedMinutes * 60)

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(prev => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const isOverdue = remaining <= 0
  const pctLeft = thresholdMinutes > 0 ? (remaining / (thresholdMinutes * 60)) * 100 : 0
  const absRemaining = Math.abs(remaining)
  const mm = Math.floor(absRemaining / 60)
  const ss = absRemaining % 60
  const pad = (n: number) => n.toString().padStart(2, '0')

  let color = '#059669'
  let label = `${pad(mm)}:${pad(ss)} remaining`
  if (isOverdue) {
    color = '#EF4444'
    label = `${pad(mm)}:${pad(ss)} OVERDUE`
  } else if (pctLeft <= 25) {
    color = '#EF4444'
  } else if (pctLeft <= 50) {
    color = '#D97706'
  }

  return (
    <span style={{ fontWeight: 600, fontSize: '0.75rem', color }} className={isOverdue ? 'timer-pulse' : ''}>
      {label}
    </span>
  )
}
