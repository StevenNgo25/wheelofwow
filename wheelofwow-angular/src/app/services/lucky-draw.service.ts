import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StorageService } from './storage.service';
import { TranslationService } from './translation.service';

export interface Participant {
  code: string;
  name: string;
}

export interface Prize {
  name: string;
  icon: string;
  count: number;
  reward: string;
}

export interface Winner {
  code: string;
  name: string;
  prize: string;
  drawId: number;
}

export interface Settings {
  spinDuration: number;
  digitDelay: number;
  prizes: Prize[];
}

@Injectable({
  providedIn: 'root'
})
export class LuckyDrawService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly storage = inject(StorageService);
  private readonly translation = inject(TranslationService);

  private readonly STORAGE_KEYS = {
    PARTICIPANTS: 'luckydraw_participants',
    REMAINING: 'luckydraw_remaining',
    WINNERS: 'luckydraw_winners',
    PRIZE_DRAW_COUNT: 'luckydraw_prizecount',
    DRAW_SESSION_ID: 'luckydraw_drawsessionid',
    SETTINGS: 'luckydraw_settings',
    BACKGROUND: 'luckydraw_custom_background',
    PARTICIPANTS_RAW: 'luckydraw_participants_raw'
  };

  // Signals for state management
  participants = signal<Participant[]>([]);
  remainingParticipants = signal<Participant[]>([]);
  winners = signal<Winner[]>([]);
  prizes = signal<Prize[]>([]);
  currentPrize = signal<string | null>(null);
  isSpinning = signal<boolean>(false);
  prizeDrawCount = signal<Record<string, number>>({});
  drawSessionId = signal<number>(0);
  customBackground = signal<string | null>(null);
  participantsRaw = signal<string>('');
  
  settings = signal<Settings>({
    spinDuration: 10,
    digitDelay: 2,
    prizes: [
      { name: 'giải đặc biệt', icon: '🏆', count: 1, reward: '' },
      { name: 'giải nhất', icon: '🥇', count: 1, reward: '' },
      { name: 'giải nhì', icon: '🥈', count: 1, reward: '' },
      { name: 'giải ba', icon: '🥉', count: 1, reward: '' }
    ]
  });

  constructor() {
    this.loadFromStorage();
  }

  updatePrizesByLanguage() {
    const currentPrizes = [...this.prizes()];
    const currentPrizeName = this.currentPrize();
    let updated = false;

    currentPrizes.forEach(p => {
      const key = this.translation.getPrizeKey(p.name);
      if (key) {
        const newName = this.translation.t()[key];
        if (p.name !== newName) {
          if (currentPrizeName === p.name) {
            this.currentPrize.set(newName);
          }
          p.name = newName;
          updated = true;
        }
      }
    });

    if (updated) {
      this.prizes.set(currentPrizes);
      this.updateSettingsPrizes();
    }
  }

  loadFromStorage() {
    if (!this.isBrowser) return;

    const p = this.storage.getData<Participant[]>(this.STORAGE_KEYS.PARTICIPANTS) || [];
    const r = this.storage.getData<Participant[]>(this.STORAGE_KEYS.REMAINING) || [...p];
    const w = this.storage.getData<Winner[]>(this.STORAGE_KEYS.WINNERS) || [];
    const pdc = this.storage.getData<Record<string, number>>(this.STORAGE_KEYS.PRIZE_DRAW_COUNT) || {};
    const dsid = this.storage.getData<number>(this.STORAGE_KEYS.DRAW_SESSION_ID) || 0;
    const s = this.storage.getData<Settings>(this.STORAGE_KEYS.SETTINGS);
    const bg = this.storage.getData<string>(this.STORAGE_KEYS.BACKGROUND);
    const praw = this.storage.getData<string>(this.STORAGE_KEYS.PARTICIPANTS_RAW) || '';

    this.participants.set(p);
    this.remainingParticipants.set(r);
    this.winners.set(w);
    this.prizeDrawCount.set(pdc);
    this.drawSessionId.set(dsid);
    if (s) {
      this.settings.set(s);
      this.prizes.set(s.prizes);
    } else {
      // Initialize with translated defaults if no settings found
      const defaultPrizes: Prize[] = [
        { name: this.translation.t().grandPrize, icon: '🏆', count: 1, reward: '' },
        { name: this.translation.t().firstPrize, icon: '🥇', count: 1, reward: '' },
        { name: this.translation.t().secondPrize, icon: '🥈', count: 1, reward: '' },
        { name: this.translation.t().thirdPrize, icon: '🥉', count: 1, reward: '' }
      ];
      this.settings.update((curr: Settings) => ({ ...curr, prizes: defaultPrizes }));
      this.prizes.set(defaultPrizes);
    }
    this.customBackground.set(bg);
    this.participantsRaw.set(praw);

    if (this.prizes().length > 0 && !this.currentPrize()) {
      this.currentPrize.set(this.prizes()[0].name);
    }
  }

  saveToStorage() {
    if (!this.isBrowser) return;
    this.storage.setData(this.STORAGE_KEYS.PARTICIPANTS, this.participants());
    this.storage.setData(this.STORAGE_KEYS.REMAINING, this.remainingParticipants());
    this.storage.setData(this.STORAGE_KEYS.WINNERS, this.winners());
    this.storage.setData(this.STORAGE_KEYS.PRIZE_DRAW_COUNT, this.prizeDrawCount());
    this.storage.setData(this.STORAGE_KEYS.DRAW_SESSION_ID, this.drawSessionId());
    this.storage.setData(this.STORAGE_KEYS.SETTINGS, this.settings());
    this.storage.setData(this.STORAGE_KEYS.BACKGROUND, this.customBackground());
    this.storage.setData(this.STORAGE_KEYS.PARTICIPANTS_RAW, this.participantsRaw());
  }

  setParticipants(text: string) {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const newParticipants: Participant[] = [];
    
    lines.forEach(line => {
      // Pattern for range: "1-2000" or "1 -> 2000" or "1 => 2000"
      const rangePattern = /^(\d+)\s*(?:-|=>|->)\s*(\d+)$/;
      const rangeMatch = line.match(rangePattern);
      
      if (rangeMatch) {
        const fromNumber = parseInt(rangeMatch[1]);
        const toNumber = parseInt(rangeMatch[2]);
        if (fromNumber <= toNumber) {
          for (let i = fromNumber; i <= toNumber; i++) {
            newParticipants.push({ code: String(i), name: this.translation.t().defaultParticipant });
          }
        }
      } else {
        const parts = line.split('-').map(p => p.trim());
        if (parts.length >= 2) {
          newParticipants.push({ code: parts[0], name: parts.slice(1).join(' - ') });
        } else {
          newParticipants.push({ code: line, name: this.translation.t().defaultParticipant });
        }
      }
    });

    this.participants.set(newParticipants);
    this.participantsRaw.set(text);
    this.remainingParticipants.set([...newParticipants]);
    this.winners.set([]);
    this.prizeDrawCount.set({});
    
    // Ensure currentPrize is set if we have prizes
    if (this.prizes().length > 0 && !this.currentPrize()) {
      this.currentPrize.set(this.prizes()[0].name);
    }
    
    this.saveToStorage();
  }

  drawOne(): Winner | null {
    const remaining = [...this.remainingParticipants()];
    if (remaining.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * remaining.length);
    const p = remaining.splice(randomIndex, 1)[0];
    
    const winner: Winner = {
      code: p.code,
      name: p.name,
      prize: this.currentPrize() || 'Default',
      drawId: this.drawSessionId()
    };

    this.remainingParticipants.set(remaining);
    this.saveToStorage();
    return winner;
  }

  confirmWinners(winners: Winner[]) {
    this.winners.update((w: Winner[]) => [...w, ...winners]);
    
    const pdc = { ...this.prizeDrawCount() };
    winners.forEach(w => {
      pdc[w.prize] = (pdc[w.prize] || 0) + 1;
    });
    this.prizeDrawCount.set(pdc);

    this.saveToStorage();
  }

  incrementSession() {
    this.drawSessionId.update((id: number) => id + 1);
    this.saveToStorage();
  }

  addNewPrize() {
    this.prizes.update((p: Prize[]) => [...p, { name: this.translation.t().newPrizeName, icon: '🎁', count: 1, reward: '' }]);
    this.updateSettingsPrizes();
  }

  removePrize(index: number) {
    this.prizes.update((p: Prize[]) => p.filter((_, i) => i !== index));
    this.updateSettingsPrizes();
  }

  updateSettingsPrizes() {
    this.settings.update((s: Settings) => ({ ...s, prizes: this.prizes() }));
    this.saveToStorage();
  }

  setBackground(imageData: string | null) {
    this.customBackground.set(imageData);
    this.saveToStorage();
  }

  navigatePrize(direction: number) {
    const list = this.prizes();
    if (list.length === 0) return;
    const currentIndex = list.findIndex((p: Prize) => p.name === this.currentPrize());
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = list.length - 1;
    if (nextIndex >= list.length) nextIndex = 0;
    this.currentPrize.set(list[nextIndex].name);
  }
}
