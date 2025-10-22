﻿using System;
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
    public class OrganizationPoliciesController : ControllerBase
    {
        private readonly OzoraSoftDBContext _context;

        public OrganizationPoliciesController(OzoraSoftDBContext context)
        {
            _context = context;
        }

        // GET: api/OrganizationPolicies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrganizationPolicy>>> GetOrganizationPolicies()
        {
            return await _context.OrganizationPolicies.ToListAsync();
        }

        // GET: api/OrganizationPolicies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrganizationPolicy>> GetOrganizationPolicy(int id)
        {
            var organizationPolicy = await _context.OrganizationPolicies.FindAsync(id);

            if (organizationPolicy == null)
            {
                return NotFound();
            }

            return organizationPolicy;
        }
    }
}
