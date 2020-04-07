import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-furnitures-catalog',
  templateUrl: './furnitures-catalog.component.html',
  styleUrls: ['./furnitures-catalog.component.css']
})
export class FurnituresCatalogComponent implements OnInit {

  categories : string[];
  constructor(private httpService : HttpService) { }

  ngOnInit() {
    this.httpService.getCategories()
      .subscribe(response => {
        this.categories = response as string[];
      });
  }
}
