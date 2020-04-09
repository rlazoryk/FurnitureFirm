import { Component, OnInit, Inject } from '@angular/core';
import { OrderedDetail } from 'src/app/models/ordered-detail';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Detail } from 'src/app/models/detail';
import { HttpService } from 'src/app/services/http/http.service';
import { DetailOrderService } from 'src/app/services/detailOrder/detailOrder.service';
import { DescriptionModalComponent } from 'src/app/pages/shared/description-modal/description-modal.component';

@Component({
  selector: 'app-detail-configure-modal',
  templateUrl: './detail-configure-modal.component.html',
  styleUrls: ['./detail-configure-modal.component.css']
})
export class DetailConfigureModalComponent implements OnInit {

  orderedDetail: OrderedDetail = new OrderedDetail();
  alreadyOrdered: OrderedDetail;

  constructor(@Inject(MAT_DIALOG_DATA) public detail: Detail,
    private detailOrderService: DetailOrderService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.orderedDetail.detailId = this.detail.detailId;
    this.orderedDetail.totalPrice = this.detail.price;

    this.alreadyOrdered = this.detailOrderService.order.orderedDetails
      .filter(d => d.detailId === this.orderedDetail.detailId)[0];

      if (this.alreadyOrdered) {
        this.orderedDetail.count = this.alreadyOrdered.count;
        this.orderedDetail.totalPrice = this.alreadyOrdered.totalPrice;
      } else {
        this.orderedDetail.count = 1;
      }
  }

  showInfo(detail: Detail) {
    this.dialog.open(DescriptionModalComponent, {
      data: {
        name: detail.name,
        description: detail.description
      }
    });
  }

  addDetail() {
    this.orderedDetail.count++;
    this.orderedDetail.totalPrice += this.detail.price;
  }

  removeDetail() {
    if (this.orderedDetail.count === 1) {
      return;
    } else {
      this.orderedDetail.count--;
      this.orderedDetail.totalPrice -= Math.round(this.detail.price);
    }
  }

  addToOrder() {
    if (this.alreadyOrdered) {
      this.alreadyOrdered.count = this.orderedDetail.count;
      this.alreadyOrdered.totalPrice = this.orderedDetail.totalPrice;
    } else {
      this.detailOrderService.addDetail(this.orderedDetail);
    }

    this.dialog.closeAll();
  }
}
