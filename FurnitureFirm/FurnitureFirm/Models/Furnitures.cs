using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class Furnitures
    {
        public Furnitures()
        {
            DetailsInFurnitures = new HashSet<DetailsInFurnitures>();
            FurnitureOrderRows = new HashSet<FurnitureOrderRows>();
        }

        public int FurnitureId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? TimeToBuild { get; set; }
        public int? CategoryId { get; set; }
        public int? Height { get; set; }
        public int? Width { get; set; }
        public int? Depth { get; set; }
        public int? CollectionId { get; set; }
        public int? Price { get; set; }

        public virtual Categories Category { get; set; }
        public virtual Collections Collection { get; set; }
        public virtual ICollection<DetailsInFurnitures> DetailsInFurnitures { get; set; }
        public virtual ICollection<FurnitureOrderRows> FurnitureOrderRows { get; set; }
    }
}
