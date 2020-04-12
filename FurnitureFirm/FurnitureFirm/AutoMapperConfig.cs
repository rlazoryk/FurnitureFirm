using AutoMapper;
using FurnitureFirm.DTOs;
using FurnitureFirm.Models;
using System;

namespace FurnitureFirm
{
    public class AutoMapperConfig: Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<DetailOrders, OutDetailOrderDto>()
                .ForMember(o => o.Date, opt => opt.MapFrom(o => o.Date.Value))
                .ForMember(o => o.TotalPrice, opt => opt.MapFrom(o => o.TotalPrice.Value))
                .ForMember(o => o.ProviderName, opt => opt.MapFrom(o => o.Provider.Name))
                .ForMember(o => o.WorkerName, opt => opt.MapFrom(o => o.Worker.Name));

            CreateMap<Details, DetailDto>()
                .ForMember(d => d.ColorName, opt => opt.MapFrom(d => d.Color.Name))
                .ForMember(d => d.MaterialName, opt => opt.MapFrom(d => d.Material.Name))
                .ForMember(d => d.Description, opt => opt.MapFrom(d => d.Description))
                .ForMember(d => d.DetailId, opt => opt.MapFrom(d => d.DetailId))
                .ForMember(d => d.Name, opt => opt.MapFrom(d => d.Name))
                .ForMember(d => d.Price, opt => opt.MapFrom(d => Math.Round(d.Price - d.Price * 0.2, 1)))
                .ForMember(d => d.ProducerName, opt => opt.MapFrom(d => d.Producer.Name));

            CreateMap<InDetailOrderDto, DetailOrders>()
                .ForMember(o => o.TotalPrice, opt => opt.MapFrom(o => Convert.ToInt32(o.TotalPrice)));

            CreateMap<InDetailOrderRowDto, DetailOrderRows>()
                .ForMember(r => r.Count, opt => opt.MapFrom(r => r.Count))
                .ForMember(r => r.DetailId, opt => opt.MapFrom(r => r.DetailId))
                .ForMember(r => r.OrderedDetailPrice, opt => opt.MapFrom(r => Convert.ToInt32(r.OrderedDetailPrice)));

            CreateMap<Providers, ProviderDto>();

            CreateMap<DetailOrderRows, OutDetailOrderRowDto>();

            CreateMap<Warehouses, WarehouseNamesDto>();

            CreateMap<WarehouseDetails, WarehouseDetailDto>()
                .ForMember(wd => wd.Count, opt => opt.MapFrom(wd => wd.Count.Value))
                .ForMember(wd => wd.WarehouseId, opt => opt.MapFrom(wd => wd.WarehouseId.Value));

            CreateMap<Comings, ComingDto>()
                .ForMember(c => c.DetailName, opt => opt.MapFrom(c => c.DetailOrderRow.Detail.Name))
                .ForMember(c => c.Count, opt => opt.MapFrom(c => c.DetailOrderRow.Count))
                .ForMember(c => c.OrderId, opt => opt.MapFrom(c => c.DetailOrderRow.DetailOrderId))
                .ForMember(c => c.WorkerName, opt => opt.MapFrom(c => c.Worker.Name));

            CreateMap<Consumptions, ConsumptionDto>()
                .ForMember(c => c.DetailName, opt => opt.MapFrom(c => c.WarehouseDetail.Detail.Name));
        }
    }
}
