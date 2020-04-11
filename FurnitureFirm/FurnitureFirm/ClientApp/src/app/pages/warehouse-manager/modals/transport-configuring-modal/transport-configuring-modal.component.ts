import { Component, OnInit, Inject } from '@angular/core';
import { Warehouse } from 'src/app/models/warehouse';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { HttpService } from 'src/app/services/http/http.service';
import { WarehouseDetail } from 'src/app/models/warehouse-detail';
import { Movement } from 'src/app/models/detail-movement';

@Component({
  selector: 'app-transport-configuring-modal',
  templateUrl: './transport-configuring-modal.component.html',
  styleUrls: ['./transport-configuring-modal.component.css']
})
export class TransportConfiguringModalComponent implements OnInit {

  warehouses: Warehouse[] = [];
  selectedWarehouse = 1;
  transportCount = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public detail: WarehouseDetail,
    private http: HttpService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.http.getWarehouses().subscribe(response => {
      this.warehouses = response as Warehouse[];
      this.warehouses = this.warehouses.filter(wh => wh.warehouseId !== this.detail.warehouseId);
    });
  }

  removeDetail() {
    if (this.transportCount > 0) {
      this.transportCount--;
    }
  }

  addDetail() {
    if (this.transportCount < this.detail.count) {
      this.transportCount++;
    }
  }

  Transportate() {
    const transportate = new Movement();
    transportate.fromWarehouseDetailId = this.detail.warehouseDetailId;
    transportate.toWarehouseId = this.selectedWarehouse;
    transportate.count = this.transportCount;
    transportate.detailId = this.detail.detail.detailId;
    transportate.workerId = 2;

    this.detail.count -= this.transportCount;

    console.log(transportate);
    this.http.putWarehouseDetail(transportate).subscribe(response => {
      console.log(response);
    });
  }

  closeModal() {
    this.dialog.closeAll();
  }
}
