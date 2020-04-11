using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FurnitureFirm.DTOs
{
    public class MovementDto
    {
        public int FromWarehouseDetailId { get; set; }
        public int ToWarehouseId { get; set; }
        public int DetailId { get; set; }
        public int Count { get; set; }
        public int WorkerId { get; set; }
    }
}
