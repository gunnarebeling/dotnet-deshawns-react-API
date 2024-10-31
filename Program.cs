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
List<City> cities = new List<City>
{
    new City { Id = 1, Name = "New York" },
    new City { Id = 2, Name = "Los Angeles" },
    new City { Id = 3, Name = "Chicago" }
};

List<Walker> walkers = new List<Walker>
{
    new Walker { Id = 1, Name = "John Doe" },
    new Walker { Id = 2, Name = "Jane Smith" }
};

List<WalkerCity> walkerCities = new List<WalkerCity>
{
    new WalkerCity { Id= 1, WalkerId = 1, CityId = 1 }, 
    new WalkerCity { Id= 2, WalkerId = 1, CityId = 3 }, 
    new WalkerCity { Id= 3, WalkerId = 2, CityId = 2 }, 
    new WalkerCity { Id= 4, WalkerId = 2, CityId = 3 }  
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

app.MapGet("/api/dogs/{id}", (int id) => 
{
    Dog dog = dogs.FirstOrDefault(dog => dog.Id == id);
    City city = cities.FirstOrDefault(city => city.Id == dog.CityId);
    Walker walker = walkers.FirstOrDefault(walker => walker.Id == dog.WalkerId);
    if (dog != null)
    {
        return Results.Ok(new DogDTO
        {
            Id = dog.Id,
            Name = dog.Name,
            WalkerId = dog.WalkerId,
            Walker = walker == null ? null : new WalkerDTO
            {
                Id = walker.Id,
                Name = walker.Name
            },
            CityId = dog.CityId,
            City = new CityDTO
            {
                Id = city.Id,
                Name = city.Name
            }
        });
    }else
    {
        return Results.NotFound();
    }
});

app.MapDelete("api/dogs/{id}", (int id) => 
{
    int index = dogs.FindIndex(dog => dog.Id == id);
    dogs.RemoveAt(index);
});

app.MapGet("api/cities", () =>
{
    return cities.Select(city => new CityDTO
    {
        Id = city.Id,
        Name = city.Name,

    });
});

app.MapPost("api/dogs", (Dog dog) => {
    dog.Id = dogs.Any() ? dogs.Max(dog => dog.Id) + 1 : 1;
    dogs.Add(dog);
    return Results.Created($"api/dogs/{dog.Id}",new DogDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        CityId = dog.CityId,
        WalkerId = dog.WalkerId
    });

});

app.MapGet("api/walkers", () =>
{
    return walkers.Select(walker => new WalkerDTO
    {
        Id = walker.Id,
        Name = walker.Name
    });
});
app.MapGet("api/walkercity", () => 
{   

    return walkerCities.Select(wc => {
        Walker walker = walkers.FirstOrDefault(w => w.Id == wc.WalkerId);
        City city = cities.FirstOrDefault(c => c.Id == wc.CityId);
        return (
        new WalkerCityDTO
        {
            Id = wc.Id,
            WalkerId = wc.WalkerId,
            Walker = new WalkerDTO
            {
                Id = walker.Id,
                Name = walker.Name
            },
            CityId = wc.CityId,
            City = new CityDTO
            {
                Id = city.Id,
                Name = city.Name
            }
            
        });
    });
});




app.Run();
