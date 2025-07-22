using Pomelo.EntityFrameworkCore.MySql.Infrastructure; 
using Microsoft.EntityFrameworkCore;
using Quizzler.Entities;
using Quizzler.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add the secrets configuration file
builder.Configuration.AddJsonFile("appsettings.Secrets.json", optional: true, reloadOnChange: true);

// Add services to the container.

builder.Services.AddControllers();

// Get connection string
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<QuizzlerContext>(options => options.UseMySql(
    connectionString,
    ServerVersion.AutoDetect(connectionString)
));
builder.Services.AddScoped<IPasswordService, PasswordService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", builder => {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();
app.UseCors("AllowAll");
app.Urls.Add("http://localhost:5123");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
