using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class Consumptions
    {
        public int ConsumptionId { get; set; }
        public DateTime Date { get; set; }
        public int ProductionId { get; set; }
        public int WarehouseDetailId { get; set; }
        public int Count { get; set; }

        public virtual Productions Production { get; set; }
        public virtual WarehouseDetails WarehouseDetail { get; set; }
    }
}
