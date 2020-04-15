import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private auth: AuthService,
    private router: Router) {
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  getUserPost() {
    if (!this.isLoggedIn()) {
      return '';
    }

    return this.auth.worker.postName;
  }

  isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  Logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
