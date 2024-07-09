import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { PostListComponent } from './post-list/post-list.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { PostDetailsComponent } from './post-details/post-details.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: '',
        component: PostListComponent,
      },
      {
        path: 'posts',
        component: PostListComponent,
      },
      {
        path: ':postId',
        component: PostDetailsComponent,
      },
      {
        path: 'update/:postId',
        component: UpdatePostComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
