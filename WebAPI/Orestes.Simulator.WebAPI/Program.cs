using Microsoft.EntityFrameworkCore;
using Orestes.Simulator.DataSource;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
// Swagger configuration
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<OrestesDBContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("OrestesSimulatorConnection")));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
