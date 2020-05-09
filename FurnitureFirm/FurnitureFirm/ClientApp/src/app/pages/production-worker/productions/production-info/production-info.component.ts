import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-production-info',
  templateUrl: './production-info.component.html',
  styleUrls: ['./production-info.component.css'],
})
export class ProductionInfoComponent implements OnInit {
  displayedColumns = ['name', 'count', 'additionalCount', 'totalPrice']
  dataSource : any;

  constructor(@Inject(MAT_DIALOG_DATA) public order: Order) { }
  

  ngOnInit(): void {
    console.log(this.order)
    this.dataSource = this.order.furnitureOrderRows;
  }

  getAdditionalDetailsCount(orderRow) {
    let count = 0;
    orderRow.additionalDetailsOrdered.forEach(additionalDetail => {
      count += additionalDetail.count;
    });
    return count;
  }
}
