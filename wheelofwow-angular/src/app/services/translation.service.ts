import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const TRANSLATIONS: any = {
    vi: {
        appTitle: 'QUAY LÀ TRÚNG',
        instruction: 'Nhấn nút Quay số để bắt đầu',
        btnDraw: 'QUAY SỐ',
        btnDrawing: 'ĐANG QUAY...',
        btnLoad: 'Tải danh sách',
        winnersTitle: 'Danh sách trúng thưởng',
        participantsTitle: 'Quản lý danh sách tham gia',
        totalParticipants: 'Tổng số tham gia:',
        remainingParticipants: 'Còn lại:',
        congratulations: 'CHÚC MỪNG!',
        prizeLabel: 'Giải thưởng:',
        people: 'người',
        btnClose: 'Đóng',
        settingsTitle: 'Cấu hình hệ thống',
        timingSettings: 'Cài đặt thời gian',
        spinDuration: 'Thời gian quay số (giây):',
        digitDelay: 'Thời gian hiện từng số (giây):',
        bgCustomLabel: 'Hình nền tùy chỉnh:',
        btnUploadBg: '📁 Tải lên hình nền',
        btnResetBg: '🔄 Khôi phục mặc định',
        btnSaveSettings: 'Lưu cấu hình',
        btnResetSettings: 'Khôi phục mặc định',
        totalWinners: 'Tổng số người trúng'
    },
    en: {
        appTitle: 'LUCKY DRAW',
        instruction: 'Press Draw button to start',
        btnDraw: 'DRAW',
        btnDrawing: 'DRAWING...',
        btnLoad: 'Load List',
        winnersTitle: 'Winners List',
        participantsTitle: 'Manage Participants',
        totalParticipants: 'Total participants:',
        remainingParticipants: 'Remaining:',
        congratulations: 'CONGRATULATIONS!',
        prizeLabel: 'Prize:',
        people: 'people',
        btnClose: 'Close',
        settingsTitle: 'System Configuration',
        timingSettings: 'Timing Settings',
        spinDuration: 'Spin duration (seconds):',
        digitDelay: 'Digit display delay (seconds):',
        bgCustomLabel: 'Custom Background:',
        btnUploadBg: '📁 Upload Background',
        btnResetBg: '🔄 Reset to Default',
        btnSaveSettings: 'Save Settings',
        btnResetSettings: 'Reset to Default',
        totalWinners: 'Total Winners'
    }
};

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  
  currentLang = signal<'vi' | 'en'>('vi');

  t = computed(() => TRANSLATIONS[this.currentLang()]);

  setLang(lang: 'vi' | 'en') {
    this.currentLang.set(lang);
    if (this.isBrowser) {
      localStorage.setItem('luckydraw_language', lang);
    }
  }

  constructor() {
    if (this.isBrowser) {
      const savedLang = localStorage.getItem('luckydraw_language') as 'vi' | 'en';
      if (savedLang && TRANSLATIONS[savedLang]) {
        this.currentLang.set(savedLang);
      }
    }
  }

  translate(key: string): string {
    return TRANSLATIONS[this.currentLang()][key] || key;
  }
}
