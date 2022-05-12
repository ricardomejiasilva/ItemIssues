namespace ItemIssues.Web.Features.MicroFrontend.Models
{
    public class ViewAssets
    {
        public const string CommonContent = "[COMMON_CONTENT]";

        public string ViewName { get; }

        public string Content { get; }

        public IEnumerable<string> Scripts { get; }

        public IEnumerable<string> Styles { get; }

        public ViewAssets(
            IEnumerable<string> scripts,
            IEnumerable<string> styles,
            string viewName,
            string content)
        {
            Scripts = scripts;
            Styles = styles;
            ViewName = viewName;
            Content = content;
        }

        public ViewAssets(ViewAssets from, string newContent)
            : this(@from.Scripts, @from.Styles, @from.ViewName, newContent)
        {
        }
    }
}
