'use client'

import { Shield, Users, LayoutTemplate } from 'lucide-react'
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
      <button className={`view-toggle-btn ${viewMode === 'landing' ? 'active' : ''}`} onClick={() => onViewChange('landing')}>
        <LayoutTemplate size={13} />
        Landing
      </button>
    </div>
  )
}
