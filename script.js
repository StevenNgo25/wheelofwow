// Lucky Draw Application
class LuckyDraw {
    constructor() {
        this.participants = [];
        this.remainingParticipants = [];
        this.winners = [];
        this.currentPrize = 'giải ba';
        this.isSpinning = false;
        this.numberBoxes = document.querySelectorAll('.number');
        this.spinInterval = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadFromLocalStorage();
    }
    
    setupEventListeners() {
        // Prize selection buttons
        const prizeBtns = document.querySelectorAll('.prize-btn');
        prizeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                prizeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentPrize = btn.dataset.prize;
                this.updatePrizeDisplay();
            });
        });
        
        // Draw button
        const drawBtn = document.querySelector('.btn-draw');
        drawBtn.addEventListener('click', () => this.startDraw());
        
        // Load participants button
        const loadBtn = document.getElementById('load-participants');
        loadBtn.addEventListener('click', () => this.loadParticipants());
        
        // Navigation buttons
        document.querySelector('.btn-prev').addEventListener('click', () => this.navigatePrize(-1));
        document.querySelector('.btn-next').addEventListener('click', () => this.navigatePrize(1));
    }
    
    loadFromLocalStorage() {
        // Try to load from localStorage first
        const savedParticipants = localStorage.getItem('luckydraw_participants');
        const savedRemaining = localStorage.getItem('luckydraw_remaining');
        const savedWinners = localStorage.getItem('luckydraw_winners');
        
        if (savedParticipants) {
            this.participants = JSON.parse(savedParticipants);
            this.remainingParticipants = savedRemaining ? JSON.parse(savedRemaining) : [...this.participants];
            this.winners = savedWinners ? JSON.parse(savedWinners) : [];
            
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
        
        // Parse code and name (format: "code - name" or just "code")
        // Code format: <prefix><number> e.g., VNPT0001, CTV00001
        this.participants = lines.map(line => {
            const parts = line.split('-').map(p => p.trim());
            if (parts.length >= 2) {
                // Has name: "code - name"
                const code = parts[0].trim();
                const name = parts.slice(1).join(' - ');
                return { code, name };
            } else {
                // Only code
                const code = line.trim();
                return { code, name: languageManager.t('defaultParticipant') };
            }
        });
        
        this.remainingParticipants = [...this.participants];
        this.winners = [];
        this.saveToLocalStorage();
        this.updateParticipantsDisplay();
        
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
        prizeTitle.textContent = this.currentPrize.toUpperCase();
    }
    
    navigatePrize(direction) {
        const prizes = ['giải đặc biệt', 'giải nhất', 'giải nhì', 'giải ba', 'giải khuyến khích'];
        const currentIndex = prizes.indexOf(this.currentPrize);
        let newIndex = currentIndex + direction;
        
        if (newIndex < 0) newIndex = prizes.length - 1;
        if (newIndex >= prizes.length) newIndex = 0;
        
        this.currentPrize = prizes[newIndex];
        
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
        
        this.isSpinning = true;
        const drawBtn = document.querySelector('.btn-draw');
        drawBtn.classList.add('spinning');
        drawBtn.querySelector('span').textContent = languageManager.t('btnDrawing');
        
        // Start number rotation animation
        this.startNumberRotation();
        
        // Stop after 10 seconds
        const spinDuration = 10000;
        
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
        
        // Pick a random winner
        const randomIndex = Math.floor(Math.random() * this.remainingParticipants.length);
        const winner = this.remainingParticipants[randomIndex];
        
        // Display winner number digit by digit with animation
        this.displayWinnerNumber(winner);
        
        // Remove winner from remaining participants
        this.remainingParticipants.splice(randomIndex, 1);
        
        // Add to winners list
        this.winners.push({
            code: typeof winner === 'object' ? (winner.code || winner.number) : winner,
            name: typeof winner === 'object' ? winner.name : 'Người tham gia',
            prize: this.currentPrize
        });
        
        // Update displays 
        // Total time = 10s (spin) + (5 * 2s) (last digit at index 5) = 20s
        setTimeout(() => {
            this.updateParticipantsDisplay();
            this.updateWinnersList(true);
            this.celebrateWin();
            this.saveToLocalStorage();
            
            // Show congratulations popup
            this.showCongratulationsPopup(this.winners[this.winners.length - 1]);
            
            const drawBtn = document.querySelector('.btn-draw');
            drawBtn.classList.remove('spinning');
            drawBtn.querySelector('span').textContent = languageManager.t('btnDraw');
            this.isSpinning = false;
        }, 10000);
    }
    
    displayWinnerNumber(participant) {
        const code = typeof participant === 'object' ? (participant.code || participant.number) : participant;
        
        // Extract only the numeric part from the code (remove letters)
        const numberPart = code.replace(/[^0-9]/g, '');
        const digits = numberPart.split('').slice(-6); // Get last 6 digits
        
        // Fixed delay for each character to have consistent timing
        const baseDelay = 2000; // 2 seconds per character
        
        this.numberBoxes.forEach((box, index) => {
            setTimeout(() => {
                // Stop rotating for this specific box
                box.classList.remove('rotating');
                
                box.textContent = digits[index] || '0';
                box.parentElement.classList.add('winner');
                
                setTimeout(() => {
                    box.parentElement.classList.remove('winner');
                }, 1500);
            }, index * baseDelay);
        });
    }
    
    updateWinnersList(isNewWinner = false) {
        const winnersList = document.querySelector('.winners-list');
        
        if (this.winners.length === 0) return;
        
        // If adding a new winner, just insert at the beginning
        if (isNewWinner) {
            const lastWinner = this.winners[this.winners.length - 1];
            const winnerItem = document.createElement('div');
            winnerItem.className = 'winner-item';
            const displayCode = lastWinner.code || lastWinner.number || '';
            winnerItem.innerHTML = `
                <div class="winner-number">${displayCode}</div>
                <div class="winner-name">${lastWinner.name || ''}</div>
                <div class="winner-prize">${languageManager.getPrizeTranslation(lastWinner.prize)}</div>
            `;
            winnersList.insertBefore(winnerItem, winnersList.firstChild);
            return;
        }
        
        // Otherwise, re-render all winners (for load/translation)
        winnersList.innerHTML = '';
        this.winners.forEach(winner => {
            const winnerItem = document.createElement('div');
            winnerItem.className = 'winner-item';
            const displayCode = winner.code || winner.number || '';
            winnerItem.innerHTML = `
                <div class="winner-number">${displayCode}</div>
                <div class="winner-name">${winner.name || ''}</div>
                <div class="winner-prize">${languageManager.getPrizeTranslation(winner.prize)}</div>
            `;
            winnersList.appendChild(winnerItem);
        });
    }
    
    showCongratulationsPopup(winner) {
        // Map prizes to rewards
        const prizeRewards = {
            'giải đặc biệt': 'Máy sấy TOSHIBA',
            'giải nhất': 'Loa Tháp Karaoke Samsung',
            'giải nhì': 'Sưởi gốm Nagakawa',
            'giải ba': 'Nồi chiên không dầu',
            'giải khuyến khích': 'Phiếu mua hàng 100.000đ'
        };
        
        const reward = prizeRewards[winner.prize] || winner.prize.toUpperCase();
        
        // Create popup overlay
        const overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        
        // Create popup content
        const popup = document.createElement('div');
        popup.className = 'popup-content';
        const displayCode = winner.code || winner.number || '';
        popup.innerHTML = `
            <div class="popup-icon">🎉</div>
            <h2 class="popup-title">${languageManager.t('congratulations')}</h2>
            <div class="popup-winner-info">
                <div class="popup-number">${displayCode}</div>
                <div class="popup-name">${winner.name}</div>
            </div>
            <div class="popup-prize">${languageManager.t('prizeLabel')} ${reward}</div>
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
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            const drawBtn = document.querySelector('.btn-draw');
            if (!drawBtn.classList.contains('spinning')) {
                drawBtn.click();
            }
        }
        
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            document.querySelector('.btn-prev').click();
        }
        
        if (e.key === 'ArrowRight') {
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
        
        document.body.insertBefore(this.canvas, document.body.firstChild);
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
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
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particles background
new ParticlesBackground();
