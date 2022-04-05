using Clark.Auth.AspNetCore;
using System.Security.Claims;

namespace ItemIssues.Web.Extensions
{
    public static class ClauthIdentityExtensions
    {
        public static IEnumerable<Claim> GetClaimsFromClauthIdentity(this IClauthIdentity? clauthIdentity)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, clauthIdentity?.Name ?? string.Empty),
                new Claim(ClaimTypes.WindowsAccountName, clauthIdentity?.Username?? string.Empty),
                new Claim(ClaimTypes.UserData, clauthIdentity?.PhotoUri ?? string.Empty),
                new Claim(ClaimTypes.Email, clauthIdentity?.Email ?? string.Empty),
                new Claim(ClaimTypes.NameIdentifier, clauthIdentity?.EmployeeId.ToString() ?? string.Empty),
                new Claim("firstName", clauthIdentity?.FirstName ?? string.Empty),
                new Claim("lastName", clauthIdentity?.LastName ?? string.Empty),
            };

            var roleClaims = clauthIdentity?
                .Roles
                .Select(role => new Claim(ClaimTypes.Role, role));

            if (roleClaims != null)
            {
                claims.AddRange(roleClaims);
            }

            return claims;
        }
    }
}
