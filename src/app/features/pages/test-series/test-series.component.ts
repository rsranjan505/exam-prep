import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-series',
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './test-series.component.html',
  styleUrl: './test-series.component.css',
})
export class TestSeriesComponent {
test = {
  title: 'BPSC General Knowledge Mock Test',
  description:
    'Practice important General Knowledge questions designed for BPSC aspirants based on history, polity, geography, science, and current awareness.',

  questions: [
    {
      q: 'What is the capital city of Bihar?',
      options: ['Gaya', 'Patna', 'Bhagalpur', 'Muzaffarpur'],
      answer: 1,
    },
    {
      q: 'Who is known as the Father of the Indian Constitution?',
      options: [
        'Mahatma Gandhi',
        'Jawaharlal Nehru',
        'Dr. B. R. Ambedkar',
        'Sardar Patel',
      ],
      answer: 2,
    },
    {
      q: 'Which river is known as the sorrow of Bihar?',
      options: ['Ganga', 'Kosi', 'Son', 'Punpun'],
      answer: 1,
    },
    {
      q: 'How many Fundamental Rights are guaranteed by the Indian Constitution?',
      options: ['5', '6', '7', '8'],
      answer: 1,
    },
    {
      q: 'Who wrote the national anthem of India?',
      options: [
        'Bankim Chandra Chatterjee',
        'Rabindranath Tagore',
        'Sarojini Naidu',
        'Subhash Chandra Bose',
      ],
      answer: 1,
    },
    {
      q: 'Which planet is called the Red Planet?',
      options: ['Venus', 'Mars', 'Saturn', 'Jupiter'],
      answer: 1,
    },
    {
      q: 'In which year did India gain independence?',
      options: ['1945', '1946', '1947', '1950'],
      answer: 2,
    },
    {
      q: 'What is the national animal of India?',
      options: ['Lion', 'Tiger', 'Elephant', 'Peacock'],
      answer: 1,
    },
    {
      q: 'Which Mughal emperor built the Taj Mahal?',
      options: ['Akbar', 'Babur', 'Humayun', 'Shah Jahan'],
      answer: 3,
    },
    {
      q: 'Which is the largest ocean in the world?',
      options: [
        'Atlantic Ocean',
        'Indian Ocean',
        'Pacific Ocean',
        'Arctic Ocean',
      ],
      answer: 2,
    },
  ],
};

currentQ = 0;
selected: number | null = null;

  prev() {
    if (this.currentQ > 0) {
      this.currentQ--;
    }
  }

  next() {
    if (this.selected !== null) {
      this.currentQ++;
      this.selected = null;
    }
  }
}
