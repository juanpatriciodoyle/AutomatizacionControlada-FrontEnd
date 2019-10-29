import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TechnicalService} from "../technicalService.model";
import {TechnicalServiceService} from "../../Services/technicalService.service";
import {Router} from "@angular/router";
import {ThemePalette} from "@angular/material/core";


@Component({
  selector: 'app-list-technicalService',
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
  technicalServices: TechnicalService[];
  form: FormGroup;
  columnsToDisplay = ['id','employee', 'client', 'machine', 'description', 'admissionDate', 'egressDate', 'price', 'paymentMethod', 'status', 'options'];
  columnTranslated = {
    id: 'Código Servicio Técnico',
    employee:'Responsable',
    client:'Cliente',
    machine:'Máquina',
    description:'Descripción',
    admissionDate:'Ingreso',
    egressDate:'Egreso',
    price:'Precio',
    paymentMethod:'Método de Pago',
    status:'Estado',
    options: 'opciones'
  };

  constructor(private technicalServiceService: TechnicalServiceService, private formBuilder: FormBuilder, private routes: Router){
  }

  ngOnInit(): void {
    this.getTechnicalServices();
    this.form = this.getForm();
  }

  getForm(): FormGroup {
    return this.formBuilder.group({
      employee: new FormControl('', [Validators.required]),
      client: new FormControl('', [Validators.required]),
      machine: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      admissionDate: new FormControl('', [Validators.required]),
      egressDate: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      paymentMethod: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
  }

  getTechnicalServices(): void{
    this.technicalServiceService.getTechnicalServices().subscribe(technicalServicesList => this.technicalServices = technicalServicesList.map( technicalServices =>  {
      return TechnicalService.from(technicalServices);
    }));
  }

  getTechnicalServicesDeleted(): void {
    this.technicalServiceService.getTechnicalServicesDeleted().subscribe(technicalServicesList => this.technicalServices = technicalServicesList.map( technicalServices =>  {
      return TechnicalService.from(technicalServices);
    }));
  }

  getTechnicalServicesMarkAsDone(): void {
    this.technicalServiceService.getTechnicalServicesMarkAsDone().subscribe(technicalServicesList => this.technicalServices = technicalServicesList.map( technicalServices =>  {
      return TechnicalService.from(technicalServices);
    }));
  }

  delete(id: any) {
    this.technicalServiceService.deleteTechnicalService(id).subscribe( (result) => {
      this.technicalServices = this.technicalServices.filter( (technicalServices) => technicalServices.id != id)
    }, (error => console.error(error)));
  }

  markAsDone(id: any) {
    this.technicalServiceService.markAsDoneTechnicalService(id).subscribe(technicalService => {
        this.getTechnicalServices();
      }, error => {console.error(error)}
    );
  }
}
