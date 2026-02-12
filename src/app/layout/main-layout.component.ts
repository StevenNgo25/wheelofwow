import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import { AdBannerComponent } from '../components/ad-banner/ad-banner.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, AdBannerComponent],
  template: `
    <app-ad-banner slotName="sidebar_left" position="sidebar-left"></app-ad-banner>
    <app-ad-banner slotName="sidebar_right" position="sidebar-right"></app-ad-banner>

    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>

    <app-ad-banner slotName="footer" position="fixed-bottom"></app-ad-banner>
  `,
})
export class MainLayoutComponent {}
