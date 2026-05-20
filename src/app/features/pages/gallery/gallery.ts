import { Component, computed, signal } from '@angular/core';
import { JoinTest } from '../../components/join-test/join-test';

export type GalleryCategory =
  | 'All'
  | 'Classrooms'
  | 'Events'
  | 'Results'
  | 'Campus'
  | 'Faculty';

export interface GalleryItem {
  id: number;
  src: string;
  thumb: string;
  title: string;
  category: GalleryCategory;
  date: string;
  likes: number;
  span?: 'wide' | 'tall' | 'normal';
}

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {
  activeCategory = signal<GalleryCategory>('All');
  lightboxItem = signal<GalleryItem | null>(null);
  likedItems = signal<Set<number>>(new Set());
  searchQuery = signal('');

  readonly categories: GalleryCategory[] = [
    'All',
    'Classrooms',
    'Events',
    'Results',
    'Campus',
    'Faculty',
  ];

  readonly items: GalleryItem[] = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=85',
      thumb:
        'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
      title: 'BPSC Batch 2024 — Main Hall',
      category: 'Classrooms',
      date: 'Jan 2024',
      likes: 248,
      span: 'wide',
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200&q=85',
      thumb:
        'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=600&q=80',
      title: 'Annual Topper Felicitation 2024',
      category: 'Events',
      date: 'Mar 2024',
      likes: 512,
      span: 'tall',
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200&q=85',
      thumb:
        'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=80',
      title: 'Evening Study Session — Patna',
      category: 'Classrooms',
      date: 'Feb 2024',
      likes: 184,
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=85',
      thumb:
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
      title: 'BPSC 68th Result Celebration',
      category: 'Results',
      date: 'Nov 2023',
      likes: 731,
      span: 'wide',
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=85',
      thumb:
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
      title: 'Faculty Orientation — 2024',
      category: 'Faculty',
      date: 'Jan 2024',
      likes: 196,
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=85',
      thumb:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
      title: 'KN Campus — Patna Main Centre',
      category: 'Campus',
      date: 'Dec 2023',
      likes: 320,
      span: 'tall',
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=85',
      thumb:
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80',
      title: 'Students in Digital Library',
      category: 'Classrooms',
      date: 'Mar 2024',
      likes: 267,
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=85',
      thumb:
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
      title: 'Alumni Meet — Gaya Centre',
      category: 'Events',
      date: 'Feb 2024',
      likes: 445,
      span: 'wide',
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=85',
      thumb:
        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80',
      title: 'Dr. Rajiv Sharma — Master Class',
      category: 'Faculty',
      date: 'Jan 2024',
      likes: 389,
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=85',
      thumb:
        'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80',
      title: 'Library & Self-Study Zone',
      category: 'Campus',
      date: 'Dec 2023',
      likes: 211,
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200&q=85',
      thumb:
        'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&q=80',
      title: 'BPSC 67th Toppers — 2023',
      category: 'Results',
      date: 'Aug 2023',
      likes: 892,
      span: 'tall',
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&q=85',
      thumb:
        'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80',
      title: 'Study Group — Evening Batch',
      category: 'Classrooms',
      date: 'Mar 2024',
      likes: 156,
    },
    {
      id: 13,
      src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=85',
      thumb:
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80',
      title: 'Convocation 2023 — KN Stage',
      category: 'Events',
      date: 'Oct 2023',
      likes: 634,
      span: 'wide',
    },
    {
      id: 14,
      src: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1200&q=85',
      thumb:
        'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&q=80',
      title: 'Faculty Research Session',
      category: 'Faculty',
      date: 'Feb 2024',
      likes: 178,
    },
    {
      id: 15,
      src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=85',
      thumb:
        'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
      title: 'Computer Lab — Digital Tests',
      category: 'Campus',
      date: 'Jan 2024',
      likes: 292,
    },
  ];

  filteredItems = computed(() => {
    const cat = this.activeCategory();
    const q = this.searchQuery().toLowerCase();
    let list =
      cat === 'All'
        ? [...this.items]
        : this.items.filter((i) => i.category === cat);
    if (q)
      list = list.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q)
      );
    return list;
  });

  totalLikes = computed(() => this.items.reduce((s, i) => s + i.likes, 0));

  openLightbox(item: GalleryItem): void {
    this.lightboxItem.set(item);
  }
  closeLightbox(): void {
    this.lightboxItem.set(null);
  }

  navigateLightbox(dir: 1 | -1): void {
    const current = this.lightboxItem();
    if (!current) return;
    const list = this.filteredItems();
    const idx = list.findIndex((i) => i.id === current.id);
    const next = list[(idx + dir + list.length) % list.length];
    this.lightboxItem.set(next);
  }

  toggleLike(id: number, e: Event): void {
    e.stopPropagation();
    this.likedItems.update((s) => {
      const ns = new Set(s);
      ns.has(id) ? ns.delete(id) : ns.add(id);
      return ns;
    });
  }

  itemLikes(item: GalleryItem): number {
    return item.likes + (this.likedItems().has(item.id) ? 1 : 0);
  }

  trackById(i: number, item: GalleryItem): number {
    return item.id;
  }

  // Stats row
  stats = computed(() => [
    { val: this.items.length + '+', label: 'Photos' },
    { val: Math.floor(this.totalLikes() / 1000) + 'K+', label: 'Likes' },
    { val: '5', label: 'Categories' },
    { val: '6', label: 'Centres' },
  ]);

  // Category counts
  categoryCounts = computed(() => {
    const map: Record<string, number> = {};
    for (const cat of this.categories) {
      if (cat === 'All') continue;
      map[cat] = this.items.filter((i) => i.category === cat).length;
    }
    return map;
  });

  // Showcase categories
  showcaseCategories = computed(() => [
    {
      name: 'Classrooms',
      icon: '🏫',
      color: '#890117',
      count: this.categoryCounts()['Classrooms'],
    },
    {
      name: 'Events',
      icon: '🎉',
      color: '#400675',
      count: this.categoryCounts()['Events'],
    },
    {
      name: 'Results',
      icon: '🏆',
      color: '#3f043e',
      count: this.categoryCounts()['Results'],
    },
    {
      name: 'Campus',
      icon: '🏛️',
      color: '#890117',
      count: this.categoryCounts()['Campus'],
    },
    {
      name: 'Faculty',
      icon: '👨‍🏫',
      color: '#400675',
      count: this.categoryCounts()['Faculty'],
    },
  ]);

  // Lightbox index
  lightboxIndex = computed(() => {
    const current = this.lightboxItem();
    if (!current) return 0;
    return this.filteredItems().findIndex((i) => i.id === current.id) + 1;
  });

  // Safe scroll method
  scrollToTopSection() {
    window.scrollTo({ top: 300, behavior: 'smooth' });
  }
}
