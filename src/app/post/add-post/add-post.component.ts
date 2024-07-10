import { Component } from '@angular/core';
import { CustomControlInputComponent } from '../../shared/custom-control-input/custom-control-input.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { BadInputError } from '../../common/bad-input-error';
import { AppError } from '../../common/app-error';
import { Post } from '../../models/classes/post/post';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [FormsModule, CustomControlInputComponent, EditorComponent],
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
  };
  constructor(
    private _authSvc: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onSubmit(data: NgForm) {
    this.isLoading = true;
    console.log("data: ", data.value)
    // this._authSvc.loginUser(data.value).subscribe({
    //   next: (response: any) => {
    //     if (response) {
    //       console.log('response: ', response);
    //       this.isLoading = false;
    //       this.toastr.success('Login succesful');
    //       data.reset();
    //       this.router.navigate(['/user-account']);
    //     }
    //   },
    //   error: (error: Response) => {
    //     if (error instanceof BadInputError)
    //       this.toastr.error('Authentication failed!');
    //     this.isLoading = false;
    //     if (error instanceof AppError)
    //       this.toastr.error(error.originalError.error.message);
    //     this.isLoading = false;
    //     throw error;
    //   },
    // });
  }
}
