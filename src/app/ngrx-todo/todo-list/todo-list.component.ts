import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo/todo.service';
import { RouterModule } from '@angular/router';
import { NgrxTodoModule } from '../ngrx-todo.module';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../todo-store/todo.actions';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgrxTodoModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  count$!: Observable<number>;
  constructor(
    private _todoSvc: TodoService,
    private store: Store<{ count: number }>
  ) {
    // TODO: Connect `this.count$` stream to the current store `count` state
    this.count$ = store.select('count');
  }

  ngOnInit(): void {
    this.getTodoList();
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
  getTodoList() {
    this._todoSvc.getData().subscribe({
      next(response: any) {
        if (response) console.log(response);
      },
    });
  }
}
