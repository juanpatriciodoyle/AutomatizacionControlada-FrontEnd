import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../Services/client.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ClientModel} from "../client.model";
import {MachineModel} from "../../Machines/machine.model";
import {MachineService} from "../../Services/machine.service";


@Component({

  selector: 'app-add-client',
  templateUrl: './addClient.component.html',
  styleUrls: ['./addClient.component.scss'],
})

export class AddClientComponent implements OnInit{
  clients: ClientModel[];
  machineList: MachineModel[];
  form: FormGroup;

  // getErrorMessage() {
  //   const emailFormControl: AbstractControl = this.form.get('email');
  //   return emailFormControl.hasError('required') ? 'blabalba' :
  //     emailFormControl.hasError('email') ? 'not a valid email' : '';
  // }

  constructor(private machineService: MachineService,private clientService: ClientService, private formBuilder: FormBuilder, private readonly routes: Router){
  }


  ngOnInit(): void {
    this.getClients();
    this.getMachines();
    this.form = this.getForm();
  }

  getForm(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      phone1: new FormControl('', [Validators.required]),
      phone2: new FormControl('', [Validators.required]),
      machineList: new FormControl('', [Validators.required]),
    });
  }

  getClients(): void{
    this.clientService.getClients().subscribe(clientsList => this.clients = clientsList.map( client => ClientModel.from(client)));
  }

  getMachines(): void{
    this.machineService.getMachines().subscribe(machinesList => this.machineList = machinesList.map( machine => MachineModel.from(machine)));
  }

  add() {
    if(this.form.invalid) return;
    const data = this.form.getRawValue();
    console.log(data)
    this.clientService.addClient(ClientModel.fromForm(data)).subscribe(client => {
      this.routes.navigate(['clients'])
    }, error => {console.error(error)});
  }
}
