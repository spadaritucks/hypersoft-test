import { vi } from 'vitest'

// Mock environment variables
process.env.NEXT_API_URL = 'http://localhost:5000/api'
process.env.NEXT_KEYCLOCK_URL = 'http://localhost:8080'
process.env.NEXT_KEYCLOCK_REALM = 'hypesoft'
process.env.NEXT_KEYCLOCK_CLIENT_ID = 'hypesoft-api'

// Mock Next.js cookies
vi.mock('next/headers', () => ({
  cookies: () => ({
    get: vi.fn().mockReturnValue({ value: 'mock-token' }),
    set: vi.fn()
  })
}))
