using AutoMapper;
using FurnitureFirm.DTOs;
using FurnitureFirm.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FurnitureFirm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarehouseController: ControllerBase
    {
        private readonly FurnitureFirmContext _context;

        private readonly IMapper _mapper;

        public WarehouseController(FurnitureFirmContext context, IMapper mapper)
        {
            _context = context;

            _mapper = mapper;
        }

        //Get api/warehouse/names
        [HttpGet("names")]
        public async Task<IEnumerable<WarehouseNamesDto>> GetWarehouseInfo()
        {
            return await _context.Warehouses
                .Select(w => _mapper.Map<WarehouseNamesDto>(w))
                .ToListAsync();
        }

        //Post api/warehouse
        [HttpPost]
        public async Task<IActionResult> AcceptDetailsToWarehouse([FromBody]ConfirmOrderDto confirmOrderDto)
        {
            var order = await _context.DetailOrders
                .Include(o => o.DetailOrderRows)
                .FirstOrDefaultAsync(o => o.DetailOrderId == confirmOrderDto.DetailOrderId);
            
            if(order == null)
            {
                return BadRequest();
            }

            var warehouseDetails = await _context.WarehouseDetails.Where(wd => wd.WarehouseId == confirmOrderDto.WarehouseId).ToListAsync();

            foreach (var row in order.DetailOrderRows)
            {
                var warehouseDetail = warehouseDetails.FirstOrDefault(wd => wd.DetailId == row.DetailId);

                if(warehouseDetail == null)
                {
                    _context.Comings.Add(new Comings
                    {
                        Date = DateTime.UtcNow,

                        DetailOrderRowId = row.DetailOrderRowId,

                        WarehouseDetail = new WarehouseDetails()
                        {
                            WarehouseId = confirmOrderDto.WarehouseId,

                            DetailId = row.DetailId.Value,

                            Count = row.Count
                        },

                        WorkerId = confirmOrderDto.WorkerId
                    });
                }
                else
                {
                    warehouseDetail.Count += row.Count;

                    _context.Comings.Add(new Comings
                    {
                        Date = DateTime.UtcNow,

                        DetailOrderRowId = row.DetailOrderRowId,

                        WarehouseDetailId = warehouseDetail.WarehouseDetailId,

                        WorkerId = confirmOrderDto.WorkerId
                    });
                }
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
