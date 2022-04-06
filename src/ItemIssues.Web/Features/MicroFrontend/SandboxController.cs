using ItemIssues.Web.Features.MicroFrontend.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ItemIssues.Web.Features.MicroFrontend
{
    [Route("[controller]")]
    public class SandboxController : Controller
    {
        private readonly IMediator _mediator;

        public SandboxController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [Route("{viewName}")]
        public async Task<IActionResult> Get(string viewName)
        {
            var request = GetAssetsByViewQuery.Request.GetSandboxRequest(viewName);
            var viewAssets = await _mediator.Send(request);

            return View("~/Features/MicroFrontend/Views/Sandbox.cshtml", viewAssets);
        }
    }
}
