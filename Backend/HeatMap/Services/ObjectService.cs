using HeatMap.Data.GenericRepository;
using HeatMap.Data.UnitOfWork;
using HeatMap.Services.Interfaces;
using SharpKml.Base;
using SharpKml.Dom;
using Document = SharpKml.Dom.Document;
using Object = HeatMap.Models.Entities.Object;
using Vector = SharpKml.Base.Vector;
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
        public async Task<bool> CreateKMLFile()
        {
            try
            {
                var points = await objectRepository.GetAllAsync();

                var doc = new Document();

                foreach (var o in points)
                {
                    if (o.Geoloc?.Coordinate == null) continue;

                    var coord = o.Geoloc.Coordinate;

                    var placemark = new Placemark
                    {
                        Name = o.Name,
                        Geometry = new Point
                        {
                            Coordinate = new Vector(coord.Y, coord.X)
                        }
                    };

                    doc.AddFeature(placemark);
                }

                var kml = new Kml { Feature = doc };
                var serializer = new Serializer();
                serializer.Serialize(kml);

                var folder = Path.Combine("C:/Users/kirac/HeatMap Project/Frontend/public", "kml");
                if (!Directory.Exists(folder))
                    Directory.CreateDirectory(folder);

                var filePath = Path.Combine(folder, "points.kml");
                File.WriteAllText(filePath, serializer.Xml);

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"KML oluşturma hatası: {ex.Message}");
                return false;
            }
        }

    }
}
