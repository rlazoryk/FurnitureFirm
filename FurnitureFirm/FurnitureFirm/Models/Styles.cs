using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class Styles
    {
        public Styles()
        {
            Collections = new HashSet<Collections>();
        }

        public int StyleId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Collections> Collections { get; set; }
    }
}
