using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class DetailOrderRows
    {
        public DetailOrderRows()
        {
            Comings = new HashSet<Comings>();
        }

        public int DetailOrderRowId { get; set; }
        public int? Count { get; set; }
        public int? OrderedDetailPrice { get; set; }
        public int? DetailId { get; set; }
        public int? DetailOrderId { get; set; }

        public virtual Details Detail { get; set; }
        public virtual DetailOrders DetailOrder { get; set; }
        public virtual ICollection<Comings> Comings { get; set; }
    }
}
