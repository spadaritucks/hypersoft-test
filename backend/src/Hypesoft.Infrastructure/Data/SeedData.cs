using Hypesoft.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Hypesoft.Infrastructure.Data;

public static class SeedData
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        if (await context.Categories.AnyAsync()) return;

        var categories = new[]
        {
            new Category { Id = Guid.NewGuid().ToString(), Name = "Electronics" },
            new Category { Id = Guid.NewGuid().ToString(), Name = "Clothing" },
            new Category { Id = Guid.NewGuid().ToString(), Name = "Books" }
        };

        await context.Categories.AddRangeAsync(categories);

        var products = new[]
        {
            new Product { Id = "prod1", Name = "Laptop", Description = "Gaming laptop", Price = 1299.99m, CategoryId = "cat1", StockQuantity = 5 },
            new Product { Id = "prod2", Name = "T-Shirt", Description = "Cotton t-shirt", Price = 29.99m, CategoryId = "cat2", StockQuantity = 15 },
            new Product { Id = "prod3", Name = "Programming Book", Description = "Learn C#", Price = 49.99m, CategoryId = "cat3", StockQuantity = 8 },
            new Product { Id = "prod4", Name = "Mouse", Description = "Wireless mouse", Price = 39.99m, CategoryId = "cat1", StockQuantity = 3 }
        };

        await context.Products.AddRangeAsync(products);
        await context.SaveChangesAsync();
    }
}
