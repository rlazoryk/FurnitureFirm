using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FurnitureFirm.Models;
using FurnitureFirm.DTOs;
using AutoMapper;
using FurnitureFirm.Common;

namespace FurnitureFirm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly FurnitureFirmContext _context;

        public OrdersController(FurnitureFirmContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet("paymentSystems")]
        public async Task<ActionResult<IEnumerable<PaymentSystems>>> GetPaymentSystems()
        {
            return await _context.PaymentSystems.ToListAsync();
        }

        // GET: api/Orders
        [HttpGet("cities")]
        public async Task<ActionResult<IEnumerable<Cities>>> GetCities()
        {
            return await _context.Cities.Where(c => c.Country.Name == "Україна").ToListAsync();
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Orders>>> GetOrders()
        {
            return await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.DeliveryInfo)
                .ThenInclude(d => d.City)
                .Include(o => o.Profit)
                .Include(o => o.FurnitureOrderRows)
                .ThenInclude(f => f.Furniture)
                .ToListAsync();
        }

        // POST: api/Orders
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Orders>> PostOrders([FromBody] OrderRequestDto orderDto)
        {
            var mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<DeliveryInfoDto, DeliveryInfos>();

                cfg.CreateMap<CustomerDto, Customers>();

                cfg.CreateMap<AdditionalDetailsOrderedDto, AdditionalDetailsOrdered>();

                cfg.CreateMap<FurnitureOrderRowDto, FurnitureOrderRows>();

                cfg.CreateMap<OrderRequestDto, Orders>()
                    .ForMember(o => o.OrderDate, opt => opt.MapFrom(_ => DateTime.Now))
                    .ForMember(o => o.Status, opt => opt.MapFrom(_ => OrderStatus.Accepted))
                    .ForMember(o => o.FurnitureOrderRows, opt => opt.MapFrom(o => o.OrderedFurnitures))
                    .ForPath(o => o.Profit.Money, opt => opt.MapFrom(o => o.TotalPrice / 6));
            }).CreateMapper();

            var order = mapper.Map<Orders>(orderDto);

            _context.Orders.Add(order);

            await _context.SaveChangesAsync();
            return CreatedAtAction("GetOrders", new { id = order.OrderId }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Orders>> CancelOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            order.Status = OrderStatus.Canceled;
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();

            return order;
        }
    }
}
