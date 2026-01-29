import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartserviceService {
  constructor() {}

  private items: any[] = [
    {
      id: 1,
      name: 'BPSC General Studies',
      author: 'Expert Faculty',
      price: 299,
      image: 'assets/books/gs.jpg',
      qty: 1,
    },
    {
      id: 2,
      name: 'Bihar History',
      author: 'Dr. Kumar',
      price: 199,
      image: 'assets/books/history.jpg',
      qty: 2,
    },
    {
      id: 3,
      name: 'Indian Polity',
      author: 'M. Laxmikant',
      price: 349,
      image: 'assets/books/polity.jpg',
      qty: 1,
    },
  ];

  getItems() {
    return this.items;
  }

  add(book: any) {
    const existing = this.items.find((i) => i.id === book.id);
    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      this.items.push({ ...book, qty: 1 });
    }
  }

  remove(book: any) {
    this.items = this.items.filter((i) => i.id !== book.id);
  }

  clear() {
    this.items = [];
  }

  getTotal() {
    return this.items.reduce((sum, i) => sum + i.price * (i.qty || 1), 0);
  }
}
