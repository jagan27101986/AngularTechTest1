import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RobotStackComponent } from './robot-stack/robot-stack.component';

const routes: Routes = [
  { path: '', redirectTo: '/robo-stack', pathMatch: 'full'},
  { path: 'robo-stack', component: RobotStackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
