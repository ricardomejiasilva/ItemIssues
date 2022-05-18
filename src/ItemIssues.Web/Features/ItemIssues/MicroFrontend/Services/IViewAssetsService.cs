using Clark.Auth.AspNetCore;
using ItemIssues.Web.Features.MicroFrontend.Models;

namespace ItemIssues.Web.Features.MicroFrontend.Services
{
    public interface IViewAssetsService
    {
        Task<ViewAssets?> GetViewAssets(string viewName);

        string GetTokenFromClauthIdentity(IClauthIdentity? clauthIdentity);
    }
}
