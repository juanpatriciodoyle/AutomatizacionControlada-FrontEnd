import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeComponent} from './Employees/employee.component';
import {ClientComponent} from './Clients/client.component';


const routes: Routes = [
  {path: 'employees', component: EmployeeComponent},
  {path: 'client', component: ClientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
