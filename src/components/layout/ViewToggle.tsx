'use client'

import { Shield, Users } from 'lucide-react'
import type { ViewMode } from '@/lib/types'

export function ViewToggle({ viewMode, onViewChange }: { viewMode: ViewMode; onViewChange: (v: ViewMode) => void }) {
  return (
    <div className="view-toggle">
      <button className={`view-toggle-btn ${viewMode === 'admin' ? 'active' : ''}`} onClick={() => onViewChange('admin')}>
        <Shield size={13} />
        Admin
      </button>
      <button className={`view-toggle-btn ${viewMode === 'riya' ? 'active' : ''}`} onClick={() => onViewChange('riya')}>
        <Users size={13} />
        Riya
      </button>
    </div>
  )
}
