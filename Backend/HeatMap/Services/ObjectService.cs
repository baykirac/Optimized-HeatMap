using HeatMap.Data.GenericRepository;
using HeatMap.Data.UnitOfWork;
using HeatMap.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Object = HeatMap.Models.Entities.Object;
namespace HeatMap.Services
{
    public class ObjectService : IObjectService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IGenericRepository<Object> objectRepository;

        public ObjectService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            objectRepository = unitOfWork.GetRepository<Object>();
        }

        public Task<IEnumerable<Object>> GetAllAsync()
        {
            return objectRepository.GetAllAsync();
        }
    }
}
