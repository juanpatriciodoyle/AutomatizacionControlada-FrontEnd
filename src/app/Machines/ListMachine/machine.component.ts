import {Component, OnInit} from '@angular/core';
import {MachineService} from '../../Services/machine.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MachineModel} from "../machine.model";


@Component({

  selector: 'app-list-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class MachineComponent implements OnInit{
  machines: MachineModel[];
  form: FormGroup;
  columnsToDisplay = ['id','name', 'surname', 'position', 'options'];
  columnTranslated = {
    id: 'Código Empleado',
    name: 'nombre',
    surname: 'apellido',
    position: 'posicion',
    options: 'opciones'
  };
  expandedElement: MachineModel | null;

  constructor(private machineService: MachineService, private formBuilder: FormBuilder){
  }


  ngOnInit(): void {
    this.getMachines();
    this.form = this.getForm();
  }

  getForm(): FormGroup {
    return this.formBuilder.group({
      'name': ['', Validators.required],
      'surname': ['', Validators.required],
      'position': ['', Validators.required]
    });
  }

  getMachines(): void{
    this.machineService.getMachines().subscribe(machinesList => this.machines = machinesList.map( machine => MachineModel.from(machine)));
  }

  delete(id: any) {
    this.machineService.deleteMachine(id).subscribe( (result) => {
      console.log(result);
      this.machines = this.machines.filter( (machine) => machine.id != id)
    }, (error => console.error(error)));
  }
}
