'use client'
import { useQuery } from "@tanstack/react-query";

import { GetDashboardService } from "@/services/DashboardService";
import TotalProductsCounter from "../charts/total-products-counter";
import LowStockProductCounter from "../charts/low-stock-product-counter";
import { BarChartComponent } from "../charts/bar-chart";
import TotalStocksCounter from "../charts/total-stock-counter";

export default function Summary() {
    const { data: dashboard } = useQuery({
        queryKey: ['summary'],
        queryFn: async () => GetDashboardService()
    })

    return (
        <div className="flex flex-col gap-6 w-full h-auto p-6">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                <TotalProductsCounter totalProducts={dashboard?.totalProducts || 0} />
                <LowStockProductCounter lowStockProductsLength={dashboard?.lowStockProducts?.length || 0} />
                <TotalStocksCounter totalStocks={dashboard?.totalStockValue || 0} />
            </div>
            <div className="w-full ">
                <BarChartComponent data={dashboard?.categoryStats}/>
            </div>
        </div>
    )
}
