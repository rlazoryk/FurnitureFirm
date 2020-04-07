using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class DetailsInFurnitures
    {
        public DetailsInFurnitures()
        {
            AdditionalDetailsOrdered = new HashSet<AdditionalDetailsOrdered>();
        }

        public int DetailInFurnitureId { get; set; }
        public int? Count { get; set; }
        public int? DetailId { get; set; }
        public int? FurnitureId { get; set; }
        public byte? IsAdditional { get; set; }
        public int? TimeToIntegrate { get; set; }

        public virtual Details Detail { get; set; }
        public virtual Furnitures Furniture { get; set; }
        public virtual ICollection<AdditionalDetailsOrdered> AdditionalDetailsOrdered { get; set; }
    }
}
