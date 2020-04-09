import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { HttpService } from 'src/app/services/http/http.service';
import { PaymentSystem } from 'src/app/models/payment-system';
import { FormBuilder } from '@angular/forms';
import { Constants } from '../../shared/constants';
import { City } from 'src/app/models/city';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  paymentSystems: PaymentSystem[];
  cities: City[];
  orderForm;

  constructor(public orderService: OrderService,
    private httpService: HttpService,
    private formBuilder: FormBuilder, ) {
    this.orderForm = this.formBuilder.group({
      totalPrice: '',
      workerId: '',
      paymentSystemId: '',
      customer: this.formBuilder.group({
        name: '',
        phoneNumber: ''
      }),
      deliveryInfo: this.formBuilder.group({
        deliveryPrice: '',
        cityId: '',
        street: '',
        building: '',
      }),
      orderedFurnitures: this.formBuilder.array([
        this.formBuilder.group({
          count: '',
          totalFurniturePrice: '',
          furnitureId: '',
          additionalDetailsOrdered: this.formBuilder.array([
            this.formBuilder.group({
              count: '',
              detailInFurnitureId: ''
            })
          ])
        })
      ])
    });
  }

  ngOnInit(): void {
    this.httpService.getPaymentSystems()
      .subscribe(response => {
        this.paymentSystems = response as PaymentSystem[]
      });

    this.httpService.getCities()
      .subscribe(response => {
        this.cities = response as City[]
      });
  }

  onSubmit(orderData) {
    //TODO: when roles and login will be implemented
    orderData.workerId = 1;
    orderData.deliveryInfo.deliveryPrice = Constants.deliveryPrice;
    orderData.totalPrice = this.orderService.currentOrder.totalPrice;
    orderData.orderedFurnitures = this.mapOrderedFurnitures();

    this.httpService.createFurnitureOrder(orderData)
      .subscribe(response => {
        console.log("Order created")
      });

    //this.orderService.clearOrder();
    //this.orderForm.reset();
  }

  mapOrderedFurnitures() {
    let orderedFurnitures = [];
    this.orderService.currentOrder.orderedFurnitures.forEach(furniture => {
      let furnitureDto = {
        count: furniture.count,
        totalFurniturePrice: furniture.totalPrice,
        furnitureId: furniture.furnitureId,
        additionalDetailsOrdered: []
      };

      furniture.additionalDetails.forEach(detail => {
        let detailDto = {
          detailInFurnitureId: detail.additionalDetailId,
          count: detail.count
        };

        furnitureDto.additionalDetailsOrdered.push(detailDto);
      });

      orderedFurnitures.push(furnitureDto);
    });

    return orderedFurnitures;
  }
}