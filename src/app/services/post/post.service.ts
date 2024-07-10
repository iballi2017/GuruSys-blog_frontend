import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService extends DataService {
  constructor(http: HttpClient) {
    super(environment.baseUrl + '/blog-post', http);
  }
}
