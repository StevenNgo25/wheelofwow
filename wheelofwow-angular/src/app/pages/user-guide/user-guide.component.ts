import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-guide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-guide.component.html',
  styleUrl: './user-guide.component.scss'
})
export class UserGuideComponent {
  protected readonly translation = inject(TranslationService);
}
