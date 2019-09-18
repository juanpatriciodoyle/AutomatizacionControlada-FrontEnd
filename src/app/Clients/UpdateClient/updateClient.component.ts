import {Component, Input, OnInit} from '@angular/core';
import {EmployeeService} from '../../Services/employee.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Client} from "../client";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';


@Component({

  selector: 'app-update-client',
  templateUrl: './updateClient.component.html',
  styleUrls: ['./updateClient.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class UpdateClientComponent implements OnInit {
  @Input() oldEmployee: Client;
  id: number;
  form: FormGroup;
  positionTranslated = {
    BOSS: 'Jefe',
    OWNER: 'Dueño',
    TECHNICIAN: 'Técnico',
    SALES: 'Ventas',
  };

  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder, private route: ActivatedRoute, private routes: Router) {
  }


  ngOnInit(): void {
    this.getEmployee();
    this.form = this.getForm();
  }

  getForm(): FormGroup {
    return this.formBuilder.group({
      'name': ['', Validators.required],
      'surname': ['', Validators.required],
      'position': ['', Validators.required]
    });
  }

  getEmployee(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(this.id).subscribe(employee => this.oldEmployee = employee);
  }

  update(){
    if (this.form.invalid) return;
    const data = this.form.getRawValue();
    this.employeeService.updateEmployee(this.id,Client.fromForm(data)).subscribe(employee => {
      console.log(employee);
      this.routes.navigate(['employees'])
    }, error => {console.error(error)}
    );
  }
}
