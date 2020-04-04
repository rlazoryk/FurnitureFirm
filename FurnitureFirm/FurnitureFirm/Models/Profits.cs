using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class Profits
    {
        public int ProfitId { get; set; }
        public int? Money { get; set; }
        public int? OrderId { get; set; }

        public virtual Orders Order { get; set; }
    }
}
