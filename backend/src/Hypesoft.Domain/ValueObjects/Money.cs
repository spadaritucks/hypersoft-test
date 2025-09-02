namespace Hypesoft.Domain.ValueObjects;

public record Money(decimal Amount, string Currency = "USD")
{
    public static Money Zero => new(0);
    
    public static Money operator +(Money left, Money right)
    {
        if (left.Currency != right.Currency)
            throw new InvalidOperationException("Cannot add different currencies");
        
        return new Money(left.Amount + right.Amount, left.Currency);
    }
}
