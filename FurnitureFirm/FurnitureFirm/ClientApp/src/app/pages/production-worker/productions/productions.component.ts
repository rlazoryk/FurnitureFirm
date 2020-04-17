import { Component, OnInit, ViewChild, QueryList } from '@angular/core';
import { ProductionsTableComponent } from './productions-table/productions-table.component';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-productions',
  templateUrl: './productions.component.html',
  styleUrls: ['./productions.component.css']
})
export class ProductionsComponent implements OnInit {

  @ViewChild('new') private new: ProductionsTableComponent;
  @ViewChild('inprod') private inprod: ProductionsTableComponent;
  @ViewChild('deliv') private deliv: ProductionsTableComponent;
  @ViewChild('done') private done: ProductionsTableComponent;

  constructor() { }

  ngOnInit(): void {
  }

  onSelectChange(event: MatTabChangeEvent) {
    switch (event.index) {
      case 1: this.new.refresh();
      case 2: this.inprod.refresh();
      case 3: this.deliv.refresh();
      case 4: this.done.refresh();
    }
  }
}
