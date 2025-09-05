import { ProductsResponseDTO } from "@/types/products/ProductsResponseDTO"
import { TableCell, TableRow } from "../../ui/table"
import { Button } from "../../ui/button"
import { Trash2, Edit } from "lucide-react"
import { DeleteProductService, UpdateProductStockService } from "@/services/ProductsService"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useModal } from "@/stores/modal-context"
import { Input } from "../../ui/input"
import { useToast } from "@/hooks/use-toast"

interface ProductsListTableRowProps {
    product: ProductsResponseDTO
}

export default function ProductsListTableRow({ product }: ProductsListTableRowProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [isUpdatingStock, setIsUpdatingStock] = useState(false)
    const queryClient = useQueryClient()
    const { openModal, hideModal } = useModal()
    const { toast } = useToast()

    async function handleDelete() {
        try {
            setIsDeleting(true)
            await DeleteProductService(product.id)
            queryClient.invalidateQueries({ queryKey: ['products-list'] })
            queryClient.invalidateQueries({ queryKey: ['summary'] })
            hideModal()
            toast({
                title: "Success",
                description: "Product deleted successfully",
            })

           
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
        } catch (error: any) {
            toast({
                title: "Error",
                description: "Failed to delete product",
                variant: "destructive",
            })
        } finally {
            setIsDeleting(false)
        }
    }

    async function handleUpdateStock(newQuantity: number) {
        try {
            setIsUpdatingStock(true)
            await UpdateProductStockService(product.id, newQuantity)
            queryClient.invalidateQueries({ queryKey: ['products-list'] })
            queryClient.invalidateQueries({ queryKey: ['summary'] })
            hideModal()
            toast({
                title: "Success",
                description: "Stock updated successfully",
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
        } catch (error: unknown) {
            toast({
                title: "Error",
                description: "Failed to update stock",
                variant: "destructive",
            })
        } finally {
            setIsUpdatingStock(false)
        }
    }

    function openDeleteModal() {
        openModal(
            "Confirm Deletion",
            <div className="space-y-4">
                <p>Are you sure you want to delete the product <strong>{product.name}</strong>?</p>
                <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={hideModal}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                </div>
            </div>
        )
    }

    function openStockModal() {
        let quantity = product.stockQuantity

        openModal(
            "Update Stock",
            <div className="space-y-4">
                <p>Update stock for product <strong>{product.name}</strong>?</p>
                <div className="space-y-2">
                    <label className="text-sm font-medium">New Quantity:</label>
                    <Input
                        type="number"
                        defaultValue={quantity}
                        onChange={(e) => quantity = Number(e.target.value)}
                        min="0"
                    />
                </div>
                <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={hideModal}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleUpdateStock(quantity)} disabled={isUpdatingStock}>
                        {isUpdatingStock ? "Updating..." : "Update"}
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
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={openStockModal}
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={openDeleteModal}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    )
}
