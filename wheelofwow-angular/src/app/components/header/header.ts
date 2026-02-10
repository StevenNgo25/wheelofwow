import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from '../../auth/login-modal/login-modal.component';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LoginModalComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly translation = inject(TranslationService);
  private readonly supabase = inject(SupabaseService);

  showLogin = signal(false);
  isMenuOpen = signal(false);
  user = signal<any>(null); // Define user signal
  isAdmin = signal(false);

  constructor() {
    this.initUser();
  }

  async initUser() {
    const user = await this.supabase.getUser();
    this.user.set(user);
    if (user) {
      this.isAdmin.set(await this.supabase.isAdmin());
    }

    // Listen for auth changes
    this.supabase.authChanges(async (event, session) => {
      this.user.set(session?.user || null);
      if (session?.user) {
        this.isAdmin.set(await this.supabase.isAdmin());
      } else {
        this.isAdmin.set(false);
      }
    });
  }

  toggleMenu() {
    this.isMenuOpen.update((v) => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  setLang(lang: string) {
    this.translation.setLang(lang as 'vi' | 'en');
    this.closeMenu();
  }

  async logout() {
    await this.supabase.signOut();
    this.closeMenu();
    window.location.reload(); // Simple reload to clear state for now
  }
}
