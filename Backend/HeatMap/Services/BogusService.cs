using Bogus;
using HeatMap.Data.GenericRepository;
using HeatMap.Data.UnitOfWork;
using HeatMap.Services.Interfaces;
using NetTopologySuite;
using NetTopologySuite.Geometries;
using Object = HeatMap.Models.Entities.Object;

namespace HeatMap.Services
{
    public class BogusService : IBogusService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IGenericRepository<Object> objectRepository;

        public BogusService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            objectRepository = unitOfWork.GetRepository<Object>();
        }

        public async Task<bool> CreateFakeDataAsync(int count)
        {
            try
            {
                if(count < 0) return false;

                var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);

                var faker = new Faker<Object>()
                    .RuleFor(o => o.Name, f => f.Company.CompanyName())
                    .RuleFor(o => o.Geoloc, f =>
                    {
                        var lat = f.Random.Double(36.0, 42.0);
                        var lon = f.Random.Double(26.0, 45.0);
                        return geometryFactory.CreatePoint(new Coordinate(lon, lat));
                    });

                var fakeObjects = faker.Generate(count);

                await objectRepository.AddRangeAsync(fakeObjects);

                await _unitOfWork.SaveChangesAsync();

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
