using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class Posts
    {
        public Posts()
        {
            Workers = new HashSet<Workers>();
        }

        public int PostId { get; set; }
        public string Name { get; set; }
        public int? Salary { get; set; }

        public virtual ICollection<Workers> Workers { get; set; }
    }
}
