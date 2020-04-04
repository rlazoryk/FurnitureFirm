using System;
using System.Collections.Generic;

namespace FurnitureFirm.Models
{
    public partial class ProviderProducer
    {
        public int ProviderId { get; set; }
        public int ProducerId { get; set; }

        public virtual Producers Producer { get; set; }
        public virtual Providers Provider { get; set; }
    }
}
