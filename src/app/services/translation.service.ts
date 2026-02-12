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
    inputPlaceholder:
      'Nhập danh sách người tham gia...\n\nVí dụ:\n- Dải số: 1-2000\n- Tên: Nguyễn Văn A, Trần Thị B\n- Mã - Tên: 001 - Nguyễn Văn A\n(Mỗi mục trên một dòng)',
    seoDescription:
      'Hệ thống quay số trúng thưởng online miễn phí, công bằng và minh bạch. Dễ sử dụng cho mọi sự kiện, mini game và hội nghị.',
    seoKeywords:
      'quay số trúng thưởng, lucky draw, quay thưởng online, hệ thống quay số, quay số may mắn, mini game, quay thưởng sự kiện',

    // Nav Menu
    navHome: 'Trang chủ',
    navGuide: 'Hướng dẫn sử dụng',
    navPricing: 'Phí sử dụng',
    navLogin: 'Đăng nhập',

    // Guide Page
    guideTitle: 'Hướng dẫn sử dụng',
    guideIntro:
      'Chào mừng bạn đến với hệ thống Quay số trúng thưởng! Dưới đây là hướng dẫn chi tiết giúp bạn tổ chức một chương trình quay số thành công.',
    guideStep1Title: '1. Chuẩn bị danh sách',
    guideStep1Desc:
      'Nhập danh sách người tham gia vào ô "Quản lý danh sách tham gia". Bạn có thể nhập dải số (ví dụ: 1-100) hoặc danh sách tên (mỗi tên một dòng).',
    guideStep2Title: '2. Cấu hình giải thưởng',
    guideStep2Desc:
      'Trong phần "Cài đặt & Cấu hình", bạn có thể thêm các loại giải thưởng, số lượng giải, và tên phần thưởng tương ứng.',
    guideStep3Title: '3. Tùy chỉnh giao diện',
    guideStep3Desc:
      'Bạn có thể tải lên hình nền riêng để phù hợp với thương hiệu hoặc sự kiện của mình.',
    guideStep4Title: '4. Quay số',
    guideStep4Desc:
      'Nhấn nút "QUAY SỐ" để bắt đầu. Hệ thống sẽ chọn ngẫu nhiên người trúng thưởng từ danh sách khả dụng.',
    guideStep5Title: '5. Quản lý kết quả',
    guideStep5Desc:
      'Kết quả sẽ hiển thị ngay lập tức và được lưu vào "Danh sách trúng thưởng". Bạn có thể xem lại hoặc tiếp tục quay cho các giải tiếp theo.',

    // Pricing Page
    pricingTitle: 'Bảng giá dịch vụ',
    pricingSubtitle: 'Chọn gói phù hợp với nhu cầu của bạn',
    priceWeekly: 'Gói Tuần',
    priceMonthly: 'Gói Tháng',
    priceYearly: 'Gói Năm',
    priceWeeklyValue: '$7',
    priceMonthlyValue: '$23.8',
    priceYearlyValue: '$273',
    pricePerWeek: '/ tuần',
    pricePerMonth: '/ tháng',
    pricePerYear: '/ năm',
    save15: 'Tiết kiệm 15%',
    save25: 'Tiết kiệm 25%',
    feature1: 'Không giới hạn người tham gia',
    feature2: 'Tùy chỉnh hình nền thương hiệu',
    feature3: 'Xuất kết quả ra Excel',
    feature4: 'Hỗ trợ kỹ thuật 24/7',
    feature5: 'Không hiển thị quảng cáo',
    btnChoosePlan: 'Chọn gói này',
    contactSales: 'Liên hệ tư vấn doanh nghiệp',
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
    inputPlaceholder:
      'Enter participant list...\n\nExample:\n- Number range: 1-2000\n- Names: John Doe, Mary Smith\n- Code - Name: 001 - John Doe\n(Each entry on a new line)',
    seoDescription:
      'Free, fair, and transparent online lucky draw system. Easy to use for events, conferences, and mini-games.',
    seoKeywords: 'lucky draw, online draw, prize draw, random draw, event raffle, mini game',

    // Nav Menu
    navHome: 'Home',
    navGuide: 'User Guide',
    navPricing: 'Pricing',
    navLogin: 'Login',

    // Guide Page
    guideTitle: 'User Guide',
    guideIntro:
      'Welcome to the Lucky Draw system! Here is a detailed guide to help you organize a successful lucky draw event.',
    guideStep1Title: '1. Prepare List',
    guideStep1Desc:
      'Enter the participants list in the "Manage Participants" box. You can enter a number range (e.g., 1-100) or a list of names (one per line).',
    guideStep2Title: '2. Configure Prizes',
    guideStep2Desc:
      'In the "Settings" section, you can add prize types, quantity, and corresponding reward names.',
    guideStep3Title: '3. Customize Interface',
    guideStep3Desc: 'You can upload your own background image to match your brand or event theme.',
    guideStep4Title: '4. Draw',
    guideStep4Desc:
      'Press the "DRAW" button to start. The system will randomly select winners from the available list.',
    guideStep5Title: '5. Manage Results',
    guideStep5Desc:
      'Results are displayed immediately and saved in the "Winners List". You can review or continue drawing for the next prizes.',

    // Pricing Page
    pricingTitle: 'Pricing Plans',
    pricingSubtitle: 'Choose the plan that fits your needs',
    priceWeekly: 'Weekly Plan',
    priceMonthly: 'Monthly Plan',
    priceYearly: 'Yearly Plan',
    priceWeeklyValue: '$7',
    priceMonthlyValue: '$23.8',
    priceYearlyValue: '$273',
    pricePerWeek: '/ week',
    pricePerMonth: '/ month',
    pricePerYear: '/ year',
    save15: 'Save 15%',
    save25: 'Save 25%',
    feature1: 'Unlimited participants',
    feature2: 'Custom branding background',
    feature3: 'Export results to Excel',
    feature4: '24/7 Technical Support',
    feature5: 'No advertisements',
    btnChoosePlan: 'Choose Plan',
    contactSales: 'Contact Enterprise Sales',
  },
};

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  currentLang = signal<'vi' | 'en'>('en');

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
