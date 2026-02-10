import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuckyDrawService, Prize, Winner } from '../../services/lucky-draw.service';
import { TranslationService } from '../../services/translation.service';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-draw-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draw-area.html',
  styleUrl: './draw-area.scss',
})
export class DrawArea {
  protected readonly luckyDraw = inject(LuckyDrawService);
  protected readonly translation = inject(TranslationService);
  
  // UI State Signals
  protected readonly displayedDigits = signal<string[]>(['0', '0', '0', '0', '0', '0']);
  protected readonly digitSpinning = signal<boolean[]>([false, false, false, false, false, false]);
  protected readonly winnerInSlot = signal<number | null>(null); 
  protected readonly showPopup = signal<boolean>(false);
  protected readonly lastWinners = signal<Winner[]>([]);
  private spinInterval: any;

  async startDraw() {
    if (this.luckyDraw.isSpinning()) return;
    
    const currentPrizeName = this.luckyDraw.currentPrize();
    const currentPrize = this.luckyDraw.prizes().find((p: Prize) => p.name === currentPrizeName);
    const countToDraw = currentPrize ? currentPrize.count : 1;
    const remaining = this.luckyDraw.remainingParticipants().length;
    const actualDrawCount = Math.min(countToDraw, remaining);

    if (actualDrawCount === 0) {
      alert(this.translation.t().alertNoParticipants);
      return;
    }

    this.luckyDraw.isSpinning.set(true);
    this.digitSpinning.set([true, true, true, true, true, true]);
    this.winnerInSlot.set(null);

    // Initial rapid spinning animation
    this.spinInterval = setInterval(() => {
      const currentDigits = this.displayedDigits();
      const isSpinning = this.digitSpinning();
      const newDigits = currentDigits.map((d, i) => 
        isSpinning[i] ? Math.floor(Math.random() * 10).toString() : d
      );
      this.displayedDigits.set(newDigits);
    }, 100);

    // After duration, stop and show winners
    const spinDuration = this.luckyDraw.settings().spinDuration * 1000;
    
    setTimeout(() => {
      // We don't clear interval here yet, we let it keep spinning for digits that haven't stopped
      const sessionWinners: Winner[] = [];
      for (let i = 0; i < actualDrawCount; i++) {
        const winner = this.luckyDraw.drawOne();
        if (winner) sessionWinners.push(winner);
      }
      
      this.displayWinnersSequentially(sessionWinners, 0);
    }, spinDuration);
  }

  private displayWinnersSequentially(winners: Winner[], index: number) {
    if (index >= winners.length) {
      clearInterval(this.spinInterval); // Finally clear when all winners drawn
      this.digitSpinning.set([false, false, false, false, false, false]);
      this.luckyDraw.incrementSession();
      this.luckyDraw.confirmWinners(winners);
      this.luckyDraw.isSpinning.set(false);
      this.lastWinners.set(winners);
      this.showPopup.set(true);
      return;
    }

    const winner = winners[index];
    this.displayWinnerNumber(winner, () => {
      this.triggerConfetti();
      setTimeout(() => {
        this.displayWinnersSequentially(winners, index + 1);
      }, 1000);
    });
  }

  private displayWinnerNumber(winner: Winner, onComplete: () => void) {
    const code = winner.code.replace(/[^0-9]/g, '').padStart(6, '0');
    const digits = code.split('');
    const digitDelay = this.luckyDraw.settings().digitDelay * 1000;

    // Reset spinning for new winner
    this.digitSpinning.set([true, true, true, true, true, true]);

    digits.forEach((digit, i) => {
      setTimeout(() => {
        // Stop spinning for this digit
        this.digitSpinning.update(s => {
          const newS = [...s];
          newS[i] = false;
          return newS;
        });

        this.displayedDigits.update((d: string[]) => {
          const newDigits = [...d];
          newDigits[i] = digit;
          return newDigits;
        });
        
        // Highlight effect
        this.winnerInSlot.set(i);
        
        if (i === digits.length - 1) {
          setTimeout(onComplete, 500);
        }
      }, i * digitDelay);
    });
  }

  triggerConfetti() {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#ff6b35', '#f7931e', '#c0c0c0', '#cd7f32']
    });
  }
}
