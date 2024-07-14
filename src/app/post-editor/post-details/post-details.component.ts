import { Component, OnInit } from '@angular/core';
import { BadInputError } from '../../common/bad-input-error';
import { PostService } from '../../services/post/post.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { Post } from '../../models/classes/post/post';
import { CommonModule } from '@angular/common';
import { CustomControlInputComponent } from '../../shared/custom-control-input/custom-control-input.component';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CustomControlInputComponent,
    EditorComponent,
    BackButtonComponent,
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
})
export class PostDetailsComponent implements OnInit {
  model: any = new Post('', '');
  isLoading: boolean = false;
  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount',
    selector: 'textarea', // Change this value according to your HTML
    toolbar:
      'bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat', // Add or remove buttons as needed
    // plugins: 'lists',  // List of plugins you need, adjust as necessary
    menubar: false, // Set to false to remove the menubar
  };
  postId: string = '';
  constructor(
    private _postSvc: PostService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params);
      this.postId = params.get('postId') ?? '';
      console.log('this.postId: ', this.postId);
      this.getPostDetails(this.postId);
    });
  }

  getPostDetails(postId: any) {
    this._postSvc.getDataById(`/${postId}`).subscribe({
      next: (response: any) => {
        if (response) {
          this.model.title = response.title;
          this.model.body = response.body;
        }
      },
    });
  }

  onSubmit(data: NgForm) {
    this.isLoading = true;
    this._postSvc.updatePost(this.postId, data.value).subscribe({
      next: (response: any) => {
        if (response) {
          this.isLoading = false;
          this.toastr.success('Post saved');
          data.reset();
          this.router.navigate(['/editor']);
        }
      },
      error: (error: Response) => {
        if (error instanceof BadInputError)
          data.form.setErrors({ isFormDataEror: true });
        this.toastr.error('Unable to save post!');
        this.isLoading = false;
        throw error;
      },
    });
  }
}
