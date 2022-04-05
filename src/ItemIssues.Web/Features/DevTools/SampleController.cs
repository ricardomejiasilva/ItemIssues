using ItemIssues.Web.Features.DevTools.Commands;
using ItemIssues.Web.Features.DevTools.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ItemIssues.Web.Features.DevTools
{
    [Route("DevTools/[controller]")]
    public class SampleController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SampleController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [Route("GetSampleData")]
        public async Task<IActionResult> GetSampleDataAsync() =>
            Ok(await _mediator.Send(new GetSampleData.Request()));

        [HttpPost]
        [Route("SaveSampleData")]
        public async Task<IActionResult> SaveSampleDataAsync([FromBody] SaveSampleData.Request request) =>
            Ok(await _mediator.Send(request));
    }
}
