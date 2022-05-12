namespace ItemIssues.Web.Features.MicroFrontend.Definitions
{
    public sealed class ViewAssetDecorator : IViewAssetDefinition
    {
        private const string _vendorsJavascriptFile = "vendors.js";

        private const string _stylesFile = "assets/styles.css";

        private readonly IViewAssetDefinition _viewAsset;

        public ViewAssetDecorator(IViewAssetDefinition viewAsset)
        {
            _viewAsset = viewAsset;
        }

        public string ViewName => _viewAsset.ViewName;

        public IEnumerable<string> Scripts
        {
            get
            {
                var scripts = new List<string>(new[] { _vendorsJavascriptFile });

                scripts.AddRange(_viewAsset.Scripts);

                return scripts;
            }
        }

        public IEnumerable<string> Styles
        {
            get
            {
                var styles = new List<string>(new[] { _stylesFile });

                styles.AddRange(_viewAsset.Styles);

                return styles;
            }
        }

        public string DistSubfolderContainingManifest => _viewAsset.DistSubfolderContainingManifest;

        public string Content => _viewAsset.Content;
    }
}
