import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgrxTodoComponent } from './ngrx-todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgrxTodoRoutingModule {}
