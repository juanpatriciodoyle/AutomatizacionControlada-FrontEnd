import {Component, OnInit} from '@angular/core';
import {MachineService} from '../../Services/machine.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MachineModel} from "../machine.model";


@Component({

  selector: 'app-add-machine',
  templateUrl: './addMachine.component.html',
  styleUrls: ['./addMachine.component.scss'],
})

export class AddMachineComponent implements OnInit{
  machines: MachineModel[];
  form: FormGroup;

  // getErrorMessage() {
  //   const emailFormControl: AbstractControl = this.form.get('email');
  //   return emailFormControl.hasError('required') ? 'blabalba' :
  //     emailFormControl.hasError('email') ? 'not a valid email' : '';
  // }

  constructor(private machineService: MachineService, private formBuilder: FormBuilder, private readonly routes: Router){
  }


  ngOnInit(): void {
    this.getMachines();
    this.form = this.getForm();
  }

  getForm(): FormGroup {
    return this.formBuilder.group({
      internalCode: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      boughtHere: new FormControl(),
    });
  }

  getMachines(): void{
    this.machineService.getMachines().subscribe(machinesList => this.machines = machinesList.map( machine => MachineModel.from(machine)));
  }

  add() {
    if(this.form.invalid) return;
    const data = this.form.getRawValue();
    this.machineService.addMachine(MachineModel.fromForm(data)).subscribe(machine => {
      this.routes.navigate(['machines'])
    }, error => {console.error(error)});
  }
}
