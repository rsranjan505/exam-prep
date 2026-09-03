import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { TestService } from '../../services/test.service';
import { Test } from 'src/app/core/models/test.model';
import { AuthService } from '../../services/auth.service';
import { PlanService } from '../../services/plan.service';

export interface Option {
  key: string;
  text: string;
}

// export interface Question {
//   id: number;
//   subject: string;
//   question: string;
//   options: Option[];
//   correct: string;
//   explanation: string;
// }

type QuestionStatus = 'unattempted' | 'answered' | 'marked' | 'visited';

@Component({
  selector: 'app-take-test',
  imports: [],
  templateUrl: './take-test.component.html',
  styleUrl: './take-test.component.css',
})
export class TakeTestComponent implements OnInit, OnDestroy {

  private platformId = inject(PLATFORM_ID);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  urlSlug = signal('');

  private testService = inject(TestService);
  private authService = inject(AuthService);
  private planService = inject(PlanService);

  currentTest: Test | null = null;
  questions = signal<any[]>([]);

  /* ── Test meta ─────────────────────────────────── */
  readonly testTitle = this.currentTest?.title;
  readonly testSubtitle = '50 full-length tests · Timed & Evaluated';
  // readonly totalTime = parseInt(this.currentTest?.duration || '0') * 60; // in seconds
  totalTime = computed(() =>
    Number(this.currentTest?.duration || 0) * 60
  );
  readonly positive_marks = parseInt(this.currentTest?.units || '0') / parseInt(this.currentTest?.duration || '0')

  /* ── State ─────────────────────────────────────── */
  currentIndex = signal(0);
  answers = signal<Record<number, string>>({});
  marked = signal<Set<number>>(new Set());
  visited = signal<Set<number>>(new Set([0]));
  timeLeft = signal(0);
  testStarted = signal(false);
  testSubmitted = signal(false);
  showPalette = signal(false);
  showResult = signal(false);
  confirmSubmit = signal(false);

  private timer: ReturnType<typeof setInterval> | null = null;

  /* ── Computed ───────────────────────────────────── */
  currentQuestion = computed(() =>
    this.questions()[this.currentIndex()]
  );


  questionStatuses = computed(() => {
    const ans = this.answers();
    const mrk = this.marked();
    const vis = this.visited();
    return this.questions().map((q) => {
      if (mrk.has(q.id)) return 'marked' as QuestionStatus;
      if (ans[q.id]) return 'answered' as QuestionStatus;
      if (vis.has(q.id)) return 'visited' as QuestionStatus;
      return 'unattempted' as QuestionStatus;
    });
  });

optionList = computed(() => {
  const q = this.currentQuestion();

  const getOptionText = (eng?: string, hindi?: string) => {
    const en = (eng ?? '').trim();
    const hi = (hindi ?? '').trim();

    // Return only English if Hindi is empty or both are the same
    return !hi || en === hi ? en : `${en} / ${hi}`;
  };

  return [
    { key: 'a', text: getOptionText(q?.option_a, q?.option_a_hindi) },
    { key: 'b', text: getOptionText(q?.option_b, q?.option_b_hindi) },
    { key: 'c', text: getOptionText(q?.option_c, q?.option_c_hindi) },
    { key: 'd', text: getOptionText(q?.option_d, q?.option_d_hindi) },
  ];
});

  answeredCount = computed(() => Object.keys(this.answers()).length);
  markedCount = computed(() => this.marked().size);
  unattemptedCount = computed(
    () => this.questions.length - this.answeredCount()
  );

  timeDisplay = computed(() => {
    const t = this.timeLeft();
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = t % 60;
    if (h > 0) return `${h}:${pad(m)}:${pad(s)}`;
    return `${pad(m)}:${pad(s)}`;
  });

  timerUrgent = computed(() => this.timeLeft() <= 300); // last 5 mins

  scoreResult = computed(() => {
    const answers = this.answers();

    let correct = 0;
    let wrong = 0;

    this.questions().forEach((q) => {
      const answer = answers[q.id];

      if (!answer) return;

      if (answer === q.correct) {
        correct++;
      } else {
        wrong++;
      }
    });

    const total = this.questions().length;
    const skipped = total - correct - wrong;


    const score = correct - wrong / 3;
    // const total = this.questions.length;
    const percent = Math.round((correct / total) * 100);
    const rank = Math.floor(Math.random() * 900) + 100; // simulated
     return {
      correct,
      wrong,
      skipped,
      total,
      score: (correct - wrong / 3).toFixed(2),
      percent: total
        ? Math.round((correct / total) * 100)
        : 0,
      rank: Math.floor(Math.random() * 900) + 100,
    };
  });

  /* ── Lifecycle ─────────────────────────────────── */
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.urlSlug.set(this.route.snapshot.paramMap.get('slug') || '');
    }

    console.log('slug', this.urlSlug());
    if(this.urlSlug() != null){
      this.testService.getTestBySlug(this.urlSlug()).subscribe((test : Test) => {
       this.currentTest = test

        this.questions.set(test.questions || []);

         this.timeLeft.set(
            Number(test.duration || 0) * 60
          );


      console.log(this.questions);

      });

      this.authService.user$.subscribe(user => {
        if(!user){
          this.router.navigate(['/login']);
        }
        else{
          this.loadActivePlan();
        }
      })

    }

  }

    loadActivePlan(): void {

      this.planService.getMyActivePlan().subscribe({
        next: (data: any) => {
          if (!data) {
            this.router.navigate(['/purchase-plan']);
            return;
          }
        },
        error: (error: any) => {
          console.error('Error fetching active plan:', error);
        }
      });
    }



  ngOnDestroy(): void {
    this.clearTimer();
  }

  /* ── Actions ───────────────────────────────────── */
  startTest(): void {


    this.testStarted.set(true);
    this.startTimer();
  }

  selectOption(key: string): void {
    if (this.testSubmitted()) return;
    this.answers.update((a) => ({ ...a, [this.currentQuestion().id]: key }));
  }

  toggleMark(): void {
    const id = this.currentQuestion().id;
    this.marked.update((s) => {
      const ns = new Set(s);
      ns.has(id) ? ns.delete(id) : ns.add(id);
      return ns;
    });
  }

  clearAnswer(): void {
    const id = this.currentQuestion().id;
    this.answers.update((a) => {
      const na = { ...a };
      delete na[id];
      return na;
    });
  }

  goTo(i: number): void {
    if (i < 0 || i >= this.questions().length) return;
    this.currentIndex.set(i);
    this.visited.update((s) => new Set([...s, this.questions()[i].id]));
    this.showPalette.set(false);
  }

  prev(): void {
    this.goTo(this.currentIndex() - 1);
  }

  next(): void {
    if (this.currentIndex() < this.questions().length - 1) {
      this.goTo(this.currentIndex() + 1);
    }
  }

  submitTest(): void {

    this.testService.saveAttemptTest({
      test_id: this.currentTest?.id || 0,
      score: this.scoreResult().score
    }).subscribe(() => {
      this.confirmSubmit.set(true);
    });

    this.testSubmitted.set(true);
    this.showResult.set(true);
    this.clearTimer();
  }

  restartTest(): void {
    this.currentIndex.set(0);
    this.answers.set({});
    this.marked.set(new Set());
    this.visited.set(new Set([0]));
    this.timeLeft.set(this.totalTime());
    this.testStarted.set(false);
    this.testSubmitted.set(false);
    this.showResult.set(false);
    this.confirmSubmit.set(false);
    this.showPalette.set(false);
  }

  statusColor(status: QuestionStatus): string {
    const map: Record<QuestionStatus, string> = {
      answered: 'background: var(--color-primary); color: white;',
      marked: 'background: #400675; color: white;',
      visited:
        'background: rgba(137,1,23,0.1); color: var(--color-primary); border: 1.5px solid rgba(137,1,23,0.25);',
      unattempted:
        'background: #f3f4f6; color: #9ca3af; border: 1.5px solid #e5e7eb;',
    };
    return map[status];
  }

  isCorrect(q: any): boolean {
    return this.answers()[q.id] === q.correct;
  }

  isWrong(q: any): boolean {
    const a = this.answers()[q.id];
    return !!a && a !== q.correct;
  }

  private startTimer(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.timer = setInterval(() => {
      this.timeLeft.update((t) => {
        if (t <= 1) {
          this.submitTest();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  private clearTimer(): void {
    if (this.timer) clearInterval(this.timer);
  }

  trackByIndex(i: number): number {
    return i;
  }

  togglePalette(): void {
    this.showPalette.set(!this.showPalette());
  }
  closePalette(): void {
    this.showPalette.set(false);
  }
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}
