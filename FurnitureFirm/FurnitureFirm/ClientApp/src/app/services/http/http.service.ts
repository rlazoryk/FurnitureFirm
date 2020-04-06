import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = "api/";
  furnitureUrl = this.baseUrl + "furnitures/"

  constructor(private httpClient: HttpClient) { }

  getFurnituresByCategory(categoryName: string){
    return this.httpClient.get(this.furnitureUrl + categoryName);
  }

  getAdditionalDetails(furnitureId: number){
    return this.httpClient.get(this.furnitureUrl + "additional/" + furnitureId)
  }
}
