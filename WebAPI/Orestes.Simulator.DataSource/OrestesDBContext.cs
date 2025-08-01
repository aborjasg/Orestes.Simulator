using Microsoft.EntityFrameworkCore;
using Orestes.Simulator.DataSource.Models;

namespace Orestes.Simulator.DataSource
{
    public class OrestesDBContext : DbContext
    {
        public OrestesDBContext(DbContextOptions<OrestesDBContext> options) : base(options) { }

        // Models
        public DbSet<Customer> Customers { get; set; }

        // Initializer
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=OrestesDB;Trusted_Connection=True;");
        }
    }
}
