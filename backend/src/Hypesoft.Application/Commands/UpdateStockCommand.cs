using Hypesoft.Application.DTOs;
using MediatR;

namespace Hypesoft.Application.Commands;

public record UpdateStockCommand(string ProductId, int NewQuantity) : IRequest<ProductDto>;
