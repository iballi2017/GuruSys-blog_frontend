import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddressBookService } from '../services/address-book/address-book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss',
})
export class AddressListComponent implements OnInit {
  addressList: any;
  constructor(private _addressBookSvc: AddressBookService) {}

  ngOnInit(): void {
    this.getAddressBookList();
  }

  getAddressBookList() {
    this._addressBookSvc.getData().subscribe({
      next: (response: any) => {
        if (response) {
          console.log('response: ', response);
          this.addressList = response;
        }
      },
    });
  }
}
