namespace Hypesoft.Application.DTOs;

public record ProductDto(
    string Id,
    string Name,
    string Description,
    decimal Price,
    string CategoryId,
    string CategoryName,
    int StockQuantity,
    DateTime CreatedAt,
    DateTime UpdatedAt
);

public record CreateProductDto(
    string Name,
    string Description,
    decimal Price,
    string CategoryId,
    int StockQuantity
);

public record UpdateProductDto(
    string Name,
    string Description,
    decimal Price,
    string CategoryId,
    int StockQuantity
);
