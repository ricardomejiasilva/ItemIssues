﻿using ItemIssues.Api.Features.DevTools.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ItemIssues.Web.Features.DevTools
{
    [Route("DevTools/[controller]")]
    public class SampleController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<SampleController> _logger;

        public SampleController(IMediator mediator, ILogger<SampleController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpGet]
        [Route("GetSampleData")]
        public async Task<IActionResult> GetSampleDataAsync() =>
            Ok(await _mediator.Send(new GetSampleData.Request()));

        [HttpGet]
        [Route("LogSampleMessage")]
        public IActionResult LogSampleMessageAsync([FromQuery] bool isErrorLog)
        {
            if (isErrorLog)
            {
                _logger.LogError("This is an error log!");
            }
            else
            {
                _logger.LogInformation("This is an info log!");
            }

            return Ok();
        }
    }
}
