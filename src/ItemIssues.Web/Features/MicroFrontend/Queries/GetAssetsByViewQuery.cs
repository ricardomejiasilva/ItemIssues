using Clark.Auth.AspNetCore;
using ItemIssues.Web.Features.MicroFrontend.Models;
using ItemIssues.Web.Features.MicroFrontend.Services;
using MediatR;

namespace ItemIssues.Web.Features.MicroFrontend.Queries
{
    public class GetAssetsByViewQuery
    {
        public class Request : IRequest<ViewAssets?>
        {
            public string View { get; set; } = string.Empty;

            public IClauthIdentity? ClauthIdentity { get; set; }

            public bool IsSandbox { get; }

            public Request() { }

            public static Request GetSandboxRequest(string view)
            {
                return new Request(view, isSandbox: true);
            }

            private Request(string view, bool isSandbox)
            {
                View = view;
                IsSandbox = isSandbox;
            }
        }

        public class Handler : IRequestHandler<Request, ViewAssets?>
        {
            private const string _localEnvironmentName = "LOCAL";

            private readonly IWebHostEnvironment _environment;
            private readonly IViewAssetsService _viewAssetsService;
            private readonly string _host;
            private readonly IDictionary<string, ViewAssets> _viewAssets;

            public Handler(
                IWebHostEnvironment environment,
                IViewAssetsService viewAssetsService,
                IHttpContextAccessor contextAccessor)
            {
                _environment = environment;
                _viewAssetsService = viewAssetsService;
                _host = $"https://{contextAccessor.HttpContext?.Request.Host.Value}";
                _viewAssets = new Dictionary<string, ViewAssets>();
            }

            public async Task<ViewAssets?> Handle(Request request, CancellationToken cancellationToken)
            {
                var asset = await GetViewAssetAsync(request.View);

                if (asset == null) return null;

                var bearerToken = string.Empty;

                if (!request.IsSandbox)
                {
                    bearerToken = _viewAssetsService.GetTokenFromClauthIdentity(request.ClauthIdentity);
                }

                var content = GetContent(asset.Content, bearerToken);

                var updateAsset = new ViewAssets(asset, content);

                return updateAsset;
            }

            private string GetContent(string assetContent, string bearerToken)
            {
                var commonContent = $"<script>window.itemIssuesWebUrl='{_host}';window.bearerToken='{bearerToken}';</script><div id='root'></div>";

                var newContent = assetContent.Replace(ViewAssets.CommonContent, commonContent);

                return newContent;
            }

            private async Task<ViewAssets?> GetViewAssetAsync(string viewName)
            {
                // If local environment, do not cache the asset resources. Otherwise, cache the resources as they won't change after application startup.
                if (_environment.EnvironmentName.ToUpperInvariant() == _localEnvironmentName)
                {
                    return await _viewAssetsService.GetViewAssets(viewName);
                }

                if (!_viewAssets.ContainsKey(viewName))
                {
                    var viewAssets = await _viewAssetsService.GetViewAssets(viewName);
                    if (viewAssets != null)
                    {
                        _viewAssets[viewName] = viewAssets;
                    }
                }

                return _viewAssets[viewName];
            }
        }
    }
}
