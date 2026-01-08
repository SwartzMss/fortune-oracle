import { create } from 'zustand'
import { submitChat, submitReadingInput } from '@/api/endpoints'
import { fixtureMessages } from '@/lib/fixtures'
import { uid } from '@/lib/utils'
import type { ChatRequest, Message, ReadingRequest } from '@/types/schema'
import { useInsightsStore } from './insights'
import { useSessionStore } from './session'

interface ChatState {
  messages: Message[]
  sending: boolean
  error?: string
  seed: () => void
  sendMessage: (text: string, opts?: { asInput?: boolean }) => Promise<void>
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: fixtureMessages,
  sending: false,
  error: undefined,
  seed: () => set({ messages: fixtureMessages }),
  sendMessage: async (text, opts = {}) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const sessionId = useSessionStore.getState().session?.id ?? 'demo-session'

    const userMessage: Message = {
      id: uid(),
      role: 'user',
      content: trimmed,
      createdAt: new Date().toISOString(),
    }

    const nextMessages: Message[] = [...get().messages, userMessage]

    set({ sending: true, error: undefined, messages: nextMessages })

    try {
      const readingPayload: ReadingRequest = { sessionId, input: { focus: trimmed } }
      const chatPayload: ChatRequest = { sessionId, message: trimmed }
      const response = opts.asInput
        ? await submitReadingInput(readingPayload)
        : await submitChat(chatPayload)

      set({ messages: response.messages, sending: false })
      useInsightsStore.getState().setFromResponse(response)
      if (!useSessionStore.getState().session) {
        useSessionStore.getState().setSession({ id: response.sessionId })
      }
    } catch (error) {
      console.error('send message failed', error)
      set({ sending: false, error: '发送失败，请稍后再试' })
    }
  },
}))
