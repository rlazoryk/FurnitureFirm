import { Component, OnInit, Inject} from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Provider } from 'src/app/models/provider';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DetailsOrderRequest } from 'src/app/models/detailOrder-request';
import { DetailOrderService } from 'src/app/services/detailOrder/detailOrder.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-provider-configure-modal',
  templateUrl: './provider-configure-modal.component.html',
  styleUrls: ['./provider-configure-modal.component.css']
})
export class ProviderConfigureModalComponent implements OnInit {

  providers: Provider[] = [];
  selectedProvider = 1;

  constructor(@Inject(MAT_DIALOG_DATA) public orderRequest: DetailsOrderRequest,
    private http: HttpService,
    private orderService: DetailOrderService,
    private dialog: MatDialog,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.http.getProviders().subscribe(response => {
      this.providers = response as Provider[];
    });
  }

  CreateOrder() {
    this.orderRequest.providerId = this.selectedProvider;
    this.orderRequest.workerId = this.auth.worker.workerId;
    console.log(this.orderRequest);

    this.http.postDetailOrder(this.orderRequest).subscribe(response => {
      console.log(response);
    });

    this.orderService.clear();

    this.dialog.closeAll();
  }
}
