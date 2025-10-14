using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using OpenAI;
using OpenAI.Chat;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Orestes.Simulator.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OpenAIController : ControllerBase
    {
        // GET: api/<OpenAIController>
        [HttpGet]
        public async Task<string>  Get()
        {
            string apiKey = "";
            var api = new OpenAIClient(apiKey);
            var chatClient = new ChatClient("gpt-4o", apiKey);

            var messages = new List<ChatMessage>
            {
            new SystemChatMessage("You are a helpful assistant."),
            new UserChatMessage($"Here is some formatted text:\n\n")
            };

            var completion = await chatClient.CompleteChatAsync(messages);
            var responseMessage = string.Empty; // completion.Content[0].Text;

            return responseMessage;
        }
        
    }
}
