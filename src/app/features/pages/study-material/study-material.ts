import { Component, computed, signal } from '@angular/core';
import { CartserviceService } from '../../services/cartservice.service';
import { NgClass, NgFor } from '@angular/common';
import { JoinTest } from '../../components/join-test/join-test';

export type View = 'catalog' | 'cart' | 'checkout' | 'success';
export type Category = 'All' | 'BPSC' | 'UPSC' | 'SSC' | 'Banking' | 'Bihar GK';

export interface Book {
  id: number;
  title: string;
  author: string;
  category: Category;
  price: number;
  originalPrice: number;
  cover: string;
  tag: string;
  tagColor: string;
  rating: number;
  reviews: number;
  pages: number;
  language: string;
  edition: string;
  description: string;
  inStock: boolean;
  digital: boolean;
}

export interface CartItem {
  book: Book;
  qty: number;
  digital: boolean;
}

export interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  state: string;
  paymentMode: 'upi' | 'card' | 'cod';
  upiId: string;
}

@Component({
  selector: 'app-study-material',
  imports: [],
  templateUrl: './study-material.html',
  styleUrl: './study-material.css',
})
export class StudyMaterial {
  /* ─── View state ──────────────────────────────────── */
  currentView = signal<View>('catalog');
  activeCategory = signal<Category>('All');
  searchQuery = signal('');
  sortBy = signal<'popular' | 'price-low' | 'price-high' | 'newest'>('popular');
  wishlist = signal<Set<number>>(new Set());
  quickViewBook = signal<Book | null>(null);

  /* ─── Cart ────────────────────────────────────────── */
  cart = signal<CartItem[]>([]);

  /* ─── Checkout form ───────────────────────────────── */
  form = signal<CheckoutForm>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    state: '',
    paymentMode: 'upi',
    upiId: '',
  });
  formErrors = signal<Partial<Record<keyof CheckoutForm, string>>>({});
  orderPlaced = signal(false);
  orderId = signal('');

  /* ─── Data ────────────────────────────────────────── */
  readonly categories: Category[] = [
    'All',
    'BPSC',
    'UPSC',
    'SSC',
    'Banking',
    'Bihar GK',
  ];

  readonly books: Book[] = [
    {
      id: 1,
      title: 'BPSC General Studies Prelims',
      author: 'KN Expert Faculty',
      category: 'BPSC',
      price: 299,
      originalPrice: 599,
      cover:
        'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80',
      tag: 'Best Seller',
      tagColor: '#890117',
      rating: 4.8,
      reviews: 2140,
      pages: 680,
      language: 'Hindi/English',
      edition: '2024 Edition',
      inStock: true,
      digital: true,
      description:
        'Comprehensive GS guide covering all topics as per latest BPSC syllabus with previous year questions and model papers.',
    },
    {
      id: 2,
      title: 'Bihar History & Culture',
      author: 'Dr. Ramesh Kumar',
      category: 'Bihar GK',
      price: 199,
      originalPrice: 349,
      cover:
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80',
      tag: 'New Edition',
      tagColor: '#400675',
      rating: 4.6,
      reviews: 980,
      pages: 420,
      language: 'Hindi',
      edition: '2024 Edition',
      inStock: true,
      digital: true,
      description:
        'Detailed coverage of Bihar history from ancient to modern times with special focus on freedom movement and cultural heritage.',
    },
    {
      id: 3,
      title: 'Indian Polity by M. Laxmikant',
      author: 'M. Laxmikant',
      category: 'UPSC',
      price: 449,
      originalPrice: 799,
      cover:
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80',
      tag: 'Must Read',
      tagColor: '#3f043e',
      rating: 4.9,
      reviews: 5600,
      pages: 850,
      language: 'English',
      edition: '7th Edition',
      inStock: true,
      digital: false,
      description:
        'The definitive reference for Indian Polity — covers Constitution, Parliament, Judiciary and all governance topics in depth.',
    },
    {
      id: 4,
      title: 'Indian Economy for BPSC/UPSC',
      author: 'Ramesh Singh',
      category: 'BPSC',
      price: 379,
      originalPrice: 650,
      cover:
        'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80',
      tag: 'Popular',
      tagColor: '#890117',
      rating: 4.7,
      reviews: 1820,
      pages: 560,
      language: 'Hindi/English',
      edition: '2024 Edition',
      inStock: true,
      digital: true,
      description:
        'Covers Indian economy, Budget, Five Year Plans, agriculture, industry, and current economic developments for competitive exams.',
    },
    {
      id: 5,
      title: 'Geography of Bihar (Bhoogol)',
      author: 'KN Faculty Team',
      category: 'Bihar GK',
      price: 149,
      originalPrice: 299,
      cover:
        'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80',
      tag: 'Exclusive',
      tagColor: '#400675',
      rating: 4.5,
      reviews: 740,
      pages: 320,
      language: 'Hindi',
      edition: '2024 Edition',
      inStock: true,
      digital: true,
      description:
        'Physical, economic and human geography of Bihar with maps, rivers, districts, industries and demographic data.',
    },
    {
      id: 6,
      title: 'SSC CGL Complete Guide',
      author: 'Arihant Experts',
      category: 'SSC',
      price: 549,
      originalPrice: 899,
      cover:
        'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&q=80',
      tag: 'Trending',
      tagColor: '#890117',
      rating: 4.7,
      reviews: 3200,
      pages: 1100,
      language: 'Hindi/English',
      edition: '2024 Edition',
      inStock: true,
      digital: false,
      description:
        'All-in-one guide for SSC CGL covering Reasoning, English, Quantitative Aptitude and General Awareness with solved papers.',
    },
    {
      id: 7,
      title: 'IBPS PO/Clerk Bank Guide',
      author: 'S. N. Prasad',
      category: 'Banking',
      price: 399,
      originalPrice: 699,
      cover:
        'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&q=80',
      tag: 'New',
      tagColor: '#400675',
      rating: 4.5,
      reviews: 1560,
      pages: 780,
      language: 'Hindi/English',
      edition: '2024 Edition',
      inStock: true,
      digital: true,
      description:
        'Comprehensive preparation guide for IBPS PO and Clerk exams with practice sets, memory tricks and shortcuts.',
    },
    {
      id: 8,
      title: 'Current Affairs Annual 2024',
      author: 'KN Editorial Team',
      category: 'BPSC',
      price: 249,
      originalPrice: 399,
      cover:
        'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80',
      tag: 'Updated',
      tagColor: '#3f043e',
      rating: 4.8,
      reviews: 2900,
      pages: 480,
      language: 'Hindi/English',
      edition: 'Jan–Dec 2024',
      inStock: true,
      digital: true,
      description:
        'Complete annual current affairs covering national & international events, sports, awards, government schemes and Bihar-specific news.',
    },
    {
      id: 9,
      title: 'UPSC History — Ancient to Modern',
      author: 'Spectrum Team',
      category: 'UPSC',
      price: 499,
      originalPrice: 850,
      cover:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80',
      tag: 'Classic',
      tagColor: '#890117',
      rating: 4.9,
      reviews: 7100,
      pages: 920,
      language: 'English',
      edition: '2024 Edition',
      inStock: false,
      digital: true,
      description:
        'Covers Ancient, Medieval, and Modern Indian History comprehensively for UPSC Prelims and Mains with timeline notes.',
    },
  ];

  /* ─── Computed ────────────────────────────────────── */
  filteredBooks = computed(() => {
    let list = [...this.books];
    const cat = this.activeCategory();
    const q = this.searchQuery().toLowerCase();
    const sort = this.sortBy();

    if (cat !== 'All') list = list.filter((b) => b.category === cat);
    if (q)
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );

    if (sort === 'price-low') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') list.sort((a, b) => b.price - a.price);
    if (sort === 'newest') list.sort((a, b) => b.id - a.id);
    return list;
  });

  cartCount = computed(() => this.cart().reduce((s, i) => s + i.qty, 0));
  cartSubtotal = computed(() =>
    this.cart().reduce((s, i) => s + i.book.price * i.qty, 0)
  );
  cartSavings = computed(() =>
    this.cart().reduce(
      (s, i) => s + (i.book.originalPrice - i.book.price) * i.qty,
      0
    )
  );
  cartTax = computed(() => Math.round(this.cartSubtotal() * 0.05));
  cartShipping = computed(() =>
    this.hasPhysical() ? (this.cartSubtotal() >= 500 ? 0 : 49) : 0
  );
  cartTotal = computed(
    () => this.cartSubtotal() + this.cartTax() + this.cartShipping()
  );
  hasPhysical = computed(() => this.cart().some((i) => !i.digital));

  /* ─── Catalog actions ─────────────────────────────── */
  addToCart(book: Book, digital = false): void {
    this.cart.update((c) => {
      const existing = c.find(
        (i) => i.book.id === book.id && i.digital === digital
      );
      if (existing)
        return c.map((i) =>
          i.book.id === book.id && i.digital === digital
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      return [...c, { book, qty: 1, digital }];
    });
  }

  toggleWishlist(id: number): void {
    this.wishlist.update((s) => {
      const ns = new Set(s);
      ns.has(id) ? ns.delete(id) : ns.add(id);
      return ns;
    });
  }

  isInCart(id: number): boolean {
    return this.cart().some((i) => i.book.id === id);
  }

  /* ─── Cart actions ────────────────────────────────── */
  updateQty(bookId: number, digital: boolean, delta: number): void {
    this.cart.update((c) =>
      c
        .map((i) =>
          i.book.id === bookId && i.digital === digital
            ? { ...i, qty: Math.max(0, i.qty + delta) }
            : i
        )
        .filter((i) => i.qty > 0)
    );
  }

  removeItem(bookId: number, digital: boolean): void {
    this.cart.update((c) =>
      c.filter((i) => !(i.book.id === bookId && i.digital === digital))
    );
  }

  /* ─── Checkout ────────────────────────────────────── */
  updateForm(field: keyof CheckoutForm, value: string): void {
    this.form.update((f) => ({ ...f, [field]: value }));
    this.formErrors.update((e) => ({ ...e, [field]: '' }));
  }

  validateAndSubmit(): void {
    const f = this.form();
    const errors: Partial<Record<keyof CheckoutForm, string>> = {};

    if (!f.name.trim()) errors.name = 'Full name is required';
    if (!f.email.includes('@')) errors.email = 'Valid email required';
    if (f.phone.length < 10) errors.phone = 'Valid 10-digit phone required';
    if (f.paymentMode !== 'cod') {
      if (!f.address.trim()) errors.address = 'Delivery address required';
      if (f.pincode.length < 6)
        errors.pincode = 'Valid 6-digit pincode required';
    }
    if (f.paymentMode === 'upi' && !f.upiId.includes('@'))
      errors.upiId = 'Valid UPI ID required (e.g. name@upi)';

    if (Object.keys(errors).length) {
      this.formErrors.set(errors);
      return;
    }

    // Simulate order placement
    this.orderId.set('KN' + Date.now().toString().slice(-8));
    this.cart.set([]);
    this.currentView.set('success');
  }

  /* ─── Navigation ──────────────────────────────────── */
  goTo(view: View): void {
    this.currentView.set(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  discount(book: Book): number {
    return Math.round(
      ((book.originalPrice - book.price) / book.originalPrice) * 100
    );
  }

  starsArray = Array(5).fill(0);
  trackById(i: number, item: { id: number }): number {
    return item.id;
  }
  trackByIndex(i: number): number {
    return i;
  }
}
