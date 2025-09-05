import { TableCell, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { CategoryResponseDTO } from "@/types/categories/CategoryResponseDTO"
import { DeleteCategoryService } from "@/services/CategoryService"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useModal } from "@/stores/modal-context"

interface CategoriesListTableRowProps {
  category: CategoryResponseDTO
}

export default function CategoriesListTableRow({ category }: CategoriesListTableRowProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const queryClient = useQueryClient()
  const { openModal, hideModal } = useModal()

  async function handleDelete() {
    try {
      setIsDeleting(true)
      await DeleteCategoryService(category.id)
      queryClient.invalidateQueries({ queryKey: ['categories-list'] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] })
      hideModal()
    } catch (error: any) {
      alert("Erro ao deletar categoria: " + error.message)
    } finally {
      setIsDeleting(false)
    }
  }

  function openDeleteModal() {
    openModal(
      "Confirmar Exclusão",
      <div className="space-y-4">
        <p>Tem certeza que deseja deletar a categoria <strong>"{category.name}"</strong>?</p>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={hideModal}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deletando..." : "Deletar"}
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
