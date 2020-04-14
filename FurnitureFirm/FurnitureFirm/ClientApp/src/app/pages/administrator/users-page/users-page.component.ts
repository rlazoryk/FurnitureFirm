import { Component, OnInit } from '@angular/core';
import { Worker } from 'src/app/models/worker';
import { HttpService } from 'src/app/services/http/http.service';
import { MatDialog } from '@angular/material';
import { WorkerConfiguringComponent } from '../worker-configuring/worker-configuring.component';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {

  workers: Worker[];
  displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'phone', 'post', 'status', 'delete'];
  isLoading = false;

  constructor(private http: HttpService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading = true;
    this.http.getWorkers()
      .subscribe(response => {
        this.isLoading = false;
        this.workers = response as Worker[];
        this.workers = this.workers.filter(w => w.postName !== 'Адмін');
      });
  }

  deleteWorker(workerId: number) {
    this.http.deleteWorker(workerId).subscribe(response => {});
    this.workers = this.workers.filter(w => w.workerId !== workerId);
  }

  showWorkersDialog() {
    this.dialog.open(WorkerConfiguringComponent, {
      width: '400px'
    });
  }
}
