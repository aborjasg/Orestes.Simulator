using GraphQL;
using GraphQL.Types;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Orestes.Simulator.DataSource;
using Orestes.Simulator.DataSource.Models;
using Orestes.Simulator.WebAPI.Controllers;
using Orestes.Simulator.WebAPI.Security;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
// Swagger configuration
builder.Services.AddSwaggerGen();

const int APIPort = 5062;
// Enabled CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        policy =>
        {
            policy.WithOrigins($"http://localhost:{APIPort}", $"https://localhost:{APIPort}")
            .SetIsOriginAllowed((host) => true)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
        });
});
// Add Authorization
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
       .AddJwtBearer(options =>
       {
           options.TokenValidationParameters = new TokenValidationParameters
           {
               ValidateIssuerSigningKey = true,
               IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:SecretKey"]!)),
               ValidateIssuer = true,
               ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
               ValidateAudience = true,
               ValidAudience = builder.Configuration["JwtSettings:Audience"],
               ValidateLifetime = true,
               ClockSkew = TimeSpan.Zero // optional, removes default 5 min clock skew
           };
       });
builder.Services.AddSingleton<IJwtSettings, JwtSettings>(e => builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>()!);
// Add API Key Validator
//builder.Services.AddSingleton<IApiKeyValidator, ApiKeyValidator>();
// Add DB Context
builder.Services.AddDbContext<OrestesDBContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("OrestesSimulatorConnection")));


builder.Services.AddSingleton<IWeatherForecastService, WeatherForecastService>();
builder.Services.AddSingleton<WeatherForecastType>();
builder.Services.AddSingleton<WeatherForecastQuery>();
builder.Services.AddSingleton<ISchema, WeatherForecastSchema>();
builder.Services.AddGraphQL(options => options
    .AddAutoSchema<WeatherForecastQuery>()
    .AddSystemTextJson());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();
//app.UseMiddleware<ApiKeyMiddleware>();
app.UseCors("CorsPolicy");

app.MapControllers();

app.UseGraphQL<ISchema>();
app.UseGraphQLPlayground(
    "/",
    new GraphQL.Server.Ui.Playground.PlaygroundOptions
    {
        GraphQLEndPoint = "/graphql",
        SubscriptionsEndPoint = "/graphql"
    });
app.Run();
