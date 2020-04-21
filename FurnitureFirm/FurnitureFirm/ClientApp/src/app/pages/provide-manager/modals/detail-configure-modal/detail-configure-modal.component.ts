import { Component, OnInit, Inject } from '@angular/core';
import { OrderedDetail } from 'src/app/models/ordered-detail';
import { MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { Detail } from 'src/app/models/detail';
import { DetailOrderService } from 'src/app/services/detailOrder/detailOrder.service';
import { DescriptionModalComponent } from 'src/app/pages/shared/description-modal/description-modal.component';

@Component({
  selector: 'app-detail-configure-modal',
  templateUrl: './detail-configure-modal.component.html',
  styleUrls: ['./detail-configure-modal.component.css']
})
export class DetailConfigureModalComponent implements OnInit {

  orderedDetail: OrderedDetail = new OrderedDetail();
  totalPrice: number;
  alreadyOrdered: OrderedDetail;

  constructor(@Inject(MAT_DIALOG_DATA) public detail: Detail,
    private detailOrderService: DetailOrderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.orderedDetail.detailId = this.detail.detailId;
    this.orderedDetail.orderedDetailPrice = this.detail.price;
    this.totalPrice = this.detail.price;

    this.alreadyOrdered = this.detailOrderService.order.orderRows
      .filter(d => d.detailId === this.orderedDetail.detailId)[0];

      if (this.alreadyOrdered) {
        this.orderedDetail.count = this.alreadyOrdered.count;
        this.orderedDetail.orderedDetailPrice = this.alreadyOrdered.orderedDetailPrice;
        this.totalPrice = this.alreadyOrdered.count * this.alreadyOrdered.orderedDetailPrice;
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
    this.totalPrice += this.detail.price;
  }

  removeDetail() {
    if (this.orderedDetail.count === 1) {
      return;
    } else {
      this.orderedDetail.count--;
      this.totalPrice -= this.detail.price;
    }
  }

  addToOrder() {
    if (this.alreadyOrdered) {
      this.alreadyOrdered.count = this.orderedDetail.count;
    } else {
      this.detailOrderService.addDetail(this.orderedDetail);
    }

    this.dialog.closeAll();

    this.snackBar.open('Успішно додано в корзину!', null, {
      duration: 4000,
      panelClass: ['accent-color']
    });
  }
}
