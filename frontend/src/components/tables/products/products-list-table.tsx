"use client"
import { useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PaginationComponent } from "@/components/pagination/pagination-component"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GetAllProductsService, SearchProductsService, GetProductsByCategoryService } from "@/services/ProductsService"
import { GetAllCategoriesService } from "@/services/CategoryService"
import { useQuery } from "@tanstack/react-query"
import ProductsListTableRow from "./products-list-table-row"
import ProductForm from "@/components/forms/product-form"
import { useModal } from "@/stores/modal-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductTableRowSkeleton from "@/components/skeletons/product-table-row-skeleton"

export function ProductsListTable() {
  const [page, setPage] = useState(1)
  const [size] = useState(10)
  const [search, setSearch] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => GetAllCategoriesService()
  })

  const { data: products, isLoading } = useQuery({
    queryKey: ['products-list', page, size, searchTerm, selectedCategory],
    queryFn: async () => {
      if (searchTerm) {
        return SearchProductsService(searchTerm)
      }
      if (selectedCategory) {
        return GetProductsByCategoryService(selectedCategory)
      }
      return GetAllProductsService(page, size)
    }
  })

  function handleSearch() {
    setSearchTerm(search)
    setPage(1)
  }

  function handleClearSearch() {
    setSearch("")
    setSearchTerm("")
    setSelectedCategory("")
    setPage(1)
  }

  const {openModal} = useModal()

  return (

    <div className="space-y-6 p-6 w-full flex flex-col ">
      <div className="flex items-center justify-between w-full">
        <h2 className="font-bold text-2xl">Products Managerment</h2>
        <Button variant="default" onClick={() => openModal(
          "Add Product", 
          <ProductForm />
        )}>Add Product</Button>
      </div>

      <div className="flex gap-3 p-4 bg-muted/50 rounded-lg border">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="max-w-sm"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category, index) => (
              <SelectItem key={index} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleSearch}>Search</Button>
        <Button variant="outline" onClick={handleClearSearch}>Clear</Button>
      </div>


      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableCaption className="py-4">Products List</TableCaption>
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="px-6 py-4 font-semibold">Name</TableHead>
              <TableHead className="px-6 py-4 font-semibold">Description</TableHead>
              <TableHead className="px-6 py-4 font-semibold">Price</TableHead>
              <TableHead className="px-6 py-4 font-semibold">Stock</TableHead>
              <TableHead className="px-6 py-4 font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <ProductTableRowSkeleton key={index} />
              ))
            ) : products && products?.length ? (
              products.map((product, index) => <ProductsListTableRow key={index} product={product} />)
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No products found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>


      {!searchTerm && !selectedCategory && (
        <div className="flex justify-center pt-4">
          <PaginationComponent
            currentPage={page}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  )
}
