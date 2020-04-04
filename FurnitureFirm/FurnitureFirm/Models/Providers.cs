using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class Providers
    {
        public Providers()
        {
            DetailOrders = new HashSet<DetailOrders>();
            ProviderProducer = new HashSet<ProviderProducer>();
        }

        public int ProviderId { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public int CityId { get; set; }
        public string Street { get; set; }
        public string Building { get; set; }

        public virtual Cities City { get; set; }
        public virtual ICollection<DetailOrders> DetailOrders { get; set; }
        public virtual ICollection<ProviderProducer> ProviderProducer { get; set; }
    }
}
