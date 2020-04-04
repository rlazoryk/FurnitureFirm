using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class Orders
    {
        public Orders()
        {
            DeliveryInfos = new HashSet<DeliveryInfos>();
            FurnitureOrderRows = new HashSet<FurnitureOrderRows>();
            Profits = new HashSet<Profits>();
        }

        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public int TotalPrice { get; set; }
        public int WorkerId { get; set; }
        public int PaymentSystemId { get; set; }
        public int CustomerId { get; set; }
        public string Status { get; set; }

        public virtual Customers Customer { get; set; }
        public virtual PaymentSystems PaymentSystem { get; set; }
        public virtual Workers Worker { get; set; }
        public virtual ICollection<DeliveryInfos> DeliveryInfos { get; set; }
        public virtual ICollection<FurnitureOrderRows> FurnitureOrderRows { get; set; }
        public virtual ICollection<Profits> Profits { get; set; }
    }
}
