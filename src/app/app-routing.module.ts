import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeComponent} from './Employees/employee.component';
import {EmployeeDetailsComponent} from './EmployeesDetails/employeeDetails.component';


const routes: Routes = [
  {path: 'employees', component: EmployeeComponent},
  {path: 'employeesDetails', component: EmployeeDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
