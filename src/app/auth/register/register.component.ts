import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CustomControlInputComponent } from '../../shared/custom-control-input/custom-control-input.component';
import { User } from '../../models/classes/user/user';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { BadInputError } from '../../common/bad-input-error';
import { ToastrService } from 'ngx-toastr';
import { AppError } from '../../common/app-error';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CustomControlInputComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  model: any = new User('', '', '');
  isLoading: boolean = false;

  constructor(
    private _authSvc: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  onSubmit(data: NgForm) {
    this.isLoading = true;
    if (data.valid) {
      this._authSvc.registerUser(data.value).subscribe({
        next: (response: any) => {
          if (response) {
            console.log('response: ', response);
            this.isLoading = false;
            this.toastr.success('Account succesfully registered');
            data.reset();
            this.router.navigate(['/auth/login']);
          }
        },
        error: (error: Response) => {
          if (error instanceof BadInputError)
            this.toastr.error('Registration failed!');
          this.isLoading = false;
          if (error instanceof AppError)
            this.toastr.error(error.originalError.error.message);
          this.isLoading = false;
          throw error;
        },
      });
    }
  }
}
