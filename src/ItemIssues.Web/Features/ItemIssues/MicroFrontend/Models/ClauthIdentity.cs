using Clark.Auth.AspNetCore;

namespace ItemIssues.Web.Features.MicroFrontend.Models
{
    public class ClauthIdentity : IClauthIdentity
    {
        public string Name { get; set; } = string.Empty;

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Username { get; set; } = string.Empty;

        public IEnumerable<string> Roles { get; set; } = Enumerable.Empty<string>();

        public string PhotoUri { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public int EmployeeId { get; set; }
    }
}
