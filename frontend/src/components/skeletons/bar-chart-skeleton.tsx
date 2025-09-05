import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function BarChartSkeleton() {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Products by Category</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full flex items-end justify-between gap-2 px-4">
                    <div className="flex flex-col items-center gap-2">
                        <Skeleton className="w-6 h-16" />
                        <Skeleton className="w-12 h-3" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Skeleton className="w-6 h-24" />
                        <Skeleton className="w-12 h-3" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Skeleton className="w-6 h-12" />
                        <Skeleton className="w-12 h-3" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Skeleton className="w-6 h-20" />
                        <Skeleton className="w-12 h-3" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
