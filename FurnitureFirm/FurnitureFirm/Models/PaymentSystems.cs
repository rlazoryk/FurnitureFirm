using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class PaymentSystems
    {
        public PaymentSystems()
        {
            Orders = new HashSet<Orders>();
        }

        public int PaymentSystemId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Orders> Orders { get; set; }
    }
}
