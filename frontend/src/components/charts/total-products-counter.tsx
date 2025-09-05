import { Box } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";

interface TotalProductsCounterProps {
    totalProducts?: number;
}

export default function TotalProductsCounter({totalProducts} : TotalProductsCounterProps) {

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center justify-center gap-2">
                    <Box color=" #7346f9 " />
                    <h2 className="font-bold">Total Products</h2>
                </div>
                <p>...</p>
            </CardHeader>
            <CardContent className="flex items-start">
                <span className="text-3xl font-bold">{totalProducts}</span>
            </CardContent>
        </Card>
    )
}