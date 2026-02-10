import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  private supabase = inject(SupabaseService);
  totalUsers = signal(0);
  totalDraws = signal(0);
  proUsers = signal(0);

  constructor() {
    this.loadStats();
  }

  async loadStats() {
    const stats = await this.supabase.getStats();
    this.totalUsers.set(stats.users);
    this.totalDraws.set(stats.draws);
  }
}
