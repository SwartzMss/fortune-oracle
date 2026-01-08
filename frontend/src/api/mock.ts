import { fixtureFacts, fixtureInsights, fixtureMessages, fixtureSession } from '@/lib/fixtures'
import { sleep, uid } from '@/lib/utils'
import type { ChatRequest, Message, ReadingRequest, ReadingResponse, Session } from '@/types/schema'

const now = () => new Date().toISOString()

export const mockCreateSession = async (): Promise<Session> => {
  await sleep(120)
  return fixtureSession
}

export const mockSubmitReadingInput = async (
  payload: ReadingRequest,
): Promise<ReadingResponse> => {
  await sleep(280)
  const userMessage: Message = {
    id: uid(),
    role: 'user',
    content:
      payload.input.focus ??
      '（示例）关于今年的职业节奏与合作关系，请提供结构化观察。',
    createdAt: now(),
  }

  const assistant: Message = {
    id: uid(),
    role: 'assistant',
    content:
      '收到结构化输入，以下为基于规则的洞察草稿，包含可追溯的 rule_refs 与来源。',
    createdAt: now(),
  }

  return {
    sessionId: fixtureSession.id,
    messages: [...fixtureMessages, userMessage, assistant],
    insights: fixtureInsights,
    facts: fixtureFacts,
  }
}

export const mockChat = async (payload: ChatRequest): Promise<ReadingResponse> => {
  await sleep(220)
  const assistant: Message = {
    id: uid(),
    role: 'assistant',
    content:
      '基于当前结构与规则，建议先确认输入边界，再逐步推进。需要更多上下文可继续补充。',
    createdAt: now(),
  }

  const userMessage: Message = {
    id: uid(),
    role: 'user',
    content: payload.message,
    createdAt: now(),
  }

  return {
    sessionId: payload.sessionId || fixtureSession.id,
    messages: [...fixtureMessages, userMessage, assistant],
    insights: fixtureInsights,
    facts: fixtureFacts,
  }
}
