using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Orestes.Simulator.DataSource;
using Orestes.Simulator.WebAPI.Security;
using System.Text;
// Add this using directive for MySQL support
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Orestes.SharedLibrary;

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

// Add DB Context (MSSQL)
//builder.Services.AddDbContext<OrestesDBContext>(options =>
//        options.UseSqlServer(builder.Configuration.GetConnectionString("OrestesSimulatorConnection")));

// Add DB Context (MySQL)
// Ensure you have installed the Pomelo.EntityFrameworkCore.MySql NuGet package
builder.Services.AddDbContext<OrestesDBContext>(options =>    
    options.UseMySql(
            UtilsForMessages.Decompress(builder.Configuration.GetConnectionString("OzoraSoftPictureMakerConnection")!),
            ServerVersion.AutoDetect(UtilsForMessages.Decompress(builder.Configuration.GetConnectionString("OzoraSoftPictureMakerConnection")!))
        ));

builder.Services.AddDbContext<OzoraSoftDBContext>(options =>
    options.UseMySql(
            UtilsForMessages.Decompress(builder.Configuration.GetConnectionString("OzoraSoftInfoSecControlsConnection")!),
            ServerVersion.AutoDetect(UtilsForMessages.Decompress(builder.Configuration.GetConnectionString("OzoraSoftInfoSecControlsConnection")!))
        ));

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
app.UseCors("CorsPolicy");

app.MapControllers();

app.Run();
