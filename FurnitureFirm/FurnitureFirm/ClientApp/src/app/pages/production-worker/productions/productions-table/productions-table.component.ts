import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Order } from 'src/app/models/order';
import { MatTableDataSource, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { HttpService } from 'src/app/services/http/http.service';
import { OrderDetailsComponent } from 'src/app/pages/sales-manager/orders/order-details/order-details.component';

@Component({
  selector: 'app-productions-table',
  templateUrl: './productions-table.component.html',
  styleUrls: ['./productions-table.component.css']
})
export class ProductionsTableComponent implements OnInit {

  @Input() status: string;
  orders: Order[];
  dataSource: MatTableDataSource<Order>;
  displayedColumns: string[] = ['date', 'price', 'worker', 'workersCount', 'buttons'];

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

  isNew(order: Order){
    return order.status == "Прийнято"
  }

  isInProduction(order: Order){
    return order.status == "Виготовляється"
  }

  isInDelivery(order: Order){
    return order.status == "Доставляється"
  }

  getWorkersCount(order: Order){
    
  }

  isAttachedToProduction(order: Order){

  }

  startProduction(order: Order){

  }

  attachToProduction(order: Order){

  }

  finishProduction(order: Order){

  }

  finishDelivery(order: Order){

  }
}
