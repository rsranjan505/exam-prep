import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlanService } from '../../services/plan.service';

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

  private planService = inject(PlanService);
  /**
   * ACTIVE PLAN
   */
  activePlan = signal<any>(null);


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

    this.planService.getMyActivePlan().subscribe({
      next: (data: any) => {
        this.activePlan.set(data);

        console.log('Active Plan:', data);
      },
      error: (error: any) => {
        this.activePlan.set(null);
      }
    });
  }

}
