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
            return await _context.Orders.ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Orders>> GetOrders(int id)
        {
            var orders = await _context.Orders.FindAsync(id);

            if (orders == null)
            {
                return NotFound();
            }

            return orders;
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
                    .ForMember(o => o.Profit.Money, opt => opt.MapFrom(o => o.OrderedFurnitures
                           .Sum(of => of.TotalFurniturePrice / 6)));
            }).CreateMapper();

            var order = mapper.Map<Orders>(orderDto);

            _context.Orders.Add(order);

            await _context.SaveChangesAsync();
            return CreatedAtAction("GetOrders", new { id = order.OrderId }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Orders>> DeleteOrders(int id)
        {
            var orders = await _context.Orders.FindAsync(id);
            if (orders == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(orders);
            await _context.SaveChangesAsync();

            return orders;
        }

        private bool OrdersExists(int id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
    }
}
