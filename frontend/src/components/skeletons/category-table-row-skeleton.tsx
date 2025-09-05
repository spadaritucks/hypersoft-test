import { TableCell, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export default function CategoryTableRowSkeleton() {
    return (
        <TableRow className="hover:bg-muted/50">
            <TableCell className="px-6 py-4">
                <Skeleton className="h-4 w-28" />
            </TableCell>
            <TableCell className="px-6 py-4">
                <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell className="px-6 py-4">
                <Skeleton className="h-8 w-8 rounded" />
            </TableCell>
        </TableRow>
    )
}
