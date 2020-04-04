using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class Workers
    {
        public Workers()
        {
            Comings = new HashSet<Comings>();
            DetailOrders = new HashSet<DetailOrders>();
            Orders = new HashSet<Orders>();
            WarehouseMovements = new HashSet<WarehouseMovements>();
            WorkerProduction = new HashSet<WorkerProduction>();
        }

        public int WorkerId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
        public int PostId { get; set; }
        public string Status { get; set; }

        public virtual Posts Post { get; set; }
        public virtual ICollection<Comings> Comings { get; set; }
        public virtual ICollection<DetailOrders> DetailOrders { get; set; }
        public virtual ICollection<Orders> Orders { get; set; }
        public virtual ICollection<WarehouseMovements> WarehouseMovements { get; set; }
        public virtual ICollection<WorkerProduction> WorkerProduction { get; set; }
    }
}
