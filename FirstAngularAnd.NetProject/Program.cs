using FirstAngularAnd.NetProject;
using FirstAngularAnd.NetProject.Services;
using FirstAngularAnd.NetProject.Services.IServices;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddDbContext<ApplicationDbContext>(options=>
options.UseSqlServer(builder.Configuration.GetConnectionString("DbContext")));
builder.Services.AddScoped<IUserService, UserService>();




// Cors in .Net


//CORS= Cross-Origin Resource Sharing

// for example: our angular app run on: http://localhost:4200

// backend api will run on : http://localhost:5003

// these both are diffent origin , so the brower block the request unless Cors is enable

//here Create a Cors Policy with a custom name.

// for example we are naming our policy '"AllowAngular"


builder.Services.AddCors(options =>
options.AddPolicy("AllowAngular",
policy =>
{
    //AllowAnyOrigin
    //For example
    //http://localhost:4200
    //http://localhost:3200
    //http://localhost:6200


    policy.AllowAnyOrigin()


    // Allow Any Header()

    // it Allows to the cliend to send any htp headerss

    // e.g content-type, Authorication, this is specially used when angular sends 

    // jwt token by Authorization :Bearer <Token>

    .AllowAnyHeader()


    //Allow Any Method

    //Allows all the http method

    //Example: 
    //GET
    //post
    //Put
    //Delete
    //Patch

    //so angular can perform differenct type of operation wiht our api.

    .AllowAnyMethod();
}));





















builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
