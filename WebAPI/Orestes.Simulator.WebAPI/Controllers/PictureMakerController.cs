using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Orestes.SharedLibrary;
using Orestes.SharedLibrary.PictureMaker;
using Orestes.SharedLibrary.PictureMaker.Models;
using System.Net.Http;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Orestes.Simulator.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PictureMakerController : ControllerBase
    {
        [HttpPost("getSourceData")]
        public ActionResponse getSourceData([FromBody] DerivedDataFilter filter)
        {
            var result = new ActionResponse();
            try
            {
                var orchestration = new Orchestration();
                result = orchestration.getSourceData(filter);
            }
            catch (Exception ex)
            {
                result.Type = "Error";
                result.Message = ex.Message;
            }
            result.EndDate = DateTime.Now;
            return result;
        }

        [HttpPost("processData")]
        public ActionResponse processData([FromBody] DerivedDataFilter filter)
        {
            var result = new ActionResponse();
            try
            {
                var orchestration = new Orchestration();
                result = orchestration.processData(filter);
            }
            catch (Exception ex)
            {
                result.Type = "Error";
                result.Message = ex.Message;
            }
            result.EndDate = DateTime.Now;
            return result;
        }

    }
}
