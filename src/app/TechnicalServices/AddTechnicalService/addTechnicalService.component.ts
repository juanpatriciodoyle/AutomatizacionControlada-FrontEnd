import {Component, OnInit} from '@angular/core';
import {TechnicalService} from "../technicalService.model";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TechnicalServiceService} from "../../Services/technicalService.service";
import {EmployeeModel} from '../../Employees/employee.model';
import {EmployeeService} from '../../Services/employee.service';
import {ClientModel} from '../../Clients/client.model';
import {ClientService} from '../../Services/client.service';


@Component({

  selector: 'app-add-technicalService',
  templateUrl: './addTechnicalService.component.html',
  styleUrls: ['./addTechnicalService.component.scss'],
})

export class AddTechnicalServiceComponent implements OnInit{
  technicalServices: TechnicalService[];
  employees: EmployeeModel[];
  form: FormGroup;
  clients: ClientModel[];

  // getErrorMessage() {
  //   const emailFormControl: AbstractControl = this.form.get('email');
  //   return emailFormControl.hasError('required') ? 'blabalba' :
  //     emailFormControl.hasError('email') ? 'not a valid email' : '';
  // }

  constructor(private technicalServiceService: TechnicalServiceService, private employeeService: EmployeeService, private clientService: ClientService, private formBuilder: FormBuilder, private readonly routes: Router){
  }


  ngOnInit(): void {
    this.getTechnicalServices();
    this.getEmployees();
    this.getClients();
    this.form = this.getForm();
  }



  getForm(): FormGroup {
    return this.formBuilder.group({
      employee: new FormControl('', [Validators.required]),
      client: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      admissionDate: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      paymentMethod: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
  }

  getClients(): void{
    this.clientService.getClients().subscribe(clientsList => this.clients = clientsList.map( client =>  {
      return ClientModel.from(client);
    }));
  }

  getEmployees(): void{
    this.employeeService.getEmployees().subscribe(employeesList => this.employees = employeesList.map( employee =>  {
      return EmployeeModel.from(employee);
    }));
  }

  getTechnicalServices(): void{
    this.technicalServiceService.getTechnicalServices().subscribe(technicalServiceList => this.technicalServices = technicalServiceList.map( technicalService => TechnicalService.from(technicalService)));
  }

  add() {
    if(this.form.invalid) return;
    const data = this.form.getRawValue();
    console.log(TechnicalService.fromForm(data));
    this.technicalServiceService.addTechnicalService(TechnicalService.fromForm(data)).subscribe(technicalService => {
      this.routes.navigate(['technicalServices'])
    }, error => {console.error(error)});
  }
}
