using ItemIssues.Web.Features.MicroFrontend.Models;

namespace ItemIssues.Web.Features.MicroFrontend.Definitions
{
    public abstract class ViewAssetDefinitionBase : IViewAssetDefinition
    {
        public abstract string ViewName { get; }

        public abstract IEnumerable<string> Scripts { get; }

        public abstract IEnumerable<string> Styles { get; }

        public virtual string Content => ViewAssets.CommonContent;

        public string DistSubfolderContainingManifest => string.Empty;
    }
}
