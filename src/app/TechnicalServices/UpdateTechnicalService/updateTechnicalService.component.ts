import {Component, Input, OnInit} from '@angular/core';
import {TechnicalServiceService} from '../../Services/technicalService.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TechnicalService} from "../technicalService.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';


@Component({

  selector: 'app-update-technicalService',
  templateUrl: './updateTechnicalService.component.html',
  styleUrls: ['./updateTechnicalService.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class UpdateTechnicalServiceComponent implements OnInit {
  @Input() oldTechnicalService: TechnicalService;
  id: number;
  form: FormGroup;
  positionTranslated = {
    BOSS: 'Jefe',
    OWNER: 'Dueño',
    TECHNICIAN: 'Técnico',
    SALES: 'Ventas',
  };

  constructor(private technicalServiceService: TechnicalServiceService, private formBuilder: FormBuilder, private route: ActivatedRoute, private routes: Router) {
  }


  ngOnInit(): void {
    this.getTechnicalService();
    this.form = this.getForm();
  }

  getForm(): FormGroup {
    return this.formBuilder.group({
      'name': ['', Validators.required],
      'surname': ['', Validators.required],
      'position': ['', Validators.required]
    });
  }

  getTechnicalService(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.technicalServiceService.getTechnicalService(this.id).subscribe(technicalService => this.oldTechnicalService = technicalService);
  }

  update(){
    if (this.form.invalid) return;
    const data = this.form.getRawValue();
    this.technicalServiceService.updateTechnicalService(this.id,TechnicalService.fromForm(data)).subscribe(technicalService => {
      console.log(technicalService);
      this.routes.navigate(['technicalServices'])
    }, error => {console.error(error)}
    );
  }
}
