import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuckyDrawService, Winner } from '../../services/lucky-draw.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-winners-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './winners-list.html',
  styleUrl: './winners-list.scss',
})
export class WinnersList {
  protected readonly luckyDraw = inject(LuckyDrawService);
  protected readonly translation = inject(TranslationService);
  
  protected readonly expandedDraws = signal<Set<number>>(new Set());

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
}
