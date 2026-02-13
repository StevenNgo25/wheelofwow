import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private translation = inject(TranslationService);
  private document = inject(DOCUMENT);

  updateMetaTags() {
    const t = this.translation.t();
    const lang = this.translation.currentLang();
    const baseUrl = 'https://wheelofwow.vercel.app';

    // Update HTML lang
    this.document.documentElement.lang = lang;

    const title = `${t.appTitle} - ${lang === 'vi' ? 'Quay Số Trúng Thưởng Online' : 'Online Lucky Draw System'}`;
    const description = t.seoDescription;
    const keywords = t.seoKeywords;

    this.titleService.setTitle(title);

    // Standard Meta Tags
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'keywords', content: keywords });

    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:url', content: `${baseUrl}/${lang}/` });
    this.metaService.updateTag({
      property: 'og:locale',
      content: lang === 'vi' ? 'vi_VN' : 'en_US',
    });

    // Twitter
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });

    // Canonical & Hreflang
    this.updateLink('canonical', `${baseUrl}/${lang}/`);
    this.updateLink('alternate', `${baseUrl}/vi/`, 'vi');
    this.updateLink('alternate', `${baseUrl}/en/`, 'en');
  }

  setJsonLd(data: any) {
    let script = this.document.querySelector("script[type='application/ld+json']");
    if (!script) {
      script = this.document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }

  private updateLink(rel: string, href: string, hreflang?: string) {
    const selector = `link[rel='${rel}']${hreflang ? `[hreflang='${hreflang}']` : ':not([hreflang])'}`;
    let link: HTMLLinkElement | null = this.document.querySelector(selector);

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', rel);
      if (hreflang) link.setAttribute('hreflang', hreflang);
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }
}
