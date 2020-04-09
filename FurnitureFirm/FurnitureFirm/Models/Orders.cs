using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class Orders
    {
        public Orders()
        {
            FurnitureOrderRows = new HashSet<FurnitureOrderRows>();
        }

        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public int TotalPrice { get; set; }
        public int WorkerId { get; set; }
        public int PaymentSystemId { get; set; }
        public int CustomerId { get; set; }
        public int DeliveryInfoId { get; set; }
        public int ProfitId { get; set; }
        public string Status { get; set; }

        public virtual Customers Customer { get; set; }
        public virtual DeliveryInfos DeliveryInfo { get; set; }
        public virtual PaymentSystems PaymentSystem { get; set; }
        public virtual Profits Profit { get; set; }
        public virtual Workers Worker { get; set; }
        public virtual ICollection<FurnitureOrderRows> FurnitureOrderRows { get; set; }
    }
}
