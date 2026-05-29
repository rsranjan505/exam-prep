import { Component, OnDestroy, OnInit } from '@angular/core';
import { McqService } from '../../services/mcq.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { TakeTestComponent } from '../../components/take-test/take-test.component';

@Component({
  selector: 'app-test',
  imports: [TakeTestComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent implements OnInit, OnDestroy {
  questions: any[] = [];
  index = 0;
  answers: number[] = [];

  timeLeft = 60; // seconds
  timer: any;

  constructor(private mcq: McqService, private router: Router) {}

  ngOnInit() {
    this.questions = this.mcq.getQuestions();
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.timeLeft--;

      if (this.timeLeft === 0) {
        this.next();
      }
    }, 1000);
  }

  select(opt: number) {
    this.answers[this.index] = opt;
  }

  next() {
    clearInterval(this.timer);

    if (this.index < this.questions.length - 1) {
      this.index++;
      this.timeLeft = 60;
      this.startTimer();
    } else {
      this.submit();
    }
  }

  submit() {
    localStorage.setItem('answers', JSON.stringify(this.answers));
    this.router.navigate(['/result']);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
