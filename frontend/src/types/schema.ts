export type MessageRole = 'user' | 'assistant' | 'system'

export interface Message {
  id: string
  role: MessageRole
  content: string
  createdAt?: string
}

export interface RuleSource {
  book?: string
  ref?: string
  author?: string
}

export interface RuleRef {
  ruleId: string
  statement?: string
  source?: RuleSource
  version?: string
}

export interface Insight {
  id: string
  title: string
  summary: string
  category?: string
  tags?: string[]
  ruleRefs: RuleRef[]
}

export interface FiveElements {
  wood: number
  fire: number
  earth: number
  metal: number
  water: number
}

export type TenGods = Record<string, number>

export interface Facts {
  fiveElements?: FiveElements
  tenGods?: TenGods
  relations?: string[]
  dayMaster?: string
  strength?: string
}

export interface Session {
  id: string
  createdAt?: string
}

export interface UserInput {
  name?: string
  birthDate?: string
  birthTime?: string
  timezone?: string
  location?: string
  focus?: string
}

export interface ReadingRequest {
  sessionId: string
  input: UserInput
}

export interface ChatRequest {
  sessionId: string
  message: string
}

export interface ReadingResponse {
  sessionId: string
  messages: Message[]
  insights: Insight[]
  facts?: Facts
}

export interface ApiError {
  message: string
  code?: string
}
