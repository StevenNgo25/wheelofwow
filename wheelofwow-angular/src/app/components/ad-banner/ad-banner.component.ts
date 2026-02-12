import {
  Component,
  Input,
  OnInit,
  inject,
  signal,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdsService } from '../../services/ads.service';

@Component({
  selector: 'app-ad-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ad-banner.component.html',
  styleUrl: './ad-banner.component.scss',
})
export class AdBannerComponent implements OnInit, AfterViewInit {
  @Input() slotName: string = ''; // e.g. 'home_banner', 'sidebar_left'
  @Input() position: 'fixed-bottom' | 'sidebar-left' | 'sidebar-right' | 'inline' = 'inline';

  private adsService = inject(AdsService);

  isVisible = signal(false);
  adSlotId = signal('');
  clientId = signal('');

  ngOnInit() {
    // Check global ads enabled status
    if (!this.adsService.isAdsEnabled()) {
      this.isVisible.set(false);
      return;
    }

    const config = this.adsService.config();
    const slotId = config.slots?.[this.slotName];

    if (config.enabled && config.client_id && slotId) {
      this.clientId.set(config.client_id);
      this.adSlotId.set(slotId);
      this.isVisible.set(true);
    }
  }

  ngAfterViewInit() {
    if (this.isVisible()) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('Adsbygoogle error:', e);
      }
    }
  }

  closeAd() {
    this.isVisible.set(false);
  }
}
