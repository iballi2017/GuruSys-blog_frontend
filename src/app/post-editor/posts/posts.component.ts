import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post/post.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
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

  onDeletePost(postId: string) {
    this._postSvc.delete(postId).subscribe({
      next: (response: any) => {
        if (response) {
          console.log('response: ', response);
          this.handle_getPosts();
        }
      },
    });
  }

  editPost(postId: string){
    this.router.navigate(['/editor/posts', postId])
  }
}
