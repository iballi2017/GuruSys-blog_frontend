import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCount } from './todo-store/todo.selectors';
import { decrement, increment, reset } from './todo-store/todo.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ngrx-todo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ngrx-todo.component.html',
  styleUrl: './ngrx-todo.component.scss',
})
export class NgrxTodoComponent {
  count$: Observable<number>;

  constructor(private store: Store) {
    this.count$ = this.store.select(selectCount);
  }

  onIncrement() {
    this.store.dispatch(increment());
  }

  onDecrement() {
    this.store.dispatch(decrement());
  }

  onReset() {
    this.store.dispatch(reset());
  }
}
