import { Box } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface TotalStocksCounterProps {
    totalStocks?: number;
}

export default function TotalStocksCounter({totalStocks} : TotalStocksCounterProps) {

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center justify-center gap-2">
                    <Box color=" #7346f9 " />
                    <h2 className="font-bold">Total Stocks</h2>
                </div>
                <p>...</p>
            </CardHeader>
            <CardContent className="flex items-start">
                <span className="text-3xl font-bold">{totalStocks}</span>
            </CardContent>
            <CardFooter>
                <div className="flex items-center justify-start gap-2">
                    <span className="bg-green-100 text-green-600 text-sm px-2 font-bold">+5 Stocks</span>
                    <span className="text-gray-400 text-sm">from last month</span>
                </div>
            </CardFooter>
        </Card>
    )
}