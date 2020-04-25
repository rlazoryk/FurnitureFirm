import { Component, OnInit, ViewChild } from '@angular/core';
import { Detail } from 'src/app/models/detail';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { HttpService } from 'src/app/services/http/http.service';
import { DescriptionModalComponent } from '../../shared/description-modal/description-modal.component';
import { DetailConfigureModalComponent } from '../modals/detail-configure-modal/detail-configure-modal.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-details-catalog',
  templateUrl: './details-catalog.component.html',
  styleUrls: ['./details-catalog.component.css']
})
export class DetailsCatalogComponent implements OnInit {

  details: Detail[];
  dataSource: MatTableDataSource<Detail>;
  selection = new SelectionModel<Detail>(true, []);
  displayedColumns: string[] = ['name', 'color', 'material', 'producer', 'provider', 'price', 'description', 'select'];
  isLoading = false;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private httpService: HttpService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading = true;
    this.httpService.getDetails()
      .subscribe(response => {
        this.isLoading = false;
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

  showDetailConfiguring() {
    if (this.selection.selected.length > 0) {
      this.dialog.open(DetailConfigureModalComponent, {
        width: '600px',
        data: this.selection.selected
      });
    }
  }
}

