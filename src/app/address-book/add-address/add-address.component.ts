import { Component } from '@angular/core';
import { CustomControlInputComponent } from '../../shared/custom-control-input/custom-control-input.component';
import { FormsModule, NgForm } from '@angular/forms';
import { DataService } from '../../services/data/data.service';
import { AddressBookService } from '../services/address-book/address-book.service';
import { BadInputError } from '../../common/bad-input-error';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-address',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomControlInputComponent],
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.scss',
})
export class AddAddressComponent {
  model = {
    name: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  };

  constructor(
    private _addressBookSvc: AddressBookService,
    private router: Router
  ) {}

  onSubmit(data: NgForm) {
    console.log('data: ', data.value);
    this._addressBookSvc.create(data.value).subscribe({
      next: (response: any) => {
        if (response) {
          console.log(response);
          data.reset();
          this.router.navigate(['/address-book']);
        }
      },
      error: (err) => {
        if (err instanceof BadInputError)
          data.form.setErrors({ formDataError: true });
        throw err;
      },
    });
  }
}
