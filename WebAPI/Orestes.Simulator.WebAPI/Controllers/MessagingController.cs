using Microsoft.AspNetCore.Mvc;
using Orestes.SharedLibrary;
using Orestes.Simulator.WebAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Orestes.Simulator.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagingController : ControllerBase
    {
        // POST api/compress
        [HttpPost("compress")]
        public Task<Message> Compress([FromBody] Message message)
        {
            return Task.FromResult(new Message()
            {
                Compressed = UtilsForMessages.Compress(message.Uncompressed)
            });
        }

        // POST api/decompress
        [HttpPost("decompress")]
        public Task<Message> Decompress([FromBody] Message message)
        {
            return Task.FromResult(new Message()
            {
                Uncompressed = UtilsForMessages.Decompress(message.Compressed)
            });
        }
    }
}
