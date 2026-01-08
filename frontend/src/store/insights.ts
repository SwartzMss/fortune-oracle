import { create } from 'zustand'
import { fixtureFacts, fixtureInsights } from '@/lib/fixtures'
import type { Facts, Insight, ReadingResponse } from '@/types/schema'

interface InsightsState {
  insights: Insight[]
  facts?: Facts
  loading: boolean
  hydrateFromMock: () => void
  setFromResponse: (response: ReadingResponse) => void
  clear: () => void
}

export const useInsightsStore = create<InsightsState>((set, get) => ({
  insights: [],
  facts: undefined,
  loading: false,
  hydrateFromMock: () => {
    if (get().insights.length) return
    set({ insights: fixtureInsights, facts: fixtureFacts })
  },
  setFromResponse: (response) => {
    set({
      insights: response.insights,
      facts: response.facts,
      loading: false,
    })
  },
  clear: () => set({ insights: [], facts: undefined }),
}))
