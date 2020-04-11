import { Injectable } from '@angular/core';
import { DetailsOrderRequest } from 'src/app/models/detailOrder-request';
import { OrderedDetail } from 'src/app/models/ordered-detail';

@Injectable({
  providedIn: 'root'
})
export class DetailOrderService {
  order = new DetailsOrderRequest();

  addDetail(orderedDetail: OrderedDetail) {
    this.order.orderRows.push(orderedDetail);
  }

  removeDetail(orderedDetail: OrderedDetail) {
    this.order.orderRows = this.order.orderRows.filter(obj => obj !== orderedDetail);
  }

  calcTotalPrice() {
    this.order.totalPrice = 0;
    this.order.orderRows.forEach(detail => {
      this.order.totalPrice += detail.orderedDetailPrice * detail.count;
    });
    return this.order.totalPrice;
  }

  clear() {
    this.order = new DetailsOrderRequest();
  }
}
