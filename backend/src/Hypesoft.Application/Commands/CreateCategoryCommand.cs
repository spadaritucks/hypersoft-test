using Hypesoft.Application.DTOs;
using MediatR;

namespace Hypesoft.Application.Commands;

public record CreateCategoryCommand(string Name) : IRequest<CategoryDto>;
public record DeleteCategoryCommand(string Id) : IRequest;
