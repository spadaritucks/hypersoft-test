using Hypesoft.Application.DTOs;
using MediatR;

namespace Hypesoft.Application.Commands;

public record CreateProductCommand(
    string Name,
    string Description,
    decimal Price,
    string CategoryId,
    int StockQuantity
) : IRequest<ProductDto>;
