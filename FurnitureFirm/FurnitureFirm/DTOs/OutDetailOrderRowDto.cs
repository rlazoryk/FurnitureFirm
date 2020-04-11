namespace FurnitureFirm.DTOs
{
    public class OutDetailOrderRowDto
    {
        public DetailDto Detail { get; set; }

        public double OrderedDetailPrice { get; set; }

        public int Count { get; set; }
    }
}
