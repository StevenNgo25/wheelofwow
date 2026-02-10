import { Component } from '@angular/core';

@Component({
  selector: 'app-pricing',
  imports: [],
  template: `
    <div class="container">
      <h2>Phí sử dụng</h2>
      <p>Thông tin về phí sử dụng sẽ được cập nhật tại đây.</p>
    </div>
  `,
  styles: [`
    .container { padding: 2rem; }
    h2 { color: #ff6b35; margin-bottom: 1rem; }
  `]
})
export class PricingComponent {

}
