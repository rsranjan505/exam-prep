import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';

export interface Option {
  key: string;
  text: string;
}

export interface Question {
  id: number;
  subject: string;
  question: string;
  options: Option[];
  correctKey: string;
  explanation: string;
}

type QuestionStatus = 'unattempted' | 'answered' | 'marked' | 'visited';

@Component({
  selector: 'app-take-test',
  imports: [],
  templateUrl: './take-test.component.html',
  styleUrl: './take-test.component.css',
})
export class TakeTestComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  /* ── Test meta ─────────────────────────────────── */
  readonly testTitle = 'BPSC Prelims Full Test';
  readonly testSubtitle = '50 full-length tests · Timed & Evaluated';
  readonly totalTime = 120 * 60; // 120 minutes in seconds

  /* ── State ─────────────────────────────────────── */
  currentIndex = signal(0);
  answers = signal<Record<number, string>>({});
  marked = signal<Set<number>>(new Set());
  visited = signal<Set<number>>(new Set([0]));
  timeLeft = signal(this.totalTime);
  testStarted = signal(false);
  testSubmitted = signal(false);
  showPalette = signal(false);
  showResult = signal(false);
  confirmSubmit = signal(false);

  private timer: ReturnType<typeof setInterval> | null = null;

  /* ── Questions ─────────────────────────────────── */
  readonly questions: Question[] = [
    {
      id: 1,
      subject: 'Geography',
      question: 'What is the capital of Bihar?',
      options: [
        { key: 'A', text: 'Patna' },
        { key: 'B', text: 'Gaya' },
        { key: 'C', text: 'Bhagalpur' },
        { key: 'D', text: 'Muzaffarpur' },
      ],
      correctKey: 'A',
      explanation:
        'Patna is the capital and largest city of Bihar. It is situated on the southern bank of the Ganges River.',
    },
    {
      id: 2,
      subject: 'History',
      question:
        'Which ancient city, near modern-day Patna, served as the capital of the Maurya Empire?',
      options: [
        { key: 'A', text: 'Vaishali' },
        { key: 'B', text: 'Rajgir' },
        { key: 'C', text: 'Pataliputra' },
        { key: 'D', text: 'Nalanda' },
      ],
      correctKey: 'C',
      explanation:
        'Pataliputra (modern Patna) was the capital of the Maurya Empire under Chandragupta Maurya and later Ashoka.',
    },
    {
      id: 3,
      subject: 'Polity',
      question:
        'The concept of "Basic Structure" of the Constitution was propounded in which landmark case?',
      options: [
        { key: 'A', text: 'Golaknath Case (1967)' },
        { key: 'B', text: 'Kesavananda Bharati Case (1973)' },
        { key: 'C', text: 'Minerva Mills Case (1980)' },
        { key: 'D', text: 'Maneka Gandhi Case (1978)' },
      ],
      correctKey: 'B',
      explanation:
        "The Basic Structure doctrine was established in Kesavananda Bharati v. State of Kerala (1973), limiting Parliament's power to amend the Constitution.",
    },
    {
      id: 4,
      subject: 'Economy',
      question:
        'Which Five Year Plan focused on "Garibi Hatao" (Remove Poverty) as its primary slogan?',
      options: [
        { key: 'A', text: 'Third Five Year Plan' },
        { key: 'B', text: 'Fourth Five Year Plan' },
        { key: 'C', text: 'Fifth Five Year Plan' },
        { key: 'D', text: 'Sixth Five Year Plan' },
      ],
      correctKey: 'C',
      explanation:
        '"Garibi Hatao" was the slogan of the Fifth Five Year Plan (1974–79), formulated under Indira Gandhi\'s government.',
    },
    {
      id: 5,
      subject: 'Science',
      question:
        'Which gas is primarily responsible for the greenhouse effect on Earth?',
      options: [
        { key: 'A', text: 'Oxygen (O₂)' },
        { key: 'B', text: 'Nitrogen (N₂)' },
        { key: 'C', text: 'Carbon Dioxide (CO₂)' },
        { key: 'D', text: 'Argon (Ar)' },
      ],
      correctKey: 'C',
      explanation:
        'Carbon Dioxide (CO₂) is the primary greenhouse gas responsible for global warming. It traps heat from escaping the atmosphere.',
    },
    {
      id: 6,
      subject: 'Bihar GK',
      question:
        'Which famous Buddhist university, a UNESCO World Heritage Site, is located in Bihar?',
      options: [
        { key: 'A', text: 'Takshashila University' },
        { key: 'B', text: 'Nalanda University' },
        { key: 'C', text: 'Vikramashila University' },
        { key: 'D', text: 'Vallabhi University' },
      ],
      correctKey: 'B',
      explanation:
        'Nalanda Mahavihara in Bihar is a UNESCO World Heritage Site. It was one of the greatest centres of learning in the ancient world (5th–12th century CE).',
    },
    {
      id: 7,
      subject: 'History',
      question:
        'The First Battle of Panipat (1526) was fought between Babur and:',
      options: [
        { key: 'A', text: 'Rana Sanga of Mewar' },
        { key: 'B', text: 'Hemu' },
        { key: 'C', text: 'Ibrahim Lodi of Delhi Sultanate' },
        { key: 'D', text: 'Sher Shah Suri' },
      ],
      correctKey: 'C',
      explanation:
        'Babur defeated Ibrahim Lodi, the last ruler of the Delhi Sultanate, at the First Battle of Panipat on April 21, 1526, establishing the Mughal Empire.',
    },
    {
      id: 8,
      subject: 'Polity',
      question:
        'Which Article of the Indian Constitution deals with the Right to Equality?',
      options: [
        { key: 'A', text: 'Articles 12–18' },
        { key: 'B', text: 'Articles 14–18' },
        { key: 'C', text: 'Articles 19–22' },
        { key: 'D', text: 'Articles 23–24' },
      ],
      correctKey: 'B',
      explanation:
        'Articles 14 to 18 deal with the Right to Equality: equality before law, prohibition of discrimination, equality of opportunity, abolition of untouchability, and abolition of titles.',
    },
    {
      id: 9,
      subject: 'Geography',
      question: 'The Ganges River enters Bihar from which state?',
      options: [
        { key: 'A', text: 'Uttar Pradesh' },
        { key: 'B', text: 'Jharkhand' },
        { key: 'C', text: 'West Bengal' },
        { key: 'D', text: 'Madhya Pradesh' },
      ],
      correctKey: 'A',
      explanation:
        'The Ganges enters Bihar from Uttar Pradesh at Chausa (Buxar district) and flows eastward through Bihar before entering West Bengal.',
    },
    {
      id: 10,
      subject: 'Economy',
      question: 'Which institution is known as the "Central Bank" of India?',
      options: [
        { key: 'A', text: 'State Bank of India' },
        { key: 'B', text: 'NABARD' },
        { key: 'C', text: 'Reserve Bank of India' },
        { key: 'D', text: 'SEBI' },
      ],
      correctKey: 'C',
      explanation:
        'The Reserve Bank of India (RBI), established in 1935, is the central bank and regulatory body responsible for monetary policy and banking regulation in India.',
    },
  ];

  /* ── Computed ───────────────────────────────────── */
  currentQuestion = computed(() => this.questions[this.currentIndex()]);

  questionStatuses = computed(() => {
    const ans = this.answers();
    const mrk = this.marked();
    const vis = this.visited();
    return this.questions.map((q) => {
      if (mrk.has(q.id)) return 'marked' as QuestionStatus;
      if (ans[q.id]) return 'answered' as QuestionStatus;
      if (vis.has(q.id)) return 'visited' as QuestionStatus;
      return 'unattempted' as QuestionStatus;
    });
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
    const ans = this.answers();
    let correct = 0,
      wrong = 0;
    this.questions.forEach((q) => {
      if (ans[q.id]) {
        if (ans[q.id] === q.correctKey) correct++;
        else wrong++;
      }
    });
    const score = correct - wrong / 3;
    const total = this.questions.length;
    const percent = Math.round((correct / total) * 100);
    const rank = Math.floor(Math.random() * 900) + 100; // simulated
    return {
      correct,
      wrong,
      skipped: total - correct - wrong,
      score: score.toFixed(2),
      total,
      percent,
      rank,
    };
  });

  /* ── Lifecycle ─────────────────────────────────── */
  ngOnInit(): void {}

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
    if (i < 0 || i >= this.questions.length) return;
    this.currentIndex.set(i);
    this.visited.update((s) => new Set([...s, this.questions[i].id]));
    this.showPalette.set(false);
  }

  prev(): void {
    this.goTo(this.currentIndex() - 1);
  }

  next(): void {
    if (this.currentIndex() < this.questions.length - 1) {
      this.goTo(this.currentIndex() + 1);
    }
  }

  submitTest(): void {
    this.confirmSubmit.set(false);
    this.testSubmitted.set(true);
    this.showResult.set(true);
    this.clearTimer();
  }

  restartTest(): void {
    this.currentIndex.set(0);
    this.answers.set({});
    this.marked.set(new Set());
    this.visited.set(new Set([0]));
    this.timeLeft.set(this.totalTime);
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

  isCorrect(q: Question): boolean {
    return this.answers()[q.id] === q.correctKey;
  }

  isWrong(q: Question): boolean {
    const a = this.answers()[q.id];
    return !!a && a !== q.correctKey;
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
