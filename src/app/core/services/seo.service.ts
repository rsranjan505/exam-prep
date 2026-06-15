import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private titleService: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private doc: Document
  ) { }

      updateMetaTags(config: {
        title: string;
        description: string;
        keywords?: string;
        image?: string;
        url?: string;
      }) {
        const {
          title,
          description,
          keywords = '',
          image = 'https://www.knowledgenation.in/assets/logo.png',
          url = this.doc.URL,
        } = config;

        this.titleService.setTitle(title);

        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ name: 'keywords', content: keywords });
        this.meta.updateTag({ name: 'robots', content: 'index, follow' });
        this.meta.updateTag({ name: 'author', content: 'Knowledge Nation' });

        // Open Graph
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:image', content: image });
        this.meta.updateTag({ property: 'og:url', content: url });
        this.meta.updateTag({ property: 'og:type', content: 'website' });

        // Twitter
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: title });
        this.meta.updateTag({ name: 'twitter:description', content: description });
        this.meta.updateTag({ name: 'twitter:image', content: image });

        // Canonical link
        const link: HTMLLinkElement = this.doc.querySelector("link[rel='canonical']") || this.doc.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', url);
        if (!link.parentNode) {
          this.doc.head.appendChild(link);
        }
      }

      addJsonLd(json: object) {
        const script = this.doc.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(json);
        this.doc.head.appendChild(script);
      }
}
