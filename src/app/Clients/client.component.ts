import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {EmployeeService} from '../Services/employee.service';
import {PeriodicElement} from './periodicElement';

/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ClientComponent implements OnInit{
  employees;
  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  expandedElement: PeriodicElement | null;

  constructor(private employeeService: EmployeeService){
  }


  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void{
    this.employeeService.getEmployees().subscribe(e => this.employees= e);
  }
}



