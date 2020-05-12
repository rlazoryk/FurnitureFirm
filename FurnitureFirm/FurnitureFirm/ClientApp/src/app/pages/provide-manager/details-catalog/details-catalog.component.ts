import { Component, OnInit } from '@angular/core';
import { Detail } from 'src/app/models/detail';
import { MatDialog } from '@angular/material';
import { HttpService } from 'src/app/services/http/http.service';
import { DescriptionModalComponent } from '../../shared/description-modal/description-modal.component';
import { DetailConfigureModalComponent } from '../modals/detail-configure-modal/detail-configure-modal.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Filter } from 'src/app/models/Filter';


@Component({
  selector: 'app-details-catalog',
  templateUrl: './details-catalog.component.html',
  styleUrls: ['./details-catalog.component.css']
})
export class DetailsCatalogComponent implements OnInit {

  details: Detail[];
  displayedDetails: Detail[];
  colors: string[];
  materials: string[];
  producers: string[];
  filter: Filter = { selectedColor: '', selectedMaterial: '', selectedProducer: '' };
  selection = new SelectionModel<Detail>(true, []);
  displayedColumns: string[] = ['name', 'color', 'material', 'producer', 'provider', 'price', 'description', 'select'];
  isLoading = false;

  constructor(private httpService: HttpService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading = true;
    this.httpService.getDetails()
      .subscribe(response => {
        this.isLoading = false;
        this.details = response as Detail[];
        this.displayedDetails = this.details;

        this.initFilter(this.details);
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
      this.displayedDetails = this.details.filter(d => d.colorName === this.filter.selectedColor);
    }

    if (this.filter.selectedMaterial !== undefined && this.filter.selectedMaterial !== '') {
      this.displayedDetails = this.displayedDetails.filter(d => d.materialName === this.filter.selectedMaterial);
    }

    if (this.filter.selectedProducer !== undefined && this.filter.selectedProducer !== '') {
      this.displayedDetails = this.displayedDetails.filter(d => d.producerName === this.filter.selectedProducer);
    }
  }

  onResetFilter() {
    this.filter.selectedColor = '';
    this.filter.selectedMaterial = '';
    this.filter.selectedProducer = '';

    this.displayedDetails = this.details;
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

