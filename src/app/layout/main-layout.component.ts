import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import { AdBannerComponent } from '../components/ad-banner/ad-banner.component';
import { TranslationService } from '../services/translation.service';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, AdBannerComponent],
  template: `
    <app-ad-banner slotName="sidebar_left" position="sidebar-left"></app-ad-banner>
    <app-ad-banner slotName="sidebar_right" position="sidebar-right"></app-ad-banner>

    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>

    <app-ad-banner slotName="footer" position="fixed-bottom"></app-ad-banner>
  `,
})
export class MainLayoutComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private translationService = inject(TranslationService);
  private seoService = inject(SeoService);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const lang = params['lang'];
      if (lang === 'vi' || lang === 'en') {
        this.translationService.currentLang.set(lang);
        this.seoService.updateMetaTags();
      }
    });
  }
}
