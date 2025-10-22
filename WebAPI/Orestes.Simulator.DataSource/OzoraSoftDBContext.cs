using Microsoft.EntityFrameworkCore;
using Orestes.Simulator.DataSource.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Orestes.Simulator.DataSource
{
    public class OzoraSoftDBContext : DbContext
    {
        public OzoraSoftDBContext(DbContextOptions<OzoraSoftDBContext> options) : base(options) { }

        // Models
        public DbSet<SystemParameter> SystemParameters { get; set; }
        public DbSet<OrganizationPolicy> OrganizationPolicies { get; set; }        

        // Initializer
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            
        }
    }
}
