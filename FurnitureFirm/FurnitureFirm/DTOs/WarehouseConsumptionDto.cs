using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FurnitureFirm.DTOs
{
    public class WarehouseConsumptionDto
    {
        public WarehouseNamesDto Warehouse { get; set; }

        public List<ConsumptionDto> Consumptions { get; set; }
    }
}
