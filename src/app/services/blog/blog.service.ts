import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BlogService extends DataService {
  constructor(http: HttpClient) {
    super(environment.baseUrl + '/blog', http);
  }
}
