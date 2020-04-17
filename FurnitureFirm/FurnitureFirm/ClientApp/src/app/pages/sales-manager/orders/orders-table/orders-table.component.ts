import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from 'src/app/models/order';
import { MatTableDataSource, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { HttpService } from 'src/app/services/http/http.service';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-furniture-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class FurnitureOrdersTableComponent implements OnInit {

  orders: Order[];
  dataSource: MatTableDataSource<Order>;
  displayedColumns: string[] = ['date', 'price', 'profit', 'worker', 'status', 'buttons'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private httpService: HttpService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.httpService.getFurnitureOrders()
      .subscribe(response => {
        this.orders = response as Order[]
        this.dataSource = new MatTableDataSource(this.orders)
        this.dataSource.sort = this.sort;
      })
  }

  showDetails(order: Order) {
    console.log(order)
    this.dialog.open(OrderDetailsComponent, {
      data: order,
      width: '600px'
    })
  }

  cancelOrder(order: Order) {
    this.httpService.cancelFurnitureOrder(order.orderId)
      .subscribe(response => {
        order.status = (response as Order).status;
        this.snackBar.open('Замовлення скасоване успішно', null, {
          duration: 2000,
          panelClass: ['accent-color']
        });
      });
  }

  isNew(order: Order) {
    return order.status == "Прийнято";
  }
}
