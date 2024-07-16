import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgrxTodoComponent } from './ngrx-todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AddTodoComponent } from './add-todo/add-todo.component';

const routes: Routes = [
  {
    path: '',
    component: NgrxTodoComponent,
    children: [
      {
        path: '',
        component: TodoListComponent,
      },
      {
        path: 'list',
        component: TodoListComponent,
      },
      {
        path: 'add',
        component: AddTodoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgrxTodoRoutingModule {}
