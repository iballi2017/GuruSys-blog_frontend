import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostService } from '../../../services/post/post.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit {
  constructor(private _postSvc: PostService) {}

  ngOnInit(): void {
    this.getPostList();
  }

  getPostList() {
    this._postSvc.getAll().subscribe({
      next: (response: any) => {
        if (response) {
          console.log('response: ', response);
        }
      },
    });
  }
}
