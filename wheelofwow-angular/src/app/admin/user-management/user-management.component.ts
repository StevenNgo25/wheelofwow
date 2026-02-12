import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent {
  private supabase = inject(SupabaseService);

  // Data Signals
  users = signal<any[]>([]);
  loading = signal(true);
  totalItems = signal(0);

  // Filter & Pagination Signals
  searchQuery = signal('');
  currentPage = signal(1);
  itemsPerPage = signal(10);
  sortField = signal('created_at');
  sortOrder = signal<'asc' | 'desc'>('desc');

  // Search Debounce
  private searchSubject = new Subject<string>();

  // Modal State
  showModal = signal(false);
  editingUser = signal<any>(null); // The original user object
  editForm = signal<any>({}); // The form data

  constructor() {
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((query) => {
      this.searchQuery.set(query);
      this.currentPage.set(1); // Reset to page 1 on search
      this.loadUsers();
    });

    this.loadUsers();
  }

  async loadUsers() {
    this.loading.set(true);
    const { data, count, error } = await this.supabase.getProfiles(
      this.currentPage(),
      this.itemsPerPage(),
      this.searchQuery(),
      this.sortField(),
      this.sortOrder(),
    );

    if (data) {
      this.users.set(data);
    }
    if (count !== null) {
      this.totalItems.set(count);
    }
    this.loading.set(false);
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    this.loadUsers();
  }

  onSort(field: string) {
    if (this.sortField() === field) {
      this.sortOrder.set(this.sortOrder() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);
      this.sortOrder.set('asc');
    }
    this.loadUsers();
  }

  // --- Actions ---

  async toggleLock(user: any) {
    if (
      !confirm(`Are you sure you want to ${user.is_locked ? 'unlock' : 'lock'} ${user.full_name}?`)
    )
      return;

    const { data, error } = await this.supabase.toggleUserLock(user.id, !user.is_locked);
    if (data) {
      // Optimistic update or reload
      this.loadUsers();
    } else {
      alert('Error updating lock status');
      console.error(error);
    }
  }

  openEditModal(user: any) {
    this.editingUser.set(user);
    this.editForm.set({
      role: user.role,
      subscription_tier: user.subscription_tier,
      subscription_expiry: user.subscription_expiry
        ? new Date(user.subscription_expiry).toISOString().split('T')[0]
        : null,
    });
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.editingUser.set(null);
    this.editForm.set({});
  }

  async saveUser() {
    const user = this.editingUser();
    const updates = this.editForm();

    if (!user) return;

    // Convert expiry date string back to timestamp if needed, or send as is strictly if supabase handles it.
    // Supabase handles ISO strings fine for timestamptz.

    const { data, error } = await this.supabase.updateUser(user.id, updates);

    if (data) {
      this.loadUsers();
      this.closeModal();
    } else {
      alert('Failed to update user');
      console.error(error);
    }
  }

  // Helper to extend subscription
  extendSubscription(months: number) {
    const currentExpiry = this.editForm().subscription_expiry
      ? new Date(this.editForm().subscription_expiry)
      : new Date();

    currentExpiry.setMonth(currentExpiry.getMonth() + months);
    this.editForm.update((f) => ({
      ...f,
      subscription_expiry: currentExpiry.toISOString().split('T')[0],
    }));
  }

  extendSubscriptionYears(years: number) {
    const currentExpiry = this.editForm().subscription_expiry
      ? new Date(this.editForm().subscription_expiry)
      : new Date();

    currentExpiry.setFullYear(currentExpiry.getFullYear() + years);
    this.editForm.update((f) => ({
      ...f,
      subscription_expiry: currentExpiry.toISOString().split('T')[0],
    }));
  }

  // Computed
  totalPages() {
    return Math.ceil(this.totalItems() / this.itemsPerPage());
  }
}
