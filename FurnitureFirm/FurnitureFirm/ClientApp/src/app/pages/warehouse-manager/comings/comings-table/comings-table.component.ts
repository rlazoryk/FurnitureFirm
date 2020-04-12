import { Component, OnInit, Input } from '@angular/core';
import { Coming } from 'src/app/models/coming';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-comings-table',
  templateUrl: './comings-table.component.html',
  styleUrls: ['./comings-table.component.css']
})
export class ComingsTableComponent implements OnInit {

  @Input()comings: Coming[];
  displayedColumns: string[] = ['date', 'order', 'name', 'count', 'worker'];

  constructor() { }

  ngOnInit() {
  }
}
