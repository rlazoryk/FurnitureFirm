import { Component, OnInit } from '@angular/core';
import { OrderRequest } from 'src/app/models/order-request';
import { OrderService } from 'src/app/services/order/order.service';
import { HttpService } from 'src/app/services/http/http.service';
import { PaymentSystem } from 'src/app/models/payment-system';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  order : OrderRequest;
  paymentSystems: PaymentSystem[];

  constructor(public orderService: OrderService,
    private httpService : HttpService) { }

  ngOnInit(): void {
    this.order = this.orderService.currentOrder;
    this.httpService.getPaymentSystems()
      .subscribe(response => {
      this.paymentSystems = response as PaymentSystem[]
    });
  }
}