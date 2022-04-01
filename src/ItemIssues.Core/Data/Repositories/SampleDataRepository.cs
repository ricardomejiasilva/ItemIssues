using ItemIssues.Core.Models;

namespace ItemIssues.Core.Data.Repositories
{
    public class SampleDataRepository : ISampleDataRepository
    {
        public IEnumerable<SampleData> GetSampleData()
        {
            return new[]
            {
                new SampleData
                {
                    Id = 1,
                    Name = "First Sample"
                },
                new SampleData
                {
                    Id = 2,
                    Name = "Second Sample"
                }
            };
        }
    }
}
