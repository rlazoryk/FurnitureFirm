import { Injectable } from '@angular/core';
import { DetailsOrderRequest } from 'src/app/models/detailOrder-request';
import { OrderedDetail } from 'src/app/models/ordered-detail';

@Injectable({
  providedIn: 'root'
})
export class DetailOrderService {
  order = new DetailsOrderRequest();

  addDetail(orderedDetail: OrderedDetail) {
    this.order.orderedDetails.push(orderedDetail);
  }

  removeDetail(orderedDetail: OrderedDetail) {
    this.order.orderedDetails = this.order.orderedDetails.filter(obj => obj !== orderedDetail);
  }

  calcTotalPrice() {
    this.order.totalPrice = 0;
    this.order.orderedDetails.forEach(detail => {
      this.order.totalPrice += detail.totalPrice;
    });
    return this.order.totalPrice;
  }
}
