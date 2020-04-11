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

        //GET api/warehouse/names
        [HttpGet("names")]
        public async Task<IEnumerable<WarehouseNamesDto>> GetWarehouseInfo()
        {
            return await _context.Warehouses
                .Select(w => _mapper.Map<WarehouseNamesDto>(w))
                .ToListAsync();
        }

        //GET api/warehouse/1
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<WarehouseDetailDto>>> GetWarehouseDetails(int id)
        {
            var result = await _context.WarehouseDetails
                .Include(wd => wd.Detail)
                .ThenInclude(d => d.Color)
                .Include(wd => wd.Detail)
                .ThenInclude(d => d.Material)
                .Include(wd => wd.Detail)
                .ThenInclude(d => d.Producer)
                .Where(wd => wd.WarehouseId == id)
                .Select(wd => _mapper.Map<WarehouseDetailDto>(wd))
                .ToListAsync();

            return result;
        }

        //PUT api/details
        [HttpPut]
        public async Task<IActionResult> PutWarehouseDetails([FromBody]MovementDto movementDto)
        {
            var fromWarehouseDetail = await _context.WarehouseDetails.FirstOrDefaultAsync(wd => wd.WarehouseDetailId == movementDto.FromWarehouseDetailId);

            fromWarehouseDetail.Count -= movementDto.Count;

            var toWarehouseDetail = await _context.WarehouseDetails
                .Where(wd => wd.WarehouseId == movementDto.ToWarehouseId)
                .FirstOrDefaultAsync(wd => wd.DetailId == movementDto.DetailId);

            if(toWarehouseDetail == null)
            {
                toWarehouseDetail = new WarehouseDetails()
                {
                    DetailId = movementDto.DetailId,

                    WarehouseId = movementDto.ToWarehouseId,

                    Count = movementDto.Count
                };

                await _context.WarehouseDetails.AddAsync(toWarehouseDetail);
            }
            else
            {
                toWarehouseDetail.Count += movementDto.Count;
            }

            await _context.WarehouseMovements.AddAsync(new WarehouseMovements()
            {
                FromWarehouseDetailId = fromWarehouseDetail.WarehouseDetailId,

                ToWarehouseDetailId = toWarehouseDetail.WarehouseDetailId,

                Date = DateTime.UtcNow,

                WorkerId = movementDto.WorkerId               
            });

            return NoContent();
        }

        //POST api/warehouse
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
