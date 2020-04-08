using AutoMapper;
using AutoMapper.QueryableExtensions;
using FurnitureFirm.DTOs;
using FurnitureFirm.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FurnitureFirm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetailsController : ControllerBase
    {
        private readonly FurnitureFirmContext _context;

        public DetailsController(FurnitureFirmContext context)
        {
            _context = context;
        }


        // GET: api/Details/materials
        [HttpGet("materials")]
        public async Task<ActionResult<IEnumerable<string>>> GetMaterials()
        {
            return await _context.Materials
                .Select(m => m.Name)
                .ToListAsync();
        }

        // GET: api/Details/colors
        [HttpGet("colors")]
        public async Task<ActionResult<IEnumerable<string>>> GetColors()
        {
            return await _context.Colors
                .Select(c => c.Name)
                .ToListAsync();
        }

        // GET: api/Details
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DetailDto>>> GetDetails()
        {
            var mapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Details, DetailDto>()
                    .ForMember(d => d.ColorName, opt => opt.MapFrom(d => d.Color.Name))
                    .ForMember(d => d.MaterialName, opt => opt.MapFrom(d => d.Material.Name))
                    .ForMember(d => d.Description, opt => opt.MapFrom(d => d.Description))
                    .ForMember(d => d.DetailId, opt => opt.MapFrom(d => d.DetailId))
                    .ForMember(d => d.Name, opt => opt.MapFrom(d => d.Name))
                    .ForMember(d => d.Price, opt => opt.MapFrom(d => d.Price))
                    .ForMember(d => d.ProducerName, opt => opt.MapFrom(d => d.Producer.Name));
            });

            return await _context.Details
                .Include(d => d.Material)
                .Include(d => d.Color)
                .Include(d => d.Producer)
                .ProjectTo<DetailDto>(mapperConfig)
                .ToListAsync();
        }              

        // PUT: api/Details/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<ActionResult<Details>> PutDetails(Details details)
        {
            var detail = await _context.Details.FirstOrDefaultAsync(d => d.DetailId == details.DetailId);
            
            if (detail == null)
            {
                return NotFound();
            }

            _context.Entry(detail).State = EntityState.Modified;

            await _context.SaveChangesAsync();            

            return Ok(detail);
        }

        // POST: api/Details
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Details>> PostDetails(Details detail)
        {
            _context.Details.Add(detail);

            await _context.SaveChangesAsync();

            return detail;
        }

        // DELETE: api/Furnitures/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDetails(int id)
        {
            var detail = await _context.Details.FirstOrDefaultAsync(d => d.DetailId == id);

            if (detail == null)
            {
                return NotFound();
            }

            _context.Details.Remove(detail);

            await _context.SaveChangesAsync();

            return NoContent();
        }        
    }
}
