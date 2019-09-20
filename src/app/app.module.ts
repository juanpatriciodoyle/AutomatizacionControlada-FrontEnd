import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './Material/material-module';
import {EmployeeComponent} from './Employees/ListEmployee/employee.component';
import {AddEmployeeComponent} from "./Employees/AddEmployee/addEmployee.component";
import {UpdateEmployeeComponent} from "./Employees/UpdateEmployee/updateEmployee.component";
import {ClientComponent} from './Clients/ListClient/client.component';
import {UpdateClientComponent} from './Clients/UpdateClient/updateClient.component';
import {AddClientComponent} from './Clients/AddClient/addClient.component';
import {TechnicalServiceComponent} from './TechnicalServices/ListTechnicalService/technicalService.component';
import {AddTechnicalServiceComponent} from './TechnicalServices/AddTechnicalService/addTechnicalService.component';
import {UpdateTechnicalServiceComponent} from './TechnicalServices/UpdateTechnicalService/updateTechnicalService.component';
import {MachineComponent} from './Machines/ListMachine/machine.component';
import {AddMachineComponent} from './Machines/AddMachine/addMachine.component';
import {UpdateMachineComponent} from './Machines/UpdateMachine/updateMachine.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    ClientComponent,
    AddClientComponent,
    UpdateClientComponent,
    TechnicalServiceComponent,
    AddTechnicalServiceComponent,
    UpdateTechnicalServiceComponent,
    MachineComponent,
    AddMachineComponent,
    UpdateMachineComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
