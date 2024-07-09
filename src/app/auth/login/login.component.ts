import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CustomControlInputComponent } from '../../shared/custom-control-input/custom-control-input.component';
import { User } from '../../models/classes/user';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { BadInputError } from '../../common/bad-input-error';
import { AppError } from '../../common/app-error';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CustomControlInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  model: any = new User('', '', '', '', false);
  isLoading: boolean = false;
  constructor(
    private _authSvc: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onSubmit(data: NgForm) {
    this.isLoading = true;
    this._authSvc.loginUser(data.value).subscribe({
      next: (response: any) => {
        if (response) {
          console.log('response: ', response);
          this.isLoading = false;
          this.toastr.success('Login succesful');
          data.reset();
          this.router.navigate(['/user-account']);
        }
      },
      error: (error: Response) => {
        if (error instanceof BadInputError)
          this.toastr.error('Authentication failed!');
        this.isLoading = false;
        if (error instanceof AppError)
          this.toastr.error(error.originalError.error.message);
        this.isLoading = false;
        throw error;
      },
    });
  }
}
