import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatTableDataSource } from '@angular/material';
import { DetailOrderRow } from 'src/app/models/detailOrderRow';

@Component({
  selector: 'app-order-info-modal',
  templateUrl: './order-info-modal.component.html',
  styleUrls: ['./order-info-modal.component.css']
})
export class OrderInfoModalComponent implements OnInit {

  dataSource: MatTableDataSource<DetailOrderRow>;
  displayedColumns: string[] = ['name', 'material', 'color', 'producer', 'count', 'price'];

  constructor(@Inject(MAT_DIALOG_DATA) public orderedDetails: DetailOrderRow[],
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource  = new MatTableDataSource(this.orderedDetails);
  }

  closeModal() {
    this.dialog.closeAll();
  }
}
