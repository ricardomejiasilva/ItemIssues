using ItemIssues.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemIssues.Core.Data.Repositories
{
    public interface ISampleDataRepository
    {
        IEnumerable<SampleData> GetSampleData();
    }
}
