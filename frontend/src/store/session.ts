import { create } from 'zustand'
import { createSession } from '@/api/endpoints'
import type { Session } from '@/types/schema'

interface SessionState {
  session?: Session
  loading: boolean
  error?: string
  init: () => Promise<void>
  setSession: (session: Session) => void
}

export const useSessionStore = create<SessionState>((set, get) => ({
  session: undefined,
  loading: false,
  error: undefined,
  setSession: (session) => set({ session }),
  init: async () => {
    if (get().session) return
    set({ loading: true, error: undefined })
    try {
      const session = await createSession()
      set({ session, loading: false })
    } catch (error) {
      console.error('create session failed', error)
      set({ loading: false, error: '无法创建会话，请稍后再试' })
    }
  },
}))
