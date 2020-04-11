import { Component, OnInit } from '@angular/core';
import { DetailOrderService } from 'src/app/services/detailOrder/detailOrder.service';
import { HttpService } from 'src/app/services/http/http.service';
import { DetailsOrderRequest } from 'src/app/models/detailOrder-request';
import { MatDialog } from '@angular/material';
import { ProviderConfigureModalComponent } from '../modals/provider-configure-modal/provider-configure-modal.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class DetailBasketComponent implements OnInit {

  order: DetailsOrderRequest;

  constructor(public detailOrderService: DetailOrderService,
    private httpService: HttpService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.order = this.detailOrderService.order;
  }

  showProviderDialog() {
    this.dialog.open(ProviderConfigureModalComponent, {
      width: '500px',
      data: this.order
    });
  }
}
