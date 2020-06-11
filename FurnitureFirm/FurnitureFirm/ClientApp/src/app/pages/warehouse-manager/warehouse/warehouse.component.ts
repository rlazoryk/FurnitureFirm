import { Component, OnInit } from '@angular/core';
import { Warehouse } from 'src/app/models/warehouse';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  warehouses: Warehouse[];

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.getWarehouses().subscribe(response => {
      this.warehouses = response as Warehouse[];
    });
  }
}
