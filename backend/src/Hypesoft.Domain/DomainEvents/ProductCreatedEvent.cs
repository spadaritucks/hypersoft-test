namespace Hypesoft.Domain.DomainEvents;

public record ProductCreatedEvent(string ProductId, string Name, decimal Price) : IDomainEvent;
public record ProductStockUpdatedEvent(string ProductId, int OldQuantity, int NewQuantity) : IDomainEvent;

public interface IDomainEvent
{
    DateTime OccurredOn => DateTime.UtcNow;
}
