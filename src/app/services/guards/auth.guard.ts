import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let _authSvc = inject(AuthService);
  let router: any = inject(Router);
  console.warn('_authSvc.isLoggedIn(): ', _authSvc.isLoggedIn());
  if (_authSvc.isLoggedIn()) {
    return true;
  }

  let returnUrl = state.url;
  router.navigate(['/auth/login'], {
    queryParams: {
      returnUrl,
    },
  });
  return false;
};
