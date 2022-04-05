namespace ItemIssues.Core.Utilities
{
    public interface IFileWrapper
    {
        Task<string> ReadAllTextAsync(string path, CancellationToken cancellationToken = default);
    }
}
