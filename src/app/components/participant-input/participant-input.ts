import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuckyDrawService } from '../../services/lucky-draw.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-participant-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './participant-input.html',
  styleUrl: './participant-input.scss',
})
export class ParticipantInput {
  protected readonly luckyDraw = inject(LuckyDrawService);
  protected readonly translation = inject(TranslationService);
}
