import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post/post.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TemplateAlertComponent } from '../../shared/template-alert/template-alert.component';
import { TemplateAlertType } from '../../shared/template-alert/template-alert-type';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';
import { buildQueryParams } from '../../helpers/buildQueryParams';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgxPaginationModule,
    TemplateAlertComponent,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  posts!: any[];
  INFO: number = TemplateAlertType.INFO;
  public maxSize: number = 7;
  public config: PaginationInstance = {
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: 3,
  };
  constructor(private _postSvc: PostService, private router: Router) {}

  ngOnInit(): void {
    this.handle_getPosts();

    // console.log(
    //   'buildQueryParams: ',
    //   buildQueryParams({ PageNumber: this.config.currentPage, PageSize: this.config.itemsPerPage })
    // );
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
            this.posts = response.result.results;
            this.config.totalItems = response.totalSize;
          }
        },
      });
  }

  onDeletePost(postId: string) {
    this._postSvc.delete(`/${postId}`).subscribe({
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

  onPageChange(number: number) {
    this.config.currentPage = number;
    this.handle_getPosts();
  }
}
