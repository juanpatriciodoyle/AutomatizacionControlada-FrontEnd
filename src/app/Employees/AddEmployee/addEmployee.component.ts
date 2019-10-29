import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../Services/employee.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EmployeeModel} from "../employee.model";


@Component({

  selector: 'app-add-employee',
  templateUrl: './addEmployee.component.html',
  styleUrls: ['./addEmployee.component.scss'],
})

export class AddEmployeeComponent implements OnInit{
  employees: EmployeeModel[];
  form: FormGroup;

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
      name: new FormControl('', [Validators.required, Validators.pattern('[^1234567890.-:;,(=)/&%@$·!"·*$!]+')]),
      surname: new FormControl('', [Validators.required, Validators.pattern('[^1234567890.-:;,(=)/&%@$·!"·*$!]+') ]),
      position: new FormControl('', [Validators.required]),
    });
  }

  getEmployees(): void{
    this.employeeService.getEmployees().subscribe(employeesList => this.employees = employeesList.map( employee => EmployeeModel.from(employee)));
  }

  add() {
    if(this.form.invalid) return;
    const data = this.form.getRawValue();
    this.employeeService.addEmployee(EmployeeModel.fromForm(data)).subscribe(employee => {
      console.log(employee);
      this.routes.navigate(['employees'])
    }, error => {console.error(error)});
  }
}
