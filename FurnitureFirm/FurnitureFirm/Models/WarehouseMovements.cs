using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class WarehouseMovements
    {
        public int WarehouseMovementId { get; set; }
        public DateTime Date { get; set; }
        public int FromWarehouseDetailId { get; set; }
        public int ToWarehouseDetailId { get; set; }
        public int? WorkerId { get; set; }
        public int Count { get; set; }

        public virtual WarehouseDetails FromWarehouseDetail { get; set; }
        public virtual WarehouseDetails ToWarehouseDetail { get; set; }
        public virtual Workers Worker { get; set; }
    }
}
