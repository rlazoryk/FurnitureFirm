using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class Profits
    {
        public Profits()
        {
            Orders = new HashSet<Orders>();
        }

        public int ProfitId { get; set; }
        public int? Money { get; set; }

        public virtual ICollection<Orders> Orders { get; set; }
    }
}
