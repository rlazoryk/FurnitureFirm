import { Component, OnInit } from '@angular/core';
import { Warehouse } from 'src/app/models/warehouse';
import { Consumption } from 'src/app/models/consumption';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-consumptions',
  templateUrl: './consumptions.component.html',
  styleUrls: ['./consumptions.component.css']
})
export class ConsumptionsComponent implements OnInit {

  warehouseConsumptions: { warehouse: Warehouse; consumptions: Consumption[] }[];
  isLoading = false;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.http.getWarehouseConsumptions().subscribe(response => {
      this.isLoading = false;
      this.warehouseConsumptions = response as any;
    });
  }
}
