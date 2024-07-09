import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomControlInputComponent } from '../../shared/custom-control-input/custom-control-input.component';
import { User } from '../../models/classes/user';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, CustomControlInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  model: any = new User('', '');

  onSubmit(data: NgForm) {
    console.log('data: ', data.value);
  }
}
