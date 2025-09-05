import { ProductsResponseDTO } from "../products/ProductsResponseDTO";

export type CategoryStatsDTO = {
    categoryName: string;
    productCount: number;
}

export type DashboardResponseDTO = {
    totalProducts: number;
    totalStockValue: number;
    lowStockProducts: ProductsResponseDTO[];
    categoryStats: CategoryStatsDTO[];
}
