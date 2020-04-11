using System.Collections.Generic;

namespace FurnitureFirm.DTOs
{
    public class InDetailOrderDto
    {
        public int DetailOrderId { get; set; }

        public double TotalPrice { get; set; }

        public int ProviderId { get; set; }

        public int WorkerId { get; set; }

        public List<InDetailOrderRowDto> OrderRows { get; set; }
    }
}
