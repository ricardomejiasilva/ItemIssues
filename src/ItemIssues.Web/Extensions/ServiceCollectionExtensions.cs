using ItemIssues.Web.Features.MicroFrontend.Services;

namespace ItemIssues.Web.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddProjectDependencies(this IServiceCollection services)
        {
            services.AddSingleton<IViewAssetsService, ViewAssetsService>();

            return services;
        }
    }
}
