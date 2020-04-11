import { Component, OnInit } from '@angular/core';
import { DetailOrder } from 'src/app/models/detailOrder';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-detail-orders',
  templateUrl: './detail-orders.component.html',
  styleUrls: ['./detail-orders.component.css']
})
export class DetailOrdersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
