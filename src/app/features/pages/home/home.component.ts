// bpsc-prep.component.ts

import {
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinTest } from "../../components/join-test/join-test";
import { WhyChooseUsComponent } from "../../components/why-choose-us/why-choose-us.component";
import { PracticeZoneComponent } from "../../components/practice-zone/practice-zone.component";
import { MaterialComponent } from "../../components/material/material.component";
import { HeroSectionComponent } from "../../components/hero-section/hero-section.component";





interface Tip {
  icon: string;
  title: string;
  description: string;
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
  imports: [CommonModule, JoinTest, WhyChooseUsComponent, PracticeZoneComponent, MaterialComponent, HeroSectionComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  mobileMenuOpen = false;

  tips: Tip[] = [
    {
      icon: '⏰',
      title: 'Time Management',
      description: 'Plan your daily study schedule and stick to it. Break your day into focused blocks — GS, current affairs, revision.',
    },
    {
      icon: '📊',
      title: 'Practice Tests',
      description: 'Attempt daily mock tests to analyse your strengths and weaknesses. Track your scores to measure real progress.',
    },
    {
      icon: '🔁',
      title: 'Spaced Revision',
      description: 'Regularly revise important topics at spaced intervals. Use flashcards and short notes to retain information effectively.',
    },
  ];

    testimonials: Testimonial[] = [
    {
      quote: 'BPSC Prep Portal completely transformed my preparation. The structured test series and expert mentorship helped me score in the top 5% of Prelims.',
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
