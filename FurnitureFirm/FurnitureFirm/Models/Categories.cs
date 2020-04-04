using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class Categories
    {
        public Categories()
        {
            Furnitures = new HashSet<Furnitures>();
        }

        public int CategoryId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Furnitures> Furnitures { get; set; }
    }
}
