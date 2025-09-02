using MediatR;

namespace Hypesoft.Application.Commands;

public record DeleteProductCommand(string Id) : IRequest;
