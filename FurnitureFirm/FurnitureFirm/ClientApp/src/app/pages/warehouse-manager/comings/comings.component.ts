import { Component, OnInit } from '@angular/core';
import { Warehouse } from 'src/app/models/warehouse';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-comings',
  templateUrl: './comings.component.html',
  styleUrls: ['./comings.component.css']
})
export class ComingsComponent implements OnInit {

  warehouses: Warehouse[];

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.getWarehouses().subscribe(response => {
      this.warehouses = response as Warehouse[];
    });
  }
}
