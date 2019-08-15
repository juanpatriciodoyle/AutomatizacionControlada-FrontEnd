import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../Services/employee.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Employee} from "../employee";


@Component({

  selector: 'app-employee',
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
  employees: Employee[];
  columnsToDisplay = ['id','nombre', 'apellido', 'posicion'];
  columnTranslated = {
    id: 'Código Empleado',
    nombre: 'nombre',
    apellido: 'apellido',
    posicion: 'posicion'
  };
  expandedElement: Employee | null;

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
