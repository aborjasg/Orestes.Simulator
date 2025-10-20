using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Orestes.Simulator.DataSource;
using Orestes.Simulator.DataSource.Models;

namespace Orestes.Simulator.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SystemParametersController : ControllerBase
    {
        private readonly OzoraSoftDBContext _context;

        public SystemParametersController(OzoraSoftDBContext context)
        {
            _context = context;
        }

        // GET: api/SystemParameters
        [HttpGet("{groupId}")]
        public async Task<ActionResult<IEnumerable<SystemParameter>>> GetSystemParameters(int groupId)
        {
            return await _context.SystemParameters.Where(sp => sp.Group_Id == groupId).ToListAsync();
        }

    }
}
