using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class Customers
    {
        public Customers()
        {
            Orders = new HashSet<Orders>();
        }

        public int CustomerId { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }

        public virtual ICollection<Orders> Orders { get; set; }
    }
}
