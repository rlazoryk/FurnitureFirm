using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class WorkerProduction
    {
        public int WorkerId { get; set; }
        public int ProductionId { get; set; }

        public virtual Productions Production { get; set; }
        public virtual Workers Worker { get; set; }
    }
}
