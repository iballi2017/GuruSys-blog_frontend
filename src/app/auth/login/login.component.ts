import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomControlInputComponent } from '../../shared/custom-control-input/custom-control-input.component';
import { User } from '../../models/classes/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CustomControlInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  model: any = new User('', '');

  
  onSubmit(data: NgForm) {
    console.log("data: ", data.value)
  }
}
