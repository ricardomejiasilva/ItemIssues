using Clark.AppFoundations.Health.Extensions;
using Clark.AppFoundations.Logging.Extensions;
using ItemIssues.Core.Extensions;
using MediatR;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerUI;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseLogging();

builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
    .AddJsonFile($"appsettings.deploy.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

builder.Services.AddStandardHealthChecks(builder.Configuration);
builder.Services.AddSentry(builder.Configuration);
builder.Services.AddControllers();

builder.Services
    .AddSwaggerGen(options =>
    {
        options.SwaggerDoc("v1", new OpenApiInfo
        {
            Version = "v1",
            Title = "Item Issues Api"
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

app.Lifetime.ApplicationStarted.Register(() =>
{
    app.Logger.LogInformation("The application {0} started", app.Environment.ApplicationName);
    app.Logger.LogInformation("Listening on {0}", string.Join(", ", app.Urls));
});

app.UseHttpsRedirection()
    .UseRouting()
    .UseAuthorization()
    .UseEndpoints(endpoints =>
    {
        endpoints.MapStandardHealthChecks();
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
    .UseCorrelationId();

app.Run();
