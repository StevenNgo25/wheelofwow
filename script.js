// Lucky Draw Application
class LuckyDraw {
    constructor() {
        this.participants = [];
        this.remainingParticipants = [];
        this.winners = [];
        this.prizes = []; // Dynamic prizes list
        this.currentPrize = null; // Will be set after loading prizes
        this.isSpinning = false;
        this.numberBoxes = document.querySelectorAll('.number');
        this.spinInterval = null;
        this.settings = this.loadSettings();
        this.prizeDrawCount = {}; // Track how many times each prize has been drawn
        this.drawSessionId = 0; // Track draw sessions
        this.expandedDraws = new Set(); // Track which draws are expanded (default: collapsed)
        
        this.init();
    }
    
    init() {
        this.renderPrizeSelector();
        this.setupEventListeners();
        this.loadFromLocalStorage();
    }
    
    setupEventListeners() {
        // Prize selection buttons - delegated event
        const prizeSelector = document.getElementById('prize-selector');
        if (prizeSelector) {
            prizeSelector.addEventListener('click', (e) => {
                const btn = e.target.closest('.prize-btn');
                if (!btn) return;
                
                document.querySelectorAll('.prize-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentPrize = btn.dataset.prize;
                this.updatePrizeDisplay();
            });
        }
        
        // Add prize button
        const addPrizeBtn = document.getElementById('btn-add-prize');
        if (addPrizeBtn) {
            addPrizeBtn.addEventListener('click', () => this.addNewPrize());
        }
        
        // Draw button
        const drawBtn = document.querySelector('.btn-draw');
        drawBtn.addEventListener('click', () => this.startDraw());
        
        // Load participants button
        const loadBtn = document.getElementById('load-participants');
        loadBtn.addEventListener('click', () => this.loadParticipants());
        
        // Navigation buttons
        document.querySelector('.btn-prev').addEventListener('click', () => this.navigatePrize(-1));
        document.querySelector('.btn-next').addEventListener('click', () => this.navigatePrize(1));
        
        // Settings buttons
        const saveSettingsBtn = document.getElementById('save-settings');
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        }
        
        const resetSettingsBtn = document.getElementById('reset-settings');
        if (resetSettingsBtn) {
            resetSettingsBtn.addEventListener('click', () => this.resetSettings());
        }
        
        // Background upload buttons
        const uploadBgBtn = document.getElementById('btn-upload-bg');
        const backgroundUploadInput = document.getElementById('background-upload');
        const resetBgBtn = document.getElementById('btn-reset-bg');
        
        if (uploadBgBtn && backgroundUploadInput) {
            uploadBgBtn.addEventListener('click', () => {
                backgroundUploadInput.click();
            });
            
            backgroundUploadInput.addEventListener('change', (e) => {
                this.handleBackgroundUpload(e);
            });
        }
        
        if (resetBgBtn) {
            resetBgBtn.addEventListener('click', () => {
                this.resetBackground();
            });
        }
        
        // Load saved background on init
        this.loadCustomBackground();
    }
    
    loadFromLocalStorage() {
        // Try to load from localStorage first
        const savedParticipants = localStorage.getItem('luckydraw_participants');
        const savedRemaining = localStorage.getItem('luckydraw_remaining');
        const savedWinners = localStorage.getItem('luckydraw_winners');
        const savedPrizeCount = localStorage.getItem('luckydraw_prizecount');
        const savedDrawSessionId = localStorage.getItem('luckydraw_drawsessionid');
        
        if (savedParticipants) {
            this.participants = JSON.parse(savedParticipants);
            this.remainingParticipants = savedRemaining ? JSON.parse(savedRemaining) : [...this.participants];
            this.winners = savedWinners ? JSON.parse(savedWinners) : [];
            this.prizeDrawCount = savedPrizeCount ? JSON.parse(savedPrizeCount) : {};
            this.drawSessionId = savedDrawSessionId ? parseInt(savedDrawSessionId) : 0;
            
            // Update textarea with saved data
            setTimeout(() => {
                const input = document.getElementById('participants-input');
                if (input) {
                    input.value = this.participants.map(p => {
                        if (typeof p === 'object') {
                            const code = p.code || p.number || '';
                            return `${code} - ${p.name}`;
                        }
                        return p;
                    }).join('\n');
                }
            }, 0);
            
            // Display saved winners will be handled by updateWinnersList() later
            // This prevents duplicate display on page load
        } else {
            // Load sample data if no saved data
            this.loadSampleData();
        }
        
        this.updateParticipantsDisplay();
    }
    
    loadSampleData() {
        // Load sample participant data with code and name
        const sampleParticipants = [];
        for (let i = 1; i <= 100; i++) {
            sampleParticipants.push({
                code: `VNPT${String(i).padStart(6, '0')}`,
                name: `Người tham gia ${i}`
            });
        }
        this.participants = [...sampleParticipants];
        this.remainingParticipants = [...sampleParticipants];
        this.saveToLocalStorage();
    }
    
    saveToLocalStorage() {
        localStorage.setItem('luckydraw_participants', JSON.stringify(this.participants));
        localStorage.setItem('luckydraw_remaining', JSON.stringify(this.remainingParticipants));
        localStorage.setItem('luckydraw_winners', JSON.stringify(this.winners));
        localStorage.setItem('luckydraw_prizecount', JSON.stringify(this.prizeDrawCount));
        localStorage.setItem('luckydraw_drawsessionid', this.drawSessionId.toString());
    }
    
    loadParticipants() {
        const input = document.getElementById('participants-input');
        const text = input.value.trim();
        
        if (!text) {
            alert(languageManager.t('alertNoInput'));
            return;
        }
        
        const lines = text.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        
        if (lines.length === 0) {
            alert(languageManager.t('alertInvalidList'));
            return;
        }
        
        // Process lines and expand number ranges
        this.participants = [];
        
        lines.forEach(line => {
            // Check for number range pattern: <from_number>=><to_number> or <from_number>-><to_number>
            const rangePattern = /^(\d+)\s*(?:=>|->)\s*(\d+)$/;
            const rangeMatch = line.match(rangePattern);
            
            if (rangeMatch) {
                // This is a number range
                const fromNumber = parseInt(rangeMatch[1]);
                const toNumber = parseInt(rangeMatch[2]);
                
                if (fromNumber <= toNumber) {
                    // Generate numbers from fromNumber to toNumber
                    for (let i = fromNumber; i <= toNumber; i++) {
                        this.participants.push({
                            code: String(i),
                            name: languageManager.t('defaultParticipant')
                        });
                    }
                }
            } else {
                // Parse code and name (format: "code - name" or just "code")
                // Code format: <prefix><number> e.g., VNPT0001, CTV00001
                const parts = line.split('-').map(p => p.trim());
                if (parts.length >= 2) {
                    // Check if this is a range pattern with dash (e.g., "100 -> 200")
                    const dashRangePattern = /^(\d+)\s*$/;
                    if (parts.length === 2 && parts[1].match(/^>\s*(\d+)$/)) {
                        // This might be "100 - > 200" format, try to parse it
                        const fromNum = parts[0].match(dashRangePattern);
                        const toNum = parts[1].match(/^>\s*(\d+)$/);
                        if (fromNum && toNum) {
                            const fromNumber = parseInt(fromNum[1]);
                            const toNumber = parseInt(toNum[1]);
                            if (fromNumber <= toNumber) {
                                for (let i = fromNumber; i <= toNumber; i++) {
                                    this.participants.push({
                                        code: String(i),
                                        name: languageManager.t('defaultParticipant')
                                    });
                                }
                            }
                        } else {
                            // Has name: "code - name"
                            const code = parts[0].trim();
                            const name = parts.slice(1).join(' - ');
                            this.participants.push({ code, name });
                        }
                    } else {
                        // Has name: "code - name"
                        const code = parts[0].trim();
                        const name = parts.slice(1).join(' - ');
                        this.participants.push({ code, name });
                    }
                } else {
                    // Only code
                    const code = line.trim();
                    this.participants.push({ code, name: languageManager.t('defaultParticipant') });
                }
            }
        });
        
        this.remainingParticipants = [...this.participants];
        this.winners = [];
        this.prizeDrawCount = {}; // Reset draw count
        this.saveToLocalStorage();
        this.updateParticipantsDisplay();
        this.updatePrizeDisplay(); // Update to show reset count
        
        // Clear winners list display
        const winnersList = document.querySelector('.winners-list');
        winnersList.innerHTML = '';
        
        alert(languageManager.t('alertLoadSuccess').replace('{count}', this.participants.length));
    }
    
    updateParticipantsDisplay() {
        document.getElementById('total-participants').textContent = this.participants.length;
        document.getElementById('remaining-participants').textContent = this.remainingParticipants.length;
    }
    
    updatePrizeDisplay() {
        const prizeTitle = document.querySelector('.current-prize');
        if (!prizeTitle) return;
        
        const drawnCount = this.prizeDrawCount[this.currentPrize] || 0;
        const displayName = this.currentPrize.toUpperCase();
        
        if (drawnCount > 0) {
            prizeTitle.textContent = `${displayName} (${drawnCount})`;
        } else {
            prizeTitle.textContent = displayName;
        }
    }
    
    navigatePrize(direction) {
        if (this.prizes.length === 0) return;
        
        const currentIndex = this.prizes.findIndex(p => p.name === this.currentPrize);
        let newIndex = currentIndex + direction;
        
        if (newIndex < 0) newIndex = this.prizes.length - 1;
        if (newIndex >= this.prizes.length) newIndex = 0;
        
        this.currentPrize = this.prizes[newIndex].name;
        
        // Update UI
        const prizeBtns = document.querySelectorAll('.prize-btn');
        prizeBtns.forEach((btn, index) => {
            btn.classList.toggle('active', index === newIndex);
        });
        
        this.updatePrizeDisplay();
    }
    
    startDraw() {
        if (this.isSpinning) return;
        
        if (this.remainingParticipants.length === 0) {
            alert(languageManager.t('alertNoRemaining'));
            return;
        }
        
        // Get how many winners to draw this round from current prize settings
        const currentPrizeObj = this.prizes.find(p => p.name === this.currentPrize);
        const drawCount = currentPrizeObj ? currentPrizeObj.count : 1;
        this.currentDrawCount = Math.min(drawCount, this.remainingParticipants.length);
        
        this.isSpinning = true;
        const drawBtn = document.querySelector('.btn-draw');
        drawBtn.classList.add('spinning');
        drawBtn.querySelector('span').textContent = languageManager.t('btnDrawing');
        
        // Start number rotation animation
        this.startNumberRotation();
        
        // Stop after configured duration
        const spinDuration = this.settings.spinDuration * 1000;
        
        setTimeout(() => {
            this.stopDraw();
        }, spinDuration);
    }
    
    startNumberRotation() {
        this.numberBoxes.forEach(box => {
            box.classList.add('rotating');
        });
        
        // Animate numbers rapidly
        this.spinInterval = setInterval(() => {
            this.numberBoxes.forEach(box => {
                box.textContent = Math.floor(Math.random() * 10);
            });
        }, 100);
    }
    
    stopDraw() {
        clearInterval(this.spinInterval);
        
        // DON'T remove rotating animation here - let displayWinnerNumber handle it per box
        
        // Pick multiple random winners
        const drawWinners = [];
        for (let i = 0; i < this.currentDrawCount; i++) {
            if (this.remainingParticipants.length === 0) break;
            
            const randomIndex = Math.floor(Math.random() * this.remainingParticipants.length);
            const winner = this.remainingParticipants[randomIndex];
            
            // Remove winner from remaining participants
            this.remainingParticipants.splice(randomIndex, 1);
            
            // Add to winners list
            const winnerObj = {
                code: typeof winner === 'object' ? (winner.code || winner.number) : winner,
                name: typeof winner === 'object' ? winner.name : 'Người tham gia',
                prize: this.currentPrize,
                drawId: this.drawSessionId
            };
            this.winners.push(winnerObj);
            drawWinners.push(winnerObj);
            
            // Increment prize draw count
            if (!this.prizeDrawCount[this.currentPrize]) {
                this.prizeDrawCount[this.currentPrize] = 0;
            }
            this.prizeDrawCount[this.currentPrize]++;
        }
        
        // Display all winners sequentially
        this.displayWinners(drawWinners, 0);
    }
    
    displayWinners(winners, currentIndex) {
        if (currentIndex >= winners.length) {
            // All winners displayed, update UI and show popup
            this.updateParticipantsDisplay();
            this.updateWinnersList(true);
            this.updatePrizeDisplay();
            this.drawSessionId++; // Increment for next draw
            this.saveToLocalStorage();
            
            // Show congratulations popup with all winners
            this.showCongratulationsPopup(winners);
            
            const drawBtn = document.querySelector('.btn-draw');
            drawBtn.classList.remove('spinning');
            drawBtn.querySelector('span').textContent = languageManager.t('btnDraw');
            this.isSpinning = false;
            return;
        }
        
        const winner = winners[currentIndex];
        
        // Display this winner's number
        this.displayWinnerNumber(winner, () => {
            // Celebrate and move to next winner
            this.celebrateWin();
            
            // Wait a bit before next winner
            setTimeout(() => {
                this.displayWinners(winners, currentIndex + 1);
            }, 800);
        });
    }
    
    displayWinnerNumber(participant, onComplete) {
        const code = typeof participant === 'object' ? (participant.code || participant.number) : participant;
        
        // Extract only the numeric part from the code (remove letters)
        const numberPart = code.replace(/[^0-9]/g, '');
        
        // Pad with leading zeros to make it 6 digits, then split
        const paddedNumber = numberPart.padStart(6, '0');
        const digits = paddedNumber.split('');
        
        // Use configured delay for each character
        const baseDelay = this.settings.digitDelay * 1000;
        
        this.numberBoxes.forEach((box, index) => {
            setTimeout(() => {
                // Stop rotating for this specific box
                box.classList.remove('rotating');
                
                box.textContent = digits[index] || '0';
                box.parentElement.classList.add('winner');
                
                setTimeout(() => {
                    box.parentElement.classList.remove('winner');
                }, 1500);
                
                // Call onComplete after last digit is displayed
                if (index === this.numberBoxes.length - 1 && onComplete) {
                    setTimeout(() => {
                        onComplete();
                    }, 500); // Small delay after last digit for visual effect
                }
            }, index * baseDelay);
        });
    }
    
    updateWinnersList(isNewWinner = false) {
        const winnersList = document.querySelector('.winners-list');
        
        if (this.winners.length === 0) return;
        
        // Group winners by drawId
        const groupedWinners = {};
        this.winners.forEach(winner => {
            const drawId = winner.drawId || 0;
            if (!groupedWinners[drawId]) {
                groupedWinners[drawId] = [];
            }
            groupedWinners[drawId].push(winner);
        });
        
        // Render all winner groups
        winnersList.innerHTML = '';
        const drawIds = Object.keys(groupedWinners).sort((a, b) => b - a); // Most recent first
        
        drawIds.forEach(drawId => {
            const winnersInDraw = groupedWinners[drawId];
            const isExpanded = this.expandedDraws.has(drawId);
            const maxDisplay = 1; // Show max 1 winner when collapsed
            const hasMoreWinners = winnersInDraw.length > maxDisplay;
            
            // Create draw group container
            const drawGroup = document.createElement('div');
            drawGroup.className = 'winner-draw-group';
            drawGroup.dataset.drawId = drawId;
            
            // Show winners (limited or all)
            const winnersToShow = isExpanded ? winnersInDraw : winnersInDraw.slice(0, maxDisplay);
            winnersToShow.forEach(winner => {
                const winnerItem = document.createElement('div');
                winnerItem.className = 'winner-item';
                const displayCode = winner.code || winner.number || '';
                
                // Get prize display name from dynamic prizes or use the prize name itself
                let prizeDisplay = winner.prize;
                const prizeObj = this.prizes.find(p => p.name === winner.prize);
                if (prizeObj) {
                    prizeDisplay = prizeObj.icon ? `${prizeObj.icon} ${prizeObj.name.toUpperCase()}` : prizeObj.name.toUpperCase();
                } else {
                    prizeDisplay = winner.prize.toUpperCase();
                }
                
                winnerItem.innerHTML = `
                    <div class="winner-number">${displayCode}</div>
                    <div class="winner-name">${winner.name || ''}</div>
                    <div class="winner-prize">${prizeDisplay}</div>
                `;
                drawGroup.appendChild(winnerItem);
            });
            
            // Add expand/collapse button if needed
            if (hasMoreWinners) {
                const toggleBtn = document.createElement('button');
                toggleBtn.className = 'winner-toggle-btn';
                const remainingCount = winnersInDraw.length - maxDisplay;
                toggleBtn.innerHTML = isExpanded 
                    ? `<span>▲ Thu gọn</span>`
                    : `<span>▼ Xem thêm ${remainingCount} người</span>`;
                
                toggleBtn.addEventListener('click', () => {
                    if (this.expandedDraws.has(drawId)) {
                        this.expandedDraws.delete(drawId);
                    } else {
                        this.expandedDraws.add(drawId);
                    }
                    this.updateWinnersList(false);
                });
                
                drawGroup.appendChild(toggleBtn);
            }
            
            winnersList.appendChild(drawGroup);
        });
    }
    
    showCongratulationsPopup(winners) {
        // Handle both single winner and multiple winners
        const winnerArray = Array.isArray(winners) ? winners : [winners];
        const firstWinner = winnerArray[0];
        
        // Get reward from prize settings
        const prizeObj = this.prizes.find(p => p.name === firstWinner.prize);
        let reward = prizeObj && prizeObj.reward ? prizeObj.reward : firstWinner.prize;
        
        // Get current count
        const currentCount = this.prizeDrawCount[firstWinner.prize] || 0;
        
        // Create popup overlay
        const overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        
        // Create popup content
        const popup = document.createElement('div');
        popup.className = 'popup-content';
        
        // Build winners list HTML
        let winnersHTML = '';
        winnerArray.forEach((winner, index) => {
            const displayCode = winner.code || winner.number || '';
            const position = index + 1; // Position in current draw (1, 2, 3, ...)
            winnersHTML += `
                <div class="popup-winner-item">
                    <div class="popup-winner-position">#${position}</div>
                    <div class="popup-winner-details">
                        <div class="popup-number">${displayCode}</div>
                        <div class="popup-name">${winner.name}</div>
                    </div>
                </div>
            `;
        });
        
        popup.innerHTML = `
            <div class="popup-icon">🎉</div>
            <h2 class="popup-title">${languageManager.t('congratulations')}</h2>
            <div class="popup-subtitle">${languageManager.t('prizeLabel')} ${reward}</div>
            <div class="popup-count">${languageManager.t('totalWinners')}: ${winnerArray.length} ${languageManager.t('people')}</div>
            <div class="popup-winners-container ${winnerArray.length > 12 ? 'multi-column-3' : winnerArray.length > 6 ? 'multi-column' : ''}">
                ${winnersHTML}
            </div>
            <button class="popup-close">${languageManager.t('btnClose')}</button>
        `;
        
        overlay.appendChild(popup);
        document.body.appendChild(overlay);
        
        // Add animation
        setTimeout(() => {
            overlay.classList.add('show');
        }, 10);
        
        // Close button handler
        const closeBtn = popup.querySelector('.popup-close');
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('show');
            setTimeout(() => {
                overlay.remove();
            }, 300);
        });
        
        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('show');
                setTimeout(() => {
                    overlay.remove();
                }, 300);
            }
        });
    }
    
    celebrateWin() {
        // Create confetti effect
        this.createConfetti();
        
        // Play celebration animation
        const displayArea = document.querySelector('.display-area');
        displayArea.style.animation = 'none';
        setTimeout(() => {
            displayArea.style.animation = 'celebrationPulse 0.5s ease-in-out';
        }, 10);
        
        setTimeout(() => {
            displayArea.style.animation = '';
        }, 500);
    }
    
    createConfetti() {
        const colors = ['#ffd700', '#ff6b35', '#f7931e', '#c0c0c0', '#cd7f32'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 0.5 + 's';
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }, i * 30);
        }
    }
    
    loadSettings() {
        const defaultPrizes = [
            { name: 'giải đặc biệt', icon: '🏆', count: 1, reward: '' },
            { name: 'giải nhất', icon: '🥇', count: 1, reward: '' },
            { name: 'giải nhì', icon: '🥈', count: 1, reward: '' },
            { name: 'giải ba', icon: '🥉', count: 1, reward: '' }
        ];
        
        const defaultSettings = {
            spinDuration: 5,
            digitDelay: 0.5,
            prizes: defaultPrizes
        };
        
        const saved = localStorage.getItem('luckydraw_settings');
        if (saved) {
            try {
                const settings = JSON.parse(saved);
                
                // Migration: Convert old format to new format
                if (settings.prizeCount && !settings.prizes) {
                    settings.prizes = [];
                    const oldPrizes = [
                        { name: 'giải đặc biệt', icon: '🏆' },
                        { name: 'giải nhất', icon: '🥇' },
                        { name: 'giải nhì', icon: '🥈' },
                        { name: 'giải ba', icon: '🥉' },
                        { name: 'giải khuyến khích', icon: '🎁' }
                    ];
                    
                    oldPrizes.forEach(p => {
                        if (settings.prizeCount[p.name]) {
                            settings.prizes.push({
                                name: p.name,
                                icon: p.icon,
                                count: settings.prizeCount[p.name],
                                reward: settings.prizeRewards[p.name] || ''
                            });
                        }
                    });
                    
                    delete settings.prizeCount;
                    delete settings.prizeRewards;
                }
                
                this.prizes = settings.prizes || defaultPrizes;
                
                // Load saved settings into form
                setTimeout(() => {
                    this.loadSettingsToForm(settings);
                }, 0);
                return settings;
            } catch (e) {
                this.prizes = defaultPrizes;
                return defaultSettings;
            }
        }
        
        this.prizes = defaultPrizes;
        // Load default values into form
        setTimeout(() => {
            this.loadSettingsToForm(defaultSettings);
        }, 0);
        return defaultSettings;
    }
    
    loadSettingsToForm(settings) {
        const spinDurationInput = document.getElementById('spin-duration');
        const digitDelayInput = document.getElementById('digit-delay');
        
        if (spinDurationInput) spinDurationInput.value = settings.spinDuration;
        if (digitDelayInput) digitDelayInput.value = settings.digitDelay;
        
        // Render dynamic prizes
        this.renderPrizesList();
    }
    
    saveSettings() {
        const spinDuration = parseFloat(document.getElementById('spin-duration').value);
        const digitDelay = parseFloat(document.getElementById('digit-delay').value);
        
        // Read prizes from form
        const prizeItems = document.querySelectorAll('.prize-item-config');
        this.prizes = [];
        
        prizeItems.forEach(item => {
            const name = item.querySelector('.prize-name-input').value.trim();
            const icon = item.querySelector('.prize-icon-input').value.trim() || '🏆';
            const count = parseInt(item.querySelector('.prize-count-input').value) || 1;
            const reward = item.querySelector('.prize-reward-input').value.trim();
            
            if (name) {
                this.prizes.push({ name, icon, count, reward });
            }
        });
        
        this.settings = {
            spinDuration,
            digitDelay,
            prizes: this.prizes
        };
        
        localStorage.setItem('luckydraw_settings', JSON.stringify(this.settings));
        
        // Update prize selector and display
        // Keep current prize if it still exists, otherwise use first prize
        const currentStillExists = this.prizes.find(p => p.name === this.currentPrize);
        if (!currentStillExists && this.prizes.length > 0) {
            this.currentPrize = this.prizes[0].name;
        }
        this.renderPrizeSelector();
        
        alert(languageManager.t('alertSettingsSaved'));
    }
    
    resetSettings() {
        const defaultPrizes = [
            { name: 'giải đặc biệt', icon: '🏆', count: 1, reward: '' },
            { name: 'giải nhất', icon: '🥇', count: 1, reward: '' },
            { name: 'giải nhì', icon: '🥈', count: 1, reward: '' },
            { name: 'giải ba', icon: '🥉', count: 1, reward: '' }
        ];
        
        const defaultSettings = {
            spinDuration: 10,
            digitDelay: 2,
            prizes: defaultPrizes
        };
        
        this.prizes = defaultPrizes;
        this.settings = defaultSettings;
        this.loadSettingsToForm(defaultSettings);
        localStorage.setItem('luckydraw_settings', JSON.stringify(this.settings));
        
        // Update prize selector
        this.currentPrize = this.prizes[0].name;
        this.renderPrizeSelector();
        
        alert(languageManager.t('alertSettingsReset'));
    }
    
    // Prize management methods
    renderPrizeSelector() {
        const prizeSelector = document.getElementById('prize-selector');
        if (!prizeSelector) return;
        
        prizeSelector.innerHTML = '';
        
        // Set currentPrize to first prize if not set or invalid
        if (!this.currentPrize || !this.prizes.find(p => p.name === this.currentPrize)) {
            this.currentPrize = this.prizes.length > 0 ? this.prizes[0].name : null;
        }
        
        this.prizes.forEach((prize, index) => {
            const btn = document.createElement('button');
            btn.className = 'prize-btn';
            if (prize.name === this.currentPrize) {
                btn.classList.add('active');
            }
            btn.dataset.prize = prize.name;
            btn.innerHTML = `
                <span class="prize-icon">${prize.icon}</span>
                <span>${prize.name.toUpperCase()}</span>
            `;
            prizeSelector.appendChild(btn);
        });
        
        // Update prize display after rendering
        this.updatePrizeDisplay();
    }
    
    renderPrizesList() {
        const prizesList = document.getElementById('prizes-list');
        if (!prizesList) return;
        
        prizesList.innerHTML = '';
        
        this.prizes.forEach((prize, index) => {
            const prizeItem = document.createElement('div');
            prizeItem.className = 'prize-item-config';
            prizeItem.innerHTML = `
                <div class="prize-item-header">
                    <input type="text" class="prize-icon-input" value="${prize.icon}" placeholder="🏆" maxlength="2">
                    <input type="text" class="prize-name-input" value="${prize.name}" placeholder="Tên giải thưởng">
                    <button class="btn-remove-prize" data-index="${index}">🗑️</button>
                </div>
                <div class="prize-item-details">
                    <div class="prize-detail-field">
                        <label>Số lượng:</label>
                        <input type="number" class="prize-count-input" value="${prize.count}" min="1" max="1000">
                    </div>
                    <div class="prize-detail-field">
                        <label>Phần thưởng:</label>
                        <input type="text" class="prize-reward-input" value="${prize.reward}" placeholder="VD: 10.000.000đ">
                    </div>
                </div>
            `;
            
            // Add remove button listener
            const removeBtn = prizeItem.querySelector('.btn-remove-prize');
            removeBtn.addEventListener('click', () => this.removePrize(index));
            
            prizesList.appendChild(prizeItem);
        });
    }
    
    addNewPrize() {
        this.prizes.push({
            name: `Giải thưởng ${this.prizes.length + 1}`,
            icon: '🎁',
            count: 1,
            reward: ''
        });
        this.renderPrizesList();
    }
    
    removePrize(index) {
        if (this.prizes.length <= 1) {
            alert('Phải có ít nhất 1 giải thưởng!');
            return;
        }
        
        if (confirm(`Xóa giải "${this.prizes[index].name}"?`)) {
            this.prizes.splice(index, 1);
            this.renderPrizesList();
        }
    }
    
    // Background upload methods
    handleBackgroundUpload(event) {
        const file = event.target.files[0];
        
        if (!file) {
            return;
        }
        
        // Validate file type
        if (!file.type.match('image.*')) {
            alert(languageManager ? languageManager.t('Please upload an image file (JPG, PNG, GIF)') : 'Please upload an image file (JPG, PNG, GIF)');
            return;
        }
        
        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            alert(languageManager ? languageManager.t('File size must be less than 10MB') : 'File size must be less than 10MB');
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const imageData = e.target.result;
            
            // Save to localStorage
            try {
                localStorage.setItem('luckydraw_custom_background', imageData);
                this.applyCustomBackground(imageData);
                this.updateBackgroundPreview(imageData);
                
                // Show success message
                const preview = document.getElementById('background-preview');
                const successMsg = languageManager ? languageManager.t('bgUploadSuccess') : '✅ Background uploaded!';
                preview.innerHTML = `<div class="preview-text success">${successMsg}</div>`;
                
                setTimeout(() => {
                    this.updateBackgroundPreview(imageData);
                }, 2000);
                
            } catch (error) {
                console.error('Error saving background:', error);
                alert('Failed to save background. The image might be too large. Please try a smaller image.');
            }
        };
        
        reader.onerror = () => {
            alert('Failed to read the image file. Please try again.');
        };
        
        reader.readAsDataURL(file);
    }
    
    applyCustomBackground(imageData) {
        if (!imageData) {
            return;
        }
        
        document.body.style.backgroundImage = `url(${imageData})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundAttachment = 'fixed';
        
        // Add overlay to maintain readability
        let overlay = document.querySelector('.background-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'background-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(26, 26, 46, 0.7);
                z-index: -1;
                pointer-events: none;
            `;
            document.body.insertBefore(overlay, document.body.firstChild);
        }
    }
    
    resetBackground() {
        // Remove from localStorage
        localStorage.removeItem('luckydraw_custom_background');
        
        // Reset to default
        document.body.style.backgroundImage = '';
        document.body.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
        
        // Remove overlay
        const overlay = document.querySelector('.background-overlay');
        if (overlay) {
            overlay.remove();
        }
        
        // Update preview
        const preview = document.getElementById('background-preview');
        if (preview) {
            const successMsg = languageManager ? languageManager.t('bgResetSuccess') : '✅ Reset to default';
            preview.innerHTML = `<div class="preview-text">${successMsg}</div>`;
            
            setTimeout(() => {
                const noCustomMsg = languageManager ? languageManager.t('bgNoCustom') : 'No custom background';
                preview.innerHTML = `<div class="preview-text">${noCustomMsg}</div>`;
            }, 2000);
        }
        
        // Reset file input
        const fileInput = document.getElementById('background-upload');
        if (fileInput) {
            fileInput.value = '';
        }
    }
    
    loadCustomBackground() {
        const savedBackground = localStorage.getItem('luckydraw_custom_background');
        
        if (savedBackground) {
            this.applyCustomBackground(savedBackground);
            this.updateBackgroundPreview(savedBackground);
        }
    }
    
    updateBackgroundPreview(imageData) {
        const preview = document.getElementById('background-preview');
        if (!preview) {
            return;
        }
        
        if (imageData) {
            preview.style.backgroundImage = `url(${imageData})`;
            preview.style.backgroundSize = 'cover';
            preview.style.backgroundPosition = 'center';
            const currentBgMsg = languageManager ? languageManager.t('bgCurrentBg') : 'Current Background';
            preview.innerHTML = `<div class="preview-overlay">${currentBgMsg}</div>`;
        } else {
            preview.style.backgroundImage = '';
            const noCustomMsg = languageManager ? languageManager.t('bgNoCustom') : 'No custom background';
            preview.innerHTML = `<div class="preview-text">${noCustomMsg}</div>`;
        }
    }
}

// Add celebration animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes celebrationPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.luckyDraw = new LuckyDraw();
    
    // Initialize language manager and set initial language
    // This will also display saved winners with proper translation
    languageManager.updatePageContent();
    
    // Setup language selector buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            languageManager.setLanguage(lang);
        });
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Only trigger shortcuts if not typing in an input field
        const isInputField = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA';
        
        if (!isInputField && e.key === 'Enter') {
            e.preventDefault();
            const drawBtn = document.querySelector('.btn-draw');
            if (!drawBtn.classList.contains('spinning')) {
                drawBtn.click();
            }
        }
        
        if (!isInputField && e.key === 'ArrowLeft') {
            e.preventDefault();
            document.querySelector('.btn-prev').click();
        }
        
        if (!isInputField && e.key === 'ArrowRight') {
            e.preventDefault();
            document.querySelector('.btn-next').click();
        }
    });
    
    // Add smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add particles background effect
class ParticlesBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        
        this.init();
    }
    
    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '0';
        this.canvas.style.opacity = '0.3';
        this.canvas.style.overflow = 'hidden';
        
        document.body.insertBefore(this.canvas, document.body.firstChild);
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        // Use requestAnimationFrame to batch resize operations
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        
        this.resizeTimeout = setTimeout(() => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }, 100);
    }
    
    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }
    }
    
    animate() {
        // Only animate if page is visible
        if (document.hidden) {
            requestAnimationFrame(() => this.animate());
            return;
        }
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 215, 0, 0.5)';
            this.ctx.fill();
        });
        
        // Draw connections
        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(255, 215, 0, ${0.2 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
}

// Initialize particles background
new ParticlesBackground();
