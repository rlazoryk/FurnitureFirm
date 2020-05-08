using AutoMapper;
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

        private readonly IMapper _mapper;

        public DetailsController(FurnitureFirmContext context, IMapper mapper)
        {
            _context = context;

            _mapper = mapper;
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

        // GET: api/Details/1
        [HttpGet("{id}")]
        public async Task<ActionResult<DetailDto>> GetDetailById(int id)
        {
            var result = await _context.Details
                .Where(d => d.DetailId == id)
                .Include(d => d.Material)
                .Include(d => d.Color)
                .Include(d => d.Producer)
                .Include(d => d.Provider)
                .FirstOrDefaultAsync();

            return _mapper.Map<DetailDto>(result);
        }

        // GET: api/Details
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DetailDto>>> GetDetails()
        {            
            return await _context.Details
                .Include(d => d.Material)
                .Include(d => d.Color)
                .Include(d => d.Producer)
                .Include(d => d.Provider)
                .Select(d => _mapper.Map<DetailDto>(d))
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
