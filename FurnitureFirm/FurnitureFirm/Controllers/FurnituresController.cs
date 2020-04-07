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
using AutoMapper.QueryableExtensions;

namespace FurnitureFirm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FurnituresController : ControllerBase
    {
        private readonly FurnitureFirmContext _context;

        public FurnituresController(FurnitureFirmContext context)
        {
            _context = context;
        }


        // GET: api/Furnitures/categories
        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<string>>> GetCategories()
        {
            return await _context.Categories
                .Select(c => c.Name)
                .ToListAsync();
        }

        // GET: api/Furnitures/id
        [HttpGet("{id}")]
        public async Task<ActionResult<FurnitureDto>> GetFurnitureById(int id)
        {
            var mapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Collections, CollectionDto>()
                    .ForMember(c => c.StyleName, opt => opt.MapFrom(c => c.Style.Name));
                cfg.CreateMap<Furnitures, FurnitureDto>();
            });

            return await _context.Furnitures
                .Where(f=>f.FurnitureId == id)
                .Include(f => f.Collection)
                .ThenInclude(c => c.Style)
                .ProjectTo<FurnitureDto>(mapperConfig)
                .FirstOrDefaultAsync();
        }

        // GET: api/Furnitures/categoryName
        [HttpGet("category/{categoryName}")]
        public async Task<ActionResult<IEnumerable<FurnitureDto>>> GetFurnituresByCategory(string categoryName)
        {
            var mapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Collections, CollectionDto>()
                    .ForMember(c => c.StyleName, opt => opt.MapFrom(c => c.Style.Name));
                cfg.CreateMap<Furnitures, FurnitureDto>();
            });

            return await _context.Furnitures
                .Include(f => f.Collection)
                .ThenInclude(c => c.Style)
                .Where(f => f.Category.Name.ToLower().Equals(categoryName))
                .ProjectTo<FurnitureDto>(mapperConfig)
                .ToListAsync();
        }

        // GET: api/Furnitures/additional/id
        [HttpGet("additional/{id}")]
        public async Task<ActionResult<IEnumerable<DetailDto>>> GetAdditionalDetails(int id)
        {
            var mapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<DetailsInFurnitures, DetailDto>()
                    .ForMember(d => d.ColorName, opt => opt.MapFrom(d => d.Detail.Color.Name))
                    .ForMember(d => d.MaterialName, opt => opt.MapFrom(d => d.Detail.Material.Name))
                    .ForMember(d => d.Description, opt => opt.MapFrom(d => d.Detail.Description))
                    .ForMember(d => d.DetailId, opt => opt.MapFrom(d => d.Detail.DetailId))
                    .ForMember(d => d.Name, opt => opt.MapFrom(d => d.Detail.Name))
                    .ForMember(d => d.Price, opt => opt.MapFrom(d => d.Detail.Price))
                    .ForMember(d => d.ProducerName, opt => opt.MapFrom(d => d.Detail.Producer.Name));
            });

            return await _context.DetailsInFurnitures
                .Where(d => d.FurnitureId == id)
                .Where(d => d.IsAdditional == 1)
                .Include(d => d.Detail)
                .ProjectTo<DetailDto>(mapperConfig)
                .ToListAsync();
        }

        // PUT: api/Furnitures/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFurnitures(int id, Furnitures furnitures)
        {
            if (id != furnitures.FurnitureId)
            {
                return BadRequest();
            }

            _context.Entry(furnitures).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FurnituresExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Furnitures
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Furnitures>> PostFurnitures(Furnitures furnitures)
        {
            _context.Furnitures.Add(furnitures);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFurnitures", new { id = furnitures.FurnitureId }, furnitures);
        }

        // DELETE: api/Furnitures/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Furnitures>> DeleteFurnitures(int id)
        {
            var furnitures = await _context.Furnitures.FindAsync(id);
            if (furnitures == null)
            {
                return NotFound();
            }

            _context.Furnitures.Remove(furnitures);
            await _context.SaveChangesAsync();

            return furnitures;
        }

        private bool FurnituresExists(int id)
        {
            return _context.Furnitures.Any(e => e.FurnitureId == id);
        }
    }
}
