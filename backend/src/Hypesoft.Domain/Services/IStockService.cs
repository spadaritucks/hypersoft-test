using Hypesoft.Domain.Entities;

namespace Hypesoft.Domain.Services;

public interface IStockService
{
    bool IsLowStock(Product product);
    void UpdateStock(Product product, int newQuantity);
}

public class StockService : IStockService
{
    public bool IsLowStock(Product product) => product.StockQuantity < 10;

    public void UpdateStock(Product product, int newQuantity)
    {
        if (newQuantity < 0) throw new ArgumentException("Stock quantity cannot be negative");
        product.StockQuantity = newQuantity;
        product.UpdatedAt = DateTime.UtcNow;
    }
}
