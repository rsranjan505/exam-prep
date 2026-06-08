import { Component, inject } from '@angular/core';
import { JoinTest } from "../../components/join-test/join-test";
import { NgFor } from '@angular/common';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-about',
  imports: [JoinTest, NgFor],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

    private seo = inject(SeoService);
  ngOnInit() {


    this.seo.updateMetaTags({
      title: 'About Us - Knowledge Nation',
      description: 'Learn about Knowledge Nation, our mission to empower aspirants with quality test series and resources for competitive exam success.',
      keywords: 'about knowledge nation,our mission,competitive exam preparation,online test series platform'
    });

     // Optional JSON-LD (LocalBusiness)
    this.seo.addJsonLd({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Knowledge Nation',
      url: 'https://www.knowledgenation.in/about',
      logo: 'https://www.knowledgenation.in/assets/logo.png',
      email: 'support@knowledgenation.in',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Patna, Bihar',
        addressCountry: 'India',
      },
      sameAs: [
        'https://www.facebook.com/knowledgenation',
        'https://www.instagram.com/knowledgenation',
      ],
    });
  }
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
