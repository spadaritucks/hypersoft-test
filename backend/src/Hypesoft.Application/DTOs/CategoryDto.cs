namespace Hypesoft.Application.DTOs;

public record CategoryDto(
    string Id,
    string Name,
    DateTime CreatedAt
);

public record CreateCategoryDto(
    string Name
);
