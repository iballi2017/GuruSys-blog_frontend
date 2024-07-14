import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post/post.service';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
})
export class PostDetailsComponent implements OnInit {
  postId: string = '';
  postDetails: any;
  constructor(private _postSvc: PostService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.postId = params.get('postId') ?? '';
      this.getPostDetails(this.postId);
    });
  }

  getPostDetails(postId: any) {
    this._postSvc.getDataById(`/${postId}`).subscribe({
      next: (response: any) => {
        if (response) {
          this.postDetails = response;
        }
      },
    });
  }
}
