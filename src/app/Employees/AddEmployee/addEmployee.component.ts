import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../Services/employee.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Employee} from "../employee";
import {FormControl, Validators} from '@angular/forms';


@Component({

  selector: 'app-add-employee',
  templateUrl: './addEmployee.component.html',
  styleUrls: ['./addEmployee.component.scss'],
})

export class AddEmployeeComponent implements OnInit{
  employees: Employee[];
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  constructor(private employeeService: EmployeeService){
  }


  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void{
    this.employeeService.getEmployees().subscribe(employeesList => this.employees = employeesList.map( employee => Employee.from(employee)));
  }

  add(value: any) {


  }
}
