using ItemIssues.Core.Models;
using MediatR;

namespace ItemIssues.Web.Features.DevTools.Commands
{
    public class SaveSampleData
    {
        public class Request : IRequest<bool>
        {
            public IEnumerable<SampleData>? SampleData { get; set; }
        }

        public class Handler : IRequestHandler<Request, bool>
        {
            public Task<bool> Handle(Request request, CancellationToken cancellationToken)
            {
                return Task.FromResult(true);
            }
        }
    }
}
