import { Component, OnInit } from '@angular/core';
import { Detail } from 'src/app/models/detail';
import { MatDialog } from '@angular/material';
import { DetailOrderService } from 'src/app/services/detailOrder/detailOrder.service';
import { HttpService } from 'src/app/services/http/http.service';
import { DetailConfigureModalComponent } from '../../modals/detail-configure-modal/detail-configure-modal.component';

@Component({
  selector: 'app-ordered-details-table',
  templateUrl: './ordered-details-table.component.html',
  styleUrls: ['./ordered-details-table.component.css']
})
export class OrderedDetailsTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'producer', 'count', 'price', 'config', 'remove'];
  details: Detail[];
  loaded = false;

  constructor(public orderService: DetailOrderService,
      private dialog: MatDialog,
      private httpService: HttpService) { }

  ngOnInit(): void {
    this.orderService.order.orderedDetails.forEach(detail => {
      this.httpService.getDetailByid(detail.detailId)
        .subscribe(response => {
          if (!this.details) {
            this.details = [];
          }

          this.details.push(response as Detail);

          if (this.details.length === this.orderService.order.orderedDetails.length) {
            this.loaded = true;
          }
        });
      });
  }

  showDetailConfiguring(detail: Detail) {
    this.dialog.open(DetailConfigureModalComponent, {
        width: '600px',
        data: detail
    });
  }

  removeFromOrder(detail: Detail) {
    this.details = this.details.filter(d => d.detailId === detail.detailId);
    const itemToRemove = this.orderService.order.orderedDetails.filter(d => d.detailId === detail.detailId)[0];
    this.orderService.removeDetail(itemToRemove);
  }

  getOrderedCount(detail: Detail) {
    console.log("Details count:" + detail);
    return this.orderService.order.orderedDetails.filter(d => d.detailId === detail.detailId)[0].count;
  }

  getTotalDetailsPrice(detail: Detail) {
    return this.orderService.order.orderedDetails.filter(d => d.detailId === detail.detailId)[0].totalPrice;
  }
}

