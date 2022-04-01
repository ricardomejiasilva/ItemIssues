using ItemIssues.Core.Extensions;
using ItemIssues.Web.Config;
using MediatR;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerUI;

const string AllowOrigins = "AllowOrigin";

var settings = new ItemIssuesWebSettings();
var builder = WebApplication.CreateBuilder(args);

builder.Configuration.Bind(settings);

builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
    .AddJsonFile($"appsettings.deploy.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

builder.Services.AddControllers();

builder.Services
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
    .AddCoreDependencies();

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
