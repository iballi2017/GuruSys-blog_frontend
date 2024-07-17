import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { authInterceptor } from './helpers/auth.interceptor';
import { AppErrorHandler } from './common/app-error-handler';
import { provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
        provide: ErrorHandler,
        useClass: AppErrorHandler,
    },
    provideAnimations(),
    provideToastr({
        timeOut: 2000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
    }),
    provideStore(),
],
};
