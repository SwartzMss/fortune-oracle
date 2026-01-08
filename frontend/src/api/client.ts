import ky from 'ky'

export const useMockApi = (import.meta.env.VITE_MOCK_API ?? 'true') !== 'false'

const prefixUrl = import.meta.env.VITE_API_BASE_URL ?? ''

export const apiClient = ky.create({
  prefixUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  retry: {
    limit: 1,
    methods: ['get', 'post'],
  },
})
