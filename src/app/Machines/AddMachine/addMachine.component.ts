import {Component, OnInit} from '@angular/core';
import {MachineService} from '../../Services/machine.service';
import {FormBuilder,  FormGroup, Validators} from '@angular/forms';
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
  positions = ["Jefe", "Dueño/a", "Técnico", "Ventas"];

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
      name: ['', Validators.required],
      surname: ['', Validators.required],
      position: ['', Validators.required],
      // email: ['', [Validators.email, Validators.required]]
    });
  }

  getMachines(): void{
    this.machineService.getMachines().subscribe(machinesList => this.machines = machinesList.map( machine => MachineModel.from(machine)));
  }

  add() {
    if(this.form.invalid) return;
    const data = this.form.getRawValue();
    this.machineService.addMachine(MachineModel.fromForm(data)).subscribe(machine => {
      console.log(machine);
      this.routes.navigate(['machines'])
    }, error => {console.error(error)});
  }
}
