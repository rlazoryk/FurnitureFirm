import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DetailsOrderRequest } from 'src/app/models/detailOrder-request';
import { ConfirmOrder } from 'src/app/models/confirm-order';
import { Movement } from 'src/app/models/detail-movement';
import { Worker } from 'src/app/models/worker';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl = 'https://localhost:5001/api/';
  private furnitureUrl = this.baseUrl + 'furnitures/';
  private detailUrl = this.baseUrl + 'details/';
  private detailOrderUrl = this.baseUrl + 'detailsOrder/';
  private orderUrl = this.baseUrl + 'orders/';
  private warehouseUrl = this.baseUrl + 'warehouse/';
  private loginUrl = this.baseUrl + 'login';
  private workersUrl = this.baseUrl + 'workers/';

  constructor(private httpClient: HttpClient) { }

  getCategories() {
    return this.httpClient.get(this.furnitureUrl + "categories");
  }

  getCities() {
    return this.httpClient.get(this.orderUrl + "cities");
  }

  getPaymentSystems() {
    return this.httpClient.get(this.orderUrl + "paymentSystems");
  }

  getFurnituresById(id: number) {
    return this.httpClient.get(this.furnitureUrl + id);
  }

  getFurnituresByCategory(categoryName: string) {
    return this.httpClient.get(this.furnitureUrl + "category/" + categoryName);
  }

  getAdditionalDetails(furnitureId: number) {
    return this.httpClient.get(this.furnitureUrl + 'additional/' + furnitureId);
  }

  getDetails() {
    return this.httpClient.get(this.detailUrl);
  }

  getDetailByid(id: number) {
    return this.httpClient.get(this.detailUrl + id);
  }

  getProviders() {
    return this.httpClient.get(this.detailOrderUrl + 'providers');
  }

  postDetailOrder(order: DetailsOrderRequest) {
    return this.httpClient.post(this.detailOrderUrl, order);
  }

  getDetailOrders() {
    return this.httpClient.get(this.detailOrderUrl);
  }

  getDetailOrder(orderId: number) {
    return this.httpClient.get(this.detailOrderUrl + orderId);
  }

  deleteOrder(orderId: number) {
    return this.httpClient.delete(this.detailOrderUrl + orderId);
  }

  getWarehouses() {
    return this.httpClient.get(this.warehouseUrl + 'names');
  }

  confirmOrder(order: ConfirmOrder) {
    return this.httpClient.post(this.warehouseUrl, order);
  }

  getWarehouseDetails(warehouseId: number) {
    return this.httpClient.get(this.warehouseUrl + warehouseId);
  }

  putWarehouseDetail(movement: Movement) {
    return this.httpClient.put(this.warehouseUrl, movement);
  }

  createFurnitureOrder(order) {
    return this.httpClient.post(this.orderUrl, order)
  }

  getFurnitureOrders() {
    return this.httpClient.get(this.orderUrl);
  }

  getFurnitureOrdersWithStatus(status: string) {
    return this.httpClient.get(this.orderUrl + status);
  }

  cancelFurnitureOrder(id: number) {
    return this.httpClient.delete(this.orderUrl + id);
  }

  getWarehouseComings() {
    return this.httpClient.get(this.warehouseUrl + 'comings');
  }

  getWarehouseConsumptions() {
    return this.httpClient.get(this.warehouseUrl + 'consumptions');
  }

  login(email: string, pass: string) {
    let loginParams = new HttpParams();
    loginParams = loginParams.append('email', email);
    loginParams = loginParams.append('password', pass);
    return this.httpClient.get(this.loginUrl, {
      params: loginParams
    });
  }

  getWorkers() {
    return this.httpClient.get(this.workersUrl);
  }

  getPosts() {
    return this.httpClient.get(this.workersUrl + 'posts');
  }

  postWorker(worker: Worker) {
    return this.httpClient.post(this.workersUrl, worker);
  }

  deleteWorker(workerId: number) {
    return this.httpClient.delete(this.workersUrl + workerId);
  }
}
