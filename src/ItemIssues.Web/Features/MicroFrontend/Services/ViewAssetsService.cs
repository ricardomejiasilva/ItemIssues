using Clark.Auth.AspNetCore;
using ItemIssues.Core.Utilities;
using ItemIssues.Web.Config;
using ItemIssues.Web.Extensions;
using ItemIssues.Web.Features.MicroFrontend.Definitions;
using ItemIssues.Web.Features.MicroFrontend.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using System.Security.Claims;
using System.Text;

namespace ItemIssues.Web.Features.MicroFrontend.Services
{
    public class ViewAssetsService : IViewAssetsService
    {
        private const string _webrootDistFolderName = "dist";
        private const string _manifestFileName = "manifest.json";

        private readonly IWebHostEnvironment _environment;
        private readonly IFileWrapper _fileWrapper;
        private readonly string _host;
        private IEnumerable<IViewAssetDefinition>? _viewAssetDefinitions;
        private readonly IServiceProvider _serviceProvider;
        private readonly ItemIssuesWebSettings? _settings;

        public ViewAssetsService(
            IWebHostEnvironment environment,
            IFileWrapper fileWrapper,
            IHttpContextAccessor contextAccessor,
            IServiceProvider serviceProvider,
            ItemIssuesWebSettings? settings)
        {
            _environment = environment;
            _fileWrapper = fileWrapper;
            _host = $"https://{contextAccessor.HttpContext?.Request.Host.Value}";
            _serviceProvider = serviceProvider;
            _settings = settings;
        }

        public async Task<ViewAssets?> GetViewAssets(string viewName)
        {
            // Cache the definitions
            _viewAssetDefinitions ??= GetViewAssetDefinitions(typeof(ViewAssetsService).Assembly);

            var definition = _viewAssetDefinitions.FirstOrDefault(asset => asset.ViewName == viewName);

            if (definition == null)
            {
                return null;
            }

            var viewAssets = await GetViewAssetsAsync(definition);

            return viewAssets;
        }

        public string GetTokenFromClauthIdentity(IClauthIdentity? clauthIdentity)
        {
            var key = Encoding.ASCII.GetBytes(_settings?.JwtAuthentication?.SigningKey ?? string.Empty);

            var claims = clauthIdentity.GetClaimsFromClauthIdentity();

            var securityTokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(_settings?.ClauthSecurityTokenExpirationInDays ?? 0),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var securityToken = tokenHandler.CreateToken(securityTokenDescriptor);

            return tokenHandler.WriteToken(securityToken);
        }

        private IEnumerable<IViewAssetDefinition> GetViewAssetDefinitions(params Assembly[] assemblies)
        {
            var definitions = assemblies
                .SelectMany(assembly => assembly.GetTypes())
                .Where(type =>
                    typeof(IViewAssetDefinition).IsAssignableFrom(type)
                    && type != typeof(IViewAssetDefinition)
                    && !type.IsAbstract
                    && type != typeof(ViewAssetDecorator)
                )
                .Select(type => new ViewAssetDecorator(
                    (IViewAssetDefinition)ActivatorUtilities.CreateInstance(_serviceProvider, type)
                ))
                .ToList();

            return definitions.AsEnumerable();
        }

        private async Task<ViewAssets> GetViewAssetsAsync(IViewAssetDefinition definition)
        {
            var manifest = await GetManifest(definition.DistSubfolderContainingManifest);
            var scripts = GetResourceUrlFromManifest(manifest, definition.Scripts);
            var styles = GetResourceUrlFromManifest(manifest, definition.Styles);

            return new ViewAssets(scripts, styles, definition.ViewName, definition.Content);
        }

        private async Task<IReadOnlyDictionary<string, string>?> GetManifest(string subfolder)
        {
            var manifestPath = new[] { _environment.WebRootPath, _webrootDistFolderName, subfolder, _manifestFileName };
            var manifestJson = await _fileWrapper.ReadAllTextAsync(Path.Combine(manifestPath));
            var manifestSourceDestination = System.Text.Json.JsonSerializer.Deserialize<IReadOnlyDictionary<string, string>>(manifestJson);

            return manifestSourceDestination;
        }

        private IEnumerable<string> GetResourceUrlFromManifest(IReadOnlyDictionary<string, string>? manifest, IEnumerable<string> resources)
        {
            var urls = resources
                .Select(resource => Path.Combine(_host, manifest?[resource] ?? string.Empty))
                .ToList();

            return urls;
        }
    }
}
