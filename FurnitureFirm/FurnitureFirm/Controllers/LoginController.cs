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
    public class LoginController: ControllerBase
    {
        private readonly FurnitureFirmContext _context;

        private readonly IMapper _mapper;

        public LoginController(FurnitureFirmContext context, IMapper mapper)
        {
            _context = context;

            _mapper = mapper;
        }

        //GET api/login?email=example@gmail.com&password=pass123
        [HttpGet]
        public async Task<ActionResult<OutWorkerDto>> Login([FromQuery]string email, [FromQuery]string password)
        {
            var worker = await _context.Workers.Include(w => w.Post).FirstOrDefaultAsync(w => w.Email == email && w.Password == password);

            if(worker == null)
            {
                return null;
            }

            return _mapper.Map<OutWorkerDto>(worker);
        }
    }
}
