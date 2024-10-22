/// <summary>
/// Entry point for the WineReview API application.
/// Configures services and the HTTP request pipeline.
/// </summary>
using CSHARPAPI_WineReview.Data;
using CSHARPAPI_WineReview.Mapping;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
/// <summary>
/// Configures Swagger/OpenAPI services.
/// </summary>
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

/// <summary>
/// Configures the database context for WineReview using SQL Server.
/// </summary>
builder.Services.AddDbContext<WineReviewContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("WineReviewContext"));
});

/// <summary>
/// Configures CORS policy to allow any origin, method, and header.
/// </summary>
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
    );
});

/// <summary>
/// Configures AutoMapper with the WineReview mapping profile.
/// </summary>
builder.Services.AddAutoMapper(typeof(WineReviewMappingProfile));

var app = builder.Build();

/// <summary>
/// Configures the HTTP request pipeline.
/// </summary>
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.ConfigObject.AdditionalItems.Add("requestSnippetsEnabled", true);
    options.EnableTryItOutByDefault();
});

app.UseHttpsRedirection();

/// <summary>
/// Configures authentication and authorization.
/// </summary>
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

/// <summary>
/// Configures static files and fallback to index.html for production.
/// </summary>
app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");

app.UseCors("CorsPolicy");

app.Run();
