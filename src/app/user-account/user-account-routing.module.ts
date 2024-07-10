import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAccountComponent } from './user-account.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: UserAccountComponent,
    children: [
      {
        path: '',
        component: ProfileComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'posts',
        // canActivate:[authGuard],
        loadChildren: () => import('./post/post.module').then((m) => m.PostModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAccountRoutingModule {}
