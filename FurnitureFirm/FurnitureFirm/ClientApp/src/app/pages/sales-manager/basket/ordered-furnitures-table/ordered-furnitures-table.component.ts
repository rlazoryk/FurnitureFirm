import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { OrderedFurniture } from 'src/app/models/ordered-furniture';
import { Furniture } from 'src/app/models/furniture';
import { FurnitureConfiguringModalComponent } from '../../shared/furniture-configuring-modal/furniture-configuring-modal.component';
import { MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-ordered-furnitures-table',
  templateUrl: './ordered-furnitures-table.component.html',
  styleUrls: ['./ordered-furnitures-table.component.css']
})
export class OrderedFurnituresTableComponent implements OnInit {

  displayedColumns : string[] = ['name', 'count', 'price', 'buttons'];
  furnitures : Furniture[];
  loaded = false;

  constructor(public orderService : OrderService,
      private dialog : MatDialog,
      private httpService: HttpService) { }

  ngOnInit(): void {
    this.orderService.currentOrder.orderedFurnitures.forEach(furniture => {   
      this.httpService.getFurnituresById(furniture.furnitureId)
        .subscribe(response => {
          if(!this.furnitures) this.furnitures = [];
          
          this.furnitures.push(response as Furniture);
          
          if(this.furnitures.length == this.orderService.currentOrder.orderedFurnitures.length)
            this.loaded = true;
        });
      });
  }

  showFurnitureConfiguring(furniture: Furniture){
    const dialogRef = this.dialog.open(FurnitureConfiguringModalComponent, {
        width: '600px',
        data: furniture
    })
  }

  removeFromOrder(furniture: Furniture){
    const itemToRemove = this.orderService.currentOrder.orderedFurnitures.filter(f=>f.furnitureId == furniture.furnitureId)[0];
    this.orderService.removeFurniture(itemToRemove);
  }

  getOrderedCount(furniture: Furniture) {
    return this.orderService.currentOrder.orderedFurnitures.filter(f=>f.furnitureId == furniture.furnitureId)[0].count;
  }

  getTotalFurniturePrice(furniture: Furniture) {
    return this.orderService.currentOrder.orderedFurnitures.filter(f=>f.furnitureId == furniture.furnitureId)[0].totalPrice;
  }
}
