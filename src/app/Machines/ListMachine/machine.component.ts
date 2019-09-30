import {Component, OnInit} from '@angular/core';
import {MachineService} from '../../Services/machine.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
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
  columnsToDisplay = ['id','internalCode', 'brand', 'model', 'boughtHere', 'options'];
  columnTranslated = {
    id: 'Código Máquina',
    internalCode: 'Código Interno',
    brand: 'Marca',
    model: 'Modelo',
    boughtHere: 'Comprada acá?',
    options: 'opciones'
  };
  expandedElement: MachineModel | null;

  constructor(private machineService: MachineService){
  }

  ngOnInit(): void {
    this.getMachines();
  }

  getMachines(): void{
    this.machineService.getMachines().subscribe(machinesList => this.machines = machinesList.map( machine => MachineModel.from(machine)));
  }

  delete(id: any) {
    this.machineService.deleteMachine(id).subscribe( (result) => {
      this.machines = this.machines.filter( (machine) => machine.id != id)
    }, (error => console.error(error)));
  }
}
