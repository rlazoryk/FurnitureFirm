using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FurnitureFirm.DTOs
{
    public class FurnitureDto
    {
        public int FurnitureId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? Height { get; set; }
        public int? Width { get; set; }
        public int? Depth { get; set; }
        public CollectionDto Collection { get; set; }
        public int? Price { get; set; }
    }
}
