import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { TaskComponent } from './task/task.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'task', component: TaskComponent },
  { path: 'result', component: ResultComponent },
  { path: '**', redirectTo: '/start', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
