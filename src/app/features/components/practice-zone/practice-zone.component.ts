import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { TestService } from '../../services/test.service';
import { RouterLink } from "@angular/router";

// export interface TestCard {
//   icon: string;
//   tag: string;
//   title: string;
//   description: string;
//   questions: string;
//   duration: string;
//   difficulty: 'Easy' | 'Medium' | 'Hard';
//   difficultyColor: string;
//   popular?: boolean;
// }

@Component({
  selector: 'app-practice-zone',
  imports: [CommonModule, RouterLink],
  templateUrl: './practice-zone.component.html',
  styleUrl: './practice-zone.component.css',
})
export class PracticeZoneComponent {

    private testService = inject(TestService)

    tests = this.testService.tests
    loading = this.testService.loading

    ngOnInit(): void {
        this.testService.fetchTests().subscribe((res) => {

          console.log('API DATA:', res)

          console.log('SIGNAL DATA:', this.tests())
      })
    }

  getDifficultyColor(difficulty?: string): string {

      switch ((difficulty || '').toLowerCase()) {

          case 'low':
              return '#2a7a2a'

          case 'medium':
              return '#400675'

          case 'high':
              return '#890117'

          default:
              return '#6b7280'
      }
  }



  // readonly tests: TestCard[] = [
  //   {
  //     icon: '📋',
  //     tag: 'Prelims',
  //     title: 'Prelims Full Test',
  //     description:
  //       'Complete full-length prelims simulation with all subjects covered as per latest BPSC pattern.',
  //     questions: '150 Questions',
  //     duration: '2 Hours',
  //     difficulty: 'Hard',
  //     difficultyColor: '#890117',
  //     popular: true,
  //   },
  //   {
  //     icon: '🧠',
  //     tag: 'CSAT',
  //     title: 'CSAT Section Test',
  //     description:
  //       'Deep focus on reasoning, comprehension and mental ability — essential for clearing prelims cutoff.',
  //     questions: '80 Questions',
  //     duration: '1 Hour',
  //     difficulty: 'Medium',
  //     difficultyColor: '#400675',
  //   },
  //   {
  //     icon: '✍️',
  //     tag: 'Mains',
  //     title: 'Mains Answer Writing',
  //     description:
  //       'Practice structured essay and descriptive answer writing evaluated by expert faculty members.',
  //     questions: '10 Questions',
  //     duration: '3 Hours',
  //     difficulty: 'Hard',
  //     difficultyColor: '#890117',
  //   },
  //   {
  //     icon: '📰',
  //     tag: 'Current Affairs',
  //     title: 'Daily Current Affairs Quiz',
  //     description:
  //       'Stay updated with Bihar and national current affairs through daily scored quizzes.',
  //     questions: '25 Questions',
  //     duration: '20 Mins',
  //     difficulty: 'Easy',
  //     difficultyColor: '#2a7a2a',
  //   },
  //   {
  //     icon: '🗺️',
  //     tag: 'GS Paper',
  //     title: 'General Studies Mock',
  //     description:
  //       'Full GS mock test covering History, Geography, Polity, Economy and Science & Tech.',
  //     questions: '100 Questions',
  //     duration: '1.5 Hours',
  //     difficulty: 'Medium',
  //     difficultyColor: '#400675',
  //     popular: true,
  //   },
  //   {
  //     icon: '🔢',
  //     tag: 'Aptitude',
  //     title: 'Quantitative Aptitude',
  //     description:
  //       'Section-wise numerical ability test to sharpen your calculation speed and accuracy.',
  //     questions: '50 Questions',
  //     duration: '45 Mins',
  //     difficulty: 'Medium',
  //     difficultyColor: '#400675',
  //   },
  // ];

  trackByTitle(index: number, item: { title: string }): string {
    return item.title;
  }


}
