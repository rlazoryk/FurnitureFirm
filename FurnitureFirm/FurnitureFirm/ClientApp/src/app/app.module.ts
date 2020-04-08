import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FurnituresCatalogComponent } from './pages/sales-manager/furnitures-catalog/furnitures-catalog.component';
import { FurnitureTableComponent } from './pages/sales-manager/furnitures-catalog/furniture-table/furniture-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatIconModule, MatButtonModule, MatDialogModule, MatSortModule, MatTab, MatTabsModule, MatCardModule, MatExpansionModule, MatFormFieldModule, MatSelectModule, MatInputModule } from '@angular/material';
import { DescriptionModalComponent } from './pages/shared/description-modal/description-modal.component';
import { FurnitureConfiguringModalComponent } from './pages/sales-manager/shared/furniture-configuring-modal/furniture-configuring-modal.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BasketComponent } from './pages/sales-manager/basket/basket.component';
import { OrderedFurnituresTableComponent } from './pages/sales-manager/basket/ordered-furnitures-table/ordered-furnitures-table.component';
import { DetailsCatalogComponent } from './pages/provide-manager/details-catalog/details-catalog.component';




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
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'furnitures', component: FurnituresCatalogComponent},
      { path: 'basket', component: BasketComponent},
      { path: 'details', component: DetailsCatalogComponent }
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
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DescriptionModalComponent,
    FurnitureConfiguringModalComponent,
  ],
})
export class AppModule { }
