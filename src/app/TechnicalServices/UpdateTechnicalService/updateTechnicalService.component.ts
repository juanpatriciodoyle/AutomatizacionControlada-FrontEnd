import {Component, Input, OnInit} from '@angular/core';
import {TechnicalServiceService} from '../../Services/technicalService.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {TechnicalService} from "../technicalService.model";
import {EmployeeModel} from "../../Employees/employee.model";
import {ClientModel} from "../../Clients/client.model";
import {MachineModel} from "../../Machines/machine.model";
import {EmployeeService} from "../../Services/employee.service";
import {MachineService} from "../../Services/machine.service";
import {ClientService} from "../../Services/client.service";


@Component({

  selector: 'app-update-technicalService',
  templateUrl: './updateTechnicalService.component.html',
  styleUrls: ['./updateTechnicalService.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class UpdateTechnicalServiceComponent implements OnInit {
  @Input() oldTechnicalService: TechnicalService;
  id: number;
  form: FormGroup;
  employees: EmployeeModel[];
  clients: ClientModel[];
  machines: MachineModel[];
  today: Date=new Date();
  positionTranslated = {
    ONSERVICE: 'En Servicio',
    DELAYED: 'Retrasada',
    READY: 'Listo',
    DELIVERED: 'Entregado',
  };
  paymentMethodTranslated = {
    CASH: 'Efectivo',
    DEBIT: 'Débito',
    CHECK: 'Cheque',
    CREDIT: 'Crédito',
    BILL: 'Factura',
    FREE: 'Gratis',
    NOT_ENTERED: 'No especificado',
  };

  constructor( private employeeService: EmployeeService,private machineService: MachineService, private clientService: ClientService,private technicalServiceService: TechnicalServiceService, private formBuilder: FormBuilder, private route: ActivatedRoute, private routes: Router) {
  }

  ngOnInit(): void {
    this.getTechnicalServices();
    this.getEmployees();
    this.getClients();
    this.form = this.getForm();

  }

  getForm(): FormGroup {
    return this.formBuilder.group({
      employee: new FormControl('', [Validators.required]),
      client: new FormControl('', [Validators.required]),
      machine: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.pattern('[a-z A-z]+')]),
      admissionDate: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      paymentMethod: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
  }

  getTechnicalServices(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.technicalServiceService.getTechnicalService(this.id).subscribe(technicalService => this.oldTechnicalService = technicalService);
  }

  getClients(): void{
    this.clientService.getClients().subscribe(clientsList => this.clients = clientsList.map( client =>  {
      return ClientModel.from(client);
    }));
  }

  getMachineByClientId(id: number): void{
    this.machineService.getMachineByClientId(id).subscribe(machineList => this.machines = machineList.map( machine =>  {
      return MachineModel.from(machine);
    }));
  }

  getEmployees(): void{
    this.employeeService.getEmployees().subscribe(employeesList => this.employees = employeesList.map( employee =>  {
      return EmployeeModel.from(employee);
    }));
  }

  update(){
    if (this.form.invalid) return;
    const data = this.form.getRawValue();
    this.technicalServiceService.updateTechnicalService(this.id,TechnicalService.fromForm(data)).subscribe(technicalService => {
        this.routes.navigate(['technicalServices'])
      }, error => {console.error(error)}
    );
  }
}
