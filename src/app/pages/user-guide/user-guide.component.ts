import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { SeoService } from '../../services/seo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-guide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-guide.component.html',
  styleUrl: './user-guide.component.scss',
})
export class UserGuideComponent {
  protected readonly translation = inject(TranslationService);
  private seoService = inject(SeoService);

  constructor() {
    this.updateSchema();
  }

  updateSchema() {
    const t = this.translation.t();
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: t.guideTitle,
      step: [
        {
          '@type': 'HowToStep',
          name: t.guideStep1Title,
          text: t.guideStep1Desc,
          position: 1,
        },
        {
          '@type': 'HowToStep',
          name: t.guideStep2Title,
          text: t.guideStep2Desc,
          position: 2,
        },
        {
          '@type': 'HowToStep',
          name: t.guideStep3Title,
          text: t.guideStep3Desc,
          position: 3,
        },
        {
          '@type': 'HowToStep',
          name: t.guideStep4Title,
          text: t.guideStep4Desc,
          position: 4,
        },
        {
          '@type': 'HowToStep',
          name: t.guideStep5Title,
          text: t.guideStep5Desc,
          position: 5,
        },
      ],
    };
    this.seoService.setJsonLd(schema);
  }
}
