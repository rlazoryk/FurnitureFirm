import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Order } from 'src/app/models/order';
import { ProductionService } from 'src/app/services/http/production.service';
import { Warehouse } from 'src/app/models/warehouse';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-choose-warehouse',
  templateUrl: './choose-warehouse.component.html',
  styleUrls: ['./choose-warehouse.component.css']
})
export class ChooseWarehouseComponent implements OnInit {

  warehouses : Warehouse[]
  selectedWarehouse : Warehouse
  missingDetails : string

  constructor(public dialogRef: MatDialogRef<ChooseWarehouseComponent>,
    @Inject(MAT_DIALOG_DATA) public order: Order,
    private httpService : HttpService,
    private productionService : ProductionService,
    private authService : AuthService,
    private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.httpService.getWarehouses()
      .subscribe(response => {
        this.warehouses = response as Warehouse[];
      })
  }

  choose() {
    this.missingDetails = null;

    const currentWorkerId = this.authService.worker.workerId;
    this.productionService.startProduction(this.order.orderId, this.selectedWarehouse.warehouseId)
      .subscribe(response => {
        this.productionService.attachToProduction(this.order.orderId, currentWorkerId)
          .subscribe(response=>{
            this.snackBar.open('Виробництво успішно почалось!', null, {
              duration: 4000,
              panelClass: ['accent-color']
            });
            this.dialogRef.close();
          })
      },
      error => {
        let missingDetails = "";
        let details = error.error as Object[]
        for(let key in details)
        {
          missingDetails += "Деталь " + key + " Кількість: " + details[key] + "\n";
        }
        this.missingDetails = missingDetails;
        this.snackBar.open('Не достатньо деталей на вибраному складі, зверніться до менеджера з поставок.', null, {
          panelClass: ['warn-color'],
          duration : 5000
        });
      })
  }
}