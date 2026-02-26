import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';

export interface Slide {
  badge: string;
  title: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  cta1: string;
  cta2: string;
  icon: string;
  visualLabel: string;
  visualSub: string;
  stats: { num: string; label: string }[];
  gradientFrom: string;
  gradientTo: string;
  bgImage: string;
}

@Component({
  selector: 'app-hero-section',
  imports: [],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  currentIndex = signal(0);
  isAnimating = signal(false);
  progressKey = signal(0); // bump to restart CSS animation

  readonly navItems = [
    { label: 'Home', active: true, dropdown: false },
    { label: 'About', active: false, dropdown: false },
    { label: 'Study Materials', active: false, dropdown: true },
    { label: 'Online Support', active: false, dropdown: false },
    { label: 'Test Series', active: false, dropdown: true },
    { label: 'Gallery', active: false, dropdown: false },
  ];

  readonly slides: Slide[] = [
    {
      badge: '🎯 BPSC | UPSC | SSC | Banking',
      title: 'Your ',
      titleHighlight: 'Success',
      titleSuffix: ' Journey Starts Here',
      description:
        'Expert faculty, proven strategies, and a track record of 10,000+ selections. Join Knowledge Nation and transform your career today.',
      cta1: 'Explore Courses',
      cta2: 'Watch Demo →',
      icon: '🎓',
      visualLabel: 'BPSC Batch 2025',
      visualSub: 'Seats filling fast!',
      stats: [
        { num: '10K+', label: 'Selections' },
        { num: '50+', label: 'Expert Faculty' },
        { num: '15+', label: 'Years Exp.' },
      ],
      gradientFrom: '#3f043e',
      gradientTo: '#400675',
      bgImage:
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80',
    },
    {
      badge: '📚 New Batch Starting Soon',
      title: 'Learn Smarter, ',
      titleHighlight: 'Rank Higher',
      titleSuffix: '',
      description:
        'Structured study plans, live doubt sessions, and comprehensive test series designed to crack competitive exams on your first attempt.',
      cta1: 'Join Free Demo',
      cta2: 'View Schedule',
      icon: '📖',
      visualLabel: 'Live Classes Daily',
      visualSub: 'Online & Offline mode',
      stats: [
        { num: '500+', label: 'Video Lectures' },
        { num: '200+', label: 'Mock Tests' },
        { num: '24/7', label: 'Support' },
      ],
      gradientFrom: '#410040',
      gradientTo: '#890117',
      bgImage:
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&q=80',
    },
    {
      badge: "🏆 Toppers' Choice Institute",
      title: "Bihar's Most ",
      titleHighlight: 'Trusted',
      titleSuffix: ' Coaching Center',
      description:
        'From Patna to every district, Knowledge Nation is the #1 coaching platform for Bihar competitive exam aspirants seeking government jobs.',
      cta1: 'Our Results',
      cta2: 'Meet Faculty',
      icon: '🏅',
      visualLabel: 'State Toppers',
      visualSub: 'From Knowledge Nation',
      stats: [
        { num: '#1', label: 'In Bihar' },
        { num: '98%', label: 'Satisfaction' },
        { num: '25K+', label: 'Students' },
      ],
      gradientFrom: '#890117',
      gradientTo: '#3f043e',
      bgImage:
        'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1600&q=80',
    },
    {
      badge: '💻 Online + Offline Hybrid',
      title: 'Study Anytime, ',
      titleHighlight: 'Anywhere',
      titleSuffix: ' with Us',
      description:
        'Access recorded lectures, PDF notes, and daily current affairs on our app. Never miss a class — learn at your pace and own your success.',
      cta1: 'Download App',
      cta2: 'Know More',
      icon: '📱',
      visualLabel: 'KN Mobile App',
      visualSub: 'Available on iOS & Android',
      stats: [
        { num: '4.9★', label: 'App Rating' },
        { num: '1M+', label: 'Downloads' },
        { num: 'Free', label: 'Trial Available' },
      ],
      gradientFrom: '#400675',
      gradientTo: '#410040',
      bgImage:
        'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1600&q=80',
    },
  ];

  currentSlide = computed(() => this.slides[this.currentIndex()]);

  private autoPlayInterval: ReturnType<typeof setInterval> | null = null;
  private readonly INTERVAL_MS = 5000;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy(): void {
    this.clearAutoPlay();
  }

  goTo(index: number): void {
    if (this.isAnimating()) return;
    const next =
      ((index % this.slides.length) + this.slides.length) % this.slides.length;
    if (next === this.currentIndex()) return;

    this.isAnimating.set(true);
    this.currentIndex.set(next);
    this.progressKey.update((k) => k + 1);

    setTimeout(() => this.isAnimating.set(false), 700);
    this.resetAutoPlay();
  }

  prev(): void {
    this.goTo(this.currentIndex() - 1);
  }
  next(): void {
    this.goTo(this.currentIndex() + 1);
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (e.key === 'ArrowLeft') this.prev();
    if (e.key === 'ArrowRight') this.next();
  }

  // Touch swipe
  private touchStartX = 0;
  onTouchStart(e: TouchEvent): void {
    this.touchStartX = e.touches[0].clientX;
  }
  onTouchEnd(e: TouchEvent): void {
    const diff = this.touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50)
      this.goTo(this.currentIndex() + (diff > 0 ? 1 : -1));
  }

  private startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => this.next(), this.INTERVAL_MS);
  }
  private clearAutoPlay(): void {
    if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
  }
  private resetAutoPlay(): void {
    this.clearAutoPlay();
    this.startAutoPlay();
  }

  trackByIndex(index: number): number {
    return index;
  }
}
