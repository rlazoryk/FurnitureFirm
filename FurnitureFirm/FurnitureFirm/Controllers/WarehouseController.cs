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

        //GET api/warehouse/comings
        [HttpGet("comings")]
        public async Task<ActionResult<IEnumerable<WarehouseComingDto>>> GetComings()
        {
            var warehouses = await _context.Warehouses.ToListAsync();

            var warehousesIds = warehouses.Select(w => w.WarehouseId).ToList();

            List<WarehouseComingDto> warehouseComingDtos = new List<WarehouseComingDto>();

            foreach(var w in warehousesIds)
            { 
                warehouseComingDtos.Add(new WarehouseComingDto()
                {
                    Warehouse = _mapper.Map<WarehouseNamesDto>(warehouses.FirstOrDefault(wr => wr.WarehouseId == w)),
                        
                    Comings = await _context.Comings
                        .Include(c => c.DetailOrderRow)
                        .Include(c => c.DetailOrderRow)
                        .ThenInclude(or => or.Detail)
                        .Include(c => c.Worker)
                        .Include(c => c.WarehouseDetail)
                        .Where(c => c.WarehouseDetail.WarehouseId == w)
                        .Select(c => _mapper.Map<ComingDto>(c))
                        .ToListAsync()               
                });
            }

            return warehouseComingDtos;
        }

        //GET api/warehouse/consumptions
        [HttpGet("consumptions")]
        public async Task<ActionResult<IEnumerable<WarehouseConsumptionDto>>> GetConsumptions()
        {
            var warehouses = await _context.Warehouses.ToListAsync();

            var warehousesIds = warehouses.Select(w => w.WarehouseId).ToList();

            List<WarehouseConsumptionDto> warehouseConsumptionDtos = new List<WarehouseConsumptionDto>();

            foreach (var w in warehousesIds)
            {
                warehouseConsumptionDtos.Add(new WarehouseConsumptionDto()
                {
                    Warehouse = _mapper.Map<WarehouseNamesDto>(warehouses.FirstOrDefault(wr => wr.WarehouseId == w)),

                    Consumptions = await _context.Consumptions
                        .Include(c => c.WarehouseDetail)
                        .ThenInclude(c => c.Detail)
                        .Where(c => c.WarehouseDetail.WarehouseId.Value == w)
                        .Select(c => _mapper.Map<ConsumptionDto>(c))
                        .ToListAsync()
                });
            }

            return warehouseConsumptionDtos;
        }

        //PUT api/details
        [HttpPut]
        public async Task<IActionResult> PutWarehouseDetails([FromBody]MovementDto[] movementDtos)
        {
            foreach(var movementDto in movementDtos)
            {
                var fromWarehouseDetail = await _context.WarehouseDetails.FirstOrDefaultAsync(wd => wd.WarehouseDetailId == movementDto.FromWarehouseDetailId);

                fromWarehouseDetail.Count -= movementDto.Count;

                var toWarehouseDetail = await _context.WarehouseDetails
                    .Where(wd => wd.WarehouseId == movementDto.ToWarehouseId)
                    .FirstOrDefaultAsync(wd => wd.DetailId == movementDto.DetailId);

                if (toWarehouseDetail == null)
                {
                    toWarehouseDetail = new WarehouseDetails()
                    {
                        DetailId = movementDto.DetailId,

                        WarehouseId = movementDto.ToWarehouseId,

                        Count = movementDto.Count
                    };
                }
                else
                {
                    toWarehouseDetail.Count += movementDto.Count;
                }

                await _context.WarehouseMovements.AddAsync(new WarehouseMovements()
                {
                    FromWarehouseDetailId = fromWarehouseDetail.WarehouseDetailId,

                    ToWarehouseDetail = toWarehouseDetail,

                    Date = DateTime.UtcNow,

                    WorkerId = movementDto.WorkerId,

                    Count = movementDto.Count
                });
            }            

            await _context.SaveChangesAsync();

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

                if (warehouseDetail == null)
                {
                    warehouseDetail = new WarehouseDetails()
                    {
                        WarehouseId = confirmOrderDto.WarehouseId,

                        DetailId = row.DetailId.Value,

                        Count = row.Count
                    };
                }
                else
                {
                    warehouseDetail.Count += row.Count;
                }

                await _context.Comings.AddAsync(new Comings
                {
                    Date = DateTime.UtcNow,

                    DetailOrderRowId = row.DetailOrderRowId,

                    WarehouseDetail = warehouseDetail,

                    WorkerId = confirmOrderDto.WorkerId
                });                              
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
