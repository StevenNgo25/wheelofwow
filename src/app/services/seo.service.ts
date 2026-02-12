import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private translation = inject(TranslationService);

  updateMetaTags() {
    const t = this.translation.t();
    const title = `${t.appTitle} - Quay Số Trúng Thưởng Online`;
    const description = t.seoDescription;
    const keywords = t.seoKeywords;

    this.titleService.setTitle(title);

    // Standard Meta Tags
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'keywords', content: keywords });

    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    
    // Twitter
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
  }
}
