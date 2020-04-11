import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  name: string
  description: string
}

@Component({
  selector: 'app-description-modal',
  templateUrl: './description-modal.component.html',
  styleUrls: ['./description-modal.component.css']
})
export class DescriptionModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

}
