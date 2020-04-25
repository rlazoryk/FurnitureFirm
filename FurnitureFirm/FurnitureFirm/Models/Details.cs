using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class Details
    {
        public Details()
        {
            DetailOrderRows = new HashSet<DetailOrderRows>();
            DetailsInFurnitures = new HashSet<DetailsInFurnitures>();
            WarehouseDetails = new HashSet<WarehouseDetails>();
        }

        public int DetailId { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int ColorId { get; set; }
        public int MaterialId { get; set; }
        public int ProducerId { get; set; }
        public int ProviderId { get; set; }
        public string Description { get; set; }

        public virtual Colors Color { get; set; }
        public virtual Materials Material { get; set; }
        public virtual Producers Producer { get; set; }
        public virtual Providers Provider { get; set; }
        public virtual ICollection<DetailOrderRows> DetailOrderRows { get; set; }
        public virtual ICollection<DetailsInFurnitures> DetailsInFurnitures { get; set; }
        public virtual ICollection<WarehouseDetails> WarehouseDetails { get; set; }
    }
}
