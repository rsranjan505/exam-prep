import { Component } from '@angular/core';
import { JoinTest } from '../../components/join-test/join-test';
export interface TeamMember {
  name: string;
  role: string;
  subject: string;
  experience: string;
  avatar: string;
  color: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface Value {
  icon: string;
  title: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  readonly stats = [
    { num: '2009', label: 'Est. Year', icon: '🏛️' },
    { num: '10K+', label: 'Selections', icon: '🎓' },
    { num: '25K+', label: 'Active Students', icon: '👨‍🎓' },
    { num: '50+', label: 'Expert Faculty', icon: '👨‍🏫' },
    { num: '98%', label: 'Satisfaction', icon: '⭐' },
    { num: '15+', label: 'Years of Legacy', icon: '🏆' },
  ];

  readonly milestones: Milestone[] = [
    {
      year: '2009',
      title: 'Foundation of Knowledge Nation',
      description:
        "Started in a small classroom in Patna with 30 students and a dream to democratize quality education for Bihar's competitive exam aspirants.",
    },
    {
      year: '2013',
      title: 'First 1000 Selections',
      description:
        "Achieved a landmark of 1,000 BPSC selections, establishing Knowledge Nation as Bihar's most trusted coaching brand.",
    },
    {
      year: '2016',
      title: 'Digital Learning Platform Launch',
      description:
        'Launched our online learning portal bringing recorded lectures, mock tests, and PDF notes to students across Bihar and beyond.',
    },
    {
      year: '2019',
      title: 'Expanded to 5 Cities',
      description:
        'Opened new centers in Gaya, Muzaffarpur, Bhagalpur, and Darbhanga — making quality education accessible to every corner of Bihar.',
    },
    {
      year: '2022',
      title: 'Knowledge Nation Mobile App',
      description:
        'Launched our flagship mobile app with 1M+ downloads, live classes, daily quizzes, and AI-powered performance analytics.',
    },
    {
      year: '2024',
      title: '10,000+ Selections Milestone',
      description:
        'Crossed the landmark of 10,000 total selections in BPSC, UPSC, SSC, Banking and Railway exams — a testament to our proven methodology.',
    },
  ];

  readonly team: TeamMember[] = [
    {
      name: 'Dr. Rajiv Sharma',
      role: 'Founder & Director',
      subject: 'History & Polity',
      experience: '20+ Years',
      avatar: 'RS',
      color: '#890117',
    },
    {
      name: 'Prof. Sunita Verma',
      role: 'Academic Head',
      subject: 'Geography & Environment',
      experience: '15+ Years',
      avatar: 'SV',
      color: '#400675',
    },
    {
      name: 'Amit Kumar IAS',
      role: 'Strategy Mentor',
      subject: 'GS & Essay Writing',
      experience: 'BPSC Topper',
      avatar: 'AK',
      color: '#3f043e',
    },
    {
      name: 'Neha Singh',
      role: 'CSAT Expert',
      subject: 'Reasoning & Aptitude',
      experience: '12+ Years',
      avatar: 'NS',
      color: '#890117',
    },
    {
      name: 'Dr. Manoj Tiwari',
      role: 'Economics Faculty',
      subject: 'Economy & Finance',
      experience: '18+ Years',
      avatar: 'MT',
      color: '#400675',
    },
    {
      name: 'Priya Das',
      role: 'Current Affairs Head',
      subject: 'Bihar & National Affairs',
      experience: '10+ Years',
      avatar: 'PD',
      color: '#3f043e',
    },
  ];

  readonly values: Value[] = [
    {
      icon: '🎯',
      title: 'Student-First Approach',
      description:
        'Every decision we make puts student success at the center. Affordable fees, flexible timings, and personalized mentoring.',
      color: '#890117',
    },
    {
      icon: '🔬',
      title: 'Research-Driven Content',
      description:
        'Our content team tracks every BPSC notification and syllabus change. You always study the most relevant material.',
      color: '#400675',
    },
    {
      icon: '🌐',
      title: 'Inclusive Education',
      description:
        'From urban Patna to rural Bihar — we believe every aspirant deserves world-class coaching regardless of background.',
      color: '#3f043e',
    },
    {
      icon: '🤝',
      title: 'Lifelong Mentorship',
      description:
        "Our relationship with students doesn't end at selection. We mentor our alumni through their careers in public service.",
      color: '#890117',
    },
  ];

  trackByIndex(i: number): number {
    return i;
  }
}
