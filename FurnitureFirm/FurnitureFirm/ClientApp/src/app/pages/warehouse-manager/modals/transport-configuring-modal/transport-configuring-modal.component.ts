import { Component, OnInit, Inject } from '@angular/core';
import { Warehouse } from 'src/app/models/warehouse';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { HttpService } from 'src/app/services/http/http.service';
import { WarehouseDetail } from 'src/app/models/warehouse-detail';
import { Movement } from 'src/app/models/detail-movement';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-transport-configuring-modal',
  templateUrl: './transport-configuring-modal.component.html',
  styleUrls: ['./transport-configuring-modal.component.css']
})
export class TransportConfiguringModalComponent implements OnInit {

  warehouses: Warehouse[] = [];
  movements: Movement[] = [];
  selectedWarehouse = 0;
  transportCount = 0;
  displayedColumns: string[] = ['name', 'count'];

  constructor(@Inject(MAT_DIALOG_DATA) public details: WarehouseDetail[],
    private http: HttpService,
    private dialog: MatDialog,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.http.getWarehouses().subscribe(response => {
      this.warehouses = response as Warehouse[];
      this.warehouses = this.warehouses.filter(wh => wh.warehouseId !== this.details[0].warehouseId);
    });

    this.details.forEach(d => {
      this.movements.push({
        detailId: d.detail.detailId,
        count: 0,
        workerId: this.auth.worker.workerId,
        fromWarehouseDetailId: d.warehouseDetailId,
        toWarehouseId: 0});
    });
  }

  removeDetail(movement: Movement) {
    if (movement.count > 0) {
      movement.count--;
    }
  }

  addDetail(movement: Movement) {
    if (movement.count < this.details.find(d => d.warehouseDetailId === movement.fromWarehouseDetailId).count) {
      movement.count++;
    }
  }

  getDetailName(movement: Movement) {
    return this.details.find(d => d.warehouseDetailId === movement.fromWarehouseDetailId).detail.name;
  }

  getProviderName(movement: Movement) {
    return this.details.find(d => d.warehouseDetailId === movement.fromWarehouseDetailId).detail.provider.name;
  }

  Transportate() {
    for (let i = 0; i < this.movements.length; ++i) {
      if (this.movements[i].count < 1) {
        return;
      }
    }

    if (this.selectedWarehouse === 0) {
      return;
    }

    this.movements.forEach(m => {
      m.toWarehouseId = this.selectedWarehouse;
    });

    console.log(this.movements);

    this.http.putWarehouseDetail(this.movements);

    window.location.reload();
  }

  closeModal() {
    this.dialog.closeAll();
  }
}
