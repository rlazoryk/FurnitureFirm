import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Furniture } from 'src/app/models/furniture';
import { HttpService } from 'src/app/services/http/http.service';
import { Detail } from 'src/app/models/detail';
import { OrderedFurniture } from 'src/app/models/ordered-furniture';
import { OrderService } from 'src/app/services/order/order.service';
import { DescriptionModalComponent } from 'src/app/pages/shared/description-modal/description-modal.component';
import { OrderedDetail } from 'src/app/models/ordered-detail';



@Component({
  selector: 'app-furniture-configuring-modal',
  templateUrl: './furniture-configuring-modal.component.html',
  styleUrls: ['./furniture-configuring-modal.component.css']
})
export class FurnitureConfiguringModalComponent implements OnInit {

  additionalDetails: Detail[] = [];
  displayedColumns: string[] = ['name', 'price', 'description', 'add'];
  orderedFurniture: OrderedFurniture = new OrderedFurniture();
  alreadyOrdered: OrderedFurniture;

  constructor(@Inject(MAT_DIALOG_DATA) public furniture: Furniture,
    private httpService: HttpService,
    private orderService: OrderService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.orderedFurniture.furnitureId = this.furniture.furnitureId;
    this.orderedFurniture.totalPrice = 0;
    this.orderedFurniture.totalTime = 0;

    this.alreadyOrdered = this.orderService.currentOrder.orderedFurnitures
      .filter(f => f.furnitureId == this.orderedFurniture.furnitureId)[0];

    if(this.alreadyOrdered)
    {
      this.orderedFurniture.count = this.alreadyOrdered.count;
      this.orderedFurniture.additionalDetails = this.alreadyOrdered.additionalDetails;
    }
    else
    {
      this.orderedFurniture.count = 1;
    }

    this.httpService.getAdditionalDetails(this.furniture.furnitureId)
      .subscribe(response => {
        this.additionalDetails = response as Detail[];
      });
  }

  showInfo(detail: Detail) {
    this.dialog.open(DescriptionModalComponent, {
      data: {
        name: detail.name,
        description: detail.description
      }
    })
  }

  getTotalPrice() {
    this.orderedFurniture.totalPrice = this.furniture.price;
    if (this.orderedFurniture.additionalDetails) {
      this.orderedFurniture.additionalDetails.forEach(detail => {
        this.orderedFurniture.totalPrice += detail.totalPrice;
      });
    }
    this.orderedFurniture.totalPrice *= this.orderedFurniture.count;
    return this.orderedFurniture.totalPrice;
  }

  getTotalTime() {
    this.orderedFurniture.totalTime = this.furniture.timeToBuild;
    if (this.orderedFurniture.additionalDetails) {
      this.orderedFurniture.additionalDetails.forEach(detail => {
        this.orderedFurniture.totalTime += detail.totalTime;
      });
    }
    this.orderedFurniture.totalTime *= this.orderedFurniture.count;
    return this.orderedFurniture.totalTime;
  }

  addDetail(detail: Detail) {
    let orderedDetail = this.orderedFurniture.additionalDetails.filter(d => d.detailId == detail.detailId)[0];
    if (!orderedDetail) {
      orderedDetail = new OrderedDetail();
      orderedDetail.detailId = detail.detailId;
      orderedDetail.totalTime = 0;
      orderedDetail.count = 1;
      orderedDetail.totalPrice = 0;
      this.orderedFurniture.additionalDetails.push(orderedDetail);
    }
    else{
      orderedDetail.count++;
    }
    orderedDetail.totalPrice += detail.price;
    orderedDetail.totalTime += detail.timeToIntegrate;
  }

  removeDetail(detail: Detail) {
    let orderedDetail = this.orderedFurniture.additionalDetails.filter(d => d.detailId == detail.detailId)[0];
    if (orderedDetail.count > 0) {
      orderedDetail.count--;
      orderedDetail.totalPrice -= detail.price;
      orderedDetail.totalTime -= detail.timeToIntegrate;
    }
  }

  getOrderedDetailCount(detail: Detail) {
    if (!this.orderedFurniture.additionalDetails) return 0;
    if (this.orderedFurniture.additionalDetails.find(d => d.detailId == detail.detailId)) {
      return this.orderedFurniture.additionalDetails.filter(d => d.detailId == detail.detailId)[0].count
    }
    else return 0;
  }

  addToOrder() {
    this.orderedFurniture.totalPrice = this.getTotalPrice();
    this.orderedFurniture.totalTime = this.getTotalTime();
    console.log(this.orderedFurniture)

    if (this.alreadyOrdered)
    {
      this.alreadyOrdered.count = this.orderedFurniture.count;
      this.alreadyOrdered.totalPrice = this.orderedFurniture.totalPrice;
      this.alreadyOrdered.totalTime = this.orderedFurniture.totalTime;
      this.alreadyOrdered.additionalDetails = [];
      this.orderedFurniture.additionalDetails.forEach(detail => {
        this.alreadyOrdered.additionalDetails.push(detail);
      });
    }
    else
      this.orderService.addFurniture(this.orderedFurniture);
  }
}