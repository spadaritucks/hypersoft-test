namespace Hypesoft.Application.DTOs;

public record DashboardDto(
    int TotalProducts,
    decimal TotalStockValue,
    IEnumerable<ProductDto> LowStockProducts,
    IEnumerable<CategoryStatsDto> CategoryStats
);

public record CategoryStatsDto(
    string CategoryName,
    int ProductCount
);
