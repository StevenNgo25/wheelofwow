import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserGuideComponent } from './pages/user-guide/user-guide.component';
import { PricingComponent } from './pages/pricing/pricing.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'guide', component: UserGuideComponent },
    { path: 'pricing', component: PricingComponent },
    { path: '**', redirectTo: '' }
];
