using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Orestes.Simulator.DataSource;
using Orestes.Simulator.DataSource.Models;
using Orestes.Simulator.WebAPI.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Orestes.Simulator.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]    
    public class CustomersController : ControllerBase
    {
        private readonly OrestesDBContext _context;        
        private readonly IJwtSettings _settings;

        public CustomersController(OrestesDBContext context, IJwtSettings settings)
        {
            _context = context;
            _settings = settings;
        }

        // GET: api/Customers
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            return await _context.Customers.ToListAsync();
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }
    }
}
