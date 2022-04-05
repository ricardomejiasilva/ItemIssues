namespace ItemIssues.Web.Config
{
    public class ItemIssuesWebSettings
    {
        public string AllowedOrigins { get; set; } = string.Empty;

        public JwtAuthentication? JwtAuthentication { get; set; }

        public int ClauthSecurityTokenExpirationInDays { get; set; }

        public string ExternalAssetKey { get; set; } = string.Empty;
    }
}
