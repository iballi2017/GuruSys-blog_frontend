import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post/post.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TemplateAlertComponent } from '../../shared/template-alert/template-alert.component';
import { TemplateAlertType } from '../../shared/template-alert/template-alert-type';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [RouterModule, CommonModule, TemplateAlertComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  posts!: any[];
  INFO: number = TemplateAlertType.INFO;
  constructor(private _postSvc: PostService, private router: Router) {}

  ngOnInit(): void {
    this.handle_getPosts();
  }

  handle_getPosts() {
    this._postSvc.getAll().subscribe({
      next: (response: any) => {
        if (response) {
          this.posts = response;
        }
      },
    });
  }

  onDeletePost(postId: string) {
    this._postSvc.delete(postId).subscribe({
      next: (response: any) => {
        if (response) {
          this.handle_getPosts();
        }
      },
    });
  }

  editPost(postId: string) {
    this.router.navigate(['/editor/posts', postId]);
  }
}
