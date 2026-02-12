import { Component, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" (click)="close.emit()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <button class="close-btn" (click)="close.emit()">×</button>
        <h2>Đăng nhập</h2>
        <div class="login-options">
          <button class="btn-google" (click)="loginWithGoogle()">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="24">
            <span>Tiếp tục với Google</span>
          </button>
        </div>
        <!-- 
        <div class="divider">hoặc</div>
        <form ...> (Email/Pass form if needed) </form> 
        -->
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex; justify-content: center; align-items: center;
      z-index: 1000;
    }
    .modal-content {
      background: white; padding: 2rem; border-radius: 12px;
      width: 90%; max-width: 400px; position: relative;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    }
    .close-btn {
      position: absolute; top: 10px; right: 10px;
      font-size: 1.5rem; background: none; border: none; cursor: pointer;
      color: #666;
    }
    h2 { margin-bottom: 2rem; color: #333; }
    .btn-google {
      display: flex; align-items: center; justify-content: center;
      width: 100%; padding: 0.75rem;
      background: white; border: 1px solid #ddd; border-radius: 8px;
      cursor: pointer; font-size: 1rem; font-weight: 500; color: #333;
      transition: all 0.2s; gap: 10px;
    }
    .btn-google:hover {
      background: #f8f9fa; border-color: #ccc; box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
  `]
})
export class LoginModalComponent {
  close = output<void>();
  private supabase = inject(SupabaseService);

  async loginWithGoogle() {
    try {
      const { error } = await this.supabase.signInWithGoogle();
      if (error) {
        console.error('Login error:', error);
        alert('Lỗi đăng nhập: ' + error.message);
      } else {
        // Supabase will redirect, so no need to close manually usually, but strictly speaking we can.
        // The redirect happens immediately.
      }
    } catch (err: any) {
      console.error('Unexpected error:', err);
      alert('Đã xảy ra lỗi không mong muốn.');
    }
  }
}
