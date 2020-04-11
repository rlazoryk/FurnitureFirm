import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DetailOrder } from 'src/app/models/detailOrder';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpService } from 'src/app/services/http/http.service';
import { OrderInfoModalComponent } from '../../modals/order-info-modal/order-info-modal.component';
import { DetailOrderRow } from 'src/app/models/detailOrderRow';
import { WarehouseConfigureModalComponent } from '../../modals/warehouse-configure-modal/warehouse-configure-modal.component';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent implements OnInit {

  orders: DetailOrder[] = [];
  @Input() isClosed: boolean;
  displayedColumns: string[] = ['date', 'provider', 'price', 'worker', 'details', 'confirm', 'delete'];
  isLoading = false;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private http: HttpService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading = true;
    this.http.getDetailOrders().subscribe(response => {
      this.isLoading = false;
      this.orders = response as DetailOrder[];
      this.orders = this.orders.filter(o => o.isClosed === this.isClosed);
    });
  }

  showInfo(orderId: number) {
    this.http.getDetailOrder(orderId).subscribe(response => {
      const orderedDetails: DetailOrderRow[] = response as DetailOrderRow[];
      this.dialog.open(OrderInfoModalComponent, {
        width: '600px',
        data: orderedDetails
      });
    });
  }

  showWarehouseModal(orderId: number) {
    this.dialog.open(WarehouseConfigureModalComponent, {
      width: '400px',
      data: orderId
    });
  }

  deleteOrder(orderId: number) {
    this.http.deleteOrder(orderId).subscribe(response => {
      this.orders = this.orders.filter(o => o.detailOrderId !== orderId);
      console.log(response);
    });
  }
}
