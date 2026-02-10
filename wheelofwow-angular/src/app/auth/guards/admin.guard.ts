import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

export const adminGuard: CanActivateFn = async (route, state) => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  const isAdmin = await supabase.isAdmin();

  if (isAdmin) {
    return true;
  } else {
    // Redirect to home or show access denied
    router.navigate(['/']);
    return false;
  }
};
