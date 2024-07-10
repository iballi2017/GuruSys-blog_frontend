import { Component } from '@angular/core';
import { BadInputError } from '../../common/bad-input-error';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CustomControlInputComponent } from '../../shared/custom-control-input/custom-control-input.component';
import { Post } from '../../models/classes/post/post';
import { PostService } from '../../services/post/post.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';

@Component({
  selector: 'app-add-post',
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
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss',
})
export class AddPostComponent {
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
  constructor(
    private _postSvc: PostService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onSubmit(data: NgForm) {
    this.isLoading = true;
    this._postSvc.create(data.value).subscribe({
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
