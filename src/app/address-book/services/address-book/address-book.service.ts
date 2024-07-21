import { Injectable } from '@angular/core';
import { DataService } from '../../../services/data/data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AddressBookService extends DataService {
  constructor(http: HttpClient) {
    super('http://localhost:3000/address-book', http);
  }
}
