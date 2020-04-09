import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl = "https://localhost:5001/api/";
  private furnitureUrl = this.baseUrl + "furnitures/"
  private detailUrl = this.baseUrl + "details";
  private orderUrl = this.baseUrl + "orders/"

  constructor(private httpClient: HttpClient) { }

  getCategories(){
    return this.httpClient.get(this.furnitureUrl + "categories");
  }

  getCities() {
    return this.httpClient.get(this.orderUrl + "cities");
  }

  getPaymentSystems(){
    return this.httpClient.get(this.orderUrl + "paymentSystems");
  }

  getFurnituresById(id: number) {
    return this.httpClient.get(this.furnitureUrl + id);
  }

  getFurnituresByCategory(categoryName: string){
    return this.httpClient.get(this.furnitureUrl + "category/" + categoryName);
  }

  getAdditionalDetails(furnitureId: number){
    return this.httpClient.get(this.furnitureUrl + "additional/" + furnitureId);
  }

  createFurnitureOrder(order){
    console.log("TO server ")
    console.log(order)
    return this.httpClient.post(this.orderUrl, order)
  }

  getDetails() {
    return this.httpClient.get(this.detailUrl);
  }
}
