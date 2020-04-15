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
    return this.httpClient.get(this.productionsUrl + "workers/" + orderId);
  }

  isAttachedToProduction(orderId: number, workerId: number) {
    return this.httpClient.get(this.productionsUrl + `orderId=${orderId}&workerId=${workerId}`);
  }

  startProduction(orderId: number) {
    return this.httpClient.put(this.productionsUrl + "start", orderId);
  }

  attachToProduction(orderId: number, workerId: number) {
    return this.httpClient.put(this.productionsUrl + "attach", { orderId: orderId, workerId: workerId });
  }

  finishProduction(orderId: number) {
    return this.httpClient.put(this.productionsUrl + "finish", orderId);
  }

  finishDelivery(orderId: number) {
    return this.httpClient.put(this.productionsUrl + "delivery/finish", orderId);
  }
}
