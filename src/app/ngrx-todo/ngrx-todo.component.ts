import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ngrx-todo',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './ngrx-todo.component.html',
  styleUrl: './ngrx-todo.component.scss',
})
export class NgrxTodoComponent {}
