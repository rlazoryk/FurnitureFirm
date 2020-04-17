import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  private baseUrl = "https://localhost:5001/api/";
  private productionsUrl = this.baseUrl + "productions/"

  constructor(private httpClient: HttpClient) { }

  getWorkersOnProductionCount(orderId: number) {
    return this.httpClient.get(this.productionsUrl + "workers/" + orderId);
  }

  getWorkerProductions(workerId: number) {
    return this.httpClient.get(this.productionsUrl + workerId);
  }

  startProduction(orderId: number, warehouseId: number) {
    return this.httpClient.get(this.productionsUrl + "start/" + orderId + "/" + warehouseId);
  }

  attachToProduction(orderId: number, workerId: number) {
    return this.httpClient.get(this.productionsUrl + "attach/" + orderId + "/" + workerId);
  }

  finishProduction(orderId: number) {
    return this.httpClient.get(this.productionsUrl + "finish/" + orderId);
  }

  startDelivery(orderId: number) {
    return this.httpClient.get(this.productionsUrl + "delivery/start/" + orderId);
  }

  finishDelivery(orderId: number) {
    return this.httpClient.get(this.productionsUrl + "delivery/finish/" + orderId);
  }
}
