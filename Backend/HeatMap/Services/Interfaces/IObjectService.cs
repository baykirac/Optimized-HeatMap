using HeatMap.Data.GenericRepository;
using HeatMap.Models.Entities;
using Object = HeatMap.Models.Entities.Object;
namespace HeatMap.Services.Interfaces
{
    public interface IObjectService
    {
        Task<IEnumerable<Object>> GetAllAsync();
        Task<bool> CreateKMLFile();
    }
}
