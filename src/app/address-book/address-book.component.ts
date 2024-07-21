import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-address-book',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './address-book.component.html',
  styleUrl: './address-book.component.scss',
})
export class AddressBookComponent {}
