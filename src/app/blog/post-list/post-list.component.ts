import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PostService } from '../../services/post/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit {
  posts!: any[];
  constructor(private _postSvc: PostService, private router: Router) {}

  ngOnInit(): void {
    this.handle_getPosts();
  }

  handle_getPosts() {
    this._postSvc.getAll().subscribe({
      next: (response: any) => {
        if (response) {
          console.log('response: ', response);
          this.posts = response;
        }
      },
    });
  }

  readPost(postId: string) {
    this.router.navigate(['/editor/posts', postId]);
  }
}
