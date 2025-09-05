using Hypesoft.Application.DTOs;
using MediatR;

namespace Hypesoft.Application.Queries;

public record GetProductByIdQuery(string Id) : IRequest<ProductDto?>;
public record GetAllProductsQuery(int Page = 1, int Size = 10) : IRequest<IEnumerable<ProductDto>>;
public record SearchProductsQuery(string Name) : IRequest<IEnumerable<ProductDto>>;
public record GetProductsByCategoryQuery(string CategoryId) : IRequest<IEnumerable<ProductDto>>;
public record GetLowStockProductsQuery : IRequest<IEnumerable<ProductDto>>;
