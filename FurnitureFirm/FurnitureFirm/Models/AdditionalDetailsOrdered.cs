using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class AdditionalDetailsOrdered
    {
        public int AdditionalDetailId { get; set; }
        public int? Count { get; set; }
        public int? FurnitureOrderRowId { get; set; }
        public int? DetailInFurnitureId { get; set; }

        public virtual DetailsInFurnitures DetailInFurniture { get; set; }
        public virtual FurnitureOrderRows FurnitureOrderRow { get; set; }
    }
}
