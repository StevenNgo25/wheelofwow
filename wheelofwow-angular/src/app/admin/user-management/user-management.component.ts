import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent {
  private supabase = inject(SupabaseService);
  users = signal<any[]>([]);
  loading = signal(true);

  constructor() {
    this.loadUsers();
  }

  async loadUsers() {
    this.loading.set(true);
    const { data, error } = await this.supabase.getProfiles();
    if (data) {
      this.users.set(data);
    }
    this.loading.set(false);
  }
}
