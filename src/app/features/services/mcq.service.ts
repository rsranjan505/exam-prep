import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class McqService {
  questions = [
    {
      id: 1,
      q: 'Who is the first President of India?',
      options: ['Rajendra Prasad', 'Nehru', 'Gandhi', 'Patel'],
      ans: 0,
    },
    {
      id: 2,
      q: 'Capital of Bihar is?',
      options: ['Gaya', 'Patna', 'Muzaffarpur', 'Bhagalpur'],
      ans: 1,
    },
    {
      id: 3,
      q: '2 + 5 × 2 = ?',
      options: ['14', '12', '10', '9'],
      ans: 0,
    },
  ];

  getQuestions() {
    return this.questions;
  }
}
