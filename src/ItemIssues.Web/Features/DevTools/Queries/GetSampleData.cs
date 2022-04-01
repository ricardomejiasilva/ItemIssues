using ItemIssues.Core.Data.Repositories;
using ItemIssues.Core.Models;
using MediatR;

namespace ItemIssues.Web.Features.DevTools.Queries
{
    public class GetSampleData
    {
        public class Request : IRequest<IEnumerable<SampleData>>
        { }

        public class Handler : IRequestHandler<Request, IEnumerable<SampleData>>
        {
            private readonly ISampleDataRepository _sampleDataRepository;

            public Handler(ISampleDataRepository sampleDataRepository)
            {
                _sampleDataRepository = sampleDataRepository;
            }

            public Task<IEnumerable<SampleData>> Handle(Request request, CancellationToken cancellationToken) =>
                Task.FromResult(_sampleDataRepository.GetSampleData());
        }
    }
}
