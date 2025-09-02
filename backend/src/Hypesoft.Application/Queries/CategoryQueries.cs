using Hypesoft.Application.DTOs;
using MediatR;

namespace Hypesoft.Application.Queries;

public record GetAllCategoriesQuery : IRequest<IEnumerable<CategoryDto>>;
public record GetCategoryByIdQuery(string Id) : IRequest<CategoryDto?>;
public record GetDashboardQuery : IRequest<DashboardDto>;
