/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useState, useCallback, useEffect, useRef } from 'react'

export function AnimatedNumber({ value }: { value: string }) {
  const [display, setDisplay] = useState('0')
  const hasAnimated = useRef(false)

  const animate = useCallback((target: string) => {
    const prefix = target.match(/^[^0-9]*/)?.[0] || ''
    const suffix = target.match(/[^0-9]*$/)?.[0] || ''
    const numStr = target.replace(prefix, '').replace(suffix, '').replace(/,/g, '')
    const targetNum = parseFloat(numStr)
    if (isNaN(targetNum)) { setDisplay(target); return }

    const duration = 800
    const start = performance.now()
    const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const current = targetNum * ease(progress)
      const formatted = target.includes('.') ? current.toFixed(1) : Math.round(current).toLocaleString('en-IN')
      setDisplay(prefix + formatted + suffix)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [])

  useEffect(() => {
    if (!hasAnimated.current) {
      hasAnimated.current = true
      const timer = setTimeout(() => animate(value), 100)
      return () => clearTimeout(timer)
    } else {
      animate(value)
    }
  }, [value, animate])

  return <>{display}</>
}
