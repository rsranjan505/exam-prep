import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject, signal } from '@angular/core';

export interface Book {
  cover: string;
  title: string;
  author: string;
  price: number;
  originalPrice: number;
  tag: string;
  tagColor: string;
  rating: number;
  reviews: number;
}

export interface Tip {
  icon: string;
  number: string;
  title: string;
  description: string;
  color: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  city: string;
  exam: string;
  avatar: string;
  stars: number;
  year: string;
}

@Component({
  selector: 'app-testimonials-section',
  imports: [],
  templateUrl: './testimonials-section.component.html',
  styleUrl: './testimonials-section.component.css',
})
export class TestimonialsSectionComponent {
  private platformId = inject(PLATFORM_ID);

  activeTestimonial = signal(0);
  private autoTimer: ReturnType<typeof setInterval> | null = null;

  readonly books: Book[] = [
    {
      cover:
        'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80',
      title: 'BPSC General Studies',
      author: 'Expert Faculty',
      price: 299,
      originalPrice: 499,
      tag: 'Best Seller',
      tagColor: '#890117',
      rating: 4.8,
      reviews: 1240,
    },
    {
      cover:
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80',
      title: 'Bihar History & Culture',
      author: 'Dr. Kumar',
      price: 199,
      originalPrice: 349,
      tag: 'New Edition',
      tagColor: '#400675',
      rating: 4.6,
      reviews: 876,
    },
    {
      cover:
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80',
      title: 'Indian Polity',
      author: 'M. Laxmikant',
      price: 349,
      originalPrice: 599,
      tag: 'Recommended',
      tagColor: '#3f043e',
      rating: 4.9,
      reviews: 3200,
    },
    {
      cover:
        'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80',
      title: 'Economy for BPSC',
      author: 'Ramesh Singh',
      price: 279,
      originalPrice: 450,
      tag: 'Popular',
      tagColor: '#890117',
      rating: 4.7,
      reviews: 1500,
    },
    {
      cover:
        'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80',
      title: 'Geography of Bihar',
      author: 'KN Faculty',
      price: 149,
      originalPrice: 299,
      tag: 'Exclusive',
      tagColor: '#400675',
      rating: 4.5,
      reviews: 620,
    },
  ];

  readonly tips: Tip[] = [
    {
      icon: '⏰',
      number: '01',
      title: 'Time Management',
      description:
        'Plan your daily study schedule and stick to it for consistent progress. Allocate dedicated time blocks for each subject.',
      color: '#890117',
    },
    {
      icon: '📝',
      number: '02',
      title: 'Practice Tests',
      description:
        'Attempt daily mock tests to analyze your strengths and weaknesses. Review every wrong answer with detailed explanations.',
      color: '#400675',
    },
    {
      icon: '🔁',
      number: '03',
      title: 'Regular Revision',
      description:
        'Regularly revise important topics using the spaced repetition technique to retain information effectively.',
      color: '#3f043e',
    },
    {
      icon: '📰',
      number: '04',
      title: 'Current Affairs',
      description:
        'Read Bihar and national news daily. Focus on government schemes, appointments, and economic updates.',
      color: '#890117',
    },
    {
      icon: '🧘',
      number: '05',
      title: 'Stay Consistent',
      description:
        'Consistency beats intensity. Study 6–8 hours daily with short breaks to keep your mind fresh and focused.',
      color: '#400675',
    },
    {
      icon: '🤝',
      number: '06',
      title: 'Peer Learning',
      description:
        'Join study groups and discuss topics with peers. Teaching others is the fastest way to solidify your knowledge.',
      color: '#3f043e',
    },
  ];

  readonly testimonials: Testimonial[] = [
    {
      quote:
        'Knowledge Nation completely transformed my preparation. The faculty guidance and mock tests were exactly what I needed to clear BPSC on my first attempt.',
      name: 'Anjali S.',
      city: 'Patna',
      exam: 'BPSC 68th',
      avatar: 'AS',
      stars: 5,
      year: '2024',
    },
    {
      quote:
        'The mock tests were very close to the actual exam pattern. The detailed solutions helped me understand where I was going wrong. Highly recommend!',
      name: 'Ravi K.',
      city: 'Gaya',
      exam: 'BPSC 67th',
      avatar: 'RK',
      stars: 5,
      year: '2024',
    },
    {
      quote:
        'Affordable books and expert guidance made my preparation easy. I scored in the top 5% of my batch. The current affairs section is outstanding.',
      name: 'Priya M.',
      city: 'Bhagalpur',
      exam: 'UPPSC',
      avatar: 'PM',
      stars: 5,
      year: '2023',
    },
    {
      quote:
        'Live classes with doubt clearing sessions saved me so much time. The faculty is approachable and explains even complex topics in simple language.',
      name: 'Suresh T.',
      city: 'Muzaffarpur',
      exam: 'SSC CGL',
      avatar: 'ST',
      stars: 5,
      year: '2024',
    },
    {
      quote:
        'I had failed twice before joining Knowledge Nation. Their strategy sessions and personalized guidance helped me finally crack BPSC mains.',
      name: 'Meena R.',
      city: 'Darbhanga',
      exam: 'BPSC 68th',
      avatar: 'MR',
      stars: 5,
      year: '2024',
    },
  ];

  get starsArray() {
    return Array(5).fill(0);
  }

  discountPercent(book: Book): number {
    return Math.round(
      ((book.originalPrice - book.price) / book.originalPrice) * 100
    );
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.autoTimer = setInterval(() => {
        this.activeTestimonial.update(
          (i) => (i + 1) % this.testimonials.length
        );
      }, 4000);
    }
  }

  ngOnDestroy(): void {
    if (this.autoTimer) clearInterval(this.autoTimer);
  }

  goToTestimonial(i: number): void {
    this.activeTestimonial.set(i);
    if (this.autoTimer) {
      clearInterval(this.autoTimer);
      this.autoTimer = setInterval(
        () =>
          this.activeTestimonial.update(
            (j) => (j + 1) % this.testimonials.length
          ),
        4000
      );
    }
  }

  trackByIndex(i: number): number {
    return i;
  }
}
