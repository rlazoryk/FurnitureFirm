import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FurnituresCatalogComponent } from './pages/sales-manager/furnitures-catalog/furnitures-catalog.component';
import { FurnitureTableComponent } from './pages/sales-manager/furnitures-catalog/furniture-table/furniture-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatIconModule, MatButtonModule, MatDialogModule, MatSortModule, MatTab, MatTabsModule, MatCardModule, MatExpansionModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDialogRef, MatSnackBar, MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { DescriptionModalComponent } from './pages/shared/description-modal/description-modal.component';
import { FurnitureConfiguringModalComponent } from './pages/sales-manager/shared/furniture-configuring-modal/furniture-configuring-modal.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BasketComponent } from './pages/sales-manager/basket/basket.component';
import { OrderedFurnituresTableComponent } from './pages/sales-manager/basket/ordered-furnitures-table/ordered-furnitures-table.component';
import { DetailsCatalogComponent } from './pages/provide-manager/details-catalog/details-catalog.component';
import { OrderDetailsComponent } from './pages/sales-manager/orders/order-details/order-details.component';
import { WarehousesDetailsComponent } from './pages/production-worker/warehouses-details/warehouses-details.component';
import { DetailsTableComponent } from './pages/production-worker/warehouses-details/details-table/details-table.component';
import { ProductionsComponent } from './pages/production-worker/productions/productions.component';
import { ProductionsTableComponent } from './pages/production-worker/productions/productions-table/productions-table.component';

import { DetailConfigureModalComponent } from './pages/provide-manager/modals/detail-configure-modal/detail-configure-modal.component';
import { OrderedDetailsTableComponent } from './pages/provide-manager/basket/ordered-details-table/ordered-details-table.component';
import { DetailBasketComponent } from './pages/provide-manager/basket/basket.component';
import { ProviderConfigureModalComponent } from './pages/provide-manager/modals/provider-configure-modal/provider-configure-modal.component';
import { DetailOrdersComponent } from './pages/provide-manager/detail-orders/detail-orders.component';
import { OrdersTableComponent } from './pages/provide-manager/detail-orders/orders-table/orders-table.component';
import { OrderInfoModalComponent } from './pages/provide-manager/modals/order-info-modal/order-info-modal.component';
import { WarehouseConfigureModalComponent } from './pages/provide-manager/modals/warehouse-configure-modal/warehouse-configure-modal.component';
import { WarehouseComponent } from './pages/warehouse-manager/warehouse/warehouse.component';
import { ComingsComponent } from './pages/warehouse-manager/comings/comings.component';
import { ConsumptionsComponent } from './pages/warehouse-manager/consumptions/consumptions.component';
import { WarehoseTableComponent } from './pages/warehouse-manager/warehouse/warehose-table/warehose-table.component';
import { TransportConfiguringModalComponent } from './pages/warehouse-manager/modals/transport-configuring-modal/transport-configuring-modal.component';
import { ComingsTableComponent } from './pages/warehouse-manager/comings/comings-table/comings-table.component';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FurnituresCatalogComponent,
    FurnitureTableComponent,
    DescriptionModalComponent,
    FurnitureConfiguringModalComponent,
    BasketComponent,
    OrderedFurnituresTableComponent,
    DetailsCatalogComponent,
    OrdersTableComponent,
    OrderDetailsComponent,
    WarehousesDetailsComponent,
    DetailsTableComponent,
    ProductionsComponent,
    ProductionsTableComponent,
    DetailConfigureModalComponent,
    OrderedDetailsTableComponent,
    DetailBasketComponent,
    ProviderConfigureModalComponent,
    DetailOrdersComponent,
    OrderInfoModalComponent,
    WarehouseConfigureModalComponent,
    WarehouseComponent,
    ComingsComponent,
    ConsumptionsComponent,
    WarehoseTableComponent,
    TransportConfiguringModalComponent,
    ComingsTableComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'furnitures', component: FurnituresCatalogComponent},
      { path: 'orders', component: OrdersTableComponent},
      { path: 'warehouses-details', component: WarehousesDetailsComponent},
      { path: 'furnitures', component: FurnituresCatalogComponent },
      { path: 'furniture/basket', component: BasketComponent },
      { path: 'details/basket', component: DetailBasketComponent },
      { path: 'details', component: DetailsCatalogComponent },
      { path: 'detailOrders', component: DetailOrdersComponent },
      { path: 'warehouses', component: WarehouseComponent }
    ]),
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSortModule,
    FlexLayoutModule,
    MatTabsModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
  ],
  providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}],
  bootstrap: [AppComponent],
  entryComponents: [
    DescriptionModalComponent,
    FurnitureConfiguringModalComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
