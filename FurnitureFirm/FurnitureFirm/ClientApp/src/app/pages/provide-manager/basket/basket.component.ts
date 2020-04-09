import { Component, OnInit } from '@angular/core';
import { DetailOrderService } from 'src/app/services/detailOrder/detailOrder.service';
import { HttpService } from 'src/app/services/http/http.service';
import { DetailsOrderRequest } from 'src/app/models/detailOrder-request';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class DetailBasketComponent implements OnInit {

  order: DetailsOrderRequest;

  constructor(public detailOrderService: DetailOrderService,
    private httpService: HttpService) { }

  ngOnInit(): void {
    console.log(this.detailOrderService.order);
    this.order = this.detailOrderService.order;
  }
}
