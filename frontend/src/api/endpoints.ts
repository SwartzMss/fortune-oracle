import { apiClient, useMockApi } from './client'
import { mockChat, mockCreateSession, mockSubmitReadingInput } from './mock'
import type { ChatRequest, ReadingRequest, ReadingResponse, Session } from '@/types/schema'

export const createSession = async (): Promise<Session> => {
  if (useMockApi) return mockCreateSession()
  const res = await apiClient.post('api/session').json<Session>()
  return res
}

export const submitReadingInput = async (
  payload: ReadingRequest,
): Promise<ReadingResponse> => {
  if (useMockApi) return mockSubmitReadingInput(payload)
  const res = await apiClient.post('api/reading/input', { json: payload }).json<ReadingResponse>()
  return res
}

export const submitChat = async (payload: ChatRequest): Promise<ReadingResponse> => {
  if (useMockApi) return mockChat(payload)
  const res = await apiClient.post('api/chat', { json: payload }).json<ReadingResponse>()
  return res
}
