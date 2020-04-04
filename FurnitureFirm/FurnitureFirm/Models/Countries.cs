using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class Countries
    {
        public Countries()
        {
            Cities = new HashSet<Cities>();
            Producers = new HashSet<Producers>();
        }

        public int CountryId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Cities> Cities { get; set; }
        public virtual ICollection<Producers> Producers { get; set; }
    }
}
