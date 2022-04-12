using ItemIssues.Web.Features.MicroFrontend.Definitions;

namespace ItemIssues.Web.Features.ItemIssues.Assets
{
    public class ItemIssuesViewAsset : ViewAssetDefinitionBase
    {
        public override string ViewName => "ItemIssues";

        public override IEnumerable<string> Scripts => new[] { "itemIssues/itemIssues.js" };

        public override IEnumerable<string> Styles => new[] { "itemIssues/itemIssues.css" };
    }
}
