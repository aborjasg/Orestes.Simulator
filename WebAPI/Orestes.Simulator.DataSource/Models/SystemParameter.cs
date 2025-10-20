using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Orestes.Simulator.DataSource.Models
{
    public class SystemParameter
    {
        public int Group_Id { get; set; } = 0;
        public int Id { get; set; } = 0;
        public string Name { get; set; } = "";
        public bool Active { get; set; } = false;
    }
}
