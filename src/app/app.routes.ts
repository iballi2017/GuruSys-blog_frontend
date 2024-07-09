import { Routes } from '@angular/router';
import { UserAccountComponent } from './user-account/user-account.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user-account',
  },
  {
    path: 'user-account',
    loadChildren: () =>
      import('./user-account/user-account.module').then(
        (m) => m.UserAccountModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
