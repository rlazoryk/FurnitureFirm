import { Component, OnInit, Inject } from '@angular/core';
import { OrderedDetail } from 'src/app/models/ordered-detail';
import { MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { Detail } from 'src/app/models/detail';
import { DescriptionModalComponent } from 'src/app/pages/shared/description-modal/description-modal.component';
import { DetailsOrderRequest } from 'src/app/models/detailOrder-request';
import { Provider } from 'src/app/models/provider';
import { HttpService } from 'src/app/services/http/http.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detail-configure-modal',
  templateUrl: './detail-configure-modal.component.html',
  styleUrls: ['./detail-configure-modal.component.css']
})
export class DetailConfigureModalComponent implements OnInit {

  orderedDetails: OrderedDetail[] = new Array<OrderedDetail>();
  totalPrice: number = 0;
  displayedColumns: string[] = ['name', 'provider', 'count', 'price', 'description'];
  providers: Provider[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public details: Detail[],
    private http: HttpService,
    private dialog: MatDialog,
    private auth: AuthService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.http.getProviders().subscribe(response => {
      this.providers = response as Provider[];
    });

    this.details.forEach(d => {
      const orderedDetail = new OrderedDetail();
      orderedDetail.detailId = d.detailId;
      orderedDetail.provider = d.provider;
      orderedDetail.count = 1;
      orderedDetail.orderedDetailPrice = d.price;
      this.orderedDetails.push(orderedDetail);
      this.totalPrice += orderedDetail.orderedDetailPrice;
    });
  }

  getDetailName(id: number) {
    const detail = this.details.filter(d => d.detailId === id)[0];

    return detail.name;
  }

  getProviderName(id: number) {
    const detail = this.details.filter(d => d.detailId === id)[0];

    return detail.provider.name;
  }

  showInfo(id: number) {
    const detail = this.details.filter(d => d.detailId === id)[0];
    this.dialog.open(DescriptionModalComponent, {
      data: {
        name: detail.name,
        description: detail.description
      }
    });
  }

  addDetail(det: OrderedDetail) {
    det.count++;
    this.totalPrice += det.orderedDetailPrice;
  }

  removeDetail(det: OrderedDetail) {
    if (det.count === 1) {
      return;
    } else {
      det.count--;
      this.totalPrice -= det.orderedDetailPrice;
    }
  }

  CreateOrders() {
    this.providers.forEach(p => {
      const orderRows = this.orderedDetails.filter(od => od.provider.providerId === p.providerId);
      if (orderRows.length > 0) {
        const request = new DetailsOrderRequest();
        request.orderRows = orderRows;
        request.providerId = p.providerId;
        request.totalPrice = 0;
        orderRows.forEach(or => {
          request.totalPrice += or.count * or.orderedDetailPrice;
        });
        request.workerId = this.auth.worker.workerId;

        this.http.postDetailOrder(request).subscribe(response => {
          console.log(response);
        });
      }
    });

    this.dialog.closeAll();

    this.snackBar.open('Успішно замовлено!', null, {
      duration: 4000,
      panelClass: ['accent-color']
    });
  }
}
