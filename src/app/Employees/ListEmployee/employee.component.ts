import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../Services/employee.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeModel} from "../employee.model";


@Component({

  selector: 'app-list-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class EmployeeComponent implements OnInit{
  employees: EmployeeModel[];
  form: FormGroup;
  columnsToDisplay = ['id','name', 'surname', 'position', 'options'];
  columnTranslated = {
    id: 'Código Empleado',
    name: 'nombre',
    surname: 'apellido',
    position: 'posicion',
    options: 'opciones'
  };

  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder){
  }


  ngOnInit(): void {
    this.getEmployees();
    this.form = this.getForm();
  }

  getForm(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
    });
  }

  getEmployees(): void{
    this.employeeService.getEmployees().subscribe(employeesList => this.employees = employeesList.map( employee =>  {
      const e = EmployeeModel.from(employee);
      e.position = EmployeeModel.enumToSpanish(e.position);
      return e;
    }));
  }

  delete(id: any) {
    this.employeeService.deleteEmployee(id).subscribe( (result) => {
      console.log(result);
      this.employees = this.employees.filter( (employee) => employee.id != id)
    }, (error => console.error(error)));
  }
}
