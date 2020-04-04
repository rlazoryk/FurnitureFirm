using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class Comings
    {
        public int ComingId { get; set; }
        public DateTime Date { get; set; }
        public int WarehouseDetailId { get; set; }
        public int? DetailOrderRowId { get; set; }
        public int? WorkerId { get; set; }

        public virtual DetailOrderRows DetailOrderRow { get; set; }
        public virtual WarehouseDetails WarehouseDetail { get; set; }
        public virtual Workers Worker { get; set; }
    }
}
