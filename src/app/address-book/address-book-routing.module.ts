import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressBookComponent } from './address-book.component';
import { AddressListComponent } from './address-list/address-list.component';
import { AddAddressComponent } from './add-address/add-address.component';

const routes: Routes = [
  {
    path: '',
    component: AddressBookComponent,
    children: [
      {
        path: '',
        component: AddressListComponent,
      },
      {
        path: 'list',
        component: AddressListComponent,
      },
      {
        path: 'add',
        component: AddAddressComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressBookRoutingModule {}
