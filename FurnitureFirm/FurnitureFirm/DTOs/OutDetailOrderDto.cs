using System;

namespace FurnitureFirm.DTOs
{
    public class OutDetailOrderDto
    {
        public int DetailOrderId { get; set; }

        public DateTime Date { get; set; }

        public int TotalPrice { get; set; }

        public string ProviderName { get; set; }

        public string WorkerName { get; set; }

        public bool isClosed { get; set; }
    }
}
