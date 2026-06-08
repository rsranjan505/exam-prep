import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TestService } from '../../services/test.service';
import { TitleCasePipe } from '@angular/common';


@Component({
  selector: 'app-mock-test',
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './mock-test.component.html',
  styleUrl: './mock-test.component.css'
})
export class MockTestComponent {


    private testService = inject(TestService)

    allTests = this.testService.tests
    loading = this.testService.loading

    ngOnInit(): void {
      this.testService.fetchUserTests().subscribe((res) => {
          console.log('SIGNAL DATA:', this.allTests())
      })
    }


  openFaq = signal<number | null>(null);


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

  // readonly allTests: Test[] = [
  //   {
  //     id: 1,
  //     category: 'Prelims',
  //     icon: '📋',
  //     tag: 'Prelims',
  //     title: 'BPSC 69th Prelims Full Test 1',
  //     description:
  //       'Complete simulation of BPSC 69th prelims with all GS topics as per latest pattern and syllabus.',
  //     questions: 150,
  //     duration: '2 hrs',
  //     difficulty: 'Hard',
  //     attempts: '18,400',
  //     languages: ['Hindi', 'English'],
  //     free: false,
  //     new: true,
  //   },
  //   {
  //     id: 2,
  //     category: 'CSAT',
  //     icon: '🧠',
  //     tag: 'CSAT',
  //     title: 'CSAT Paper II — Reasoning Booster',
  //     description:
  //       'Focused test on logical reasoning, comprehension, and mental ability for BPSC CSAT paper.',
  //     questions: 100,
  //     duration: '2 hrs',
  //     difficulty: 'Medium',
  //     attempts: '12,200',
  //     languages: ['Hindi', 'English'],
  //     free: true,
  //   },
  //   {
  //     id: 3,
  //     category: 'Mains',
  //     icon: '✍️',
  //     tag: 'Mains',
  //     title: 'General Studies Mains Paper I',
  //     description:
  //       'Descriptive test covering Indian History, Culture, Geography and Bihar-specific GS topics.',
  //     questions: 20,
  //     duration: '3 hrs',
  //     difficulty: 'Hard',
  //     attempts: '6,800',
  //     languages: ['Hindi'],
  //     free: false,
  //   },
  //   {
  //     id: 4,
  //     category: 'Current Affairs',
  //     icon: '📰',
  //     tag: 'Current Affairs',
  //     title: 'Bihar Monthly Current Affairs — Jan 2025',
  //     description:
  //       'Complete monthly current affairs quiz covering Bihar government schemes, appointments, and events.',
  //     questions: 50,
  //     duration: '40 mins',
  //     difficulty: 'Medium',
  //     attempts: '22,000',
  //     languages: ['Hindi', 'English'],
  //     free: true,
  //     new: true,
  //   },
  //   {
  //     id: 5,
  //     category: 'Sectional',
  //     icon: '🗺️',
  //     tag: 'Sectional',
  //     title: 'Indian Geography — Complete Test',
  //     description:
  //       'Section-wise deep dive into Physical, Economic and Human Geography of India and Bihar.',
  //     questions: 75,
  //     duration: '1 hr',
  //     difficulty: 'Medium',
  //     attempts: '9,500',
  //     languages: ['Hindi', 'English'],
  //     free: false,
  //   },
  //   {
  //     id: 6,
  //     category: 'Prelims',
  //     icon: '📜',
  //     tag: 'Prelims',
  //     title: 'Indian Polity & Constitution Test',
  //     description:
  //       'Comprehensive test on Indian Constitution, Parliament, Judiciary, and Governance structures.',
  //     questions: 100,
  //     duration: '1.5 hrs',
  //     difficulty: 'Hard',
  //     attempts: '14,300',
  //     languages: ['Hindi', 'English'],
  //     free: false,
  //   },
  //   {
  //     id: 7,
  //     category: 'Sectional',
  //     icon: '🔢',
  //     tag: 'Sectional',
  //     title: 'Quantitative Aptitude Sprint',
  //     description:
  //       'Fast-paced numerical ability test to sharpen calculation speed and accuracy for CSAT.',
  //     questions: 50,
  //     duration: '45 mins',
  //     difficulty: 'Easy',
  //     attempts: '8,100',
  //     languages: ['Hindi', 'English'],
  //     free: true,
  //   },
  //   {
  //     id: 8,
  //     category: 'Current Affairs',
  //     icon: '🌐',
  //     tag: 'Current Affairs',
  //     title: 'National Affairs Weekly Quiz',
  //     description:
  //       'Weekly national current affairs covering economy, politics, science, and international events.',
  //     questions: 25,
  //     duration: '20 mins',
  //     difficulty: 'Easy',
  //     attempts: '30,000',
  //     languages: ['Hindi', 'English'],
  //     free: true,
  //     new: true,
  //   },
  //   {
  //     id: 9,
  //     category: 'Mains',
  //     icon: '📝',
  //     tag: 'Mains',
  //     title: 'Essay Writing Practice Test',
  //     description:
  //       'Structured essay writing practice with model answers evaluated by expert faculty.',
  //     questions: 3,
  //     duration: '3 hrs',
  //     difficulty: 'Hard',
  //     attempts: '4,200',
  //     languages: ['Hindi'],
  //     free: false,
  //   },
  // ];


  // filteredTests = computed(() => {
  //   const cat = this.activeCategory();
  //   return cat === 'All'
  //     ? this.allTests
  //     : this.allTests.filter((t) => t.category === cat);
  // });

  // setCategory(cat: Category): void {
  //   this.activeCategory.set(cat);
  // }

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
