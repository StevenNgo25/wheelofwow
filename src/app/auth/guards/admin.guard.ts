import { inject, PLATFORM_ID } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';

export const adminGuard: CanActivateFn = async (route, state) => {
  const platformId = inject(PLATFORM_ID);

  // If we are on the server, we can't verify auth because we don't have access to localStorage.
  // We return false to prevent server-side rendering of this route,
  // but importantly we DO NOT redirect.
  // The client will take over and execute the guard again in the browser.
  if (!isPlatformBrowser(platformId)) {
    return false;
  }

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
