"use client"


import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { CategoryStatsDTO } from "@/types/dashboard/DashboardResponseDTO"



interface BarChartComponentProps {
    data?: CategoryStatsDTO[];
}

const chartConfig = {
    category: {
        label: "Products per Categories",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig


export function BarChartComponent({ data }: BarChartComponentProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Products by Category</CardTitle>

            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                    <BarChart 
                        accessibilityLayer 
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="categoryName"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            

                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="productCount" fill="#7346f9" radius={8} barSize={25} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

