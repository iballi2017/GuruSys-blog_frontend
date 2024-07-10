import { Routes } from '@angular/router';
import { UserAccountComponent } from './user-account/user-account.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './services/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user-account',
  },
  {
    path: 'user-account',
    // canActivate:[authGuard],
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
    // canActivate:[authGuard],
    loadChildren: () => import('./blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: 'editor',
    // canActivate:[authGuard],
    loadChildren: () => import('./post-editor/post-editor.module').then((m) => m. PostEditorModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
