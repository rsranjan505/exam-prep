import { Component } from '@angular/core';
import { JoinTest } from "../../components/join-test/join-test";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [JoinTest, NgFor],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

    stats = [
    {
      number: '12K+',
      label: 'Active Students',
    },
    {
      number: '2K+',
      label: 'Selections',
    },
    {
      number: '500+',
      label: 'Mock Tests',
    },
    {
      number: '50+',
      label: 'Expert Mentors',
    },
  ];

  teamMembers = [
    {
      initials: 'RK',
      name: 'Dr. R. Kumar',
      role: 'General Studies Expert',
      description:
        'Specialized in General Studies preparation with years of experience guiding BPSC aspirants.',
    },
    {
      initials: 'SS',
      name: 'Prof. S. Singh',
      role: 'History & Polity',
      description:
        'Focused on Bihar history, Indian polity, and conceptual clarity for Mains answer writing.',
    },
    {
      initials: 'AV',
      name: 'Mr. A. Verma',
      role: 'Answer Writing Mentor',
      description:
        'Helps students improve answer structure, presentation, and scoring strategy for BPSC Mains.',
    },
  ];
}
