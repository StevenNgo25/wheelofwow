import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuckyDrawService } from '../services/lucky-draw.service';
import { DrawArea } from '../components/draw-area/draw-area';
import { WinnersList } from '../components/winners-list/winners-list';
import { ParticipantInput } from '../components/participant-input/participant-input';
import { SettingsPanel } from '../components/settings-panel/settings-panel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DrawArea, WinnersList, ParticipantInput, SettingsPanel],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected readonly luckyDraw = inject(LuckyDrawService);
}
