import { TableCell, TableRow } from "@/components/ui/table"
import { CategoryResponseDTO } from "@/types/categories/CategoryResponseDTO"

interface CategoriesListTableRowProps {
  category: CategoryResponseDTO
}

export default function CategoriesListTableRow({ category }: CategoriesListTableRowProps) {
  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell className="px-6 py-4 font-medium">{category.name}</TableCell>
      <TableCell className="px-6 py-4">{new Date(category.createdAt).toLocaleDateString()}</TableCell>
    </TableRow>
  )
}
