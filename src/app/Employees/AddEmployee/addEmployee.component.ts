import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../Services/employee.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Employee} from "../employee";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({

  selector: 'app-add-employee',
  templateUrl: './addEmployee.component.html',
  styleUrls: ['./addEmployee.component.scss'],
})

export class AddEmployeeComponent implements OnInit{
  employees: Employee[];
  form: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  positions = ["Jefe", "Dueño/a", "Técnico", "Ventas"];

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder){
  }


  ngOnInit(): void {
    this.getEmployees();
    this.form = this.getForm();
  }

  getForm(): FormGroup {
    return this.formBuilder.group({
      'name': ['', Validators.required],
      'surname': ['', Validators.required],
      'position': ['', Validators.required]
    });
  }

  getEmployees(): void{
    this.employeeService.getEmployees().subscribe(employeesList => this.employees = employeesList.map( employee => Employee.from(employee)));
  }

  add() {
    if(this.form.invalid) return;
    const data = this.form.getRawValue();
    this.employeeService.addEmployee(Employee.fromForm(data)).subscribe(employee => console.log(employee));
  }
}
