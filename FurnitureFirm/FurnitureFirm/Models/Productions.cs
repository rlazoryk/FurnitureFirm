using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class Productions
    {
        public Productions()
        {
            Consumptions = new HashSet<Consumptions>();
            WorkerProduction = new HashSet<WorkerProduction>();
        }

        public int ProductionId { get; set; }
        public int? WarehouseId { get; set; }
        public DateTime StartedDate { get; set; }
        public int? FurnitureOrderRowId { get; set; }
        public DateTime? DateFinished { get; set; }

        public virtual FurnitureOrderRows FurnitureOrderRow { get; set; }
        public virtual ICollection<Consumptions> Consumptions { get; set; }
        public virtual ICollection<WorkerProduction> WorkerProduction { get; set; }
    }
}
