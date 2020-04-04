using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class FurnitureOrderRows
    {
        public FurnitureOrderRows()
        {
            AdditionalDetailsOrdered = new HashSet<AdditionalDetailsOrdered>();
            Productions = new HashSet<Productions>();
        }

        public int FurnitureOrderRowId { get; set; }
        public int? Count { get; set; }
        public int? TotalFurniturePrice { get; set; }
        public int? OrderId { get; set; }
        public int? FurnitureId { get; set; }
        public int? MarkUp { get; set; }

        public virtual Furnitures Furniture { get; set; }
        public virtual Orders Order { get; set; }
        public virtual ICollection<AdditionalDetailsOrdered> AdditionalDetailsOrdered { get; set; }
        public virtual ICollection<Productions> Productions { get; set; }
    }
}
