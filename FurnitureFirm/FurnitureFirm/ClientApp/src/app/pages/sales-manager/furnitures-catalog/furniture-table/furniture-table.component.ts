import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Furniture } from 'src/app/models/furniture';
import { MatDialog, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { DescriptionModalComponent } from 'src/app/pages/shared/description-modal/description-modal.component';
import { FurnitureConfiguringModalComponent } from '../../shared/furniture-configuring-modal/furniture-configuring-modal.component';
import { Constants } from 'src/app/pages/shared/constants';



@Component({
  selector: 'app-furniture-table',
  templateUrl: './furniture-table.component.html',
  styleUrls: ['./furniture-table.component.css']
})
export class FurnitureTableComponent implements OnInit {

  @Input() category: string;
  furnitures: Furniture[];
  dataSource : MatTableDataSource<Furniture>;
  displayedColumns: string[] = ['name', 'size', 'collection', 'style', 'price', 'description', 'buy'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private httpService: HttpService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.httpService.getFurnituresByCategory(this.category)
      .subscribe(response => {
        this.furnitures = response as Furniture[]
        this.dataSource  = new MatTableDataSource(this.furnitures)
        this.dataSource.sort = this.sort;
      })
  }

  showInfo(furniture : Furniture){
    console.log(furniture)
    this.dialog.open(DescriptionModalComponent, {
      data: {
        name: furniture.name,
        description : furniture.description
      }
    })
  }

  showFurnitureConfiguring(furniture: Furniture){
    const dialogRef = this.dialog.open(FurnitureConfiguringModalComponent, {
        width: '600px',
        data: furniture
    })
  }

  getFurniturePrice(furniture: Furniture) {
    return furniture.price * Constants.furniturePriceCoef;
  }
}
