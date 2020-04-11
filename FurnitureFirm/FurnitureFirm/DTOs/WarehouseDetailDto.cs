using FurnitureFirm.Models;

namespace FurnitureFirm.DTOs
{
    public class WarehouseDetailDto
    {        
        public int WarehouseDetailId { get; set; }

        public int Count { get; set; }

        public DetailDto Detail { get; set; }

        public int WarehouseId { get; set; }
    }
}
