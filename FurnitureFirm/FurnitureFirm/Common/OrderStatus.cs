﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FurnitureFirm.Common
{
    public static class OrderStatus
    {
        public const string Accepted = "Прийнято";
        public const string Rejected = "Відмінено";
        public const string InProduction = "Виготовляється";
        public const string Delivering = "Доставляється";
        public const string Done = "Завершено";
    }
}
