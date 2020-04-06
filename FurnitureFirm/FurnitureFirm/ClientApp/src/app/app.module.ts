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
import { MatTableModule, MatIconModule, MatButtonModule, MatDialogModule, MatSortModule } from '@angular/material';
import { DescriptionModalComponent } from './pages/sales-manager/furnitures-catalog/furniture-table/description-modal/description-modal.component';
import { FurnitureConfiguringModalComponent } from './pages/sales-manager/furnitures-catalog/furniture-configuring-modal/furniture-configuring-modal.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FurnituresCatalogComponent,
    FurnitureTableComponent,
    DescriptionModalComponent,
    FurnitureConfiguringModalComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'furnitures', component: FurnituresCatalogComponent},
    ]),
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSortModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DescriptionModalComponent,
    FurnitureConfiguringModalComponent,
  ],
})
export class AppModule { }
