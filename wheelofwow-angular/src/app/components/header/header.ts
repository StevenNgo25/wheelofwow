import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from '../../auth/login-modal/login-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LoginModalComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly translation = inject(TranslationService);
  showLogin = signal(false);

  setLang(lang: string) {
    this.translation.setLang(lang as 'vi' | 'en');
  }
}
