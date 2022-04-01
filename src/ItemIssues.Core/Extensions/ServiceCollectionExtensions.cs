﻿using ItemIssues.Core.Data.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace ItemIssues.Core.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCoreDependencies(this IServiceCollection services)
        {
            services.AddSingleton<ISampleDataRepository, SampleDataRepository>();

            return services;
        }
    }
}
