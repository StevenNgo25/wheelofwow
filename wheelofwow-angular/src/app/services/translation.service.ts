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
        bgCustomization: 'Tùy chỉnh hình nền',
        btnUploadBg: '📁 Tải lên hình nền',
        btnResetBg: '🔄 Khôi phục mặc định',
        btnSaveSettings: 'Lưu cấu hình',
        btnResetSettings: 'Khôi phục mặc định',
        totalWinners: 'Tổng số người trúng',
        expand: 'Thu gọn',
        showMore: 'Xem thêm',
        uploadHint: 'Tải lên hình ảnh nền của bạn (JPG, PNG)',
        bgUploaded: 'Đã tải lên hình nền!',
        noCustomBg: 'Chưa có hình nền tùy chỉnh',
        currentBg: 'Hình nền hiện tại',
        managePrizes: 'Quản lý giải thưởng',
        prizeCount: 'Số lượng:',
        prizeReward: 'Phần thưởng:',
        rewardPlaceholder: 'Nhập tên quà tặng',
        btnAddPrize: '+ Thêm giải thưởng',
        alertNoParticipants: 'Không còn người tham gia!',
        alertSaved: 'Đã lưu cài đặt!',
        confirmReset: 'Bạn có chắc muốn khôi phục cài đặt gốc?',
        defaultParticipant: 'Người tham gia',
        newPrizeName: 'Giải mới',
        grandPrize: 'Giải đặc biệt',
        firstPrize: 'Giải nhất',
        secondPrize: 'Giải nhì',
        thirdPrize: 'Giải ba',
        inputPlaceholder: 'Nhập danh sách người tham gia...\n\nVí dụ:\n- Dải số: 1-2000\n- Tên: Nguyễn Văn A, Trần Thị B\n- Mã - Tên: 001 - Nguyễn Văn A\n(Mỗi mục trên một dòng)',
        seoDescription: 'Hệ thống quay số trúng thưởng online miễn phí, công bằng và minh bạch. Dễ sử dụng cho mọi sự kiện, mini game và hội nghị.',
        seoKeywords: 'quay số trúng thưởng, lucky draw, quay thưởng online, hệ thống quay số, quay số may mắn, mini game, quay thưởng sự kiện'
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
        bgCustomization: 'Background Customization',
        btnUploadBg: '📁 Upload Background',
        btnResetBg: '🔄 Reset to Default',
        btnSaveSettings: 'Save Settings',
        btnResetSettings: 'Reset to Default',
        totalWinners: 'Total Winners',
        expand: 'Collapse',
        showMore: 'Show more',
        uploadHint: 'Upload your background image (JPG, PNG)',
        bgUploaded: 'Background uploaded!',
        noCustomBg: 'No custom background',
        currentBg: 'Current background',
        managePrizes: 'Manage Prizes',
        prizeCount: 'Count:',
        prizeReward: 'Reward:',
        rewardPlaceholder: 'Enter reward name',
        btnAddPrize: '+ Add new prize',
        alertNoParticipants: 'No more participants!',
        alertSaved: 'Settings saved!',
        confirmReset: 'Are you sure you want to reset to default settings?',
        defaultParticipant: 'Participant',
        newPrizeName: 'New Prize',
        grandPrize: 'Grand Prize',
        firstPrize: 'First Prize',
        secondPrize: 'Second Prize',
        thirdPrize: 'Third Prize',
        inputPlaceholder: 'Enter participant list...\n\nExample:\n- Number range: 1-2000\n- Names: John Doe, Mary Smith\n- Code - Name: 001 - John Doe\n(Each entry on a new line)',
        seoDescription: 'Free, fair, and transparent online lucky draw system. Easy to use for events, conferences, and mini-games.',
        seoKeywords: 'lucky draw, online draw, prize draw, random draw, event raffle, mini game'
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

  getPrizeKey(name: string): string | null {
    const keys = ['grandPrize', 'firstPrize', 'secondPrize', 'thirdPrize', 'newPrizeName'];
    for (const lang of ['vi', 'en']) {
      for (const key of keys) {
        if (TRANSLATIONS[lang][key].toLowerCase() === name.toLowerCase()) {
          return key;
        }
      }
    }
    return null;
  }
}
