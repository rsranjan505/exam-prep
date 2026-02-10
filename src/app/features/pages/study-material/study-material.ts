import { Component } from '@angular/core';
import { CartserviceService } from '../../services/cartservice.service';
import { NgClass, NgFor } from '@angular/common';
import { JoinTest } from "../../components/join-test/join-test";

@Component({
  selector: 'app-study-material',
  imports: [NgClass, NgFor, JoinTest],
  templateUrl: './study-material.html',
  styleUrl: './study-material.css',
})
export class StudyMaterial {

    books = [
      {
        id: 1,
        name: 'BPSC General Studies',
        author: 'Expert Faculty',
        price: 2000,
        image: 'assets/books/paper1_mains.jpeg',
        added: false,
      },
      {
        id: 2,
        name: 'Bihar History',
        author: 'Dr. Kumar',
        price: 2500,
        image: 'assets/books/paper2_mains.jpeg',
        added: false,
      },
      {
        id: 3,
        name: 'Indian Polity',
        author: 'M. Laxmikant',
        price: 2000,
        image: 'assets/books/paper1_mains.jpeg',
        added: false,
      },
    ];
  
    constructor(private cart: CartserviceService) {}
  
    addToCart(book: any) {
      this.cart.add(book);
      book.added = true;
    }
}
