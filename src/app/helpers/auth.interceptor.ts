import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: any = inject(AuthService);
  const accessToken: any = authService.getAccessToken();

  const newReq = req.clone({
    setHeaders: { Authorization: `Bearer ${accessToken}` },
  });
  return next(newReq).pipe(
    tap((data) => console.warn('data%%%: ', data)),
    catchError((error: any) => {
      console.log('error: ', error);
      if (error) {
       return handle401Error(req, next, authService);
      }
      throw error;
    })
  );
};

let isRefreshing: boolean = false;
let refreshTokenSubject = new BehaviorSubject<any>(null);

function handle401Error(
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  authService: AuthService
): Observable<HttpEvent<any>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((new_token: any) => {
        console.warn("new_token: ", new_token)
        localStorage.setItem('token', new_token.accessToken);
        localStorage.setItem('roles', JSON.stringify(new_token.roles));
        isRefreshing = false;
        refreshTokenSubject.next(new_token.accessToken);
        return next(
          req.clone({
            setHeaders: {
              Authorization: `Bearer ${new_token.accessToken}`,
            },
          })
        );
      }),
      catchError((err) => {
        isRefreshing = false;
        authService.logoutUser();
        throw err;
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      filter((token) => token != null),
      take(1),
      switchMap((token) => {
        return next(
          req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          })
        );
      })
    );
  }
}
