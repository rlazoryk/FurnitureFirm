import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  private baseUrl = "https://localhost:5001/api/";
  private productionsUrl = this.baseUrl = "orders/productions/"

  constructor(private httpClient: HttpClient) { }

  getWorkersOnProductionCount(orderId: number) {
    this.httpClient.get(this.productionsUrl + "workers/" + orderId);
  }

  isAttachedToProduction(orderId: number, workerId: number) {
    this.httpClient.get(this.productionsUrl + `attached/orderId=${orderId}&workerId=${workerId}`);
  }

  startProduction(orderId: number, workerId: number) {
    this.httpClient.put(this.productionsUrl, { orderId : orderId, workerId : workerId });
  }

  attachToProduction(orderId: number, workerId: number) {
    this.httpClient.put(this.productionsUrl, { orderId : orderId, workerId : workerId });
  }

  finishProduction(orderId: number, workerId: number) {
    //this.httpClient.put(this.productionsUrl, { orderId : orderId, workerId : workerId });
  }

  finishDelivery(orderId: number) {
    this.httpClient.put(this.productionsUrl, { orderId : orderId });
  }
}
