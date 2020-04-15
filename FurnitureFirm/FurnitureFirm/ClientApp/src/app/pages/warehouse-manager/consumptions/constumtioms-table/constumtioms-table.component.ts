import { Component, OnInit, Input } from '@angular/core';
import { Consumption } from 'src/app/models/consumption';

@Component({
  selector: 'app-constumtioms-table',
  templateUrl: './constumtioms-table.component.html',
  styleUrls: ['./constumtioms-table.component.css']
})
export class ConstumtiomsTableComponent implements OnInit {

  @Input()consumptions: Consumption[];
  displayedColumns: string[] = ['date', 'production', 'name', 'count'];

  constructor() { }

  ngOnInit() {
  }
}
