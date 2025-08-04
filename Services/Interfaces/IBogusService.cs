namespace HeatMap.Services.Interfaces
{
    public interface IBogusService
    {
        Task<bool> CreateFakeDataAsync(int count);
    }
}
