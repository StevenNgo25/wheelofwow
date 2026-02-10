import { Component } from '@angular/core';

@Component({
  selector: 'app-user-guide',
  imports: [],
  template: `
    <div class="container">
      <h2>Hướng dẫn sử dụng</h2>
      <p>Nội dung hướng dẫn sử dụng sẽ được cập nhật tại đây.</p>
    </div>
  `,
  styles: [`
    .container { padding: 2rem; }
    h2 { color: #ff6b35; margin-bottom: 1rem; }
  `]
})
export class UserGuideComponent {

}
