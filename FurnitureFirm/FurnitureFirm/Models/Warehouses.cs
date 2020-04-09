using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class Warehouses
    {
        public Warehouses()
        {
            Productions = new HashSet<Productions>();
            WarehouseDetails = new HashSet<WarehouseDetails>();
        }

        public int WarehouseId { get; set; }
        public string Street { get; set; }
        public int? Building { get; set; }
        public int CityId { get; set; }

        public virtual Cities City { get; set; }
        public virtual ICollection<Productions> Productions { get; set; }
        public virtual ICollection<WarehouseDetails> WarehouseDetails { get; set; }
    }
}
