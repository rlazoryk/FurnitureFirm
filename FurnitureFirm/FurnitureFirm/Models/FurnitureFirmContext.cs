using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FurnitureFirm.Models
{
    public partial class FurnitureFirmContext : DbContext
    {
        public FurnitureFirmContext()
        {
        }

        public FurnitureFirmContext(DbContextOptions<FurnitureFirmContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AdditionalDetailsOrdered> AdditionalDetailsOrdered { get; set; }
        public virtual DbSet<Categories> Categories { get; set; }
        public virtual DbSet<Cities> Cities { get; set; }
        public virtual DbSet<Collections> Collections { get; set; }
        public virtual DbSet<Colors> Colors { get; set; }
        public virtual DbSet<Comings> Comings { get; set; }
        public virtual DbSet<Consumptions> Consumptions { get; set; }
        public virtual DbSet<Countries> Countries { get; set; }
        public virtual DbSet<Customers> Customers { get; set; }
        public virtual DbSet<DeliveryInfos> DeliveryInfos { get; set; }
        public virtual DbSet<DetailOrderRows> DetailOrderRows { get; set; }
        public virtual DbSet<DetailOrders> DetailOrders { get; set; }
        public virtual DbSet<Details> Details { get; set; }
        public virtual DbSet<DetailsInFurnitures> DetailsInFurnitures { get; set; }
        public virtual DbSet<FurnitureOrderRows> FurnitureOrderRows { get; set; }
        public virtual DbSet<Furnitures> Furnitures { get; set; }
        public virtual DbSet<Materials> Materials { get; set; }
        public virtual DbSet<Orders> Orders { get; set; }
        public virtual DbSet<PaymentSystems> PaymentSystems { get; set; }
        public virtual DbSet<Posts> Posts { get; set; }
        public virtual DbSet<Producers> Producers { get; set; }
        public virtual DbSet<Productions> Productions { get; set; }
        public virtual DbSet<Profits> Profits { get; set; }
        public virtual DbSet<ProviderProducer> ProviderProducer { get; set; }
        public virtual DbSet<Providers> Providers { get; set; }
        public virtual DbSet<Styles> Styles { get; set; }
        public virtual DbSet<WarehouseDetails> WarehouseDetails { get; set; }
        public virtual DbSet<WarehouseMovements> WarehouseMovements { get; set; }
        public virtual DbSet<Warehouses> Warehouses { get; set; }
        public virtual DbSet<WorkerProduction> WorkerProduction { get; set; }
        public virtual DbSet<Workers> Workers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=localhost;Database=FurnitureFirm;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AdditionalDetailsOrdered>(entity =>
            {
                entity.HasKey(e => e.AdditionalDetailId)
                    .HasName("XPKAdditionalDetailsOrdered");

                entity.Property(e => e.AdditionalDetailId).HasColumnName("AdditionalDetailID");

                entity.Property(e => e.DetailInFurnitureId).HasColumnName("DetailInFurnitureID");

                entity.Property(e => e.FurnitureOrderRowId).HasColumnName("FurnitureOrderRowID");

                entity.HasOne(d => d.DetailInFurniture)
                    .WithMany(p => p.AdditionalDetailsOrdered)
                    .HasForeignKey(d => d.DetailInFurnitureId)
                    .HasConstraintName("R_213");

                entity.HasOne(d => d.FurnitureOrderRow)
                    .WithMany(p => p.AdditionalDetailsOrdered)
                    .HasForeignKey(d => d.FurnitureOrderRowId)
                    .HasConstraintName("R_211");
            });

            modelBuilder.Entity<Categories>(entity =>
            {
                entity.HasKey(e => e.CategoryId)
                    .HasName("XPKCategories");

                entity.Property(e => e.CategoryId).HasColumnName("CategoryID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Cities>(entity =>
            {
                entity.HasKey(e => e.CityId)
                    .HasName("XPKCities");

                entity.Property(e => e.CityId).HasColumnName("CityID");

                entity.Property(e => e.CountryId).HasColumnName("CountryID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.Cities)
                    .HasForeignKey(d => d.CountryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("R_1");
            });

            modelBuilder.Entity<Collections>(entity =>
            {
                entity.HasKey(e => e.CollectionId)
                    .HasName("XPKCollections");

                entity.Property(e => e.CollectionId).HasColumnName("CollectionID");

                entity.Property(e => e.Name)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.StyleId).HasColumnName("StyleID");

                entity.HasOne(d => d.Style)
                    .WithMany(p => p.Collections)
                    .HasForeignKey(d => d.StyleId)
                    .HasConstraintName("R_181");
            });

            modelBuilder.Entity<Colors>(entity =>
            {
                entity.HasKey(e => e.ColorId)
                    .HasName("XPKColors");

                entity.Property(e => e.ColorId).HasColumnName("ColorID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Comings>(entity =>
            {
                entity.HasKey(e => e.ComingId)
                    .HasName("XPKComings");

                entity.Property(e => e.ComingId).HasColumnName("ComingID");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.DetailOrderRowId).HasColumnName("DetailOrderRowID");

                entity.Property(e => e.WarehouseDetailId).HasColumnName("WarehouseDetailID");

                entity.Property(e => e.WorkerId).HasColumnName("WorkerID");

                entity.HasOne(d => d.DetailOrderRow)
                    .WithMany(p => p.Comings)
                    .HasForeignKey(d => d.DetailOrderRowId)
                    .HasConstraintName("R_193");

                entity.HasOne(d => d.WarehouseDetail)
                    .WithMany(p => p.Comings)
                    .HasForeignKey(d => d.WarehouseDetailId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("R_18");

                entity.HasOne(d => d.Worker)
                    .WithMany(p => p.Comings)
                    .HasForeignKey(d => d.WorkerId)
                    .HasConstraintName("R_195");
            });

            modelBuilder.Entity<Consumptions>(entity =>
            {
                entity.HasKey(e => e.ConsumptionId)
                    .HasName("XPKConsumptions");

                entity.Property(e => e.ConsumptionId).HasColumnName("ConsumptionID");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.ProductionId).HasColumnName("ProductionID");

                entity.Property(e => e.WarehouseDetailId).HasColumnName("WarehouseDetailID");

                entity.HasOne(d => d.Production)
                    .WithMany(p => p.Consumptions)
                    .HasForeignKey(d => d.ProductionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("R_19");

                entity.HasOne(d => d.WarehouseDetail)
                    .WithMany(p => p.Consumptions)
                    .HasForeignKey(d => d.WarehouseDetailId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("R_20");
            });

            modelBuilder.Entity<Countries>(entity =>
            {
                entity.HasKey(e => e.CountryId)
                    .HasName("XPKCountries");

                entity.Property(e => e.CountryId).HasColumnName("CountryID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Customers>(entity =>
            {
                entity.HasKey(e => e.CustomerId)
                    .HasName("XPKCustomers");

                entity.Property(e => e.CustomerId).HasColumnName("CustomerID");

                entity.Property(e => e.Name)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<DeliveryInfos>(entity =>
            {
                entity.HasKey(e => e.DeliveryInfoId)
                    .HasName("XPKDeliveryInfos");

                entity.Property(e => e.DeliveryInfoId).HasColumnName("DeliveryInfoID");

                entity.Property(e => e.Bulding)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CityId).HasColumnName("CityID");

                entity.Property(e => e.DeliveryFinished).HasColumnType("datetime");

                entity.Property(e => e.DeliveryStarted).HasColumnType("datetime");

                entity.Property(e => e.OrderId).HasColumnName("OrderID");

                entity.Property(e => e.Street)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.City)
                    .WithMany(p => p.DeliveryInfos)
                    .HasForeignKey(d => d.CityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("R_30");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.DeliveryInfos)
                    .HasForeignKey(d => d.OrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("R_31");
            });

            modelBuilder.Entity<DetailOrderRows>(entity =>
            {
                entity.HasKey(e => e.DetailOrderRowId)
                    .HasName("XPKDetailOrderRows");

                entity.Property(e => e.DetailOrderRowId).HasColumnName("DetailOrderRowID");

                entity.Property(e => e.DetailId).HasColumnName("DetailID");

                entity.Property(e => e.DetailOrderId).HasColumnName("DetailOrderID");

                entity.HasOne(d => d.Detail)
                    .WithMany(p => p.DetailOrderRows)
                    .HasForeignKey(d => d.DetailId)
                    .HasConstraintName("R_191");

                entity.HasOne(d => d.DetailOrder)
                    .WithMany(p => p.DetailOrderRows)
                    .HasForeignKey(d => d.DetailOrderId)
                    .HasConstraintName("R_192");
            });

            modelBuilder.Entity<DetailOrders>(entity =>
            {
                entity.HasKey(e => e.DetailOrderId)
                    .HasName("XPKDetailOrders");

                entity.Property(e => e.DetailOrderId).HasColumnName("DetailOrderID");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.ProviderId).HasColumnName("ProviderID");

                entity.Property(e => e.WorkerId).HasColumnName("WorkerID");

                entity.HasOne(d => d.Provider)
                    .WithMany(p => p.DetailOrders)
                    .HasForeignKey(d => d.ProviderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("R_4");

                entity.HasOne(d => d.Worker)
                    .WithMany(p => p.DetailOrders)
                    .HasForeignKey(d => d.WorkerId)
                    .HasConstraintName("R_194");
            });

            modelBuilder.Entity<Details>(entity =>
            {
                entity.HasKey(e => e.DetailId)
                    .HasName("XPKDetails");

                entity.Property(e => e.DetailId).HasColumnName("DetailID");

                entity.Property(e => e.ColorId).HasColumnName("ColorID");

                entity.Property(e => e.Description)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.MaterialId).HasColumnName("MaterialID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ProducerId).HasColumnName("ProducerID");

                entity.HasOne(d => d.Color)
                    .WithMany(p => p.Details)
                    .HasForeignKey(d => d.ColorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("R_5");

                entity.HasOne(d => d.Material)
                    .WithMany(p => p.Details)
                    .HasForeignKey(d => d.MaterialId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("R_6");

                entity.HasOne(d => d.Producer)
                    .WithMany(p => p.Details)
                    .HasForeignKey(d => d.ProducerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("R_7");
            });

            modelBuilder.Entity<DetailsInFurnitures>(entity =>
            {
                entity.HasKey(e => e.DetailInFurnitureId)
                    .HasName("XPKDetailsInFurnitures");

                entity.Property(e => e.DetailInFurnitureId).HasColumnName("DetailInFurnitureID");

                entity.Property(e => e.DetailId).HasColumnName("DetailID");

                entity.Property(e => e.FurnitureId).HasColumnName("FurnitureID");

                entity.HasOne(d => d.Detail)
                    .WithMany(p => p.DetailsInFurnitures)
                    .HasForeignKey(d => d.DetailId)
                    .HasConstraintName("R_178");

                entity.HasOne(d => d.Furniture)
                    .WithMany(p => p.DetailsInFurnitures)
                    .HasForeignKey(d => d.FurnitureId)
                    .HasConstraintName("R_179");
            });

            modelBuilder.Entity<FurnitureOrderRows>(entity =>
            {
                entity.HasKey(e => e.FurnitureOrderRowId)
                    .HasName("XPKFurnitureOrderRows");

                entity.Property(e => e.FurnitureOrderRowId).HasColumnName("FurnitureOrderRowID");

                entity.Property(e => e.FurnitureId).HasColumnName("FurnitureID");

                entity.Property(e => e.OrderId).HasColumnName("OrderID");

                entity.HasOne(d => d.Furniture)
                    .WithMany(p => p.FurnitureOrderRows)
                    .HasForeignKey(d => d.FurnitureId)
                    .HasConstraintName("R_183");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.FurnitureOrderRows)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("R_176");
            });

            modelBuilder.Entity<Furnitures>(entity =>
            {
                entity.HasKey(e => e.FurnitureId)
                    .HasName("XPKFurnitures");

                entity.Property(e => e.FurnitureId).HasColumnName("FurnitureID");

                entity.Property(e => e.CategoryId).HasColumnName("CategoryID");

                entity.Property(e => e.CollectionId).HasColumnName("CollectionID");

                entity.Property(e => e.Description)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Furnitures)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("R_177");

                entity.HasOne(d => d.Collection)
                    .WithMany(p => p.Furnitures)
                    .HasForeignKey(d => d.CollectionId)
                    .HasConstraintName("R_182");
            });

            modelBuilder.Entity<Materials>(entity =>
            {
                entity.HasKey(e => e.MaterialId)
                    .HasName("XPKMaterials");

                entity.Property(e => e.MaterialId).HasColumnName("MaterialID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Orders>(entity =>
            {
                entity.HasKey(e => e.OrderId)
                    .HasName("XPKOrders");

                entity.Property(e => e.OrderId).HasColumnName("OrderID");

                entity.Property(e => e.CustomerId).HasColumnName("CustomerID");

                entity.Property(e => e.OrderDate).HasColumnType("datetime");

                entity.Property(e => e.PaymentSystemId).HasColumnName("PaymentSystemID");

                entity.Property(e => e.Status)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.WorkerId).HasColumnName("WorkerID");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("R_28");

                entity.HasOne(d => d.PaymentSystem)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.PaymentSystemId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("R_27");

                entity.HasOne(d => d.Worker)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.WorkerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("R_26");
            });

            modelBuilder.Entity<PaymentSystems>(entity =>
            {
                entity.HasKey(e => e.PaymentSystemId)
                    .HasName("XPKPaymentSystems");

                entity.Property(e => e.PaymentSystemId).HasColumnName("PaymentSystemID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Posts>(entity =>
            {
                entity.HasKey(e => e.PostId)
                    .HasName("XPKPosts");

                entity.Property(e => e.PostId).HasColumnName("PostID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Producers>(entity =>
            {
                entity.HasKey(e => e.ProducerId)
                    .HasName("XPKProducers");

                entity.Property(e => e.ProducerId).HasColumnName("ProducerID");

                entity.Property(e => e.CountryId).HasColumnName("CountryID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.Producers)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("R_170");
            });

            modelBuilder.Entity<Productions>(entity =>
            {
                entity.HasKey(e => e.ProductionId)
                    .HasName("XPKProductions");

                entity.Property(e => e.ProductionId).HasColumnName("ProductionID");

                entity.Property(e => e.DateFinished).HasColumnType("datetime");

                entity.Property(e => e.FurnitureOrderRowId).HasColumnName("FurnitureOrderRowID");

                entity.Property(e => e.StartedDate).HasColumnType("datetime");

                entity.Property(e => e.WarehouseId).HasColumnName("WarehouseID");

                entity.HasOne(d => d.FurnitureOrderRow)
                    .WithMany(p => p.Productions)
                    .HasForeignKey(d => d.FurnitureOrderRowId)
                    .HasConstraintName("R_197");
            });

            modelBuilder.Entity<Profits>(entity =>
            {
                entity.HasKey(e => e.ProfitId)
                    .HasName("XPKProfits");

                entity.Property(e => e.ProfitId).HasColumnName("ProfitID");

                entity.Property(e => e.OrderId).HasColumnName("OrderID");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.Profits)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("R_199");
            });

            modelBuilder.Entity<ProviderProducer>(entity =>
            {
                entity.HasKey(e => new { e.ProviderId, e.ProducerId })
                    .HasName("XPKProvider_Producer");

                entity.ToTable("Provider_Producer");

                entity.Property(e => e.ProviderId).HasColumnName("ProviderID");

                entity.Property(e => e.ProducerId).HasColumnName("ProducerID");

                entity.HasOne(d => d.Producer)
                    .WithMany(p => p.ProviderProducer)
                    .HasForeignKey(d => d.ProducerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("R_173");

                entity.HasOne(d => d.Provider)
                    .WithMany(p => p.ProviderProducer)
                    .HasForeignKey(d => d.ProviderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("R_171");
            });

            modelBuilder.Entity<Providers>(entity =>
            {
                entity.HasKey(e => e.ProviderId)
                    .HasName("XPKProviders");

                entity.Property(e => e.ProviderId).HasColumnName("ProviderID");

                entity.Property(e => e.Building)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CityId).HasColumnName("CityID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Street)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.City)
                    .WithMany(p => p.Providers)
                    .HasForeignKey(d => d.CityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("R_3");
            });

            modelBuilder.Entity<Styles>(entity =>
            {
                entity.HasKey(e => e.StyleId)
                    .HasName("XPKStyles");

                entity.Property(e => e.StyleId).HasColumnName("StyleID");

                entity.Property(e => e.Name)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<WarehouseDetails>(entity =>
            {
                entity.HasKey(e => e.WarehouseDetailId)
                    .HasName("XPKWarehouseDetails");

                entity.Property(e => e.WarehouseDetailId).HasColumnName("WarehouseDetailID");

                entity.Property(e => e.DetailId).HasColumnName("DetailID");

                entity.Property(e => e.WarehouseId).HasColumnName("WarehouseID");

                entity.HasOne(d => d.Detail)
                    .WithMany(p => p.WarehouseDetails)
                    .HasForeignKey(d => d.DetailId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("R_11");

                entity.HasOne(d => d.Warehouse)
                    .WithMany(p => p.WarehouseDetails)
                    .HasForeignKey(d => d.WarehouseId)
                    .HasConstraintName("R_175");
            });

            modelBuilder.Entity<WarehouseMovements>(entity =>
            {
                entity.HasKey(e => e.WarehouseMovementId)
                    .HasName("XPKWarehouseMovements");

                entity.Property(e => e.WarehouseMovementId).HasColumnName("WarehouseMovementID");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.FromWarehouseDetailId).HasColumnName("FromWarehouseDetailID");

                entity.Property(e => e.ToWarehouseDetailId).HasColumnName("ToWarehouseDetailID");

                entity.Property(e => e.WorkerId).HasColumnName("WorkerID");

                entity.HasOne(d => d.FromWarehouseDetail)
                    .WithMany(p => p.WarehouseMovementsFromWarehouseDetail)
                    .HasForeignKey(d => d.FromWarehouseDetailId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("R_15");

                entity.HasOne(d => d.ToWarehouseDetail)
                    .WithMany(p => p.WarehouseMovementsToWarehouseDetail)
                    .HasForeignKey(d => d.ToWarehouseDetailId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("R_16");

                entity.HasOne(d => d.Worker)
                    .WithMany(p => p.WarehouseMovements)
                    .HasForeignKey(d => d.WorkerId)
                    .HasConstraintName("R_196");
            });

            modelBuilder.Entity<Warehouses>(entity =>
            {
                entity.HasKey(e => e.WarehouseId)
                    .HasName("XPKWarehouses");

                entity.Property(e => e.WarehouseId).HasColumnName("WarehouseID");

                entity.Property(e => e.CityId).HasColumnName("CityID");

                entity.Property(e => e.Street)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.City)
                    .WithMany(p => p.Warehouses)
                    .HasForeignKey(d => d.CityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("R_10");
            });

            modelBuilder.Entity<WorkerProduction>(entity =>
            {
                entity.HasKey(e => new { e.WorkerId, e.ProductionId })
                    .HasName("XPKWorker_Production");

                entity.ToTable("Worker_Production");

                entity.Property(e => e.WorkerId).HasColumnName("WorkerID");

                entity.Property(e => e.ProductionId).HasColumnName("ProductionID");

                entity.HasOne(d => d.Production)
                    .WithMany(p => p.WorkerProduction)
                    .HasForeignKey(d => d.ProductionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("R_150");

                entity.HasOne(d => d.Worker)
                    .WithMany(p => p.WorkerProduction)
                    .HasForeignKey(d => d.WorkerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("R_148");
            });

            modelBuilder.Entity<Workers>(entity =>
            {
                entity.HasKey(e => e.WorkerId)
                    .HasName("XPKWorkers");

                entity.Property(e => e.WorkerId).HasColumnName("WorkerID");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PostId).HasColumnName("PostID");

                entity.Property(e => e.Status)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Surname)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.Workers)
                    .HasForeignKey(d => d.PostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("R_9");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
