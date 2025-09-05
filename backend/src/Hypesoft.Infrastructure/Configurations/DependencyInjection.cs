using Hypesoft.Domain.Repositories;
using Hypesoft.Domain.Services;
using Hypesoft.Infrastructure.Data;
using Hypesoft.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Hypesoft.Infrastructure.Configurations;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {

        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseMongoDB(configuration.GetConnectionString("MongoDB")!, "HypesoftDb"));



        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();


        services.AddScoped<IStockService, StockService>();

        return services;
    }
}
