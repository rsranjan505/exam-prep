import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../services/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  dashboardService = inject(DashboardService);
  dashboardData: any = {
    user: {},
    active_plan: {},
    attempts: {}
  };

  completedTests = signal(0);
  totalTests = signal(0);
  accuracy = signal(0);
  recentTests = signal<any[]>([]);

  ngOnInit(): void {

      this.dashboardService.getDashboardData().subscribe(data => {
        this.dashboardData = data;
        console.log('Dashboard Data:', data);
        this.completedTests.set(data.attempts_count);
        this.totalTests.set(data.active_plan.total_tests);
        // this.accuracy.set(data.attempts.accuracy);

        this.recentTests.set(data.attempts);
      });

  }



  // user = {
  //   first_name: 'Rajeev'
  // };



  // recentTests = [
  //   {
  //     title: 'BPSC Prelims Mock Test 12',
  //     score: 82,
  //     questions: 150,
  //     date: '26 May 2026',
  //     status: 'Completed'
  //   },
  //   {
  //     title: 'Indian Polity Practice Set',
  //     score: 74,
  //     questions: 100,
  //     date: '24 May 2026',
  //     status: 'Completed'
  //   },
  //   {
  //     title: 'History Full Length Test',
  //     score: 69,
  //     questions: 120,
  //     date: '22 May 2026',
  //     status: 'Completed'
  //   }
  // ];

  upcomingTests = [
    {
      title: 'Bihar Economy Mega Test',
      questions: 100,
      duration: '90 Min'
    },
    {
      title: 'Current Affairs Weekly Test',
      questions: 50,
      duration: '45 Min'
    }
  ];

  get progressPercentage(): number {

    return Math.round(
      (this.completedTests() / this.totalTests()) * 100
    );
  }
}
