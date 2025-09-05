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
import { GetAllProductsService, SearchProductsService } from "@/services/ProductsService"
import { useQuery } from "@tanstack/react-query"
import ProductsListTableRow from "./products-list-table-row"
import ProductForm from "@/components/forms/product-form"
import { useModal } from "@/stores/modal-context"

export function ProductsListTable() {
  const [page, setPage] = useState(1)
  const [size] = useState(10)
  const [search, setSearch] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const { data: products } = useQuery({
    queryKey: ['products-list', page, size, searchTerm],
    queryFn: async () => {
      if (searchTerm) {
        return SearchProductsService(searchTerm)
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
          placeholder="Buscar produtos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="max-w-sm"
        />
        <Button onClick={handleSearch}>Buscar</Button>
        <Button variant="outline" onClick={handleClearSearch}>Limpar</Button>
      </div>


      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableCaption className="py-4">Lista de Produtos</TableCaption>
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="px-6 py-4 font-semibold">Nome</TableHead>
              <TableHead className="px-6 py-4 font-semibold">Descrição</TableHead>
              <TableHead className="px-6 py-4 font-semibold">Preço</TableHead>
              <TableHead className="px-6 py-4 font-semibold">Estoque</TableHead>
              <TableHead className="px-6 py-4 font-semibold">Categoria</TableHead>
              <TableHead className="px-6 py-4 font-semibold">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
             products && products?.length ? (
              products.map((product, index) => <ProductsListTableRow key={index} product={product} />)
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Nenhum produto encontrado</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>


      {!searchTerm && (
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
