import { Component, OnDestroy, OnInit } from '@angular/core';
import { McqService } from '../../services/mcq.service';

@Component({
  selector: 'app-result',
  imports: [],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export class ResultComponent implements OnInit {
  score = 0;
  total = 0;
  percent = 0;

  rank = 0;

  constructor(private mcq: McqService) {}

  ngOnInit() {
    const questions = this.mcq.getQuestions();
    const answers = JSON.parse(localStorage.getItem('answers') || '[]');

    this.total = questions.length;

    questions.forEach((q, i) => {
      if (answers[i] === q.ans) this.score++;
    });

    this.percent = Math.round((this.score / this.total) * 100);

    this.calculateRank();
  }

  calculateRank() {
    const totalStudents = 500; // demo
    this.rank = Math.floor((1 - this.percent / 100) * totalStudents);
  }
}
