import {Component, OnInit} from '@angular/core';
import {TechnicalService} from "../technicalService.model";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TechnicalServiceService} from "../../Services/technicalService.service";


@Component({

  selector: 'app-add-technicalService',
  templateUrl: './addTechnicalService.component.html',
  styleUrls: ['./addTechnicalService.component.scss'],
})

export class AddTechnicalServiceComponent implements OnInit{
  technicalService: TechnicalService[];
  form: FormGroup;

  // getErrorMessage() {
  //   const emailFormControl: AbstractControl = this.form.get('email');
  //   return emailFormControl.hasError('required') ? 'blabalba' :
  //     emailFormControl.hasError('email') ? 'not a valid email' : '';
  // }

  constructor(private technicalServiceService: TechnicalServiceService, private formBuilder: FormBuilder, private readonly routes: Router){
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

  getTechnicalServices(): void{
    this.technicalServiceService.getTechnicalServices().subscribe(technicalServiceList => this.technicalService = technicalServiceList.map( technicalService => TechnicalService.from(technicalService)));
  }

  add() {
    if(this.form.invalid) return;
    const data = this.form.getRawValue();
    this.technicalServiceService.addTechnicalService(TechnicalService.fromForm(data)).subscribe(technicalService => {
      this.routes.navigate(['technicalServices'])
    }, error => {console.error(error)});
  }
}
