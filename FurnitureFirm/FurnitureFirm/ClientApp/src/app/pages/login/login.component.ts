import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';
import { MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { Worker } from 'src/app/models/worker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private http: HttpService,
    private snackBar: MatSnackBar,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      'userEmail': new FormControl(null, [Validators.required, Validators.email]),
      'userPassword': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    this.http.login(this.loginForm.get('userEmail').value, this.loginForm.get('userPassword').value)
      .subscribe(response => {
        const worker = response as Worker;
        if (response == null) {
          this.snackBar.open('Неправильний логін або пароль', null, {
            duration: 3000,
            panelClass: ['warn-color']
          });
        } else {
          this.auth.login(worker);
          this.router.navigate(['/']);
        }
      });
  }
}
