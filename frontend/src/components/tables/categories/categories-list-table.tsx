"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { GetAllCategoriesService } from "@/services/CategoryService"
import { useQuery } from "@tanstack/react-query"
import { useModal } from "@/stores/modal-context"
import CategoryForm from "@/components/forms/category-form"
import CategoriesListTableRow from "./categories-list-table-row"
import CategoryTableRowSkeleton from "@/components/skeletons/category-table-row-skeleton"


export function CategoriesListTable() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories-list'],
    queryFn:  async () => GetAllCategoriesService()
  })

  const { openModal } = useModal()

  return (
    <div className="space-y-6 p-6 w-full flex flex-col">
      <div className="flex items-center justify-between w-full">
        <h2 className="font-bold text-2xl">Categories Management</h2>
        <Button variant="default" onClick={() => openModal(
          "Add Category", 
          <CategoryForm />
        )}>Add Category</Button>
      </div>

      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableCaption className="py-4">Categories List</TableCaption>
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="px-6 py-4 font-semibold">Name</TableHead>
              <TableHead className="px-6 py-4 font-semibold">Created Date</TableHead>
              <TableHead className="px-6 py-4 font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <CategoryTableRowSkeleton key={index} />
              ))
            ) : categories?.length ? (
              categories.map((category, index) => (
                <CategoriesListTableRow key={index} category={category} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                  No categories found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
