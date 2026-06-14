'use client'

import { CheckCircle, XCircle, Info } from 'lucide-react'
import type { ToastItem } from '@/lib/types'

export function ToastContainer({ toasts }: { toasts: ToastItem[] }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type} ${t.exiting ? 'toast-exit' : ''}`}>
          <span className="toast-icon">
            {t.type === 'success' && <CheckCircle size={18} />}
            {t.type === 'error' && <XCircle size={18} />}
            {t.type === 'info' && <Info size={18} />}
          </span>
          {t.message}
        </div>
      ))}
    </div>
  )
}
