import { ProductsResponseDTO } from "@/types/products/ProductsResponseDTO"
import { TableCell, TableRow } from "../../ui/table"

interface ProductsListTableRowProps {
    product: ProductsResponseDTO
}

export default function ProductsListTableRow({ product }: ProductsListTableRowProps) {

    return (
        <TableRow key={product.id} className="hover:bg-muted/50">
            <TableCell className="px-6 py-4 font-medium">{product.name}</TableCell>
            <TableCell className="px-6 py-4">{product.description}</TableCell>
            <TableCell className="px-6 py-4">R$ {product.price.toFixed(2)}</TableCell>
            <TableCell className="px-6 py-4">{product.stockQuantity}</TableCell>
        </TableRow>
    )
}