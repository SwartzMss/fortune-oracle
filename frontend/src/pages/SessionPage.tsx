import { useEffect } from 'react'
import ChatStream from '@/components/chat/ChatStream'
import InputBar from '@/components/chat/InputBar'
import InsightPanel from '@/components/insights/InsightPanel'
import { useChatStore } from '@/store/chat'
import { useInsightsStore } from '@/store/insights'
import { useSessionStore } from '@/store/session'

export default function SessionPage() {
  const { messages, sending, sendMessage } = useChatStore()
  const { insights, facts } = useInsightsStore()
  const { session, loading: sessionLoading } = useSessionStore()

  useEffect(() => {
    useSessionStore.getState().init()
    useInsightsStore.getState().hydrateFromMock()
  }, [])

  const handleSend = (value: string) => {
    const asInput = insights.length === 0
    void sendMessage(value, { asInput })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-4 shadow-card">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-neutral-100">对话流</p>
              <p className="text-xs text-neutral-400">结构化输入 → 确定性引擎 → 规则命中 → LLM 转译</p>
            </div>
            <div className="rounded-full border border-neutral-800 px-3 py-1 text-[11px] text-neutral-400">
              Session: {session?.id ?? '创建中…'}
            </div>
          </div>
          {sessionLoading ? (
            <p className="mt-3 text-sm text-neutral-400">正在创建会话…</p>
          ) : null}
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-4 shadow-card">
          <ChatStream messages={messages} />
        </div>
        <InputBar onSend={handleSend} loading={sending} />
      </div>

      <InsightPanel insights={insights} facts={facts} />
    </div>
  )
}
