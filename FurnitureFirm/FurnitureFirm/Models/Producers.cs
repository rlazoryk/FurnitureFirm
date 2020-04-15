using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class Producers
    {
        public Producers()
        {
            Details = new HashSet<Details>();
        }

        public int ProducerId { get; set; }
        public string Name { get; set; }
        public int? CountryId { get; set; }

        public virtual Countries Country { get; set; }
        public virtual ICollection<Details> Details { get; set; }
    }
}
