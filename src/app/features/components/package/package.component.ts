import { Component } from '@angular/core';

export interface TestPlan {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  tag: string;
  tagColor: string;
  features: string[];
  tests: number;
  popular?: boolean;
  best?: boolean;
}


@Component({
  selector: 'app-package',
  imports: [],
  templateUrl: './package.component.html',
  styleUrl: './package.component.css'
})
export class PackageComponent {

    readonly plans: TestPlan[] = [
      {
        id: 'basic',
        name: 'Basic',
        price: 0,
        originalPrice: 0,
        tag: 'Free Forever',
        tagColor: '#1a7a2e',
        tests: 10,
        features: [
          '10 Free Mock Tests',
          'Basic Performance Report',
          'Section-wise Analysis',
          'Current Affairs Quiz (Weekly)',
          'Community Forum Access',
        ],
      },
      {
        id: 'prelims',
        name: 'Prelims Pro',
        price: 499,
        originalPrice: 999,
        tag: 'Most Popular',
        tagColor: '#890117',
        tests: 50,
        popular: true,
        features: [
          '50 Full-Length Mock Tests',
          'Detailed Solutions & Explanations',
          'Rank Among 25K+ Students',
          'Topic-wise Strength/Weakness Report',
          'Daily Current Affairs Quiz',
          'Previous Year Papers (10 Years)',
          'Live Test Discussion Sessions',
        ],
      },
      {
        id: 'complete',
        name: 'Complete BPSC',
        price: 999,
        originalPrice: 2499,
        tag: 'Best Value',
        tagColor: '#400675',
        tests: 120,
        best: true,
        features: [
          'Everything in Prelims Pro',
          '120 Tests (Prelims + Mains + CSAT)',
          'Mains Answer Writing Practice',
          'Personal Mentor Evaluation',
          'Interview Preparation Module',
          'Study Planner & Tracker',
          'Offline Download Support',
          '1-Year Validity',
        ],
      },
    ];

    discountPct(plan: TestPlan): number {
      if (!plan.originalPrice) return 0;
      return Math.round(
        ((plan.originalPrice - plan.price) / plan.originalPrice) * 100
      );
    }

}
