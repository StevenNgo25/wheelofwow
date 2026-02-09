import { Component, signal, inject, OnInit, ViewChild, ElementRef, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LuckyDrawService, Prize, Winner } from './services/lucky-draw.service';
import confetti from 'canvas-confetti';

import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly luckyDraw = inject(LuckyDrawService);
  protected readonly translation = inject(TranslationService);
  
  // UI State Signals
  protected readonly displayedDigits = signal<string[]>(['0', '0', '0', '0', '0', '0']);
  protected readonly isSpinningRapidly = signal<boolean>(false);
  protected readonly winnerInSlot = signal<number | null>(null); 
  protected readonly showPopup = signal<boolean>(false);
  protected readonly lastWinners = signal<Winner[]>([]);
  protected readonly expandedDraws = signal<Set<number>>(new Set());

  @ViewChild('backgroundUpload') backgroundUpload!: ElementRef<HTMLInputElement>;
  private spinInterval: any;

  ngOnInit() {
    // Initialization
  }

  setLang(lang: string) {
    this.translation.setLang(lang as 'vi' | 'en');
  }

  async startDraw() {
    if (this.luckyDraw.isSpinning()) return;
    
    const currentPrizeName = this.luckyDraw.currentPrize();
    const currentPrize = this.luckyDraw.prizes().find((p: Prize) => p.name === currentPrizeName);
    const countToDraw = currentPrize ? currentPrize.count : 1;
    const remaining = this.luckyDraw.remainingParticipants().length;
    const actualDrawCount = Math.min(countToDraw, remaining);

    if (actualDrawCount === 0) {
      alert('Không còn người tham gia!');
      return;
    }

    this.luckyDraw.isSpinning.set(true);
    this.isSpinningRapidly.set(true);
    this.winnerInSlot.set(null);

    // Initial rapid spinning animation
    this.spinInterval = setInterval(() => {
      this.displayedDigits.set(Array.from({ length: 6 }, () => Math.floor(Math.random() * 10).toString()));
    }, 100);

    // After duration, stop and show winners
    const spinDuration = this.luckyDraw.settings().spinDuration * 1000;
    
    setTimeout(() => {
      clearInterval(this.spinInterval);
      this.isSpinningRapidly.set(false);
      
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

    digits.forEach((digit, i) => {
      setTimeout(() => {
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

  protected getGroupedWinners(): [number, Winner[]][] {
    const winners = this.luckyDraw.winners();
    const groups = new Map<number, Winner[]>();
    winners.forEach((w: Winner) => {
      const list = groups.get(w.drawId) || [];
      list.push(w);
      groups.set(w.drawId, list);
    });
    return Array.from(groups.entries()).sort((a, b) => b[0] - a[0]);
  }

  toggleExpand(drawId: number) {
    this.expandedDraws.update((set: Set<number>) => {
      const newSet = new Set(set);
      if (newSet.has(drawId)) newSet.delete(drawId);
      else newSet.add(drawId);
      return newSet;
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
    alert('Đã lưu cài đặt!');
  }

  resetSettings() {
    if (confirm('Bạn có chắc muốn khôi phục cài đặt gốc?')) {
      localStorage.removeItem('luckydraw_settings');
      localStorage.removeItem('luckydraw_custom_background');
      window.location.reload();
    }
  }
}
