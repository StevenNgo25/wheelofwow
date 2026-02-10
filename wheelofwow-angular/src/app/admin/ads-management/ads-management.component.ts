import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-ads-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ads-management.component.html',
  styleUrl: './ads-management.component.scss',
})
export class AdsManagementComponent {
  private supabase = inject(SupabaseService);
  loading = signal(false);
  config = {
    enabled: false,
    client_id: '',
    slots: {
      home_banner: '',
      result_popup: '',
    },
  };

  async ngOnInit() {
    this.loadConfig();
  }

  async loadConfig() {
    this.loading.set(true);
    const { data } = await this.supabase.getSystemSetting('ads_config');
    if (data?.value) {
      this.config = data.value;
    }
    this.loading.set(false);
  }

  async saveConfig() {
    this.loading.set(true);
    const { error } = await this.supabase.updateSystemSetting('ads_config', this.config);
    this.loading.set(false);

    if (error) {
      alert('Lỗi khi lưu: ' + error.message);
    } else {
      alert('Đã lưu cấu hình quảng cáo!');
    }
  }
}
