import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationComponentProps {
  currentPage: number
  onPageChange: (page: number) => void
}

export function PaginationComponent({ currentPage, onPageChange }: PaginationComponentProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
        
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => onPageChange(1)} className="cursor-pointer">
              1
            </PaginationLink>
          </PaginationItem>
        )}
        
        {currentPage > 2 && <PaginationEllipsis />}
        
        <PaginationItem>
          <PaginationLink isActive className="cursor-pointer">
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => onPageChange(currentPage + 1)}
            className="cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
