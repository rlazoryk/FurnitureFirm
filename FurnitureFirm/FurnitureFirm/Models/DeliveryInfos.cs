using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class DeliveryInfos
    {
        public DeliveryInfos()
        {
            Orders = new HashSet<Orders>();
        }

        public int DeliveryInfoId { get; set; }
        public int? DeliveryPrice { get; set; }
        public string Street { get; set; }
        public int? Building { get; set; }
        public int CityId { get; set; }
        public DateTime? DeliveryStarted { get; set; }
        public DateTime? DeliveryFinished { get; set; }

        public virtual Cities City { get; set; }
        public virtual ICollection<Orders> Orders { get; set; }
    }
}
