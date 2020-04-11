import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warehouses-details',
  templateUrl: './warehouses-details.component.html',
  styleUrls: ['./warehouses-details.component.css']
})
export class WarehousesDetailsComponent implements OnInit {

  warehouses = ['1', '2']

  constructor() { }

  ngOnInit(): void {
  }

}
