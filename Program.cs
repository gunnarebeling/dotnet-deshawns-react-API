using DeshawnsDogs.Models;
using DeshawnsDogs.Models.DTOs;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
List<Dog> dogs = new List<Dog>
{
    new Dog { Id = 1, Name = "Buddy", WalkerId = null, CityId = 1 },
    new Dog { Id = 2, Name = "Bella", WalkerId = null, CityId = 2 },
    new Dog { Id = 3, Name = "Charlie", WalkerId = null, CityId = 3 },
    new Dog { Id = 4, Name = "Max", WalkerId = null, CityId = 1 },
    new Dog { Id = 5, Name = "Luna", WalkerId = null, CityId = 2 }
};
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/dogs", () => 
{
    return dogs.Select(dog => new DogDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        WalkerId = dog.WalkerId,
        CityId = dog.CityId
    });
});





app.Run();
