import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgrxTodoComponent } from './ngrx-todo.component';

const routes: Routes = [
  {
    path: '',
    component: NgrxTodoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgrxTodoRoutingModule {}
