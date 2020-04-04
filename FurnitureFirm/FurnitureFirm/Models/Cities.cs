using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class Cities
    {
        public Cities()
        {
            DeliveryInfos = new HashSet<DeliveryInfos>();
            Providers = new HashSet<Providers>();
            Warehouses = new HashSet<Warehouses>();
        }

        public int CityId { get; set; }
        public string Name { get; set; }
        public int CountryId { get; set; }

        public virtual Countries Country { get; set; }
        public virtual ICollection<DeliveryInfos> DeliveryInfos { get; set; }
        public virtual ICollection<Providers> Providers { get; set; }
        public virtual ICollection<Warehouses> Warehouses { get; set; }
    }
}
