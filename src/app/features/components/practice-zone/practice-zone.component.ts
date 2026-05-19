import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface TestCard {
  badge: string;
  badgeType: 'red' | 'purple' | 'accent';
  title: string;
  description: string;
  questions: string;
  duration: string;
}

@Component({
  selector: 'app-practice-zone',
  imports: [CommonModule],
  templateUrl: './practice-zone.component.html',
  styleUrl: './practice-zone.component.css',
})
export class PracticeZoneComponent {

    tests: TestCard[] = [
    {
      badge: 'PRELIMS',
      badgeType: 'red',
      title: 'Prelims Full Test',
      description: 'Comprehensive full-length test covering the entire BPSC Prelims syllabus in timed conditions.',
      questions: '150 Questions',
      duration: '2 Hours',
    },
    {
      badge: 'CSAT',
      badgeType: 'purple',
      title: 'CSAT Section Test',
      description: 'Focused on reasoning, comprehension, and aptitude — essential for clearing the BPSC Prelims Paper II.',
      questions: '100 Questions',
      duration: '2 Hours',
    },
    {
      badge: 'MAINS',
      badgeType: 'accent',
      title: 'Mains Answer Writing',
      description: 'Develop your essay and answer writing skills for Mains with expert feedback and model answers.',
      questions: 'Essay + GS',
      duration: '3 Hours',
    },
  ];
}
