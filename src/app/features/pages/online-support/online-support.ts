import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface FAQ {
  category: string;
  question: string;
  answer: string;
}

export interface SupportChannel {
  icon: string;
  title: string;
  description: string;
  action: string;
  link: string;
  color: string;
  badge?: string;
}

export interface Mentor {
  name: string;
  subject: string;
  avatar: string;
  color: string;
  available: boolean;
  rating: number;
  sessions: number;
}
export type FAQCategory =
  | 'All'
  | 'Admission'
  | 'Tests'
  | 'Payment'
  | 'Technical'
  | 'Courses';

@Component({
  selector: 'app-online-support',
  imports: [],
  templateUrl: './online-support.html',
  styleUrl: './online-support.css',
})
export class OnlineSupport {
  activeFaqCat   = signal<FAQCategory>('All');
  openFaq        = signal<number | null>(null);
  ticketSent     = signal(false);
  chatOpen       = signal(false);
  chatMessages   = signal<{ from: 'user' | 'bot'; text: string }[]>([
    { from: 'bot', text: '👋 Hello! I\'m KN Support Bot. How can I help you today?' },
  ]);
  chatInput      = signal('');

  readonly faqCategories: FAQCategory[] = ['All','Admission','Tests','Payment','Technical','Courses'];

  readonly supportChannels: SupportChannel[] = [
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Instant answers from our support team. Available 9 AM – 9 PM every day.',
      action: 'Start Chat',
      link: '#chat',
      color: '#890117',
      badge: 'Online Now',
    },
    {
      icon: '📞',
      title: 'Call Us',
      description: 'Speak directly with a counsellor. Toll-free and available on all networks.',
      action: '1800-123-4567',
      link: 'tel:18001234567',
      color: '#400675',
    },
    {
      icon: '📧',
      title: 'Email Support',
      description: 'Send us a detailed query and we\'ll reply within 24 hours on working days.',
      action: 'support@knation.in',
      link: 'mailto:support@knation.in',
      color: '#3f043e',
    },
    {
      icon: '📱',
      title: 'WhatsApp',
      description: 'Message us on WhatsApp for quick updates, study tips, and doubt clearing.',
      action: 'Chat on WhatsApp',
      link: 'https://wa.me/919876543210',
      color: '#1a7a2e',
      badge: 'Fastest',
    },
  ];

  readonly mentors: Mentor[] = [
    { name: 'Dr. Rajiv Sharma', subject: 'History & GS',       avatar: 'RS', color: '#890117', available: true,  rating: 4.9, sessions: 1240 },
    { name: 'Prof. Sunita Verma', subject: 'Geography',         avatar: 'SV', color: '#400675', available: true,  rating: 4.8, sessions: 980  },
    { name: 'Amit Kumar IAS',   subject: 'Essay & GS Mains',   avatar: 'AK', color: '#3f043e', available: false, rating: 4.9, sessions: 760  },
    { name: 'Neha Singh',       subject: 'CSAT & Reasoning',   avatar: 'NS', color: '#890117', available: true,  rating: 4.7, sessions: 1100 },
    { name: 'Dr. Manoj Tiwari', subject: 'Economy',            avatar: 'MT', color: '#400675', available: false, rating: 4.8, sessions: 850  },
    { name: 'Priya Das',        subject: 'Current Affairs',    avatar: 'PD', color: '#3f043e', available: true,  rating: 4.6, sessions: 920  },
  ];

  readonly faqs: FAQ[] = [
    { category: 'Admission', question: 'How do I enroll in a BPSC course at Knowledge Nation?', answer: 'You can enroll online by visiting our Study Materials page, selecting your desired course, and completing the payment. You will receive instant access to digital content and a confirmation email with your login credentials.' },
    { category: 'Admission', question: 'Do you offer offline coaching along with online?', answer: 'Yes! We have physical centers in Patna, Gaya, Muzaffarpur, Bhagalpur, and Darbhanga. You can attend offline batches or combine them with our online platform for a hybrid learning experience.' },
    { category: 'Admission', question: 'Is there a demo class available before enrolling?', answer: 'Absolutely. We offer free demo classes for all our courses. Simply register on our website, select "Try Free Demo" and attend a live class before making any payment decision.' },
    { category: 'Tests', question: 'Are the mock tests based on the latest BPSC syllabus?', answer: 'Yes, all our tests are updated immediately after every official BPSC notification. Our content team tracks every syllabus change and exam pattern update to ensure you always practice the most relevant questions.' },
    { category: 'Tests', question: 'Can I reattempt a test after submitting it?', answer: 'Yes, you can reattempt any test as many times as you wish within your plan validity. Each attempt generates a fresh score and ranking so you can track your improvement over time.' },
    { category: 'Tests', question: 'How is the rank calculated after each test?', answer: 'Your rank is calculated in real-time against all students who attempted the same test on Knowledge Nation. You\'ll see your percentile, subject-wise performance breakdown, and comparison against top performers.' },
    { category: 'Tests', question: 'Are the tests available in Hindi medium?', answer: 'Yes! All our tests are bilingual — available in both Hindi and English. You can switch your preferred language from the test settings before starting any test. Hindi-medium students are our primary audience.' },
    { category: 'Payment', question: 'What payment methods are accepted?', answer: 'We accept UPI (Google Pay, PhonePe, Paytm), Debit/Credit cards, Net Banking, and Cash on Delivery for physical books. All online transactions are secured with 256-bit SSL encryption via Razorpay.' },
    { category: 'Payment', question: 'Is there a refund policy?', answer: 'Yes. We offer a 7-day no-questions-asked refund on all digital subscriptions. For physical books, you can return within 7 days of delivery if the item is unused and in original condition. Refunds are processed in 5–7 working days.' },
    { category: 'Payment', question: 'Are there any EMI options available?', answer: 'EMI options are available for purchases above ₹999 through select credit cards and Buy Now Pay Later options like ZestMoney and LazyPay. You will see the EMI option at checkout if it is available for your card.' },
    { category: 'Technical', question: 'I cannot log in to my account. What should I do?', answer: 'Try resetting your password using the "Forgot Password" option on the login page. If you still face issues, clear your browser cache and try a different browser. Contact our support at support@knation.in with your registered email if the problem persists.' },
    { category: 'Technical', question: 'The test is not loading properly. How do I fix this?', answer: 'Ensure you have a stable internet connection with at least 1 Mbps speed. Disable any browser extensions or ad-blockers that may interfere. Try Chrome or Firefox for the best experience. If the issue continues, contact us on WhatsApp for immediate help.' },
    { category: 'Technical', question: 'How do I download PDF study materials after purchase?', answer: 'After purchasing a digital PDF, go to My Account → My Orders → Download. All your purchased digital content is available here indefinitely. You can also access it via the Knowledge Nation mobile app (iOS and Android).' },
    { category: 'Courses', question: 'What courses does Knowledge Nation offer?', answer: 'We offer preparation courses for BPSC (Prelims & Mains), UPSC Civil Services, SSC CGL/CHSL/MTS, IBPS PO/Clerk/SO, Bihar Police, Railway NTPC, and general English & Hindi communication courses. New courses are added regularly.' },
    { category: 'Courses', question: 'How long is the course validity?', answer: 'Course validity varies by plan: Basic (free) is lifetime, Prelims Pro is 6 months, and our Complete BPSC plan is 1 year. During validity, you get access to all new content, live classes, and tests added to your plan.' },
  ];

  filteredFaqs = () => {
    const cat = this.activeFaqCat();
    return cat === 'All' ? this.faqs : this.faqs.filter(f => f.category === cat);
  };

  toggleFaq(i: number): void {
    this.openFaq.update(v => v === i ? null : i);
  }

  openChat(): void {
    this.chatOpen.set(true);
  }

  sendChat(): void {
    const msg = this.chatInput().trim();
    if (!msg) return;
    this.chatMessages.update(m => [...m, { from: 'user', text: msg }]);
    this.chatInput.set('');
    setTimeout(() => {
      this.chatMessages.update(m => [...m, {
        from: 'bot',
        text: this.getBotReply(msg),
      }]);
    }, 800);
  }

  private getBotReply(msg: string): string {
    const l = msg.toLowerCase();
    if (l.includes('test') || l.includes('mock'))   return '📋 You can browse all our mock tests on the Test Series page. We have 120+ tests for BPSC, CSAT, and current affairs!';
    if (l.includes('fee') || l.includes('price') || l.includes('cost')) return '💳 Our plans start at ₹0 (Free). Prelims Pro is ₹499 and Complete BPSC is ₹999. Check the Test Series page for full details!';
    if (l.includes('book') || l.includes('material')) return '📚 We have a full catalog of books and PDFs on the Study Materials page. Best sellers include BPSC GS Guide, Bihar History, and Indian Polity!';
    if (l.includes('refund'))  return '↩️ We offer a 7-day refund policy. Email us at support@knation.in with your Order ID and we\'ll process your refund within 5–7 working days.';
    if (l.includes('hindi'))   return '🇮🇳 All our tests and most study materials are available in Hindi. You can switch language in the test settings!';
    return '🙏 Thank you for your question! Our support team will get back to you shortly. You can also call us at 1800-123-4567 or WhatsApp us for a faster response.';
  }

  submitTicket(e: Event): void {
    e.preventDefault();
    this.ticketSent.set(true);
  }

  trackByIndex(i: number): number { return i; }
}
