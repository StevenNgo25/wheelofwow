import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserGuideComponent } from './pages/user-guide/user-guide.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { adminGuard } from './auth/guards/admin.guard';
import { languageGuard } from './auth/guards/language.guard';

export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/layout/admin-layout.component').then((m) => m.AdminLayoutComponent),
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./admin/admin.component').then((m) => m.AdminComponent),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./admin/user-management/user-management.component').then(
            (m) => m.UserManagementComponent,
          ),
      },
      {
        path: 'ads',
        loadComponent: () =>
          import('./admin/ads-management/ads-management.component').then(
            (m) => m.AdsManagementComponent,
          ),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'en',
  },
  {
    path: ':lang',
    canActivate: [languageGuard],
    loadComponent: () =>
      import('./layout/main-layout.component').then((m) => m.MainLayoutComponent),
    children: [
      { path: '', component: HomeComponent },
      { path: 'guide', component: UserGuideComponent },
      { path: 'pricing', component: PricingComponent },
    ],
  },
  { path: '**', redirectTo: 'en' },
];
