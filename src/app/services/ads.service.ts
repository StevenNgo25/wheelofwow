import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

@Injectable({
  providedIn: 'root',
})
export class AdsService {
  private supabase = inject(SupabaseService);

  // Signals
  config = signal<any>({ enabled: false, client_id: '', slots: {} });
  isAdsEnabled = signal(false);
  isSubscriptionActive = signal(false);

  constructor() {
    this.init();
  }

  async init() {
    await this.loadConfig();
    await this.checkSubscription();

    if (this.config().enabled && !this.isSubscriptionActive()) {
      this.injectAdSenseScript();
      this.isAdsEnabled.set(true);
    } else {
      this.isAdsEnabled.set(false);
    }
  }

  async loadConfig() {
    const { data } = await this.supabase.getSystemSetting('ads_config');
    if (data?.value) {
      this.config.set(data.value);
    }
  }

  async checkSubscription() {
    // Check if user has subscription
    // Assuming SupabaseService has or will have getSubscriptionTier,
    // or we query profile manually here if service update failed.
    const user = await this.supabase.getUser();
    if (!user) return;

    // Temporary manual query until SupabaseService is updated
    const { data } = await this.supabase['supabase']
      .from('profiles')
      .select('subscription_tier')
      .eq('id', user.id)
      .single();

    if (data?.subscription_tier === 'pro' || data?.subscription_tier === 'premium') {
      this.isSubscriptionActive.set(true);
    }
  }

  private injectAdSenseScript() {
    const clientId = this.config().client_id;
    if (!clientId) return;

    if (document.querySelector('#adsense-script')) return;

    const script = document.createElement('script');
    script.id = 'adsense-script';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }
}
