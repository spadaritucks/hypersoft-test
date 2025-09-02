using FluentAssertions;
using Hypesoft.Domain.Entities;
using Xunit;

namespace Hypesoft.Tests.Domain;

public class ProductTests
{
    [Fact]
    public void IsLowStock_WhenQuantityLessThan10_ShouldReturnTrue()
    {
        // Arrange
        var product = new Product { StockQuantity = 5 };

        // Act
        var result = product.IsLowStock();

        // Assert
        result.Should().BeTrue();
    }

    [Fact]
    public void IsLowStock_WhenQuantityGreaterOrEqual10_ShouldReturnFalse()
    {
        // Arrange
        var product = new Product { StockQuantity = 15 };

        // Act
        var result = product.IsLowStock();

        // Assert
        result.Should().BeFalse();
    }
}
