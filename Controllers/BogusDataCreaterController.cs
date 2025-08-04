using HeatMap.ResponseModel;
using HeatMap.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HeatMap.Controllers
{
    [Route("api/[controller]/[action]")]
    public class BogusDataCreaterController : ControllerBase
    {
        private readonly IBogusService bogusService;

        public BogusDataCreaterController(IBogusService bogusService)
        {
            this.bogusService = bogusService;
        }

        /// <summary>
        /// Girilen sayı kadar Türkiye sınırları içerisinde veri üretip kaydeder.
        /// </summary>
        [HttpPost]
        public async Task<Response> GenerateFakePointData(int count)
        {
            var response = new Response();

            try
            {
                response.Data = await bogusService.CreateFakeDataAsync(count);

                response.Success = true;

                response.Message = Messages.FakeDataGeneratedSuccessfully;
            }
            catch
            {
                response.Message += Messages.FakeDataGeneratedError;
            }

            return response;
        }
    }
}
