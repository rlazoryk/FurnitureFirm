using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FurnitureFirm.DTOs
{
    public class OrderRequestDto
    {
        public int TotalPrice { get; set; }
        public int WorkerId { get; set; }
        public int PaymentSystemId { get; set; }
        public CustomerDto Customer { get; set; }
        public DeliveryInfoDto DeliveryInfo { get; set; }
        public IEnumerable<FurnitureOrderRowDto> OrderedFurnitures { get; set; }
    }
}
