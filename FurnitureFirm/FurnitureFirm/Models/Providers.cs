using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class Providers
    {
        public Providers()
        {
            DetailOrders = new HashSet<DetailOrders>();
            Details = new HashSet<Details>();
        }

        public int ProviderId { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public int CityId { get; set; }
        public string Street { get; set; }
        public int? Building { get; set; }

        public virtual Cities City { get; set; }
        public virtual ICollection<DetailOrders> DetailOrders { get; set; }
        public virtual ICollection<Details> Details { get; set; }
    }
}
