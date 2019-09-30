import {Component, Input, OnInit} from '@angular/core';
import {TechnicalServiceService} from '../../Services/technicalService.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {TechnicalService} from "../technicalService.model";


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
    ONSERVICE: 'En Servicio',
    DELAYED: 'Retrasada',
    READY: 'Listo',
    DELIVERED: 'Entregado',
  };

  constructor(private technicalServiceService: TechnicalServiceService, private formBuilder: FormBuilder, private route: ActivatedRoute, private routes: Router) {
  }

  ngOnInit(): void {
    this.getTechnicalServices();
    this.form = this.getForm();
  }

  getForm(): FormGroup {
    return this.formBuilder.group({
      employee: new FormControl('', [Validators.required]),
      client: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      admissionDate: new FormControl('', [Validators.required]),
      egressDate: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      paymentMethod: new FormControl('', [Validators.required]),
      delivered: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
  }

  getTechnicalServices(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.technicalServiceService.getTechnicalService(this.id).subscribe(technicalService => this.oldTechnicalService = technicalService);
  }

  update(){
    if (this.form.invalid) return;
    const data = this.form.getRawValue();
    this.technicalServiceService.updateTechnicalService(this.id,TechnicalService.fromForm(data)).subscribe(technicalService => {
        this.routes.navigate(['technicalServices'])
      }, error => {console.error(error)}
    );
  }
}
