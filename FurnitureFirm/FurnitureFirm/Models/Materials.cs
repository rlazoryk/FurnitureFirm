using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class Materials
    {
        public Materials()
        {
            Details = new HashSet<Details>();
        }

        public int MaterialId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Details> Details { get; set; }
    }
}
