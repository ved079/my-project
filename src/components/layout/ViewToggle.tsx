'use client'

import { useEffect, useState } from 'react'
import { Shield, Users, LayoutTemplate } from 'lucide-react'
import type { ViewMode } from '@/lib/types'

const STORAGE_KEY = 'newmi-view-toggle-seen'

export function ViewToggle({ viewMode, onViewChange }: { viewMode: ViewMode; onViewChange: (v: ViewMode) => void }) {
  const [isFirstTime, setIsFirstTime] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem(STORAGE_KEY)) {
      setIsFirstTime(true)
    }
  }, [])

  const handleClick = (v: ViewMode) => {
    if (isFirstTime) {
      setIsFirstTime(false)
      try { localStorage.setItem(STORAGE_KEY, 'true') } catch {}
    }
    onViewChange(v)
  }

  return (
    <div className={`view-toggle${isFirstTime ? ' view-toggle-first-time' : ''}`}>
      <button className={`view-toggle-btn ${viewMode === 'admin' ? 'active' : ''}`} onClick={() => handleClick('admin')}>
        <Shield size={13} />
        Admin
      </button>
      <button className={`view-toggle-btn ${viewMode === 'riya' ? 'active' : ''}`} onClick={() => handleClick('riya')}>
        <Users size={13} />
        Riya
      </button>
      <button className={`view-toggle-btn ${viewMode === 'landing' ? 'active' : ''}`} onClick={() => handleClick('landing')}>
        <LayoutTemplate size={13} />
        Landing
      </button>
    </div>
  )
}
