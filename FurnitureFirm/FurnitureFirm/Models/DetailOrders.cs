using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class DetailOrders
    {
        public DetailOrders()
        {
            DetailOrderRows = new HashSet<DetailOrderRows>();
        }

        public int DetailOrderId { get; set; }
        public DateTime? Date { get; set; }
        public int? TotalPrice { get; set; }
        public int ProviderId { get; set; }
        public int? WorkerId { get; set; }

        public virtual Providers Provider { get; set; }
        public virtual Workers Worker { get; set; }
        public virtual ICollection<DetailOrderRows> DetailOrderRows { get; set; }
    }
}
