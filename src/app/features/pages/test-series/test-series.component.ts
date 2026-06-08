import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from 'src/app/core/services/seo.service';
import { TestService } from '../../services/test.service';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Category =
  | 'All'
  | 'Prelims'
  | 'Mains'
  | 'CSAT'
  | 'Current Affairs'
  | 'Sectional';



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
  imports: [ RouterLink, TitleCasePipe],
  templateUrl: './test-series.component.html',
  styleUrl: './test-series.component.css',
})
export class TestSeriesComponent {

  private seo = inject(SeoService);
  private testService = inject(TestService);

      allTests = this.testService.tests

  ngOnInit() {


    this.testService.fetchTests().subscribe((res) => {
          console.log('SIGNAL DATA:', this.allTests())
      })


    this.seo.updateMetaTags({
      title: ' Test Series - Online Mock Tests for  Prelims & Mains',
      description: 'Join our comprehensive BPSC test series with full-length mock tests, sectional quizzes, and CSAT practice to ace your BPSC exam preparation.',
      keywords: ' test series,online mock tests,BPSC prelims test,BPSC mains test,CSAT practice,Knowledge Nationaration'
    });
     // Optional JSON-LD (LocalBusiness)
    this.seo.addJsonLd({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Knowledge Nation',
      url: 'https://www.knowledgenation.in/test-series',
      logo: 'https://www.knowledgenation.in/assets/logo.png',
      email: 'support@knowledgenation.in',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Patna, Bihar',
        addressCountry: 'India',
      },
      sameAs: [
        'https://www.facebook.com/knowledgenation',
        'https://www.instagram.com/knowledgenation',
      ],
    });
  }

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


  getDifficultyColor(difficulty?: string): string {

      switch ((difficulty || '').toLowerCase()) {

          case 'low':
              return '#1a7a2e'

          case 'medium':
              return '#400675'

          case 'high':
              return '#890117'

          default:
              return '#6b7280'
      }
  }


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
    const tests = this.allTests(); // get array value from signal

    return cat === 'All'
      ? tests
      : tests.filter(t => t.tags === cat);
  });

  setCategory(cat: Category): void {
    console.log('Setting category to', cat);
    this.activeCategory.set(cat);
  }

  toggleFaq(i: number): void {
    this.openFaq.update((v) => (v === i ? null : i));
  }


  trackById(i: number, item: { id: number | string }): number | string {
    return item.id;
  }
  trackByIndex(i: number): number {
    return i;
  }
}
