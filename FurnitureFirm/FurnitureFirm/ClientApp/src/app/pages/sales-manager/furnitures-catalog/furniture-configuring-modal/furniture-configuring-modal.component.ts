import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Furniture } from 'src/app/models/furniture';
import { HttpService } from 'src/app/services/http/http.service';
import { Detail } from 'src/app/models/detail';



@Component({
  selector: 'app-furniture-configuring-modal',
  templateUrl: './furniture-configuring-modal.component.html',
  styleUrls: ['./furniture-configuring-modal.component.css']
})
export class FurnitureConfiguringModalComponent implements OnInit {

  additionalDetails: Detail[];
  displayedColumns: string[] = ['name', 'price', 'description', 'add'];

  constructor(@Inject(MAT_DIALOG_DATA) public furniture: Furniture,
        private httpService : HttpService) { }

  ngOnInit() {
    this.httpService.getAdditionalDetails(this.furniture.furnitureId)
      .subscribe(response => {
        console.log(response)
        this.additionalDetails = response as Detail[];
      });
  }
}
