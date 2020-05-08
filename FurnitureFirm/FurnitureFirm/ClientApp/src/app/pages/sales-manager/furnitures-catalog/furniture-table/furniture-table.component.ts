import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Furniture } from 'src/app/models/furniture';
import { MatDialog, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { DescriptionModalComponent } from 'src/app/pages/shared/description-modal/description-modal.component';
import { FurnitureConfiguringModalComponent } from '../../shared/furniture-configuring-modal/furniture-configuring-modal.component';
import { Constants } from 'src/app/pages/shared/constants';


interface Filter {
  selectedCollection : string
  selectedStyle : string
}


@Component({
  selector: 'app-furniture-table',
  templateUrl: './furniture-table.component.html',
  styleUrls: ['./furniture-table.component.css']
})
export class FurnitureTableComponent implements OnInit {

  @Input() category: string;
  furnitures: Furniture[];
  displayedFurnitures : Furniture[];
  collections : string[];
  styles : string[];
  filter: Filter = { selectedCollection: '', selectedStyle: '' };
  dataSource : MatTableDataSource<Furniture>;
  displayedColumns: string[] = ['name', 'size', 'collection', 'style', 'price', 'description', 'buy'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private httpService: HttpService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.httpService.getFurnituresByCategory(this.category)
      .subscribe(response => {
        this.furnitures = response as Furniture[]
        this.furnitures.forEach(element => {
          element.price = Math.round(element.price * Constants.furniturePriceCoef);
        });
        this.displayedFurnitures = this.furnitures;
        this.dataSource  = new MatTableDataSource(this.displayedFurnitures)
        this.dataSource.sort = this.sort;
        this.initFilter();
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

  initFilter() {
    this.collections = [...new Set(this.furnitures.map(item => item.collection.name))];
    this.styles = [...new Set(this.furnitures.map(item => item.collection.styleName))];
  }

  onApplyFilter() {
    this.displayedFurnitures = this.furnitures;
    if (this.filter.selectedCollection !== undefined && this.filter.selectedCollection !== '') {
      this.displayedFurnitures = this.displayedFurnitures.filter(d => d.collection.name === this.filter.selectedCollection);
    }

    if (this.filter.selectedStyle !== undefined && this.filter.selectedStyle !== '') {
      this.displayedFurnitures = this.displayedFurnitures.filter(d => d.collection.styleName === this.filter.selectedStyle);
    }
  }

  clearFilter() {
    this.filter = { selectedCollection: '', selectedStyle: '' };
  }
}
