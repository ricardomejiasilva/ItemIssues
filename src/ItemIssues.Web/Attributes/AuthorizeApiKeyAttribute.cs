using ItemIssues.Web.Config;
using ItemIssues.Web.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;

namespace ItemIssues.Web.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeApiKeyAttribute : Attribute, IAsyncActionFilter
    {
        private readonly ApiKeyType _apiKeyType;

        public AuthorizeApiKeyAttribute(ApiKeyType apiKeyType)
        {
            _apiKeyType = apiKeyType;
        }

        public AuthorizeApiKeyAttribute()
        {
            _apiKeyType = ApiKeyType.Default;
        }

        public Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var apiKeyFromRequest = GetRequestApiKey(context);

            var configuration = context.HttpContext.RequestServices.GetService<ItemIssuesWebSettings?>();
            if (configuration == null)
            {
                return next();
            }

            var apiKey = GetApiKeyForType(configuration, _apiKeyType);
            var apiKeyIsValid = apiKeyFromRequest == apiKey;

            if (apiKeyIsValid)
            {
                return next();
            }

            context.Result = new StatusCodeResult((int)HttpStatusCode.Forbidden);

            return Task.CompletedTask;
        }

        private static string? GetRequestApiKey(ActionExecutingContext actionContext)
        {
            if (actionContext.HttpContext.Request.Query.TryGetValue("apiKey", out var apiKeyFromRequest))
            {
                return apiKeyFromRequest;
            }

            return null;
        }

        private static string GetApiKeyForType(ItemIssuesWebSettings configuration, ApiKeyType apiKeyType)
        {
            return apiKeyType switch
            {
                ApiKeyType.GetAssetsByView => configuration.ExternalAssetKey,
                _ => throw new NotImplementedException($"ApiKeyType {apiKeyType} not handled."),
            };
        }
    }
}
