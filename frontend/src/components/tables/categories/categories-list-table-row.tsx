import { TableCell, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { CategoryResponseDTO } from "@/types/categories/CategoryResponseDTO"
import { DeleteCategoryService } from "@/services/CategoryService"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useModal } from "@/stores/modal-context"
import { useToast } from "@/hooks/use-toast"

interface CategoriesListTableRowProps {
  category: CategoryResponseDTO
}

export default function CategoriesListTableRow({ category }: CategoriesListTableRowProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const queryClient = useQueryClient()
  const { openModal, hideModal } = useModal()
  const { toast } = useToast()

  async function handleDelete() {
    try {
      setIsDeleting(true)
      await DeleteCategoryService(category.id)
      queryClient.invalidateQueries({ queryKey: ['categories-list'] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] })
      hideModal()
      toast({
        title: "Success",
        description: "Category deleted successfully",
      })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  function openDeleteModal() {
    openModal(
      "Confirm Deletion",
      <div className="space-y-4">
        <p>Are you sure you want to delete the category <strong>"{category.name}"</strong>?</p>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={hideModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            Delete
          </Button>
        </div>
      </div>
    )
  }

  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell className="px-6 py-4 font-medium">{category.name}</TableCell>
      <TableCell className="px-6 py-4">{new Date(category.createdAt).toLocaleDateString()}</TableCell>
      <TableCell className="px-6 py-4">
        <Button 
          variant="destructive" 
          size="sm"
          onClick={openDeleteModal}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  )
}
