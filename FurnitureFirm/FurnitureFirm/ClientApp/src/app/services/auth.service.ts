import { Worker } from "../models/worker";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({providedIn: 'root'})
export class AuthService {
  worker: Worker = null;
  private loggedIn = false;

  constructor(private cookie: CookieService) {
    const w = this.cookie.get('worker');
    if (w !== '') {
      this.worker = JSON.parse(w);
      this.loggedIn = true;
    }

  }

  isAuthenticated() {
    return this.loggedIn;
  }

  login(newWorker: Worker) {
    this.worker = newWorker;
    this.loggedIn = true;
    this.cookie.set('worker', JSON.stringify(newWorker));
  }

  logout() {
    this.worker = null;
    this.loggedIn = false;
    this.cookie.deleteAll();
  }
}
