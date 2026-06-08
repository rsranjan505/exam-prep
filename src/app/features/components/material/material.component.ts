import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

interface Book {
  icon: string;
  title: string;
  author: string;
  price: string;
  gradient: string;
}
@Component({
  selector: 'app-material',
  imports: [NgFor],
  templateUrl: './material.component.html',
  styleUrl: './material.component.css',
})
export class MaterialComponent {

      books: Book[] = [
    {
      icon: '📚',
      title: 'BPSC General Studies',
      author: 'Expert Faculty, Knowledge Nation Portal',
      price: '₹299',
      gradient: 'linear-gradient(135deg, #890117, #400675)',
    },
    {
      icon: '🏛️',
      title: 'Bihar History & Culture',
      author: 'Dr. Kumar, Patna University',
      price: '₹199',
      gradient: 'linear-gradient(135deg, #410040, #890117)',
    },
    {
      icon: '⚖️',
      title: 'Indian Polity',
      author: 'M. Laxmikant (Adapted Edition)',
      price: '₹349',
      gradient: 'linear-gradient(135deg, #400675, #3f043e)',
    },
  ];

}
