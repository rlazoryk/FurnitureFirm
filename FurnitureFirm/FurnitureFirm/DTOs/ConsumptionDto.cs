using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FurnitureFirm.DTOs
{
    public class ConsumptionDto
    {
        public DateTime Date { get; set; }
        public int ProductionId { get; set; }
        public string DetailName { get; set; }
        public int Count { get; set; }
    }
}
