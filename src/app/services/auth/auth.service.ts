import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends DataService {
  constructor(http: HttpClient) {
    super(environment.baseUrl + '/auth', http);
  }
}
