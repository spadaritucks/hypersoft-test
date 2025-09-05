/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GetDashboardService } from './DashboardService'

// Mock fetch
global.fetch = vi.fn()

// Mock getAccessToken
vi.mock('../utils/getAccessToken', () => ({
  getAccessToken: vi.fn().mockResolvedValue('mock-token')
}))

describe('DashboardService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns dashboard metrics', async () => {
    const mockMetrics = {
      totalProducts: 100,
      totalValue: 50000,
      lowStockProducts: 5
    }

    ;(fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockMetrics)
    })

    const result = await GetDashboardService()
    expect(result).toEqual(mockMetrics)
  })

  it('throws error on failed request', async () => {
    ;(fetch as any).mockResolvedValue({ ok: false })

    await expect(GetDashboardService()).rejects.toThrow()
  })
})
