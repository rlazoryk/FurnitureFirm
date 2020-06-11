import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { WarehouseDetail } from 'src/app/models/warehouse-detail';
import { MatDialog } from '@angular/material';
import { HttpService } from 'src/app/services/http/http.service';
import { Detail } from 'src/app/models/detail';
import { Filter } from 'src/app/models/Filter';
import { DescriptionModalComponent } from 'src/app/pages/shared/description-modal/description-modal.component';
import { TransportConfiguringModalComponent } from '../../modals/transport-configuring-modal/transport-configuring-modal.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-warehose-table',
  templateUrl: './warehose-table.component.html',
  styleUrls: ['./warehose-table.component.css']
})
export class WarehoseTableComponent implements OnInit {

  @Input()warehouseId: number;
  details: WarehouseDetail[];
  displayedColumns: string[] = ['name', 'color', 'material', 'producer', 'description', 'count', 'select'];
  isLoading = false;
  displayedDetails: WarehouseDetail[];
  colors: string[];
  materials: string[];
  producers: string[];
  selection = new SelectionModel<Detail>(true, []);
  filter: Filter = { selectedColor: '', selectedMaterial: '', selectedProducer: '' };

  constructor(private httpService: HttpService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading = true;
    this.httpService.getWarehouseDetails(this.warehouseId)
      .subscribe(response => {
        this.isLoading = false;
        this.details = response as WarehouseDetail[];

        this.displayedDetails = this.details;

        this.initFilter([...new Set(this.details.map(item => item['detail']))]);
      });
  }

  initFilter(details: Detail[]) {
    this.colors = this.pluck(details, 'colorName');
    this.materials = this.pluck(details, 'materialName');
    this.producers = this.pluck(details, 'producerName');
  }

  pluck(array: Detail[], key: string) {
    return [...new Set(array.map(item => item[key]))];
  }

  onApplyFilter() {
    this.displayedDetails = this.details;
    if (this.filter.selectedColor !== undefined && this.filter.selectedColor !== '') {
      this.displayedDetails = this.details.filter(d => d.detail.colorName === this.filter.selectedColor);
    }

    if (this.filter.selectedMaterial !== undefined && this.filter.selectedMaterial !== '') {
      this.displayedDetails = this.displayedDetails.filter(d => d.detail.materialName === this.filter.selectedMaterial);
    }

    if (this.filter.selectedProducer !== undefined && this.filter.selectedProducer !== '') {
      this.displayedDetails = this.displayedDetails.filter(d => d.detail.producerName === this.filter.selectedProducer);
    }
  }

  onResetFilter() {
    this.filter.selectedColor = '';
    this.filter.selectedMaterial = '';
    this.filter.selectedProducer = '';

    this.displayedDetails = this.details;
  }

  showInfo(detail: Detail) {
    this.dialog.open(DescriptionModalComponent, {
      data: {
        name: detail.name,
        description : detail.description
      }
    });
  }

  showTransportConfiguring() {
    if (this.selection.selected.length < 1) {
      return;
    }
    this.dialog.open(TransportConfiguringModalComponent, {
      width: '400px',
      data: this.selection.selected
    });
  }
}
