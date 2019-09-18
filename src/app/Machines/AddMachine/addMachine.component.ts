import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../Services/employee.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Machine} from "../machine";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';


@Component({

  selector: 'app-add-employee',
  templateUrl: './addMachine.component.html',
  styleUrls: ['./addMachine.component.scss'],
})

export class AddMachineComponent implements OnInit{
  employees: Machine[];
  form: FormGroup;
  positions = ["Jefe", "Dueño/a", "Técnico", "Ventas"];

  // getErrorMessage() {
  //   const emailFormControl: AbstractControl = this.form.get('email');
  //   return emailFormControl.hasError('required') ? 'blabalba' :
  //     emailFormControl.hasError('email') ? 'not a valid email' : '';
  // }

  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder, private readonly routes: Router){
  }


  ngOnInit(): void {
    this.getEmployees();
    this.form = this.getForm();
  }

  getForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      position: ['', Validators.required],
      // email: ['', [Validators.email, Validators.required]]
    });
  }

  getEmployees(): void{
    this.employeeService.getEmployees().subscribe(employeesList => this.employees = employeesList.map( employee => Machine.from(employee)));
  }

  add() {
    if(this.form.invalid) return;
    const data = this.form.getRawValue();
    this.employeeService.addEmployee(Machine.fromForm(data)).subscribe(employee => {
      console.log(employee);
      this.routes.navigate(['employees'])
    }, error => {console.error(error)});
  }
}
