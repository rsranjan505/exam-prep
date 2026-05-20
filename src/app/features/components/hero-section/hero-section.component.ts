import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  imports: [NgFor, CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent implements OnInit, OnDestroy {

  
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
        'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1400&q=80',
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

}
