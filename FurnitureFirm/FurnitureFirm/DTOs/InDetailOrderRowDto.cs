namespace FurnitureFirm.DTOs
{
    public class InDetailOrderRowDto
    {
        public int DetailId { get; set; }

        public int ProviderId { get; set; }

        public double OrderedDetailPrice { get; set; }

        public int Count { get; set; }
    }
}
