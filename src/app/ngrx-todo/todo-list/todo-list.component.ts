import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  constructor(private _todoSvc: TodoService) {}

  ngOnInit(): void {
    this.getTodoList();
  }

  getTodoList() {
    this._todoSvc.getData().subscribe({
      next(response: any) {
        if (response) console.log(response);
      },
    });
  }
}
