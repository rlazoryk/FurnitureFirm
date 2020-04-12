using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FurnitureFirm.DTOs
{
    public class ComingDto
    {
        public DateTime Date { get; set; }   
        public int OrderId { get; set; }
        public string DetailName { get; set; }
        public int Count { get; set; }
        public string WorkerName { get; set; }
    }
}
