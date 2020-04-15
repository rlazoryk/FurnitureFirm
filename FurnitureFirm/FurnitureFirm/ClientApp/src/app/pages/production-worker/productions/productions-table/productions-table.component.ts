import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Order } from 'src/app/models/order';
import { MatTableDataSource, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { HttpService } from 'src/app/services/http/http.service';
import { OrderDetailsComponent } from 'src/app/pages/sales-manager/orders/order-details/order-details.component';
import { ProductionService } from 'src/app/services/http/production.service';

@Component({
  selector: 'app-productions-table',
  templateUrl: './productions-table.component.html',
  styleUrls: ['./productions-table.component.css']
})
export class ProductionsTableComponent implements OnInit {

  @Input() status: string;
  orders: Order[];
  dataSource: MatTableDataSource<Order>;
  displayedColumns: string[] = ['date', 'price', 'manager', 'workersCount', 'buttons'];

  //TODO: when login will be implemented
  currentWorkerId = 1;

  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private httpService: HttpService,
    private productionService: ProductionService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.httpService.getFurnitureOrdersWithStatus(this.status)
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

  isNew(order: Order) {
    return order.status == "Прийнято"
  }

  isInProduction(order: Order) {
    return order.status == "Виготовляється"
  }

  isInDelivery(order: Order) {
    return order.status == "Доставляється"
  }

  getWorkersCount(order: Order) {
    this.productionService.getWorkersOnProductionCount(order.orderId)
      .subscribe(response => {
        return response as number;
      })
  }

  isAttachedToProduction(order: Order) {
    this.productionService.isAttachedToProduction(order.orderId, this.currentWorkerId)
      .subscribe(response => {
        return response as boolean;
      })
  }

  startProduction(order: Order) {
    this.productionService.startProduction(order.orderId)
      .subscribe(response => {
        this.productionService.attachToProduction(order.orderId, this.currentWorkerId)
          .subscribe(response=>{
            this.orders = this.orders.filter(obj => obj !== order);
            console.log("Started prod")
          })
      })
  }

  attachToProduction(order: Order) {
    this.productionService.attachToProduction(order.orderId, this.currentWorkerId)
      .subscribe(response => {
        this.orders = this.orders.filter(obj => obj !== order);
        console.log("Attached")
      })
  }

  finishProduction(order: Order) {
    this.productionService.finishProduction(order.orderId)
    .subscribe(response=>{
      this.orders = this.orders.filter(obj => obj !== order);
      console.log("Finished prod")
    })
  }

  finishDelivery(order: Order) {
    this.productionService.finishDelivery(order.orderId)
    .subscribe(response=>{
      this.orders = this.orders.filter(obj => obj !== order);
      console.log("Finished delivery")
    })
  }
}
