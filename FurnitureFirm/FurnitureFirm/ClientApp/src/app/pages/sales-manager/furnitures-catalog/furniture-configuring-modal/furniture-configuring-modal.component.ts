import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Furniture } from 'src/app/models/furniture';
import { HttpService } from 'src/app/services/http/http.service';
import { Detail } from 'src/app/models/detail';
import { DescriptionModalComponent } from '../furniture-table/description-modal/description-modal.component';
import { OrderedFurniture } from 'src/app/models/ordered-furniture';



@Component({
  selector: 'app-furniture-configuring-modal',
  templateUrl: './furniture-configuring-modal.component.html',
  styleUrls: ['./furniture-configuring-modal.component.css']
})
export class FurnitureConfiguringModalComponent implements OnInit {

  additionalDetails: Detail[];
  displayedColumns: string[] = ['name', 'price', 'description', 'add'];
  orderedFurniture = new OrderedFurniture;

  constructor(@Inject(MAT_DIALOG_DATA) public furniture: Furniture,
        private httpService : HttpService,
        private dialog: MatDialog) { }

  ngOnInit() {
    this.orderedFurniture.furnitureId = this.furniture.furnitureId;
    this.orderedFurniture.count = 1;
    this.httpService.getAdditionalDetails(this.furniture.furnitureId)
      .subscribe(response => {
        console.log(response)
        this.additionalDetails = response as Detail[];
        
        this.additionalDetails.forEach(detail => {
          this.orderedFurniture.additionalDetails[detail.detailId] = 0;
        });
      });
  }

  showInfo(detail : Detail){
    console.log(detail)
    this.dialog.open(DescriptionModalComponent, {
      data: {
        name: detail.name,
        description : detail.description
      }
    })
  }

  addFurniture() {
    this.orderedFurniture.count++;
  }

  removeFurniture() {
    if(this.orderedFurniture.count > 1)
      this.orderedFurniture.count--;
  }


  addDetail(detail : Detail) {
    this.orderedFurniture.additionalDetails[detail.detailId]++;
  }

  removeDetail(detail : Detail) {
    if(this.orderedFurniture.additionalDetails[detail.detailId] > 0)
      this.orderedFurniture.additionalDetails[detail.detailId]--;
  }

  addToOrder() {

  }
}
