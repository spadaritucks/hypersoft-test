import { ProductsResponseDTO } from "@/types/products/ProductsResponseDTO"
import { TableCell, TableRow } from "../../ui/table"
import { Button } from "../../ui/button"
import { Trash2 } from "lucide-react"
import { DeleteProductService } from "@/services/ProductsService"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useModal } from "@/stores/modal-context"

interface ProductsListTableRowProps {
    product: ProductsResponseDTO
}

export default function ProductsListTableRow({ product }: ProductsListTableRowProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const queryClient = useQueryClient()
    const { openModal, hideModal } = useModal()

    async function handleDelete() {
        try {
            setIsDeleting(true)
            await DeleteProductService(product.id)
            queryClient.invalidateQueries({ queryKey: ['products-list'] })
            queryClient.invalidateQueries({ queryKey: ['summary'] })
            hideModal()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            alert("Erro ao deletar produto: " + error.message)
        } finally {
            setIsDeleting(false)
        }
    }

    function openDeleteModal() {
        openModal(
            "Confirmar Exclusão",
            <div className="space-y-4">
                <p>Tem certeza que deseja deletar o produto <strong>{product.name}</strong>?</p>
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
        <TableRow key={product.id} className="hover:bg-muted/50">
            <TableCell className="px-6 py-4 font-medium">{product.name}</TableCell>
            <TableCell className="px-6 py-4">{product.description}</TableCell>
            <TableCell className="px-6 py-4">R$ {product.price.toFixed(2)}</TableCell>
            <TableCell className="px-6 py-4">{product.stockQuantity}</TableCell>
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
