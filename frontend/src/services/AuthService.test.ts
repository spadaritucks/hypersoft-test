/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AuthService } from './AuthService'

// Mock fetch
global.fetch = vi.fn()

// Mock cookies
vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    set: vi.fn()
  }))
}))

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns auth response on successful login', async () => {
    const mockResponse = {
      access_token: 'token123',
      refresh_token: 'refresh123',
      expires_in: 3600
    }

    ;(fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    const authData = { username: 'test', password: 'pass' }
    const result = await AuthService(authData)

    expect(result).toEqual(mockResponse)
  })

  it('throws error on failed authentication', async () => {
    ;(fetch as any).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: 'Invalid credentials' })
    })

    const authData = { username: 'test', password: 'wrong' }
    
    await expect(AuthService(authData)).rejects.toThrow('Invalid credentials')
  })
})
