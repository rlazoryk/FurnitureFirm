import { Injectable } from '@angular/core';
import { OrderRequest } from 'src/app/models/order-request';
import { OrderedFurniture } from 'src/app/models/ordered-furniture';
import { Constants } from 'src/app/pages/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  currentOrder = new OrderRequest();

  constructor() {
  }

  clearOrder() {
    this.currentOrder = new OrderRequest();
  }

  addFurniture(orderedFurniture : OrderedFurniture) {
    this.currentOrder.orderedFurnitures.push(orderedFurniture);
  }

  removeFurniture(orderedFurniture : OrderedFurniture) {
    this.currentOrder.orderedFurnitures = this.currentOrder.orderedFurnitures.filter(obj => obj !== orderedFurniture);
  }

  calcTotalPrice() {
    this.currentOrder.totalPrice = Constants.deliveryPrice;
    this.currentOrder.orderedFurnitures.forEach(furniture => {
      this.currentOrder.totalPrice += furniture.totalPrice;
    });
    
    return this.currentOrder.totalPrice;
  }

  calcTotalTime() {
    let totalTime = 0;
    this.currentOrder.orderedFurnitures.forEach(furniture => {
      totalTime += furniture.totalTime;
    });

    //total hours amount / (hours per day / hours per working day) (this is amount of working days)
    totalTime = totalTime / (24 / 8);
    return totalTime;
  }
}
