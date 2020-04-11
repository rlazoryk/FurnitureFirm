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
        }
    }
}
