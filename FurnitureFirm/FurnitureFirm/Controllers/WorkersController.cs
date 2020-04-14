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
    [ApiController]
    [Route("api/[controller]")]
    public class WorkersController: ControllerBase
    {
        private readonly FurnitureFirmContext _context;

        private readonly IMapper _mapper;

        public WorkersController(FurnitureFirmContext context, IMapper mapper)
        {
            _context = context;

            _mapper = mapper;
        }

        //GET api/workers/posts
        [HttpGet("posts")]
        public async Task<ActionResult<IEnumerable<string>>> GetPosts()
        {
            return await _context.Posts
                .Select(p => p.Name)
                .ToListAsync();
        }

        //GET api/workers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OutWorkerDto>>> GetWorkers()
        {
            return await _context.Workers
                .Include(w => w.Post)
                .Select(w => _mapper.Map<OutWorkerDto>(w))
                .ToListAsync();
        }

        //POST api/workers
        [HttpPost]
        public async Task<IActionResult> PostWorker([FromBody]InWorkerDto workerDto)
        {
            var w = await _context.Workers.FirstOrDefaultAsync(w => w.Email == workerDto.Email);

            if(w != null)
            {
                return BadRequest();
            }

            var worker = _mapper.Map<Workers>(workerDto);

            worker.Status = "Вільний";

            var post = await _context.Posts.FirstOrDefaultAsync(p => p.Name == workerDto.PostName);            

            worker.PostId = post.PostId;

            await _context.AddAsync(worker);

            await _context.SaveChangesAsync();

            return NoContent();
        } 

        //DELEE api/workers/1
        [HttpDelete("{workerId}")]
        public async Task<IActionResult> DeleteWorker([FromRoute]int workerId)
        {
            var worker = await _context.Workers.FirstOrDefaultAsync(w => w.WorkerId == workerId);

            if(worker == null)
            {
                return NotFound();
            }

            _context.Entry(worker).State = EntityState.Deleted;

            await _context.SaveChangesAsync();

            return NoContent(); 
        }
    }
}
