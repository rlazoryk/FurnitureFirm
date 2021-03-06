import { Component, OnInit, Inject } from '@angular/core';
import { Warehouse } from 'src/app/models/warehouse';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { HttpService } from 'src/app/services/http/http.service';
import { ConfirmOrder } from 'src/app/models/confirm-order';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-warehouse-configure-modal',
  templateUrl: './warehouse-configure-modal.component.html',
  styleUrls: ['./warehouse-configure-modal.component.css']
})
export class WarehouseConfigureModalComponent implements OnInit {

  warehouses: Warehouse[] = [];
  selectedWarehouse = 1;

  constructor(@Inject(MAT_DIALOG_DATA) public orderId: number,
    private http: HttpService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.http.getWarehouses().subscribe(response => {
      this.warehouses = response as Warehouse[];
    });
  }

  ConfirmOrder() {
    const confirmOrder = new ConfirmOrder();
    confirmOrder.detailOrderId = this.orderId;
    confirmOrder.warehouseId = this.selectedWarehouse;
    confirmOrder.workerId = this.auth.worker.workerId;

    this.http.confirmOrder(confirmOrder).subscribe(response => {
    });

    window.location.reload();
  }
}
