/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GetAllProductsService, CreateProductsService, GetProductsByCategoryService } from './ProductsService'

// Mock fetch
global.fetch = vi.fn()

// Mock getAccessToken
vi.mock('../utils/getAccessToken', () => ({
  getAccessToken: vi.fn().mockResolvedValue('mock-token')
}))

describe('ProductsService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GetAllProductsService', () => {
    it('returns products list', async () => {
      const mockProducts = [{ id: '1', name: 'Product 1' }]
      
      ;(fetch as any).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockProducts)
      })

      const result = await GetAllProductsService(1, 10)
      expect(result).toEqual(mockProducts)
    })

    it('throws error on failed request', async () => {
      ;(fetch as any).mockResolvedValue({ ok: false })

      await expect(GetAllProductsService(1, 10)).rejects.toThrow()
    })
  })

  describe('CreateProductService', () => {
    it('returns created product', async () => {
      const mockProduct = { id: '1', name: 'New Product' }
      const productData = { name: 'New Product', price: 100 }

      ;(fetch as any).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockProduct)
      })

      const result = await CreateProductsService(productData as any)
      expect(result).toEqual(mockProduct)
    })
  })

  describe('GetProductsByCategoryService', () => {
    it('returns products by category', async () => {
      const mockProducts = [{ id: '1', categoryId: 'cat1' }]

      ;(fetch as any).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockProducts)
      })

      const result = await GetProductsByCategoryService('cat1')
      expect(result).toEqual(mockProducts)
    })
  })
})
