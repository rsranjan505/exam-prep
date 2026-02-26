import { Component } from '@angular/core';
import { JoinTest } from '../../components/join-test/join-test';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { TestimonialsSectionComponent } from '../../components/testimonials-section/testimonials-section.component';

export interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface TestCard {
  icon: string;
  tag: string;
  title: string;
  description: string;
  questions: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  difficultyColor: string;
  popular?: boolean;
}

@Component({
  selector: 'app-home',
  imports: [JoinTest, HeroSectionComponent, TestimonialsSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly features: Feature[] = [
    {
      icon: '🎓',
      title: 'Expert Faculty',
      description:
        'Learn from experienced BPSC mentors with proven track records who guide you step by step to success.',
      color: '#890117',
    },
    {
      icon: '📝',
      title: 'Updated Test Series',
      description:
        'Practice with the latest BPSC syllabus and exam pattern. All questions curated by toppers.',
      color: '#400675',
    },
    {
      icon: '💸',
      title: 'Affordable Learning',
      description:
        'High-quality study material and full courses at pocket-friendly prices — no compromise on quality.',
      color: '#3f043e',
    },
    {
      icon: '📱',
      title: 'Learn Anywhere',
      description:
        'Access all content on mobile, tablet, or desktop. Study on the go with our offline-ready app.',
      color: '#890117',
    },
    {
      icon: '🏆',
      title: 'Proven Results',
      description:
        'Over 10,000+ selections in BPSC, UPSC, SSC & Banking. Join the family of toppers today.',
      color: '#400675',
    },
    {
      icon: '🔴',
      title: 'Live Classes',
      description:
        'Daily live sessions with real-time doubt clearing. Never feel stuck on a tough topic again.',
      color: '#3f043e',
    },
  ];

  readonly tests: TestCard[] = [
    {
      icon: '📋',
      tag: 'Prelims',
      title: 'Prelims Full Test',
      description:
        'Complete full-length prelims simulation with all subjects covered as per latest BPSC pattern.',
      questions: '150 Questions',
      duration: '2 Hours',
      difficulty: 'Hard',
      difficultyColor: '#890117',
      popular: true,
    },
    {
      icon: '🧠',
      tag: 'CSAT',
      title: 'CSAT Section Test',
      description:
        'Deep focus on reasoning, comprehension and mental ability — essential for clearing prelims cutoff.',
      questions: '80 Questions',
      duration: '1 Hour',
      difficulty: 'Medium',
      difficultyColor: '#400675',
    },
    {
      icon: '✍️',
      tag: 'Mains',
      title: 'Mains Answer Writing',
      description:
        'Practice structured essay and descriptive answer writing evaluated by expert faculty members.',
      questions: '10 Questions',
      duration: '3 Hours',
      difficulty: 'Hard',
      difficultyColor: '#890117',
    },
    {
      icon: '📰',
      tag: 'Current Affairs',
      title: 'Daily Current Affairs Quiz',
      description:
        'Stay updated with Bihar and national current affairs through daily scored quizzes.',
      questions: '25 Questions',
      duration: '20 Mins',
      difficulty: 'Easy',
      difficultyColor: '#2a7a2a',
    },
    {
      icon: '🗺️',
      tag: 'GS Paper',
      title: 'General Studies Mock',
      description:
        'Full GS mock test covering History, Geography, Polity, Economy and Science & Tech.',
      questions: '100 Questions',
      duration: '1.5 Hours',
      difficulty: 'Medium',
      difficultyColor: '#400675',
      popular: true,
    },
    {
      icon: '🔢',
      tag: 'Aptitude',
      title: 'Quantitative Aptitude',
      description:
        'Section-wise numerical ability test to sharpen your calculation speed and accuracy.',
      questions: '50 Questions',
      duration: '45 Mins',
      difficulty: 'Medium',
      difficultyColor: '#400675',
    },
  ];

  trackByTitle(index: number, item: { title: string }): string {
    return item.title;
  }
}
