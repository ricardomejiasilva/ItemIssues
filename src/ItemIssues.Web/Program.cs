using ItemIssues.Core.Extensions;
using ItemIssues.Web.Config;
using ItemIssues.Web.Extensions;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerUI;
using System.Text;

const string AllowOrigins = "AllowOrigin";

var settings = new ItemIssuesWebSettings();
var builder = WebApplication.CreateBuilder(args);

builder.Configuration.Bind(settings);

builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
    .AddJsonFile($"appsettings.deploy.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

builder.Services.AddMvc();

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(settings.JwtAuthentication?.SigningKey ?? string.Empty)),
            ValidateActor = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            ValidateIssuer = false,
            ValidateLifetime = true,
            ValidateTokenReplay = false,
        };
        options.RequireHttpsMetadata = true;
        options.SaveToken = true;
    });

builder.Services
    .AddSingleton(settings)
    .AddCors(options =>
    {
        options.AddPolicy(AllowOrigins,
            builder =>
            {
                builder.SetIsOriginAllowedToAllowWildcardSubdomains()
                    .WithOrigins(settings.AllowedOrigins.Split(","))
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            });
    })
    .AddSwaggerGen(options =>
    {
        options.SwaggerDoc("v1", new OpenApiInfo
        {
            Version = "v1",
            Title = "Item Issues Web"
        });
        options.CustomSchemaIds(type => type.FullName);
    })
    .AddMediatR(typeof(Program))
    .AddCoreDependencies()
    .AddProjectDependencies()
    .AddHttpContextAccessor();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection()
    .UseRouting()
    .UseCors(AllowOrigins)
    .UseAuthorization()
    .UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    })
    .UseSwagger()
    .UseSwaggerUI(config =>
    {
        config.SwaggerEndpoint("/swagger/v1/swagger.json", $"V1");
        config.DisplayRequestDuration();
        config.DocExpansion(DocExpansion.None);
    })
    .UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    })
    .UseStaticFiles()
    .UseHttpsRedirection();

app.Run();
