import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const languageGuard: CanActivateFn = (route, state) => {
  const lang = route.paramMap.get('lang');
  const router = inject(Router);

  if (lang === 'vi' || lang === 'en') {
    return true;
  }

  // Default to 'vi' if invalid or missing
  return router.createUrlTree(['/vi']);
};
