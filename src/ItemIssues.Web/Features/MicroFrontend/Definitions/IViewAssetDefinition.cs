namespace ItemIssues.Web.Features.MicroFrontend.Definitions
{
    public interface IViewAssetDefinition
    {
        /// <summary>
        /// Name of the View
        /// </summary>
        string ViewName { get; }

        /// <summary>
        /// A list of js resources to use on a View
        /// </summary>
        IEnumerable<string> Scripts { get; }

        /// <summary>
        /// A list of css resources to use on a View
        /// </summary>
        IEnumerable<string> Styles { get; }

        string DistSubfolderContainingManifest { get; }

        /// <summary>
        /// Html to be displayed on the view.
        /// Default behavior provides a root element to render on and a global javascript variable 'partnersAdminApiUrl'
        /// to be utilized for fetch calls.
        /// </summary>
        string Content { get; }
    }
}
