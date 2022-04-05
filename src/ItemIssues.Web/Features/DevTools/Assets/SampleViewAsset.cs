using ItemIssues.Web.Features.MicroFrontend.Definitions;

namespace ItemIssues.Web.Features.DevTools.Assets
{
    public class SampleViewAsset : ViewAssetDefinitionBase
    {
        public override string ViewName => "Sample";

        public override IEnumerable<string> Scripts => new[] { "devtools/sample.js" };

        public override IEnumerable<string> Styles => new string[] { "devtools/sample.css" };
    }
}
