using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FurnitureFirm.DTOs
{
    public class WarehouseComingDto
    {
        public WarehouseNamesDto Warehouse { get; set; }

        public List<ComingDto> Comings { get; set; }
    }
}
