import { create } from 'zustand'
import type { ToastItem, ToastType } from '@/lib/types'

interface ToastStore {
  toasts: ToastItem[]
  nextId: number
  addToast: (message: string, type: ToastType) => void
  removeToast: (id: number) => void
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  nextId: 1,
  addToast: (message: string, type: ToastType) => {
    const id = get().nextId
    set(state => ({ toasts: [...state.toasts, { id, message, type }], nextId: state.nextId + 1 }))
    setTimeout(() => {
      set(state => ({ toasts: state.toasts.map(t => t.id === id ? { ...t, exiting: true } : t) }))
      setTimeout(() => {
        set(state => ({ toasts: state.toasts.filter(t => t.id !== id) }))
      }, 200)
    }, 3000)
  },
  removeToast: (id: number) => {
    set(state => ({ toasts: state.toasts.filter(t => t.id !== id) }))
  },
}))
