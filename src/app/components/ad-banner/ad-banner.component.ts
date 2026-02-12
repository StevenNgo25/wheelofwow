import { Component, Input, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdsService } from '../../services/ads.service';

@Component({
  selector: 'app-ad-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ad-banner.component.html',
  styleUrl: './ad-banner.component.scss',
})
export class AdBannerComponent {
  @Input() slotName: string = ''; // e.g. 'home_banner', 'sidebar_left'
  @Input() position: 'fixed-bottom' | 'sidebar-left' | 'sidebar-right' | 'inline' = 'inline';

  private adsService = inject(AdsService);

  isVisible = signal(false);
  adSlotId = signal('');
  clientId = signal('');

  constructor() {
    effect(
      () => {
        const config = this.adsService.config();
        // Reactive check: whenever config or isAdsEnabled changes, this runs.
        if (this.adsService.isAdsEnabled()) {
          const slotId = config.slots?.[this.slotName];

          if (config.enabled && config.client_id && slotId) {
            this.clientId.set(config.client_id);
            this.adSlotId.set(slotId);
            this.isVisible.set(true);
          }
        } else {
          this.isVisible.set(false);
        }
      },
      { allowSignalWrites: true },
    );

    // Initial push when visible
    effect(() => {
      if (this.isVisible()) {
        // Allow DOM to update
        setTimeout(() => {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (e) {
            console.error('Adsbygoogle error:', e);
          }
        });
      }
    });
  }

  closeAd() {
    this.isVisible.set(false);
  }
}
