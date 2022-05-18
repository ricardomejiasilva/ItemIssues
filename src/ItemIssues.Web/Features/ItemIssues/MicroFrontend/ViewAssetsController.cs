using ItemIssues.Web.Attributes;
using ItemIssues.Web.Enums;
using ItemIssues.Web.Features.MicroFrontend.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ItemIssues.Web.Features.MicroFrontend
{
    [Route("api/[controller]")]
    public class ViewAssetsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ViewAssetsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("[action]")]
        [AuthorizeApiKey(ApiKeyType.GetAssetsByView)]
        public async Task<IActionResult> GetAssetsByView(GetAssetsByViewQuery request)
        {
            var assets = await _mediator.Send(request);

            if (assets == null)
            {
                return NotFound();
            }

            return Ok(assets);
        }
    }
}
