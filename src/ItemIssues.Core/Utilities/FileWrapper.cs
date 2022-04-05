namespace ItemIssues.Core.Utilities
{
    public class FileWrapper : IFileWrapper
    {
        public async Task<string> ReadAllTextAsync(string path, CancellationToken cancellationToken = default)
        {
            return await File.ReadAllTextAsync(path, cancellationToken);
        }
    }
}
