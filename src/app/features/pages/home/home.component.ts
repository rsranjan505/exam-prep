// bpsc-prep.component.ts

import {
  Component,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinTest } from "../../components/join-test/join-test";
import { WhyChooseUsComponent } from "../../components/why-choose-us/why-choose-us.component";
import { PracticeZoneComponent } from "../../components/practice-zone/practice-zone.component";
import { HeroSectionComponent } from "../../components/hero-section/hero-section.component";
import { TestimonialsSectionComponent } from '../../components/testimonials-section/testimonials-section.component';
import { SeoService } from 'src/app/core/services/seo.service';





export interface Tip {
  icon: string;
  number: string;
  title: string;
  description: string;
  color: string;
}

interface Testimonial {
  quote: string;
  stars: number;
  initials: string;
  name: string;
  location: string;
  avatarClass: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, JoinTest, WhyChooseUsComponent, PracticeZoneComponent, HeroSectionComponent, TestimonialsSectionComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  private seo = inject(SeoService);
  mobileMenuOpen = false;

  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    this.seo.updateMetaTags({
      title: 'Knowledge Nation - Best Online Test Series Platform',
      description: 'Join thousands of aspirants preparing for SSC, Railway, Banking, UPSC, Bihar Police and other competitive exams.',
      keywords: 'ssc test series,railway mock test,banking mock test,bpsc online test,bihar police test series'
    });

     // Optional JSON-LD (LocalBusiness)
    this.seo.addJsonLd({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Knowledge Nation',
      url: 'https://www.knowledgenation.in/',
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

  activeTestimonial = signal(0);
  private autoTimer: ReturnType<typeof setInterval> | null = null;

  readonly tips: Tip[] = [
    {
      icon: '⏰',
      number: '01',
      title: 'Time Management',
      description:
        'Plan your daily study schedule and stick to it for consistent progress. Allocate dedicated time blocks for each subject.',
      color: '#890117',
    },
    {
      icon: '📝',
      number: '02',
      title: 'Practice Tests',
      description:
        'Attempt daily mock tests to analyze your strengths and weaknesses. Review every wrong answer with detailed explanations.',
      color: '#400675',
    },
    {
      icon: '🔁',
      number: '03',
      title: 'Regular Revision',
      description:
        'Regularly revise important topics using the spaced repetition technique to retain information effectively.',
      color: '#3f043e',
    },
    {
      icon: '📰',
      number: '04',
      title: 'Current Affairs',
      description:
        'Read Bihar and national news daily. Focus on government schemes, appointments, and economic updates.',
      color: '#890117',
    },
    {
      icon: '🧘',
      number: '05',
      title: 'Stay Consistent',
      description:
        'Consistency beats intensity. Study 6–8 hours daily with short breaks to keep your mind fresh and focused.',
      color: '#400675',
    },
    {
      icon: '🤝',
      number: '06',
      title: 'Peer Learning',
      description:
        'Join study groups and discuss topics with peers. Teaching others is the fastest way to solidify your knowledge.',
      color: '#3f043e',
    },
  ];

    testimonials: Testimonial[] = [
    {
      quote: 'Knowledge Nation Portal completely transformed my preparation. The structured test series and expert mentorship helped me score in the top 5% of Prelims.',
      stars: 5,
      initials: 'AS',
      name: 'Anjali Singh',
      location: 'Patna — BPSC 70th Selected',
      avatarClass: 'bg-gradient-to-br from-primary to-accent',
    },
    {
      quote: 'The mock tests here are remarkably close to the actual exam pattern. I cleared Prelims on my first attempt. Highly recommend to all BPSC aspirants!',
      stars: 5,
      initials: 'RK',
      name: 'Ravi Kumar',
      location: 'Gaya — BPSC 68th Selected',
      avatarClass: 'bg-gradient-to-br from-secondary to-primary',
    },
    {
      quote: 'Affordable books and genuinely expert guidance made my Mains preparation so much easier. The answer writing practice sessions were a game-changer.',
      stars: 5,
      initials: 'PM',
      name: 'Priya Mishra',
      location: 'Bhagalpur — BPSC 69th Selected',
      avatarClass: 'bg-gradient-to-br from-accent to-secondary',
    },
  ];
}
