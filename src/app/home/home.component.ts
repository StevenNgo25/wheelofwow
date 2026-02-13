import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuckyDrawService } from '../services/lucky-draw.service';
import { SeoService } from '../services/seo.service';
import { TranslationService } from '../services/translation.service';
import { DrawArea } from '../components/draw-area/draw-area';
import { WinnersList } from '../components/winners-list/winners-list';
import { ParticipantInput } from '../components/participant-input/participant-input';
import { SettingsPanel } from '../components/settings-panel/settings-panel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DrawArea, WinnersList, ParticipantInput, SettingsPanel],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected readonly luckyDraw = inject(LuckyDrawService);
  private seoService = inject(SeoService);
  private translation = inject(TranslationService);

  constructor() {
    this.updateSchema();
  }

  updateSchema() {
    const t = this.translation.t();
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name:
        t.appTitle +
        ' - ' +
        (this.translation.currentLang() === 'vi'
          ? 'Quay Số Trúng Thưởng Online'
          : 'Online Lucky Draw System'),
      url: 'https://wheelofwow.vercel.app/',
      description: t.seoDescription,
      applicationCategory: 'Utility',
      operatingSystem: 'All',
      author: {
        '@type': 'Organization',
        name: 'Lucky Draw Team',
      },
    };
    this.seoService.setJsonLd(schema);
  }
}
