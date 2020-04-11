using FurnitureFirm.DTOs;
using FurnitureFirm.Models;
using System.Collections.Generic;

namespace FurnitureFirm.Helpers
{
    public static class Helper
    {
        public static OutDetailOrderDto IsOrderClosed(OutDetailOrderDto order, List<Comings> comings)
        {
            var coming = comings.Find(c => c.DetailOrderRow.DetailOrderId == order.DetailOrderId);
            if (coming != null)
            {
                order.isClosed = true;
            }
            else
            {
                order.isClosed = false;
            }

            return order;
        }      
    }
}
