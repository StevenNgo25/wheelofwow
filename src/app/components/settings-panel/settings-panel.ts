import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LuckyDrawService } from '../../services/lucky-draw.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-settings-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings-panel.html',
  styleUrl: './settings-panel.scss',
})
export class SettingsPanel {
  protected readonly luckyDraw = inject(LuckyDrawService);
  protected readonly translation = inject(TranslationService);

  handleBackgroundUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.luckyDraw.setBackground(e.target?.result as string);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  saveSettings() {
    this.luckyDraw.saveToStorage();
    alert(this.translation.t().alertSaved);
  }

  resetSettings() {
    if (confirm(this.translation.t().confirmReset)) {
      localStorage.removeItem('luckydraw_settings');
      localStorage.removeItem('luckydraw_custom_background');
      window.location.reload();
    }
  }
}
