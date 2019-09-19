import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../Services/employee.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TechnicalService} from "../technicalService.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({

  selector: 'app-list-employee',
  templateUrl: './technicalService.component.html',
  styleUrls: ['./technicalService.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class TechnicalServiceComponent implements OnInit{
  employees: TechnicalService[];
  form: FormGroup;
  columnsToDisplay = ['id','name', 'surname', 'position', 'options'];
  columnTranslated = {
    id: 'Código Empleado',
    name: 'nombre',
    surname: 'apellido',
    position: 'posicion',
    options: 'opciones'
  };
  expandedElement: TechnicalService | null;

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
    this.employeeService.getEmployees().subscribe(employeesList => this.employees = employeesList.map( employee =>
      TechnicalService.from(employee)
    ));
  }

  delete(id: any) {
    this.employeeService.deleteEmployee(id).subscribe( (result) => {
      console.log(result);
      this.employees = this.employees.filter( (employee) => employee.id != id)
    }, (error => console.error(error)));
  }

}
