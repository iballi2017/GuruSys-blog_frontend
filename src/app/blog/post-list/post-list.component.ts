import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PostService } from '../../services/post/post.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';
import { buildQueryParams } from '../../helpers/buildQueryParams';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit {
  posts!: any[];
  public maxSize: number = 7;
  public config: PaginationInstance = {
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: 3,
  };
  constructor(private _postSvc: PostService, private router: Router) {}

  ngOnInit(): void {
    this.handle_getPosts();
  }

  handle_getPosts() {
    this._postSvc
      .getData(
        buildQueryParams({
          PageNumber: this.config.currentPage,
          PageSize: this.config.itemsPerPage,
        })
      )
      .subscribe({
        next: (response: any) => {
          if (response) {
            // console.log('response: ', response);
            // this.posts = response;
            this.posts = response.result.results;
            this.config.totalItems = response.totalSize;
          }
        },
      });
  }

  readPost(postId: string) {
    this.router.navigate(['/editor/posts', postId]);
  }

  onPageChange(number: number) {
    this.config.currentPage = number;
    this.handle_getPosts();
  }
}
