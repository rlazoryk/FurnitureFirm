import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { OrderService } from '../services/order/order.service';
import { DetailOrderService } from '../services/detailOrder/detailOrder.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private auth: AuthService,
    private orderService: OrderService,
    private detailService : DetailOrderService,
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
    window.location.reload();
  }

  getFurnitureBasketSize(){
    return this.orderService.currentOrder.orderedFurnitures.length;
  }

  getDetailBasketSize(){
    return this.detailService.order.orderRows.length;
  }
}
