import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { TakeTestComponent } from '../../components/take-test/take-test.component';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Category =
  | 'All'
  | 'Prelims'
  | 'Mains'
  | 'CSAT'
  | 'Current Affairs'
  | 'Sectional';

export interface TestPlan {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  tag: string;
  tagColor: string;
  features: string[];
  tests: number;
  popular?: boolean;
  best?: boolean;
}

export interface Test {
  id: number;
  category: Category;
  icon: string;
  tag: string;
  title: string;
  description: string;
  questions: number;
  duration: string;
  difficulty: Difficulty;
  attempts: string;
  languages: string[];
  free?: boolean;
  new?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-test-series',
  imports: [TakeTestComponent],
  templateUrl: './test-series.component.html',
  styleUrl: './test-series.component.css',
})
export class TestSeriesComponent {
  activeCategory = signal<Category>('All');
  openFaq = signal<number | null>(null);

  readonly categories: Category[] = [
    'All',
    'Prelims',
    'Mains',
    'CSAT',
    'Current Affairs',
    'Sectional',
  ];

  readonly difficultyColor: Record<Difficulty, string> = {
    Easy: '#1a7a2e',
    Medium: '#400675',
    Hard: '#890117',
  };

  readonly plans: TestPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 0,
      originalPrice: 0,
      tag: 'Free Forever',
      tagColor: '#1a7a2e',
      tests: 10,
      features: [
        '10 Free Mock Tests',
        'Basic Performance Report',
        'Section-wise Analysis',
        'Current Affairs Quiz (Weekly)',
        'Community Forum Access',
      ],
    },
    {
      id: 'prelims',
      name: 'Prelims Pro',
      price: 499,
      originalPrice: 999,
      tag: 'Most Popular',
      tagColor: '#890117',
      tests: 50,
      popular: true,
      features: [
        '50 Full-Length Mock Tests',
        'Detailed Solutions & Explanations',
        'Rank Among 25K+ Students',
        'Topic-wise Strength/Weakness Report',
        'Daily Current Affairs Quiz',
        'Previous Year Papers (10 Years)',
        'Live Test Discussion Sessions',
      ],
    },
    {
      id: 'complete',
      name: 'Complete BPSC',
      price: 999,
      originalPrice: 2499,
      tag: 'Best Value',
      tagColor: '#400675',
      tests: 120,
      best: true,
      features: [
        'Everything in Prelims Pro',
        '120 Tests (Prelims + Mains + CSAT)',
        'Mains Answer Writing Practice',
        'Personal Mentor Evaluation',
        'Interview Preparation Module',
        'Study Planner & Tracker',
        'Offline Download Support',
        '1-Year Validity',
      ],
    },
  ];

  readonly allTests: Test[] = [
    {
      id: 1,
      category: 'Prelims',
      icon: '📋',
      tag: 'Prelims',
      title: 'BPSC 69th Prelims Full Test 1',
      description:
        'Complete simulation of BPSC 69th prelims with all GS topics as per latest pattern and syllabus.',
      questions: 150,
      duration: '2 hrs',
      difficulty: 'Hard',
      attempts: '18,400',
      languages: ['Hindi', 'English'],
      free: false,
      new: true,
    },
    {
      id: 2,
      category: 'CSAT',
      icon: '🧠',
      tag: 'CSAT',
      title: 'CSAT Paper II — Reasoning Booster',
      description:
        'Focused test on logical reasoning, comprehension, and mental ability for BPSC CSAT paper.',
      questions: 100,
      duration: '2 hrs',
      difficulty: 'Medium',
      attempts: '12,200',
      languages: ['Hindi', 'English'],
      free: true,
    },
    {
      id: 3,
      category: 'Mains',
      icon: '✍️',
      tag: 'Mains',
      title: 'General Studies Mains Paper I',
      description:
        'Descriptive test covering Indian History, Culture, Geography and Bihar-specific GS topics.',
      questions: 20,
      duration: '3 hrs',
      difficulty: 'Hard',
      attempts: '6,800',
      languages: ['Hindi'],
      free: false,
    },
    {
      id: 4,
      category: 'Current Affairs',
      icon: '📰',
      tag: 'Current Affairs',
      title: 'Bihar Monthly Current Affairs — Jan 2025',
      description:
        'Complete monthly current affairs quiz covering Bihar government schemes, appointments, and events.',
      questions: 50,
      duration: '40 mins',
      difficulty: 'Medium',
      attempts: '22,000',
      languages: ['Hindi', 'English'],
      free: true,
      new: true,
    },
    {
      id: 5,
      category: 'Sectional',
      icon: '🗺️',
      tag: 'Sectional',
      title: 'Indian Geography — Complete Test',
      description:
        'Section-wise deep dive into Physical, Economic and Human Geography of India and Bihar.',
      questions: 75,
      duration: '1 hr',
      difficulty: 'Medium',
      attempts: '9,500',
      languages: ['Hindi', 'English'],
      free: false,
    },
    {
      id: 6,
      category: 'Prelims',
      icon: '📜',
      tag: 'Prelims',
      title: 'Indian Polity & Constitution Test',
      description:
        'Comprehensive test on Indian Constitution, Parliament, Judiciary, and Governance structures.',
      questions: 100,
      duration: '1.5 hrs',
      difficulty: 'Hard',
      attempts: '14,300',
      languages: ['Hindi', 'English'],
      free: false,
    },
    {
      id: 7,
      category: 'Sectional',
      icon: '🔢',
      tag: 'Sectional',
      title: 'Quantitative Aptitude Sprint',
      description:
        'Fast-paced numerical ability test to sharpen calculation speed and accuracy for CSAT.',
      questions: 50,
      duration: '45 mins',
      difficulty: 'Easy',
      attempts: '8,100',
      languages: ['Hindi', 'English'],
      free: true,
    },
    {
      id: 8,
      category: 'Current Affairs',
      icon: '🌐',
      tag: 'Current Affairs',
      title: 'National Affairs Weekly Quiz',
      description:
        'Weekly national current affairs covering economy, politics, science, and international events.',
      questions: 25,
      duration: '20 mins',
      difficulty: 'Easy',
      attempts: '30,000',
      languages: ['Hindi', 'English'],
      free: true,
      new: true,
    },
    {
      id: 9,
      category: 'Mains',
      icon: '📝',
      tag: 'Mains',
      title: 'Essay Writing Practice Test',
      description:
        'Structured essay writing practice with model answers evaluated by expert faculty.',
      questions: 3,
      duration: '3 hrs',
      difficulty: 'Hard',
      attempts: '4,200',
      languages: ['Hindi'],
      free: false,
    },
  ];

  readonly faqs: FAQ[] = [
    {
      question: 'Are the mock tests based on the latest BPSC syllabus?',
      answer:
        'Yes, all our tests are updated immediately after any official BPSC notification. Our content team tracks every syllabus change and exam pattern update to ensure you always practice with the most relevant questions.',
    },
    {
      question: 'Can I attempt free tests without registration?',
      answer:
        'Free tests are available after a quick signup (no payment required). Paid tests require a subscription plan. Your progress, scores, and rank history are saved to your account dashboard.',
    },
    {
      question: 'How is my rank calculated after each test?',
      answer:
        "Your rank is calculated in real-time against all other students who have attempted the same test. You'll see your percentile, subject-wise performance, time per question, and comparison with toppers.",
    },
    {
      question: 'Are tests available in Hindi medium?',
      answer:
        'Yes! All our tests are available in both Hindi and English. You can switch language preference from the test settings before starting any test.',
    },
    {
      question: 'What is the validity of the subscription plans?',
      answer:
        'The Basic plan is free forever. Prelims Pro is valid for 6 months. The Complete BPSC plan is valid for 1 full year from the date of purchase, with all new tests added during that period included automatically.',
    },
    {
      question: 'Is there negative marking in the tests?',
      answer:
        'Our tests mirror the actual BPSC exam pattern exactly, including negative marking (1/3rd mark deducted per wrong answer in prelims). You can toggle negative marking on/off for practice tests in your settings.',
    },
  ];

  filteredTests = computed(() => {
    const cat = this.activeCategory();
    return cat === 'All'
      ? this.allTests
      : this.allTests.filter((t) => t.category === cat);
  });

  setCategory(cat: Category): void {
    this.activeCategory.set(cat);
  }

  toggleFaq(i: number): void {
    this.openFaq.update((v) => (v === i ? null : i));
  }

  discountPct(plan: TestPlan): number {
    if (!plan.originalPrice) return 0;
    return Math.round(
      ((plan.originalPrice - plan.price) / plan.originalPrice) * 100
    );
  }

  trackById(i: number, item: { id: number | string }): number | string {
    return item.id;
  }
  trackByIndex(i: number): number {
    return i;
  }
}
