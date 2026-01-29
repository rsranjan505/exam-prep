import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CartserviceService } from '../../services/cartservice.service';

@Component({
  selector: 'app-books',
  imports: [NgFor, NgClass],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {
  books = [
    {
      id: 1,
      name: 'BPSC General Studies',
      author: 'Expert Faculty',
      price: 299,
      image: 'assets/books/gs.jpg',
      added: false,
    },
    {
      id: 2,
      name: 'Bihar History',
      author: 'Dr. Kumar',
      price: 199,
      image: 'assets/books/history.jpg',
      added: false,
    },
    {
      id: 3,
      name: 'Indian Polity',
      author: 'M. Laxmikant',
      price: 349,
      image: 'assets/books/polity.jpg',
      added: false,
    },
  ];

  constructor(private cart: CartserviceService) {}

  addToCart(book: any) {
    this.cart.add(book);
    book.added = true;
  }
}
