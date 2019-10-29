import {Component, Input, OnInit} from '@angular/core';
import {EmployeeService} from '../../Services/employee.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeModel} from "../employee.model";


@Component({

  selector: 'app-update-employee',
  templateUrl: './updateEmployee.component.html',
  styleUrls: ['./updateEmployee.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class UpdateEmployeeComponent implements OnInit {
  @Input() oldEmployee: EmployeeModel;
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
      name: new FormControl('', [Validators.required, Validators.pattern('[^1234567890.-:;,(=)/&%@$·!"·*$!]+')]),
      surname: new FormControl('', [Validators.required, Validators.pattern('[^1234567890.-:;,(=)/&%@$·!"·*$!]+') ]),
      position: new FormControl('', [Validators.required]),
    });
  }

  getEmployee(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(this.id).subscribe(employee => this.oldEmployee = employee);
  }

  update(){
    if (this.form.invalid) return;
    const data = this.form.getRawValue();
    this.employeeService.updateEmployee(this.id,EmployeeModel.fromForm(data)).subscribe(employee => {
      this.routes.navigate(['employees'])
    }, error => {console.error(error)}
    );
  }
}
