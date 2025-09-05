/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GetAllCategoriesService, CreateCategoryService } from './CategoryService'

// Mock fetch
global.fetch = vi.fn()

// Mock getAccessToken
vi.mock('../utils/getAccessToken', () => ({
  getAccessToken: vi.fn().mockResolvedValue('mock-token')
}))

describe('CategoryService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GetAllCategoriesService', () => {
    it('returns categories list', async () => {
      const mockCategories = [{ id: '1', name: 'Category 1' }]
      
      ;(fetch as any).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockCategories)
      })

      const result = await GetAllCategoriesService()
      expect(result).toEqual(mockCategories)
    })

    it('throws error on failed request', async () => {
      ;(fetch as any).mockResolvedValue({ ok: false })

      await expect(GetAllCategoriesService()).rejects.toThrow()
    })
  })

  describe('CreateCategoryService', () => {
    it('returns created category', async () => {
      const mockCategory = { id: '1', name: 'New Category' }
      const categoryData = { name: 'New Category' }

      ;(fetch as any).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockCategory)
      })

      const result = await CreateCategoryService(categoryData as any)
      expect(result).toEqual(mockCategory)
    })
  })
})
