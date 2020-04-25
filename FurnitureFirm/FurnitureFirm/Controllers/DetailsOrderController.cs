using AutoMapper;
using FurnitureFirm.DTOs;
using FurnitureFirm.Helpers;
using FurnitureFirm.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FurnitureFirm.Controllers
{
    [ApiController]
    [Route("api/detailsOrder")]
    public class DetailsOrderController: ControllerBase
    {
        private readonly FurnitureFirmContext _context;

        private readonly IMapper _mapper;

        public DetailsOrderController(FurnitureFirmContext context, IMapper mapper)
        {
            _context = context;

            _mapper = mapper;
        }

        // GET: api/detailsOrder/providers
        [HttpGet("providers")]
        public async Task<ActionResult<IEnumerable<ProviderDto>>> GetProviders(int detailId)
        {
            return await _context.Providers
                .Select(p => _mapper.Map<ProviderDto>(p))
                .ToListAsync();
        }

        // GET: api/DetailsOrder
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OutDetailOrderDto>>> GetOrders()
        {
            var comings = await _context.Comings.Include(c => c.DetailOrderRow).ToListAsync();

            var result = await _context.DetailOrders
                .Include(o => o.Worker)
                .Include(o => o.Provider)
                .Select(o => _mapper.Map<OutDetailOrderDto>(o))
                .Select(o => Helper.IsOrderClosed(o, comings))
                .ToListAsync();

            return result;
        }

        // GET: api/DetailsOrder/1
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<OutDetailOrderRowDto>>> GetOrderRows([FromRoute]int id)
        {
            var orderRows = await _context.DetailOrderRows
                .Include(or => or.Detail)
                .ThenInclude(d => d.Color)
                .Include(or => or.Detail)
                .ThenInclude(d => d.Material)
                .Include(or => or.Detail)
                .ThenInclude(d => d.Producer)
                .Where(or => or.DetailOrderId == id)
                .Select(or => _mapper.Map<OutDetailOrderRowDto>(or))
                .ToListAsync();           

            if(orderRows.Count == 0)
            {
                return BadRequest();
            }

            return orderRows;
        }

        // POST: api/DetailsOrder
        [HttpPost]
        public async Task<IActionResult> PostOrder(InDetailOrderDto order)
        {
            var detailOrder = _mapper.Map<DetailOrders>(order);

            detailOrder.Date = DateTime.UtcNow;

            detailOrder.DetailOrderRows = order.OrderRows.Select(or => _mapper.Map<DetailOrderRows>(or)).ToList();

            _context.DetailOrders.Add(detailOrder);

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrderRows), new { id = order.DetailOrderId }, detailOrder);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder([FromRoute]int id)
        {
            var order = await _context.DetailOrders
                .Include(o => o.DetailOrderRows)
                .FirstOrDefaultAsync(o => o.DetailOrderId == id);

            if(order == null)
            {
                return BadRequest();
            }
            
            _context.Remove(order);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
