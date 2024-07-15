import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService extends DataService {
  constructor(http: HttpClient) {
    super('http://localhost:3000/todos', http);
  }
}
