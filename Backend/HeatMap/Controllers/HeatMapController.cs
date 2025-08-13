using HeatMap.Data.GenericRepository;
using HeatMap.Data.UnitOfWork;
using HeatMap.Models.Entities;
using HeatMap.ResponseModel;
using HeatMap.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Object = HeatMap.Models.Entities.Object;

namespace HeatMap.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HeatMapController : ControllerBase
    {
        private readonly IObjectService objectService;
        public HeatMapController(IObjectService _objectService)
        {
            objectService = _objectService;
        }

        [HttpGet]
        public async Task<Response> GetAll()
        {
            var response = new Response();

            try
            {
                response.Data = await objectService.GetAllAsync();

                response.Success = true;

                response.Message = Messages.AllDataReturnedSuccessfully;

                return response;
            }
            catch
            {
                response.Message = Messages.AllDataReturnError;

                return response;
            }
        }
    }
}
