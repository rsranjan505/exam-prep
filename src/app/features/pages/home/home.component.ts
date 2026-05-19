// bpsc-prep.component.ts

import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinTest } from "../../components/join-test/join-test";
import { WhyChooseUsComponent } from "../../components/why-choose-us/why-choose-us.component";
import { PracticeZoneComponent } from "../../components/practice-zone/practice-zone.component";
import { MaterialComponent } from "../../components/material/material.component";





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
  imports: [CommonModule, JoinTest, WhyChooseUsComponent, PracticeZoneComponent, MaterialComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {

  mobileMenuOpen = false;

  currentSlide = 0;

  autoSlideInterval: any;

  slides = [
    {
      tag: 'Bihar Civil Services',
      title: 'Crack BPSC with Confidence',
      description:
        'Prepare for Bihar Public Service Commission exams with online tests, expert guidance, and high-quality study material.',
      primaryBtn: 'Start Test Series',
      secondaryBtn: 'Buy Study Material',
      image:
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=80',
    },
    {
      tag: 'Expert Faculty',
      title: 'Learn from the Best Mentors',
      description:
        'Our experienced BPSC faculty members guide you step by step through every topic and exam strategy.',
      primaryBtn: 'Explore Courses',
      secondaryBtn: 'Meet Our Faculty',
      image:
        'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1400&q=80',
    },
    {
      tag: 'Mock Tests',
      title: 'Practice. Analyse. Improve.',
      description:
        'Full-length mock tests designed exactly as per the latest BPSC syllabus and exam pattern.',
      primaryBtn: 'Take a Free Test',
      secondaryBtn: 'View All Tests',
      image:
        'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1400&q=80',
    },
    {
      tag: 'Study Material',
      title: 'Curated Books & Notes',
      description:
        'Access comprehensive study material handcrafted for BPSC aspirants — available at pocket-friendly prices.',
      primaryBtn: 'Browse Books',
      secondaryBtn: 'Download Free Notes',
      image:
        'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1400&q=80',
    },
    {
      tag: '2000+ Toppers',
      title: "Join Bihar's Largest BPSC Community",
      description:
        'Thousands of students have cleared BPSC with our guidance. Your success story starts here.',
      primaryBtn: 'Join Now — Free',
      secondaryBtn: 'See Success Stories',
      image:
        'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1400&q=80',
    },
  ];

  stats = [
    {
      number: '12,000+',
      label: 'Active Students',
    },
    {
      number: '2,000+',
      label: 'BPSC Toppers',
    },
    {
      number: '500+',
      label: 'Mock Tests',
    },
    {
      number: '98%',
      label: 'Student Satisfaction',
    },
    {
      number: '50+',
      label: 'Expert Faculty',
    },
  ];

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    clearInterval(this.autoSlideInterval);
  }

  startAutoSlide(): void {
    clearInterval(this.autoSlideInterval);

    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 4500);
  }

  pauseSlider(): void {
    clearInterval(this.autoSlideInterval);
  }

  nextSlide(): void {
    this.currentSlide =
      (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) %
      this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }







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