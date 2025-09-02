using AutoMapper;
using FluentAssertions;
using Hypesoft.Application.Commands;
using Hypesoft.Application.DTOs;
using Hypesoft.Application.Handlers;
using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using Moq;
using Xunit;

namespace Hypesoft.Tests.Application;

public class ProductHandlerTests
{
    private readonly Mock<IProductRepository> _mockRepository;
    private readonly Mock<IMapper> _mockMapper;

    public ProductHandlerTests()
    {
        _mockRepository = new Mock<IProductRepository>();
        _mockMapper = new Mock<IMapper>();
    }

    [Fact]
    public async Task CreateProductCommandHandler_ShouldCreateProduct()
    {
        // Arrange
        var command = new CreateProductCommand("Test Product", "Description", 10.99m, "cat1", 5);
        var product = new Product { Id = "1", Name = "Test Product" };
        var productDto = new ProductDto("1", "Test Product", "Description", 10.99m, "cat1", 5, DateTime.UtcNow, DateTime.UtcNow);

        _mockRepository.Setup(x => x.CreateAsync(It.IsAny<Product>())).ReturnsAsync(product);
        _mockMapper.Setup(x => x.Map<ProductDto>(product)).Returns(productDto);

        var handler = new CreateProductCommandHandler(_mockRepository.Object, _mockMapper.Object);

        // Act
        var result = await handler.Handle(command, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.Name.Should().Be("Test Product");
        _mockRepository.Verify(x => x.CreateAsync(It.IsAny<Product>()), Times.Once);
    }

    [Fact]
    public async Task UpdateStockCommandHandler_ShouldUpdateStock()
    {
        // Arrange
        var command = new UpdateStockCommand("1", 20);
        var product = new Product { Id = "1", StockQuantity = 10 };
        var updatedProductDto = new ProductDto("1", "Test", "Desc", 10m, "cat1", 20, DateTime.UtcNow, DateTime.UtcNow);

        _mockRepository.Setup(x => x.GetByIdAsync("1")).ReturnsAsync(product);
        _mockRepository.Setup(x => x.UpdateAsync(It.IsAny<Product>())).ReturnsAsync(product);
        _mockMapper.Setup(x => x.Map<ProductDto>(product)).Returns(updatedProductDto);

        var handler = new UpdateStockCommandHandler(_mockRepository.Object, _mockMapper.Object);

        // Act
        var result = await handler.Handle(command, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.StockQuantity.Should().Be(20);
        product.StockQuantity.Should().Be(20);
    }
}
