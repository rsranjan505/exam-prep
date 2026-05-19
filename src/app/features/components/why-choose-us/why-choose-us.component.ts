import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-why-choose-us',
  imports: [NgFor, CommonModule],
  templateUrl: './why-choose-us.component.html',
  styleUrl: './why-choose-us.component.css',
})
export class WhyChooseUsComponent {

    features = [
    {
      icon: '🎓',
      title: 'Expert Faculty',
      description:
        'Learn from experienced BPSC mentors who have guided thousands of successful candidates.',
      bg: 'bg-[#890117]/10',
    },
    {
      icon: '📝',
      title: 'Updated Test Series',
      description:
        'Practice with full-length tests and quizzes designed according to latest BPSC syllabus.',
      bg: 'bg-[#410040]/10',
    },
    {
      icon: '💡',
      title: 'Affordable Learning',
      description:
        'High-quality study material and expert-designed courses available at affordable pricing.',
      bg: 'bg-[#400675]/10',
    },
  ];

}
