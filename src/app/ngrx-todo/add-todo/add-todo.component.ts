import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomControlInputComponent } from '../../shared/custom-control-input/custom-control-input.component';
import { Todo } from '../models/classes/todo';
import { TodoService } from '../../services/todo/todo.service';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [RouterModule, FormsModule, CustomControlInputComponent],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss',
})
export class AddTodoComponent {
  model:any = new Todo('', '');
  isLoading: boolean = false;
  constructor(private _todoSvc: TodoService) {}

  onSubmit(data: NgForm) {
    console.log('data: ', data.value);
  }
}
