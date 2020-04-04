using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class Collections
    {
        public Collections()
        {
            Furnitures = new HashSet<Furnitures>();
        }

        public int CollectionId { get; set; }
        public string Name { get; set; }
        public int? StyleId { get; set; }

        public virtual Styles Style { get; set; }
        public virtual ICollection<Furnitures> Furnitures { get; set; }
    }
}
