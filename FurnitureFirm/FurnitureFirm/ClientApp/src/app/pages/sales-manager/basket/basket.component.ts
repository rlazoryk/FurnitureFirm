import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { HttpService } from 'src/app/services/http/http.service';
import { PaymentSystem } from 'src/app/models/payment-system';
import { FormBuilder } from '@angular/forms';
import { Constants } from '../../shared/constants';
import { City } from 'src/app/models/city';
import { MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  paymentSystems: PaymentSystem[];
  cities: City[];
  orderForm;

  //TODO: Validation
  constructor(public orderService: OrderService,
    private httpService: HttpService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder) {
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
    orderData.workerId = this.authService.worker.workerId;
    orderData.customer.phoneNumber = '+380' + orderData.customer.phoneNumber;
    orderData.deliveryInfo.deliveryPrice = Constants.deliveryPrice;
    orderData.deliveryInfo.building = +orderData.deliveryInfo.building;
    orderData.totalPrice = this.orderService.currentOrder.totalPrice;
    orderData.orderedFurnitures = this.mapOrderedFurnitures();
    console.log(orderData);

    this.httpService.createFurnitureOrder(orderData)
      .subscribe(response => {
        this.orderService.clearOrder();
        this.orderForm.reset();
        this.snackBar.open('Замовлення успішно створено. Дякуємо!', null, {
          duration: 4000,
          panelClass: ['accent-color']
        });
      });
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
