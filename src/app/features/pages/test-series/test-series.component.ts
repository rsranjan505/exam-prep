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
    title: 'BPSC Prelims Full Test',
    description: '50 full-length tests, timed and evaluated',
    questions: [
      {
        q: 'What is the capital of Bihar?',
        options: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur'],
        ans: 0,
      },
      {
        q: 'When was Bihar formed?',
        options: ['1912', '1950', '1935', '1947'],
        ans: 0,
      },
    ],
  };

  currentQ = 0;
  selected: number | null = null;

  next() {
    if (this.selected !== null) {
      this.currentQ++;
      this.selected = null;
    }
  }
}
