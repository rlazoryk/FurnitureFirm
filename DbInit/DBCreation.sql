
CREATE DATABASE FurnitureFirm
GO

USE FurnitureFirm
GO

CREATE TABLE AdditionalDetailsOrdered
( 
	AdditionalDetailID   integer IDENTITY(1, 1)  NOT NULL ,
	Count                integer  NULL ,
	FurnitureOrderRowID  integer  NULL ,
	DetailInFurnitureID  integer  NULL 
)
go



ALTER TABLE AdditionalDetailsOrdered
	ADD CONSTRAINT XPKAdditionalDetailsOrdered PRIMARY KEY  CLUSTERED (AdditionalDetailID ASC) 
go



CREATE TABLE Categories
( 
	CategoryID           integer IDENTITY(1, 1) NOT NULL ,
	Name                 varchar(20)  NOT NULL 
)
go



ALTER TABLE Categories
	ADD CONSTRAINT XPKCategories PRIMARY KEY  CLUSTERED (CategoryID ASC)
go



CREATE TABLE Cities
( 
	CityID               integer IDENTITY(1, 1) NOT NULL ,
	Name                 varchar(20)  NOT NULL ,
	CountryID            integer  NOT NULL 
)
go



ALTER TABLE Cities
	ADD CONSTRAINT XPKCities PRIMARY KEY  CLUSTERED (CityID ASC)
go



CREATE TABLE Collections
( 
	CollectionID         integer IDENTITY(1, 1) NOT NULL ,
	Name                 varchar(20)  NULL ,
	StyleID              integer  NULL 
)
go



ALTER TABLE Collections
	ADD CONSTRAINT XPKCollections PRIMARY KEY  CLUSTERED (CollectionID ASC)
go



CREATE TABLE Colors
( 
	ColorID              integer IDENTITY(1, 1) NOT NULL ,
	Name                 varchar(20)  NOT NULL 
)
go



ALTER TABLE Colors
	ADD CONSTRAINT XPKColors PRIMARY KEY  CLUSTERED (ColorID ASC)
go



CREATE TABLE Comings
( 
	ComingID             integer IDENTITY(1, 1) NOT NULL ,
	Date                 datetime  NOT NULL ,
	WarehouseDetailID    integer  NOT NULL ,
	DetailOrderRowID     integer  NULL ,
	WorkerID             integer  NULL 
)
go



ALTER TABLE Comings
	ADD CONSTRAINT XPKComings PRIMARY KEY  CLUSTERED (ComingID ASC)
go



CREATE TABLE Consumptions
( 
	ConsumptionID        integer IDENTITY(1, 1) NOT NULL ,
	Date                 datetime  NOT NULL ,
	ProductionID         integer  NOT NULL ,
	WarehouseDetailID    integer  NOT NULL 
)
go



ALTER TABLE Consumptions
	ADD CONSTRAINT XPKConsumptions PRIMARY KEY  CLUSTERED (ConsumptionID ASC)
go



CREATE TABLE Countries
( 
	CountryID            integer IDENTITY(1, 1) NOT NULL ,
	Name                 varchar(20)  NOT NULL 
)
go



ALTER TABLE Countries
	ADD CONSTRAINT XPKCountries PRIMARY KEY  CLUSTERED (CountryID ASC)
go



CREATE TABLE Customers
( 
	CustomerID           integer IDENTITY(1, 1) NOT NULL ,
	Name                 varchar(20)  NULL ,
	PhoneNumber          varchar(20)  NULL 
)
go



ALTER TABLE Customers
	ADD CONSTRAINT XPKCustomers PRIMARY KEY  CLUSTERED (CustomerID ASC)
go



CREATE TABLE DeliveryInfos
( 
	DeliveryInfoID       integer IDENTITY(1, 1)  NOT NULL ,
	DeliveryPrice        integer  NULL ,
	Street               varchar(20)  NULL ,
	Bulding              varchar(20)  NULL ,
	CityID               integer  NOT NULL ,
	OrderID              integer  NOT NULL ,
	DeliveryStarted      datetime  NULL ,
	DeliveryFinished     datetime  NULL 
)
go



ALTER TABLE DeliveryInfos
	ADD CONSTRAINT XPKDeliveryInfos PRIMARY KEY  CLUSTERED (DeliveryInfoID ASC)
go



CREATE TABLE DetailOrderRows
( 
	DetailOrderRowID     integer IDENTITY(1, 1) NOT NULL ,
	Count                integer  NULL ,
	OrderedDetailPrice   integer  NULL ,
	DetailID             integer  NULL ,
	DetailOrderID        integer  NULL 
)
go



ALTER TABLE DetailOrderRows
	ADD CONSTRAINT XPKDetailOrderRows PRIMARY KEY  CLUSTERED (DetailOrderRowID ASC)
go



CREATE TABLE DetailOrders
( 
	DetailOrderID        integer IDENTITY(1, 1) NOT NULL ,
	Date                 datetime  NULL ,
	TotalPrice           integer  NULL ,
	ProviderID           integer  NOT NULL ,
	WorkerID             integer  NULL 
)
go



ALTER TABLE DetailOrders
	ADD CONSTRAINT XPKDetailOrders PRIMARY KEY  CLUSTERED (DetailOrderID ASC)
go



CREATE TABLE Details
( 
	DetailID             integer IDENTITY(1, 1) NOT NULL ,
	Name                 varchar(20)  NOT NULL ,
	Price                integer  NOT NULL ,
	ColorID              integer  NOT NULL ,
	MaterialID           integer  NOT NULL ,
	ProducerID           integer  NOT NULL ,
	Description          varchar(20)  NULL 
)
go



ALTER TABLE Details
	ADD CONSTRAINT XPKDetails PRIMARY KEY  CLUSTERED (DetailID ASC)
go



CREATE TABLE DetailsInFurnitures
( 
	DetailInFurnitureID  integer IDENTITY(1, 1)  NOT NULL ,
	Count                integer  NULL ,
	DetailID             integer  NULL ,
	FurnitureID          integer  NULL ,
	IsAdditional         tinyint  NULL ,
	TimeToIntegrate      datetime  NULL 
)
go



ALTER TABLE DetailsInFurnitures
	ADD CONSTRAINT XPKDetailsInFurnitures PRIMARY KEY  CLUSTERED (DetailInFurnitureID ASC)
go



CREATE TABLE FurnitureOrderRows
( 
	FurnitureOrderRowID  integer IDENTITY(1, 1) NOT NULL ,
	Count                integer  NULL ,
	TotalFurniturePrice  integer  NULL ,
	OrderID              integer  NULL ,
	FurnitureID          integer  NULL ,
	MarkUp               integer  NULL 
)
go



ALTER TABLE FurnitureOrderRows
	ADD CONSTRAINT XPKFurnitureOrderRows PRIMARY KEY  CLUSTERED (FurnitureOrderRowID ASC)
go



CREATE TABLE Furnitures
( 
	FurnitureID          integer IDENTITY(1, 1) NOT NULL ,
	Name                 varchar(20)  NOT NULL ,
	Description          varchar(20)  NULL ,
	TimeToBuild          datetime  NULL ,
	CategoryID           integer  NULL ,
	Height               integer  NULL ,
	Width                integer  NULL ,
	Depth                integer  NULL ,
	CollectionID         integer  NULL ,
	Price                integer  NULL 
)
go



ALTER TABLE Furnitures
	ADD CONSTRAINT XPKFurnitures PRIMARY KEY  CLUSTERED (FurnitureID ASC)
go



CREATE TABLE Materials
( 
	MaterialID           integer IDENTITY(1, 1) NOT NULL ,
	Name                 varchar(20)  NOT NULL 
)
go



ALTER TABLE Materials
	ADD CONSTRAINT XPKMaterials PRIMARY KEY  CLUSTERED (MaterialID ASC)
go



CREATE TABLE Orders
( 
	OrderID              integer IDENTITY(1, 1) NOT NULL ,
	OrderDate            datetime  NOT NULL ,
	TotalPrice           integer  NOT NULL ,
	WorkerID             integer  NOT NULL ,
	PaymentSystemID      integer  NOT NULL ,
	CustomerID           integer  NOT NULL ,
	Status               varchar(20)  NULL 
)
go



ALTER TABLE Orders
	ADD CONSTRAINT XPKOrders PRIMARY KEY  CLUSTERED (OrderID ASC)
go



CREATE TABLE PaymentSystems
( 
	PaymentSystemID      integer IDENTITY(1, 1) NOT NULL ,
	Name                 varchar(20)  NOT NULL 
)
go



ALTER TABLE PaymentSystems
	ADD CONSTRAINT XPKPaymentSystems PRIMARY KEY  CLUSTERED (PaymentSystemID ASC)
go



CREATE TABLE Posts
( 
	PostID               integer IDENTITY(1, 1) NOT NULL ,
	Name                 varchar(20)  NOT NULL ,
	Salary               integer  NULL 
)
go



ALTER TABLE Posts
	ADD CONSTRAINT XPKPosts PRIMARY KEY  CLUSTERED (PostID ASC)
go



CREATE TABLE Producers
( 
	ProducerID           integer IDENTITY(1, 1) NOT NULL ,
	Name                 varchar(20)  NOT NULL ,
	CountryID            integer  NULL 
)
go



ALTER TABLE Producers
	ADD CONSTRAINT XPKProducers PRIMARY KEY  CLUSTERED (ProducerID ASC)
go



CREATE TABLE Productions
( 
	ProductionID         integer IDENTITY(1, 1) NOT NULL ,
	WarehouseID			 integer  NULL ,
	StartedDate          datetime  NOT NULL ,
	FurnitureOrderRowID  integer  NULL ,
	DateFinished         datetime  NULL 
)
go



ALTER TABLE Productions
	ADD CONSTRAINT XPKProductions PRIMARY KEY  CLUSTERED (ProductionID ASC)
go



CREATE TABLE Profits
( 
	ProfitID             integer IDENTITY(1, 1) NOT NULL ,
	Money                integer  NULL ,
	OrderID              integer  NULL 
)
go



ALTER TABLE Profits
	ADD CONSTRAINT XPKProfits PRIMARY KEY  CLUSTERED (ProfitID ASC)
go



CREATE TABLE Provider_Producer
( 
	ProviderID           integer  NOT NULL ,
	ProducerID           integer  NOT NULL 
)
go



ALTER TABLE Provider_Producer
	ADD CONSTRAINT XPKProvider_Producer PRIMARY KEY  CLUSTERED (ProviderID ASC,ProducerID ASC)
go



CREATE TABLE Providers
( 
	ProviderID           integer IDENTITY(1, 1) NOT NULL ,
	Name                 varchar(20)  NOT NULL ,
	PhoneNumber          varchar(20)  NULL ,
	CityID               integer  NOT NULL ,
	Street               varchar(20)  NULL ,
	Building             varchar(20)  NULL 
)
go



ALTER TABLE Providers
	ADD CONSTRAINT XPKProviders PRIMARY KEY  CLUSTERED (ProviderID ASC)
go



CREATE TABLE Styles
( 
	StyleID              integer IDENTITY(1, 1) NOT NULL ,
	Name                 varchar(20)  NULL 
)
go



ALTER TABLE Styles
	ADD CONSTRAINT XPKStyles PRIMARY KEY  CLUSTERED (StyleID ASC)
go



CREATE TABLE WarehouseDetails
( 
	WarehouseDetailID    integer IDENTITY(1, 1) NOT NULL ,
	Count                integer  NULL ,
	DetailID             integer  NOT NULL ,
	WarehouseID          integer  NULL 
)
go



ALTER TABLE WarehouseDetails
	ADD CONSTRAINT XPKWarehouseDetails PRIMARY KEY  CLUSTERED (WarehouseDetailID ASC)
go



CREATE TABLE WarehouseMovements
( 
	WarehouseMovementID  integer IDENTITY(1, 1) NOT NULL ,
	Date                 datetime  NOT NULL ,
	FromWarehouseDetailID integer  NOT NULL ,
	ToWarehouseDetailID  integer  NOT NULL ,
	WorkerID             integer  NULL 
)
go



ALTER TABLE WarehouseMovements
	ADD CONSTRAINT XPKWarehouseMovements PRIMARY KEY  CLUSTERED (WarehouseMovementID ASC)
go



CREATE TABLE Warehouses
( 
	WarehouseID          integer IDENTITY(1, 1) NOT NULL ,
	Street               varchar(20)  NULL ,
	Building             integer  NULL ,
	CityID               integer  NOT NULL 
)
go



ALTER TABLE Warehouses
	ADD CONSTRAINT XPKWarehouses PRIMARY KEY  CLUSTERED (WarehouseID ASC)
go



CREATE TABLE Worker_Production
( 
	WorkerID             integer  NOT NULL ,
	ProductionID         integer  NOT NULL 
)
go



ALTER TABLE Worker_Production
	ADD CONSTRAINT XPKWorker_Production PRIMARY KEY  CLUSTERED (WorkerID ASC,ProductionID ASC)
go



CREATE TABLE Workers
( 
	WorkerID             integer IDENTITY(1, 1) NOT NULL ,
	Name                 varchar(20)  NOT NULL ,
	Surname              varchar(20)  NOT NULL ,
	Email                varchar(20)  NOT NULL ,
	PhoneNumber          varchar(20)  NULL ,
	Password             varchar(20)  NOT NULL ,
	PostID               integer  NOT NULL ,
	Status               varchar(20)  NULL 
)
go



ALTER TABLE Workers
	ADD CONSTRAINT XPKWorkers PRIMARY KEY  CLUSTERED (WorkerID ASC)
go




ALTER TABLE AdditionalDetailsOrdered
	ADD CONSTRAINT R_211 FOREIGN KEY (FurnitureOrderRowID) REFERENCES FurnitureOrderRows(FurnitureOrderRowID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE AdditionalDetailsOrdered
	ADD CONSTRAINT R_213 FOREIGN KEY (DetailInFurnitureID) REFERENCES DetailsInFurnitures(DetailInFurnitureID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE Cities
	ADD CONSTRAINT R_1 FOREIGN KEY (CountryID) REFERENCES Countries(CountryID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE Collections
	ADD CONSTRAINT R_181 FOREIGN KEY (StyleID) REFERENCES Styles(StyleID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE Comings
	ADD CONSTRAINT R_18 FOREIGN KEY (WarehouseDetailID) REFERENCES WarehouseDetails(WarehouseDetailID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE Comings
	ADD CONSTRAINT R_193 FOREIGN KEY (DetailOrderRowID) REFERENCES DetailOrderRows(DetailOrderRowID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE Comings
	ADD CONSTRAINT R_195 FOREIGN KEY (WorkerID) REFERENCES Workers(WorkerID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE Consumptions
	ADD CONSTRAINT R_19 FOREIGN KEY (ProductionID) REFERENCES Productions(ProductionID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE Consumptions
	ADD CONSTRAINT R_20 FOREIGN KEY (WarehouseDetailID) REFERENCES WarehouseDetails(WarehouseDetailID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE DeliveryInfos
	ADD CONSTRAINT R_30 FOREIGN KEY (CityID) REFERENCES Cities(CityID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE DeliveryInfos
	ADD CONSTRAINT R_31 FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE DetailOrderRows
	ADD CONSTRAINT R_191 FOREIGN KEY (DetailID) REFERENCES Details(DetailID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE DetailOrderRows
	ADD CONSTRAINT R_192 FOREIGN KEY (DetailOrderID) REFERENCES DetailOrders(DetailOrderID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE DetailOrders
	ADD CONSTRAINT R_4 FOREIGN KEY (ProviderID) REFERENCES Providers(ProviderID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE DetailOrders
	ADD CONSTRAINT R_194 FOREIGN KEY (WorkerID) REFERENCES Workers(WorkerID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE Details
	ADD CONSTRAINT R_5 FOREIGN KEY (ColorID) REFERENCES Colors(ColorID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE Details
	ADD CONSTRAINT R_6 FOREIGN KEY (MaterialID) REFERENCES Materials(MaterialID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE Details
	ADD CONSTRAINT R_7 FOREIGN KEY (ProducerID) REFERENCES Producers(ProducerID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE DetailsInFurnitures
	ADD CONSTRAINT R_178 FOREIGN KEY (DetailID) REFERENCES Details(DetailID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE DetailsInFurnitures
	ADD CONSTRAINT R_179 FOREIGN KEY (FurnitureID) REFERENCES Furnitures(FurnitureID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE FurnitureOrderRows
	ADD CONSTRAINT R_176 FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE FurnitureOrderRows
	ADD CONSTRAINT R_183 FOREIGN KEY (FurnitureID) REFERENCES Furnitures(FurnitureID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE Furnitures
	ADD CONSTRAINT R_177 FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE Furnitures
	ADD CONSTRAINT R_182 FOREIGN KEY (CollectionID) REFERENCES Collections(CollectionID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE Orders
	ADD CONSTRAINT R_26 FOREIGN KEY (WorkerID) REFERENCES Workers(WorkerID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE Orders
	ADD CONSTRAINT R_27 FOREIGN KEY (PaymentSystemID) REFERENCES PaymentSystems(PaymentSystemID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE Orders
	ADD CONSTRAINT R_28 FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE Producers
	ADD CONSTRAINT R_170 FOREIGN KEY (CountryID) REFERENCES Countries(CountryID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE Productions
	ADD CONSTRAINT R_197 FOREIGN KEY (FurnitureOrderRowID) REFERENCES FurnitureOrderRows(FurnitureOrderRowID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


ALTER TABLE Productions
	ADD CONSTRAINT R_197 FOREIGN KEY (WarehouseID) REFERENCES Warehouses(WarehouseID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go



ALTER TABLE Profits
	ADD CONSTRAINT R_199 FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE Provider_Producer
	ADD CONSTRAINT R_171 FOREIGN KEY (ProviderID) REFERENCES Providers(ProviderID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE Provider_Producer
	ADD CONSTRAINT R_173 FOREIGN KEY (ProducerID) REFERENCES Producers(ProducerID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE Providers
	ADD CONSTRAINT R_3 FOREIGN KEY (CityID) REFERENCES Cities(CityID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE WarehouseDetails
	ADD CONSTRAINT R_11 FOREIGN KEY (DetailID) REFERENCES Details(DetailID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE WarehouseDetails
	ADD CONSTRAINT R_175 FOREIGN KEY (WarehouseID) REFERENCES Warehouses(WarehouseID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE WarehouseMovements
	ADD CONSTRAINT R_15 FOREIGN KEY (FromWarehouseDetailID) REFERENCES WarehouseDetails(WarehouseDetailID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE WarehouseMovements
	ADD CONSTRAINT R_16 FOREIGN KEY (ToWarehouseDetailID) REFERENCES WarehouseDetails(WarehouseDetailID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE WarehouseMovements
	ADD CONSTRAINT R_196 FOREIGN KEY (WorkerID) REFERENCES Workers(WorkerID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE Warehouses
	ADD CONSTRAINT R_10 FOREIGN KEY (CityID) REFERENCES Cities(CityID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE Worker_Production
	ADD CONSTRAINT R_148 FOREIGN KEY (WorkerID) REFERENCES Workers(WorkerID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE Worker_Production
	ADD CONSTRAINT R_150 FOREIGN KEY (ProductionID) REFERENCES Productions(ProductionID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go




ALTER TABLE Workers
	ADD CONSTRAINT R_9 FOREIGN KEY (PostID) REFERENCES Posts(PostID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
go


