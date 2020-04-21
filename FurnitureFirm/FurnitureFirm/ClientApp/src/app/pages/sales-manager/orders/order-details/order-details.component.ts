import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  displayedColumns = ['name', 'count', 'additionalCount', 'totalPrice']

  constructor(@Inject(MAT_DIALOG_DATA) public order: Order) { }

  ngOnInit(): void {
    console.log(this.order)
  }

  getAdditionalDetailsCount(orderRow) {
    let count = 0;
    orderRow.additionalDetailsOrdered.forEach(additionalDetail => {
      count += additionalDetail.count;
    });
    return count;
  }
}
