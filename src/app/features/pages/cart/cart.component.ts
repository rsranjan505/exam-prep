import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { CartserviceService } from '../../services/cartservice.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  items: any[] = [];

  constructor(private cart: CartserviceService) {
    this.items = this.cart.getItems();
  }

  get total() {
    return this.items.reduce((sum, i) => sum + i.price * (i.qty || 1), 0);
  }

  increaseQty(item: any) {
    item.qty = (item.qty || 1) + 1;
  }

  decreaseQty(item: any) {
    if ((item.qty || 1) > 1) item.qty--;
  }

  removeItem(item: any) {
    this.cart.remove(item);
    this.items = this.cart.getItems();
  }
}
