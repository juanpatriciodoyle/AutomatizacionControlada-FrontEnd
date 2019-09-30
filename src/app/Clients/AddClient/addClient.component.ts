import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../Services/client.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ClientModel} from "../client.model";


@Component({

  selector: 'app-add-client',
  templateUrl: './addClient.component.html',
  styleUrls: ['./addClient.component.scss'],
})

export class AddClientComponent implements OnInit{
  clients: ClientModel[];
  form: FormGroup;

  // getErrorMessage() {
  //   const emailFormControl: AbstractControl = this.form.get('email');
  //   return emailFormControl.hasError('required') ? 'blabalba' :
  //     emailFormControl.hasError('email') ? 'not a valid email' : '';
  // }

  constructor(private clientService: ClientService, private formBuilder: FormBuilder, private readonly routes: Router){
  }


  ngOnInit(): void {
    this.getClients();
    this.form = this.getForm();
  }

  getForm(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      phone1: new FormControl('', [Validators.required]),
      phone2: new FormControl('', [Validators.required]),
    });
  }

  getClients(): void{
    this.clientService.getClients().subscribe(clientsList => this.clients = clientsList.map( client => ClientModel.from(client)));
  }

  add() {
    if(this.form.invalid) return;
    const data = this.form.getRawValue();
    this.clientService.addClient(ClientModel.fromForm(data)).subscribe(client => {
      console.log(client);
      this.routes.navigate(['clients'])
    }, error => {console.error(error)});
  }
}
