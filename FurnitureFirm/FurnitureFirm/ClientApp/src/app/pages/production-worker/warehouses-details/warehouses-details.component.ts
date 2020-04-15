import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Warehouse } from 'src/app/models/warehouse';

@Component({
  selector: 'app-warehouses-details',
  templateUrl: './warehouses-details.component.html',
  styleUrls: ['./warehouses-details.component.css']
})
export class WarehousesDetailsComponent implements OnInit {

  warehouses : Warehouse[];

  constructor(private httpService : HttpService) { }

  ngOnInit(): void {
    this.httpService.getWarehouses()
      .subscribe(response => {
        this.warehouses = response as Warehouse[];
      });
  }

}
