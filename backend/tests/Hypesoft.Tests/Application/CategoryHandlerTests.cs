using AutoMapper;
using FluentAssertions;
using Hypesoft.Application.Commands;
using Hypesoft.Application.DTOs;
using Hypesoft.Application.Handlers;
using Hypesoft.Application.Queries;
using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using Moq;
using Xunit;

namespace Hypesoft.Tests.Application;

public class CategoryHandlerTests
{
    private readonly Mock<ICategoryRepository> _mockRepository;
    private readonly Mock<IMapper> _mockMapper;

    public CategoryHandlerTests()
    {
        _mockRepository = new Mock<ICategoryRepository>();
        _mockMapper = new Mock<IMapper>();
    }

    [Fact]
    public async Task CreateCategoryCommandHandler_ShouldCreateCategory()
    {
        // Arrange
        var command = new CreateCategoryCommand("Electronics");
        var category = new Category { Id = "1", Name = "Electronics" };
        var categoryDto = new CategoryDto("1", "Electronics", DateTime.UtcNow);

        _mockRepository.Setup(x => x.CreateAsync(It.IsAny<Category>())).ReturnsAsync(category);
        _mockMapper.Setup(x => x.Map<CategoryDto>(category)).Returns(categoryDto);

        var handler = new CreateCategoryCommandHandler(_mockRepository.Object, _mockMapper.Object);

        // Act
        var result = await handler.Handle(command, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.Name.Should().Be("Electronics");
        _mockRepository.Verify(x => x.CreateAsync(It.IsAny<Category>()), Times.Once);
    }

    [Fact]
    public async Task GetAllCategoriesQueryHandler_ShouldReturnCategories()
    {
        // Arrange
        var categories = new List<Category>
        {
            new() { Id = "1", Name = "Electronics" },
            new() { Id = "2", Name = "Books" }
        };
        var categoryDtos = new List<CategoryDto>
        {
            new("1", "Electronics", DateTime.UtcNow),
            new("2", "Books", DateTime.UtcNow)
        };

        _mockRepository.Setup(x => x.GetAllAsync()).ReturnsAsync(categories);
        _mockMapper.Setup(x => x.Map<IEnumerable<CategoryDto>>(categories)).Returns(categoryDtos);

        var handler = new GetAllCategoriesQueryHandler(_mockRepository.Object, _mockMapper.Object);

        // Act
        var result = await handler.Handle(new GetAllCategoriesQuery(), CancellationToken.None);

        // Assert
        result.Should().HaveCount(2);
        result.First().Name.Should().Be("Electronics");
    }
}
