import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeComponent} from './Employees/ListEmployee/employee.component';
import {AddEmployeeComponent} from "./Employees/AddEmployee/addEmployee.component";
import {UpdateEmployeeComponent} from "./Employees/UpdateEmployee/updateEmployee.component";
import {ClientComponent} from './Clients/ListClient/client.component';
import {AddClientComponent} from './Clients/AddClient/addClient.component';
import {UpdateClientComponent} from './Clients/UpdateClient/updateClient.component';
import {AddTechnicalServiceComponent} from './TechnicalServices/AddTechnicalService/addTechnicalService.component';
import {UpdateTechnicalServiceComponent} from './TechnicalServices/UpdateTechnicalService/updateTechnicalService.component';
import {MachineComponent} from './Machines/ListMachine/machine.component';
import {AddMachineComponent} from './Machines/AddMachine/addMachine.component';
import {UpdateMachineComponent} from './Machines/UpdateMachine/updateMachine.component';
import {TechnicalServiceComponent} from "./TechnicalServices/ListTechnicalService/technicalService.component";


const routes: Routes = [
  {path: 'employees', component: EmployeeComponent},
  {path: 'addEmployee', component: AddEmployeeComponent},
  {path: 'updateEmployee/:id', component: UpdateEmployeeComponent},
  {path: 'clients', component: ClientComponent},
  {path: 'addClient', component: AddClientComponent},
  {path: 'updateClient/:id', component: UpdateClientComponent},
  {path: 'technicalServices', component: TechnicalServiceComponent},
  {path: 'addTechnicalService', component: AddTechnicalServiceComponent},
  {path: 'updateTechnicalService/:id', component: UpdateTechnicalServiceComponent},
  {path: 'machines', component: MachineComponent},
  {path: 'addMachine', component: AddMachineComponent},
  {path: 'updateMachine/:id', component: UpdateMachineComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
