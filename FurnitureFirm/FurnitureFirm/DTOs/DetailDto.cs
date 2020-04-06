﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FurnitureFirm.DTOs
{
    public class DetailDto
    {
        public int DetailId { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string ColorName { get; set; }
        public string MaterialName { get; set; }
        public string ProducerName { get; set; }
        public string Description { get; set; }
    }
}
