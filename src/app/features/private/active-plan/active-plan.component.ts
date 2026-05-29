import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-active-plan',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './active-plan.component.html',
})
export class ActivePlanComponent implements OnInit {

  /**
   * ACTIVE PLAN
   */
  activePlan = signal<any>(null);

  /**
   * USER TEST DATA
   */
  completedTests = signal<number>(12);

  accuracy = signal<number>(78);

  rank = signal<number>(145);

  /**
   * COMPUTED PROGRESS
   */
  progress = computed(() => {

    const plan = this.activePlan();

    if (!plan || !plan.total_tests) {
      return 0;
    }

    return Math.round(
      (this.completedTests() / plan.total_tests) * 100
    );
  });

  ngOnInit(): void {

    /**
     * API CALL HERE
     */
    this.loadActivePlan();
  }

  /**
   * LOAD PLAN
   */
  loadActivePlan(): void {

    /**
     * REPLACE WITH API RESPONSE
     */
    const response = {
      exam_name: 'BPSC Premium Plan',
      total_tests: 40,
      duration: '12 Months',
      expiry_date: '28 May 2027',
      features: [
        '40 Full Length Mock Tests',
        'Daily Current Affairs',
        'Rank Prediction',
        'Detailed Performance Analytics',
        'Unlimited Practice Access',
        'Subject Wise Tests'
      ]
    };

    this.activePlan.set(response);
  }

  /**
   * REMAINING TESTS
   */
  remainingTests(): number {

    const plan = this.activePlan();

    if (!plan) {
      return 0;
    }

    return plan.total_tests - this.completedTests();
  }

}
