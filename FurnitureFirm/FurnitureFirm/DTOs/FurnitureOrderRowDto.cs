using System.Collections.Generic;

namespace FurnitureFirm.DTOs
{
    public class FurnitureOrderRowDto
    {
        public int Count { get; set; }
        public int TotalFurniturePrice { get; set; }
        public int FurnitureId { get; set; }
        public IEnumerable<AdditionalDetailsOrderedDto> AdditionalDetailsOrdered { get; set; }
    }
}