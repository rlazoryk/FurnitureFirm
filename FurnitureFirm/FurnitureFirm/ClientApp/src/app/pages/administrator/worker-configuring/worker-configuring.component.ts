import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';
import { Worker } from 'src/app/models/worker';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-worker-configuring',
  templateUrl: './worker-configuring.component.html',
  styleUrls: ['./worker-configuring.component.css']
})
export class WorkerConfiguringComponent implements OnInit {

  workerForm: FormGroup;
  posts: string[];

  constructor(private http: HttpService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.http.getPosts().subscribe(response => {
      this.posts = response as string[];
    });

    this.workerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'surname': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required]),
      'pass': new FormControl(null, [Validators.required]),
      'phone': new FormControl(null, [Validators.required]),
      'post': new FormControl('Менеджер з продажу', [Validators.required]),
    });
  }

  addWorker() {
    const worker = new Worker();
    worker.name = this.workerForm.get('name').value;
    worker.surname = this.workerForm.get('surname').value;
    worker.email = this.workerForm.get('email').value;
    worker.phoneNumber = this.workerForm.get('phone').value;
    worker.postName = this.workerForm.get('post').value;
    worker.password = this.workerForm.get('pass').value;
    console.log(worker);

    this.http.postWorker(worker).subscribe(response => {
    },
    error => {
      this.snackBar.open('Неправильний логін або пароль', null, {
        duration: 2000,
        panelClass: ['warn-color']
      });
    });

    window.location.reload();
  }
}
