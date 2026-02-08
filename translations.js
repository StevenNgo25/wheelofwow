// Translations for Lucky Draw Application
const translations = {
    vi: {
        // Header
        appTitle: 'QUAY LÀ TRÚNG',
        
        // Prize levels
        prizeSpecial: 'GIẢI ĐẶC BIỆT',
        prizeFirst: 'GIẢI NHẤT',
        prizeSecond: 'GIẢI NHÌ',
        prizeThird: 'GIẢI BA',
        prizeConsolation: 'GIẢI KHUYẾN KHÍCH',
        
        // Display area
        instruction: 'Nhấn nút Quay số để bắt đầu',
        
        // Buttons
        btnDraw: 'QUAY SỐ',
        btnDrawing: 'ĐANG QUAY...',
        btnLoad: 'Tải danh sách',
        btnRegister: 'ĐĂNG KÝ',
        
        // Winners section
        winnersTitle: 'Danh sách trúng thưởng',
        winnerNumber: 'Mã số',
        winnerName: 'Tên',
        winnerPrize: 'Giải thưởng',
        
        // Participants section
        participantsTitle: 'Quản lý danh sách tham gia',
        participantsPlaceholder: `Nhập danh sách tham gia (mỗi dòng một người):
Mã - Tên

Ví dụ:
VNPT000001 - Nguyễn Văn A
CTV000001 - Trần Thị B
VNPT000002 - Lê Văn C
...

Hoặc chỉ nhập mã:
VNPT000001
CTV000001
VNPT000002`,
        totalParticipants: 'Tổng số tham gia:',
        remainingParticipants: 'Còn lại:',
        
        // Alerts
        alertNoInput: 'Vui lòng nhập danh sách số tham gia!',
        alertInvalidList: 'Danh sách không hợp lệ!',
        alertLoadSuccess: 'Đã tải {count} số tham gia thành công!',
        alertNoRemaining: 'Không còn số tham gia nào! Vui lòng tải lại danh sách.',
        
        // Congratulations popup
        congratulations: 'CHÚC MỪNG!',
        winnerPosition: 'Người thứ',
        totalWinners: 'Tổng số người trúng',
        people: 'người',
        winnerCode: 'Mã số:',
        winnerNameLabel: 'Tên:',
        prizeLabel: 'Giải thưởng:',
        btnClose: 'Đóng',
        
        // Footer
        footerText: '© 2026 Lucky Draw. All rights reserved.',
        
        // Default participant name
        defaultParticipant: 'Người tham gia',
        
        // Prize names (lowercase for data)
        prizeSpecialData: 'giải đặc biệt',
        prizeFirstData: 'giải nhất',
        prizeSecondData: 'giải nhì',
        prizeThirdData: 'giải ba',
        prizeConsolationData: 'giải khuyến khích',
        
        // Settings section
        settingsTitle: 'Cấu hình hệ thống',
        timingSettings: 'Cài đặt thời gian',
        prizeSettings: 'Danh sách giải thưởng',
        prizeCountSettings: 'Số lượng kết quả',
        spinDuration: 'Thời gian quay số (giây):',
        digitDelay: 'Thời gian hiện từng số (giây):',
        spinDurationHint: 'Thời gian chờ trước khi hiển thị kết quả',
        digitDelayHint: 'Khoảng cách thời gian giữa các số kết quả',
        countSpecialLabel: 'Giải đặc biệt:',
        countFirstLabel: 'Giải nhất:',
        countSecondLabel: 'Giải nhì:',
        countThirdLabel: 'Giải ba:',
        countConsolationLabel: 'Giải khuyến khích:',
        countHint: 'Số lượng người trúng',
        prizeSpecialLabel: 'Giải đặc biệt:',
        prizeFirstLabel: 'Giải nhất:',
        prizeSecondLabel: 'Giải nhì:',
        prizeThirdLabel: 'Giải ba:',
        prizeConsolationLabel: 'Giải khuyến khích:',
        prizePlaceholder: 'Nhập tên giải thưởng',
        btnSaveSettings: 'Lưu cấu hình',
        btnResetSettings: 'Khôi phục mặc định',
        alertSettingsSaved: 'Đã lưu cấu hình thành công!',
        alertSettingsReset: 'Đã khôi phục cấu hình mặc định!',
        
        // Background customization
        bgCustomization: 'Tùy chỉnh hình nền',
        bgCustomLabel: 'Hình nền tùy chỉnh:',
        btnUploadBg: '📁 Tải lên hình nền',
        bgHint: 'Tải lên hình ảnh nền của bạn (JPG, PNG)',
        btnResetBg: '🔄 Khôi phục mặc định',
        bgNoCustom: 'Chưa có hình nền tùy chỉnh',
        bgCurrentBg: 'Hình nền hiện tại',
        bgUploadSuccess: '✅ Đã tải lên hình nền!',
        bgResetSuccess: '✅ Đã khôi phục hình nền mặc định'
    },
    en: {
        // Header
        appTitle: 'LUCKY DRAW',
        
        // Prize levels
        prizeSpecial: 'GRAND PRIZE',
        prizeFirst: 'FIRST PRIZE',
        prizeSecond: 'SECOND PRIZE',
        prizeThird: 'THIRD PRIZE',
        prizeConsolation: 'CONSOLATION PRIZE',
        
        // Display area
        instruction: 'Press Draw button to start',
        
        // Buttons
        btnDraw: 'DRAW',
        btnDrawing: 'DRAWING...',
        btnLoad: 'Load List',
        btnRegister: 'REGISTER',
        
        // Winners section
        winnersTitle: 'Winners List',
        winnerNumber: 'Code',
        winnerName: 'Name',
        winnerPrize: 'Prize',
        
        // Participants section
        participantsTitle: 'Manage Participants',
        participantsPlaceholder: `Enter participant list (one per line):
Code - Name

Example:
VNPT000001 - John Doe
CTV000001 - Jane Smith
VNPT000002 - Mike Johnson
...

Or just codes:
VNPT000001
CTV000001
VNPT000002`,
        totalParticipants: 'Total participants:',
        remainingParticipants: 'Remaining:',
        
        // Alerts
        alertNoInput: 'Please enter the participant list!',
        alertInvalidList: 'Invalid list!',
        alertLoadSuccess: 'Successfully loaded {count} participants!',
        alertNoRemaining: 'No participants remaining! Please reload the list.',
        
        // Congratulations popup
        congratulations: 'CONGRATULATIONS!',
        winnerPosition: 'Winner',
        totalWinners: 'Total Winners',
        people: 'people',
        winnerCode: 'Code:',
        winnerNameLabel: 'Name:',
        prizeLabel: 'Prize:',
        btnClose: 'Close',
        
        // Footer
        footerText: '© 2026 Lucky Draw. All rights reserved.',
        
        // Default participant name
        defaultParticipant: 'Participant',
        
        // Prize names (lowercase for data)
        prizeSpecialData: 'grand prize',
        prizeFirstData: 'first prize',
        prizeSecondData: 'second prize',
        prizeThirdData: 'third prize',
        prizeConsolationData: 'consolation prize',
        
        // Settings section
        settingsTitle: 'System Configuration',
        timingSettings: 'Timing Settings',
        prizeSettings: 'Prize Rewards List',
        prizeCountSettings: 'Winner Count',
        spinDuration: 'Spin duration (seconds):',
        digitDelay: 'Digit display delay (seconds):',
        spinDurationHint: 'Wait time before showing result',
        digitDelayHint: 'Time interval between each result digit',
        countSpecialLabel: 'Grand Prize:',
        countFirstLabel: 'First Prize:',
        countSecondLabel: 'Second Prize:',
        countThirdLabel: 'Third Prize:',
        countConsolationLabel: 'Consolation Prize:',
        countHint: 'Number of winners',
        prizeSpecialLabel: 'Grand Prize:',
        prizeFirstLabel: 'First Prize:',
        prizeSecondLabel: 'Second Prize:',
        prizeThirdLabel: 'Third Prize:',
        prizeConsolationLabel: 'Consolation Prize:',
        prizePlaceholder: 'Enter prize name',
        btnSaveSettings: 'Save Settings',
        btnResetSettings: 'Reset to Default',
        alertSettingsSaved: 'Settings saved successfully!',
        alertSettingsReset: 'Settings reset to default!',
        
        // Background customization
        bgCustomization: 'Background Customization',
        bgCustomLabel: 'Custom Background:',
        btnUploadBg: '📁 Upload Background',
        bgHint: 'Upload your custom background image (JPG, PNG)',
        btnResetBg: '🔄 Reset to Default',
        bgNoCustom: 'No custom background',
        bgCurrentBg: 'Current Background',
        bgUploadSuccess: '✅ Background uploaded!',
        bgResetSuccess: '✅ Reset to default'
    }
};

// Language Manager
class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('luckydraw_language') || 'en';
        this.translations = translations;
    }
    
    setLanguage(lang) {
        if (!this.translations[lang]) {
            console.error(`Language ${lang} not found`);
            return;
        }
        
        this.currentLanguage = lang;
        localStorage.setItem('luckydraw_language', lang);
        this.updatePageContent();
    }
    
    t(key) {
        return this.translations[this.currentLanguage][key] || key;
    }
    
    updatePageContent() {
        // Update header
        const appTitle = document.querySelector('.logo h1');
        if (appTitle) appTitle.textContent = this.t('appTitle');
        
        // Update prize buttons - only update if they match default prize names
        const prizeBtns = document.querySelectorAll('.prize-btn');
        const defaultPrizeNames = ['giải đặc biệt', 'giải nhất', 'giải nhì', 'giải ba', 'giải khuyến khích'];
        const prizeKeys = ['prizeSpecial', 'prizeFirst', 'prizeSecond', 'prizeThird', 'prizeConsolation'];
        
        prizeBtns.forEach((btn) => {
            const prizeName = btn.dataset.prize;
            const prizeIndex = defaultPrizeNames.indexOf(prizeName);
            
            // Only update if this is a default prize, leave custom prizes alone
            if (prizeIndex >= 0) {
                const span = btn.querySelector('span:last-child');
                if (span) span.textContent = this.t(prizeKeys[prizeIndex]);
            }
        });
        
        // Update current prize display
        const currentPrizeDisplay = document.querySelector('.current-prize');
        if (currentPrizeDisplay && window.luckyDraw) {
            const prizeIndex = defaultPrizeNames.indexOf(window.luckyDraw.currentPrize);
            if (prizeIndex >= 0) {
                currentPrizeDisplay.textContent = this.t(prizeKeys[prizeIndex]);
            } else {
                // For custom prizes, just display the name in uppercase
                currentPrizeDisplay.textContent = window.luckyDraw.currentPrize.toUpperCase();
            }
        }
        
        // Update instruction
        const instruction = document.querySelector('.instruction');
        if (instruction) instruction.textContent = this.t('instruction');
        
        // Update draw button
        const drawBtn = document.querySelector('.btn-draw span');
        if (drawBtn && !window.luckyDraw?.isSpinning) {
            drawBtn.textContent = this.t('btnDraw');
        }
        
        // Update winners section
        const winnersTitle = document.querySelector('.winners-section h3');
        if (winnersTitle) winnersTitle.textContent = this.t('winnersTitle');
        
        // Update participants section
        const participantsTitle = document.querySelector('.participants-section h2');
        if (participantsTitle) participantsTitle.textContent = this.t('participantsTitle');
        
        const participantsInput = document.getElementById('participants-input');
        if (participantsInput) participantsInput.placeholder = this.t('participantsPlaceholder');
        
        const loadBtn = document.getElementById('load-participants');
        if (loadBtn) loadBtn.textContent = this.t('btnLoad');
        
        // Update participants info labels
        const totalLabel = document.querySelector('.participants-info p:first-child');
        if (totalLabel) {
            const count = document.getElementById('total-participants').textContent;
            totalLabel.innerHTML = `${this.t('totalParticipants')} <strong id="total-participants">${count}</strong>`;
        }
        
        const remainingLabel = document.querySelector('.participants-info p:last-child');
        if (remainingLabel) {
            const count = document.getElementById('remaining-participants').textContent;
            remainingLabel.innerHTML = `${this.t('remainingParticipants')} <strong id="remaining-participants">${count}</strong>`;
        }
        
        // Update footer
        const footer = document.querySelector('footer p');
        if (footer) footer.textContent = this.t('footerText');
        
        // Update settings section
        const settingsTitle = document.querySelector('.settings-section h2');
        if (settingsTitle) settingsTitle.textContent = this.t('settingsTitle');
        
        // Find timing settings group (first one without prize-settings-dynamic class)
        const timingGroup = document.querySelector('.settings-section .settings-group:not(.prize-settings-dynamic)');
        if (timingGroup) {
            const timingTitle = timingGroup.querySelector('h3');
            if (timingTitle && !timingTitle.textContent.includes('Background')) {
                timingTitle.textContent = '⏱️ ' + this.t('timingSettings');
            }
        }
        
        // Update settings labels
        const spinDurationLabel = document.querySelector('label[for="spin-duration"]');
        if (spinDurationLabel) spinDurationLabel.textContent = this.t('spinDuration');
        
        const digitDelayLabel = document.querySelector('label[for="digit-delay"]');
        if (digitDelayLabel) digitDelayLabel.textContent = this.t('digitDelay');
        
        // Update hints with safer navigation
        const spinDurationInput = document.getElementById('spin-duration');
        if (spinDurationInput) {
            const hint = spinDurationInput.nextElementSibling;
            if (hint && hint.classList.contains('setting-hint')) {
                hint.textContent = this.t('spinDurationHint');
            }
        }
        
        const digitDelayInput = document.getElementById('digit-delay');
        if (digitDelayInput) {
            const hint = digitDelayInput.nextElementSibling;
            if (hint && hint.classList.contains('setting-hint')) {
                hint.textContent = this.t('digitDelayHint');
            }
        }
        
        // Update settings buttons
        const saveBtn = document.getElementById('save-settings');
        if (saveBtn) saveBtn.innerHTML = '💾 ' + this.t('btnSaveSettings');
        
        const resetBtn = document.getElementById('reset-settings');
        if (resetBtn) resetBtn.innerHTML = '🔄 ' + this.t('btnResetSettings');
        
        // Update background customization section
        const bgTitle = document.querySelector('.settings-section .settings-group:nth-child(4) h3');
        if (bgTitle) bgTitle.textContent = '🎨 ' + this.t('bgCustomization');
        
        const bgLabel = document.querySelector('label[for="background-upload"]');
        if (bgLabel) bgLabel.textContent = this.t('bgCustomLabel');
        
        const uploadBgBtn = document.getElementById('btn-upload-bg');
        if (uploadBgBtn) uploadBgBtn.textContent = this.t('btnUploadBg');
        
        const bgHint = document.querySelector('.background-upload .setting-hint');
        if (bgHint) bgHint.textContent = this.t('bgHint');
        
        const resetBgBtn = document.getElementById('btn-reset-bg');
        if (resetBgBtn) resetBgBtn.textContent = this.t('btnResetBg');
        
        // Update background preview text if no custom background
        const bgPreview = document.getElementById('background-preview');
        if (bgPreview && bgPreview.querySelector('.preview-text') && !localStorage.getItem('luckydraw_custom_background')) {
            bgPreview.querySelector('.preview-text').textContent = this.t('bgNoCustom');
        }
        if (bgPreview && bgPreview.querySelector('.preview-overlay')) {
            bgPreview.querySelector('.preview-overlay').textContent = this.t('bgCurrentBg');
        }
        
        // Update language selector active state
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLanguage);
        });
        
        // Re-translate winners list
        if (window.luckyDraw && window.luckyDraw.winners.length > 0) {
            window.luckyDraw.updateWinnersList();
        }
    }
    
    getPrizeTranslation(prizeData) {
        const prizeMap = {
            'giải đặc biệt': 'prizeSpecial',
            'giải nhất': 'prizeFirst',
            'giải nhì': 'prizeSecond',
            'giải ba': 'prizeThird',
            'giải khuyến khích': 'prizeConsolation',
            'grand prize': 'prizeSpecial',
            'first prize': 'prizeFirst',
            'second prize': 'prizeSecond',
            'third prize': 'prizeThird',
            'consolation prize': 'prizeConsolation'
        };
        
        const key = prizeMap[prizeData.toLowerCase()];
        return key ? this.t(key) : prizeData;
    }
}

// Initialize language manager
const languageManager = new LanguageManager();
