import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeComponent} from './Employees/ListEmployee/employee.component';
import {ClientComponent} from './Clients/client.component';
import {AddEmployeeComponent} from "./Employees/AddEmployee/addEmployee.component";
import {UpdateEmployeeComponent} from "./Employees/UpdateEmployee/updateEmployee.component";


const routes: Routes = [
  {path: 'employees', component: EmployeeComponent},
  {path: 'addEmployees', component: AddEmployeeComponent},
  {path: 'updateEmployees/:id', component: UpdateEmployeeComponent},
  {path: 'client', component: ClientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
