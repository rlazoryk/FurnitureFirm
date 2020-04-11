import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Detail } from 'src/app/models/detail';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { HttpService } from 'src/app/services/http/http.service';
import { DescriptionModalComponent } from 'src/app/pages/shared/description-modal/description-modal.component';

@Component({
  selector: 'app-details-table',
  templateUrl: './details-table.component.html',
  styleUrls: ['./details-table.component.css']
})
export class DetailsTableComponent implements OnInit {

  @Input() warehouse;
  details: Detail[];
  dataSource: MatTableDataSource<Detail>;
  displayedColumns: string[] = ['name', 'color', 'material', 'producer', 'price', 'description'];

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

}
