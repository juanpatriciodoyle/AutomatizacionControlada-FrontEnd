import {Component, Input, OnInit} from '@angular/core';
import {MachineService} from '../../Services/machine.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {MachineModel} from "../machine.model";


@Component({

  selector: 'app-update-machine',
  templateUrl: './updateMachine.component.html',
  styleUrls: ['./updateMachine.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class UpdateMachineComponent implements OnInit {
  @Input() oldMachine: MachineModel;
  id: number;
  form: FormGroup;

  constructor(private machineService: MachineService, private formBuilder: FormBuilder, private route: ActivatedRoute, private routes: Router) {
  }


  ngOnInit(): void {
    this.getMachine();
    this.form = this.getForm();
  }

  getForm(): FormGroup {
    return this.formBuilder.group({
      internalCode: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      boughtHere: new FormControl('', ),
    });
  }

  getMachine(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.machineService.getMachine(this.id).subscribe(machine => this.oldMachine = machine);
  }

  update(){
    if (this.form.invalid) return;
    const data = this.form.getRawValue();
    this.machineService.updateMachine(this.id,MachineModel.fromForm(data)).subscribe(machine => {
      console.log(machine);
      this.routes.navigate(['machines'])
    }, error => {console.error(error)}
    );
  }
}
