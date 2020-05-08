import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Order } from 'src/app/models/order';
import { MatTableDataSource, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { HttpService } from 'src/app/services/http/http.service';
import { OrderDetailsComponent } from 'src/app/pages/sales-manager/orders/order-details/order-details.component';
import { ProductionService } from 'src/app/services/http/production.service';
import { ChooseWarehouseComponent } from './choose-warehouse/choose-warehouse.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-productions-table',
  templateUrl: './productions-table.component.html',
  styleUrls: ['./productions-table.component.css']
})
export class ProductionsTableComponent implements OnInit {

  @Input() status: string;
  orders: Order[];
  dataSource: MatTableDataSource<Order>;
  displayedColumns: string[] = ['date', 'price', 'manager', 'workersCount', 'info', 'buttons'];
  workersCount: { order: Order, workersCount: number }[];
  attachedToProductions: Order[] = [];

  currentWorkerId = this.authService.worker.workerId;

  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private httpService: HttpService,
    private productionService: ProductionService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthService) { }

  ngOnInit() {
    this.refresh();
  }

  showDetails(order: Order) {
    console.log(order)
    this.dialog.open(OrderDetailsComponent, {
      data: order,
      width: '600px'
    })
  }

  getWorkersCount(order: Order) {
    return this.workersCount.filter(w => w.order.orderId === order.orderId)[0].workersCount;
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

  isAttachedToProduction(order: Order) {
    return this.attachedToProductions.some(p => p.orderId == order.orderId);
  }

  startProduction(order: Order) {
    //open modal to choose warehouse
    const dialogRef = this.dialog.open(ChooseWarehouseComponent, {
      width: '300px',
      data: order
    })
    dialogRef.afterClosed().subscribe(resp => {
      this.orders = this.orders.filter(p => p.orderId != order.orderId);
      this.dataSource.data = this.orders;
      console.log(this.orders)
    })

  }

  attachToProduction(order: Order) {
    this.productionService.attachToProduction(order.orderId, this.currentWorkerId)
      .subscribe(response => {
        this.orders = this.orders.filter(p => p.orderId != order.orderId);
        this.dataSource.data = this.orders;
        this.snackBar.open('Ви успішно приєднались до виробництва!', null, {
          duration: 4000,
          panelClass: ['accent-color']
        });
      })
  }

  finishProduction(order: Order) {
    this.productionService.finishProduction(order.orderId)
      .subscribe(response => {
        this.orders = this.orders.filter(p => p.orderId != order.orderId);
        this.dataSource.data = this.orders;
        this.snackBar.open('Виробництво успішно завершено!', null, {
          duration: 4000,
          panelClass: ['accent-color']
        });
        this.productionService.startDelivery(order.orderId)
          .subscribe(response => {
            this.snackBar.open('Доставку розпочато!', null, {
              duration: 4000,
              panelClass: ['accent-color']
            });
          })
      })
  }

  finishDelivery(order: Order) {
    this.productionService.finishDelivery(order.orderId)
      .subscribe(response => {
        this.orders = this.orders.filter(p => p.orderId != order.orderId);
        this.dataSource.data = this.orders;
        this.snackBar.open('Доставку завершено!', null, {
          duration: 4000,
          panelClass: ['accent-color']
        });
      })
  }

  refresh(){
    this.httpService.getFurnitureOrdersWithStatus(this.status)
    .subscribe(response => {
      this.orders = response as Order[]
      this.dataSource = new MatTableDataSource(this.orders)
      this.dataSource.sort = this.sort;
      this.orders.forEach(order => {
        let workersCount;
        this.workersCount = [];
        this.productionService.getWorkersOnProductionCount(order.orderId)
          .subscribe(response => {
            workersCount = response as number;
            this.workersCount.push({ order: order, workersCount: workersCount });
          })
      })
    })

  this.productionService.getWorkerProductions(this.currentWorkerId)
    .subscribe(response => {
      this.attachedToProductions = response as Order[];
    })
  }
}
