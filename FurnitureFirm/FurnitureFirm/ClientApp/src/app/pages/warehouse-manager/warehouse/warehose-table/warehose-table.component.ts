import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { WarehouseDetail } from 'src/app/models/warehouse-detail';
import { MatDialog } from '@angular/material';
import { HttpService } from 'src/app/services/http/http.service';
import { Detail } from 'src/app/models/detail';
import { DescriptionModalComponent } from 'src/app/pages/shared/description-modal/description-modal.component';
import { TransportConfiguringModalComponent } from '../../modals/transport-configuring-modal/transport-configuring-modal.component';

@Component({
  selector: 'app-warehose-table',
  templateUrl: './warehose-table.component.html',
  styleUrls: ['./warehose-table.component.css']
})
export class WarehoseTableComponent implements OnInit {

  @Input()warehouseId: number;
  details: WarehouseDetail[];
  displayedColumns: string[] = ['name', 'color', 'material', 'producer', 'description', 'count', 'transport'];
  isLoading = false;

  constructor(private httpService: HttpService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading = true;
    this.httpService.getWarehouseDetails(this.warehouseId)
      .subscribe(response => {
        this.isLoading = false;
        this.details = response as WarehouseDetail[];
      });
  }

  showInfo(detail: Detail) {
    this.dialog.open(DescriptionModalComponent, {
      data: {
        name: detail.name,
        description : detail.description
      }
    });
  }

  showTransportConfiguring(detail: WarehouseDetail) {
    this.dialog.open(TransportConfiguringModalComponent, {
      width: '400px',
      data: detail
    });
  }
}
