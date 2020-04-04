using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class WarehouseDetails
    {
        public WarehouseDetails()
        {
            Comings = new HashSet<Comings>();
            Consumptions = new HashSet<Consumptions>();
            WarehouseMovementsFromWarehouseDetail = new HashSet<WarehouseMovements>();
            WarehouseMovementsToWarehouseDetail = new HashSet<WarehouseMovements>();
        }

        public int WarehouseDetailId { get; set; }
        public int? Count { get; set; }
        public int DetailId { get; set; }
        public int? WarehouseId { get; set; }

        public virtual Details Detail { get; set; }
        public virtual Warehouses Warehouse { get; set; }
        public virtual ICollection<Comings> Comings { get; set; }
        public virtual ICollection<Consumptions> Consumptions { get; set; }
        public virtual ICollection<WarehouseMovements> WarehouseMovementsFromWarehouseDetail { get; set; }
        public virtual ICollection<WarehouseMovements> WarehouseMovementsToWarehouseDetail { get; set; }
    }
}
