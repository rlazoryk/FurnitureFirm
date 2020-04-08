import { Component, OnInit, ViewChild } from '@angular/core';
import { Detail } from 'src/app/models/detail';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { HttpService } from 'src/app/services/http/http.service';
import { DescriptionModalComponent } from '../../shared/description-modal/description-modal.component';

@Component({
  selector: 'app-details-catalog',
  templateUrl: './details-catalog.component.html',
  styleUrls: ['./details-catalog.component.css']
})
export class DetailsCatalogComponent implements OnInit {

  details: Detail[];
  dataSource: MatTableDataSource<Detail>;
  displayedColumns: string[] = ['name', 'color', 'material', 'producer', 'price', 'description', 'buy'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private httpService: HttpService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.httpService.getDetails()
      .subscribe(response => {
        this.details = response as Detail[];
        this.dataSource  = new MatTableDataSource(this.details);
        this.dataSource.sort = this.sort;
      });
  }

  showInfo(detail: Detail) {
    console.log(detail);
    this.dialog.open(DescriptionModalComponent, {
      data: {
        name: detail.name,
        description : detail.description
      }
    });
  }

  addToBasket(detail: Detail) {
    console.log(detail);
  }
}

