using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class Colors
    {
        public Colors()
        {
            Details = new HashSet<Details>();
        }

        public int ColorId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Details> Details { get; set; }
    }
}
