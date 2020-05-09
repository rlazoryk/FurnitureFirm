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
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace FurnitureFirm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductionsController : ControllerBase
    {
        private readonly FurnitureFirmContext _context;

        public ProductionsController(FurnitureFirmContext context)
        {
            _context = context;
        }

        [HttpGet("workers/{id}")]
        public async Task<ActionResult<int>> GetWorkersCount(int id)
        {
            return await _context.WorkerProduction
                .Where(wp => wp.ProductionId == id)
                .CountAsync();
        }

        [HttpGet("{workerId}")]
        public async Task<ActionResult<IEnumerable<Orders>>> WorkerProductions(int workerId)
        {
            return await _context.WorkerProduction
                .Where(wp => wp.WorkerId == workerId)
                .Include(wp => wp.Production)
                .ThenInclude(p => p.FurnitureOrderRow)
                .ThenInclude(r => r.Order)
                .Select(wp => wp.Production.FurnitureOrderRow.Order)
                .ToListAsync();
        }

        [HttpGet("start/{id}/{warehouseId}")]
        public async Task<ActionResult<Orders>> StartProduction(int id, int warehouseId)
        {
            var order = await _context.Orders
                .Where(o => o.OrderId == id)
                .Include(o => o.FurnitureOrderRows)
                .ThenInclude(r => r.Furniture)
                .ThenInclude(f => f.DetailsInFurnitures)
                .ThenInclude(r => r.AdditionalDetailsOrdered)
                .ThenInclude(a => a.DetailInFurniture)
                .FirstOrDefaultAsync();
            if (order == null)
            {
                return NotFound();
            }

            foreach (var row in order.FurnitureOrderRows)
            {
                //check if enough details
                var furnitureDetails = row.Furniture.DetailsInFurnitures
                    .Select(d => new { d.DetailId, Count = d.Count * row.Count})
                    .ToDictionary(k => k.DetailId);
                var additionalDetails = row.AdditionalDetailsOrdered
                    .Select(d => new { d.DetailInFurniture.DetailId, Count = d.Count * row.Count })
                    .ToDictionary(k => k.DetailId);
                var neededDetails = furnitureDetails.Concat(additionalDetails).GroupBy(d => d.Key)
                            .ToDictionary(d => d.Key,
                                d => new
                                {
                                    d.First().Value.DetailId,
                                    Count = d.Sum(d => d.Value.Count) as int?
                                });

                var warehouseDetails = await _context.WarehouseDetails
                    .Where(w => w.WarehouseId == warehouseId)
                    .Select(wd => new { wd.DetailId, wd.Count })
                    .ToDictionaryAsync(k => k.DetailId as int?);

                var missingDetails = new Dictionary<int, int>();

                foreach (var detail in neededDetails)
                {
                    if (!warehouseDetails.ContainsKey(detail.Key)
                        || warehouseDetails[detail.Key].Count < detail.Value.Count)
                    {
                        //not enough
                        missingDetails.Add((int)detail.Key, 
                            (int)(detail.Value.Count - warehouseDetails[detail.Key].Count));
                    }
                    warehouseDetails[detail.Key] = new
                    {
                        DetailId = (int)detail.Value.DetailId,
                        Count = warehouseDetails[detail.Key].Count - detail.Value.Count
                    };

                    //remove used details from warehouse
                    var wd = await _context.WarehouseDetails
                        .Where(wd => wd.DetailId == detail.Value.DetailId)
                        .FirstOrDefaultAsync();
                    wd.Count = warehouseDetails[detail.Key].Count;
                    _context.WarehouseDetails.Update(wd);
                }

                if(missingDetails.Any())
                {
                    return BadRequest(missingDetails);
                }

                //add production
                var production = new Productions()
                {
                    WarehouseId = warehouseId,
                    StartedDate = DateTime.Now,
                    FurnitureOrderRowId = row.FurnitureOrderRowId,
                };

                //add consumptions
                foreach (var detail in neededDetails)
                {
                    var consumption = new Consumptions()
                    {
                        Date = DateTime.Now,
                        WarehouseDetail = await _context.WarehouseDetails
                            .Where(wd => wd.DetailId == detail.Value.DetailId)
                            .FirstOrDefaultAsync(),
                        Count = (int)detail.Value.Count
                    };
                    production.Consumptions.Add(consumption);
                }

                _context.Productions.Add(production);
            }

            //change order status
            order.Status = OrderStatus.InProduction;
            _context.Orders.Update(order);

            await _context.SaveChangesAsync();

            return order;
        }

        [HttpGet("attach/{id}/{workerId}")]
        public async Task<ActionResult> AttachToProduction(int id, int workerId)
        {
            //change worker status
            var worker = await _context.Workers.Where(w => w.WorkerId == workerId).FirstOrDefaultAsync();
            worker.Status = "На виробництві";
            _context.Workers.Update(worker);

            var productions = await _context.Productions
                .Include(p => p.FurnitureOrderRow)
                .Where(p => p.FurnitureOrderRow.OrderId == id)
                .ToListAsync();

            //attach worker to productions
            foreach (var production in productions)
            {
                var workerProduction = new WorkerProduction()
                {
                    WorkerId = workerId,
                    ProductionId = production.ProductionId
                };
                production.WorkerProduction.Add(workerProduction);
                _context.Productions.Update(production);
            }

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("finish/{id}")]
        public async Task<ActionResult<Orders>> FinishProduction(int id)
        {
            var productions = await _context.Productions
                .Include(p => p.FurnitureOrderRow)
                .Where(p => p.FurnitureOrderRow.OrderId == id)
                .ToListAsync();

            //set finished date
            foreach (var production in productions)
            {
                production.DateFinished = DateTime.Now;
            }

            //change worker status
            var workers = await _context.WorkerProduction
                .Where(wp => wp.ProductionId == id)
                .Include(wp => wp.Worker)
                .Select(wp => wp.Worker)
                .ToListAsync();
            foreach (var worker in workers)
            {
                worker.Status = "Вільний";
            }
            _context.Workers.UpdateRange(workers);

            //update order status
            var order = await _context.Orders.FindAsync(id);
            order.Status = OrderStatus.WaitForDelivery;
            _context.Orders.Update(order);

            await _context.SaveChangesAsync();

            return order;
        }

        [HttpGet("delivery/start/{id}")]
        public async Task<ActionResult<Orders>> StartDelivery(int id)
        {
            var order = await _context.Orders
                .Where(o => o.OrderId == id)
                .Include(o => o.DeliveryInfo)
                .FirstOrDefaultAsync();
            if (order == null)
            {
                return NotFound();
            }

            order.Status = OrderStatus.Delivering;
            order.DeliveryInfo.DeliveryStarted = DateTime.Now;

            _context.Orders.Update(order);
            await _context.SaveChangesAsync();

            return order;
        }

        [HttpGet("delivery/finish/{id}")]
        public async Task<ActionResult<Orders>> FinishDelivery(int id)
        {
            var order = await _context.Orders
                .Where(o => o.OrderId == id)
                .Include(o => o.DeliveryInfo)
                .FirstOrDefaultAsync();
            if (order == null)
            {
                return NotFound();
            }

            order.Status = OrderStatus.Done;
            order.DeliveryInfo.DeliveryFinished = DateTime.Now;

            _context.Orders.Update(order);
            await _context.SaveChangesAsync();

            return order;
        }
    }
}
