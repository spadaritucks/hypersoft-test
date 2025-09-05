import { CircleAlert } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface LowStockProductCounterProps {
    lowStockProductsLength?: number;
}

export default function LowStockProductCounter({lowStockProductsLength} : LowStockProductCounterProps) {

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center justify-center gap-2">
                    <CircleAlert color="#7346f9" />
                    <h2 className="font-bold">Low Stock</h2>
                </div>
                <p>...</p>
            </CardHeader>
            <CardContent className="flex items-start">
                <div className="flex items-end w-full gap-1">
                    <span className="text-3xl font-bold">{lowStockProductsLength}</span>
                    <span className="text-sm text-gray-700 mb-[1px]">products</span>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex items-center justify-start gap-2">
                    <span className="bg-green-100 text-green-600 text-sm px-2 font-bold">+5 products</span>
                    <span className="text-gray-400 text-sm">from last month</span>
                </div>
            </CardFooter>
        </Card>
    )
}