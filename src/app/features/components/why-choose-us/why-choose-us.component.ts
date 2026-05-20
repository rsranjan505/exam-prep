import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';

  export interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-why-choose-us',
  imports: [ CommonModule, ],
  templateUrl: './why-choose-us.component.html',
  styleUrl: './why-choose-us.component.css',
})
export class WhyChooseUsComponent {

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

    trackByTitle(index: number, item: { title: string }): string {
    return item.title;
  }

}
