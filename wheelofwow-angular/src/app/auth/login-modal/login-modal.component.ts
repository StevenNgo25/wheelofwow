import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay" (click)="close.emit()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <button class="close-btn" (click)="close.emit()">×</button>
        <h2>Đăng nhập</h2>
        <form (ngSubmit)="onLogin()">
          <div class="form-group">
            <label>Tên đăng nhập</label>
            <input type="text" [(ngModel)]="username" name="username" required>
          </div>
          <div class="form-group">
            <label>Mật khẩu</label>
            <input type="password" [(ngModel)]="password" name="password" required>
          </div>
          <button type="submit" class="btn-login">Đăng nhập</button>
        </form>
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
      background: white; padding: 2rem; border-radius: 8px;
      width: 90%; max-width: 400px; position: relative;
    }
    .close-btn {
      position: absolute; top: 10px; right: 10px;
      font-size: 1.5rem; background: none; border: none; cursor: pointer;
    }
    .form-group { margin-bottom: 1rem; }
    label { display: block; margin-bottom: 0.5rem; color: #333; }
    input {
      width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;
    }
    .btn-login {
      width: 100%; padding: 0.75rem; background: #ff6b35;
      color: white; border: none; border-radius: 4px; cursor: pointer;
      font-weight: bold;
    }
    .btn-login:hover { background: #e55a2b; }
  `]
})
export class LoginModalComponent {
  username = '';
  password = '';
  close = output<void>();

  constructor(private router: Router) {}

  onLogin() {
    // Mock login - just redirect for now
    if (this.username && this.password) {
      console.log('Login successful');
      this.close.emit();
      // Redirect logic can go here, e.g., this.router.navigate(['/admin']);
      alert('Đăng nhập thành công!');
    }
  }
}
