import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from "../../../../../node_modules/@angular/common/common_module.d-NEF7UaHr";
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-contact',
  imports: [RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.updateMetaTags({
      title: 'Contact Us - Knowledge Nation',
      description: 'Get in touch with Knowledge Nation for support, inquiries, or feedback. We are here to assist you with your competitive exam preparation journey.',
      keywords: 'contact knowledge nation,support,customer service,inquiries,feedback,competitive exam preparation'
    });

     // Optional JSON-LD (LocalBusiness)
    this.seo.addJsonLd({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Knowledge Nation',
      url: 'https://www.knowledgenation.in/contact',
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
}
