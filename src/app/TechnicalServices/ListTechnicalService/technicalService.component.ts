import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TechnicalService} from "../technicalService.model";
import {TechnicalServiceService} from "../../Services/technicalService.service";


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
  columnsToDisplay = ['id','employee', 'client', 'description', 'admissionDate', 'egressDate', 'price', 'paymentMethod', 'delivered', 'status', 'options'];
  columnTranslated = {
    id: 'Código Servicio Técnico',
    employee:'Responsable',
    client:'Cliente',
    description:'Descripción',
    admissionDate:'Ingreso',
    egressDate:'Egreso',
    price:'Precio',
    paymentMethod:'Método de Pago',
    delivered:'Entregado?',
    status:'Estado',
    options: 'opciones'
  };

  constructor(private technicalServiceService: TechnicalServiceService, private formBuilder: FormBuilder){
  }

  ngOnInit(): void {
    this.getTechnicalServicess();
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

  getTechnicalServicess(): void{
    this.technicalServiceService.getTechnicalServices().subscribe(technicalServicesList => this.technicalServices = technicalServicesList.map( technicalServices =>  {
      const e = TechnicalService.from(technicalServices);
      return e;
    }));
  }

  delete(id: any) {
    this.technicalServiceService.deleteTechnicalService(id).subscribe( (result) => {
      this.technicalServices = this.technicalServices.filter( (technicalServices) => technicalServices.id != id)
    }, (error => console.error(error)));
  }
}
