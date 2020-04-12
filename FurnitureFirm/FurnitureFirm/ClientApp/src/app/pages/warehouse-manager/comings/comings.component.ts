import { Component, OnInit } from '@angular/core';
import { Warehouse } from 'src/app/models/warehouse';
import { HttpService } from 'src/app/services/http/http.service';
import { Coming } from 'src/app/models/coming';

@Component({
  selector: 'app-comings',
  templateUrl: './comings.component.html',
  styleUrls: ['./comings.component.css']
})
export class ComingsComponent implements OnInit {

  warehouseComings: { warehouse: Warehouse; comings: Coming[] }[];
  isLoading = false;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.http.getWarehouseComings().subscribe(response => {
      this.isLoading = false;
      this.warehouseComings = response as any;
    });
  }
}
