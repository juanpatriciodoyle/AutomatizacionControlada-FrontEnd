import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../Services/client.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientModel} from "../client.model";


@Component({

  selector: 'app-list-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ClientComponent implements OnInit{
  clients: ClientModel[];
  form: FormGroup;
  columnsToDisplay = ['id','name', 'surname', 'position', 'options'];
  columnTranslated = {
    id: 'Código Empleado',
    name: 'nombre',
    surname: 'apellido',
    position: 'posicion',
    options: 'opciones'
  };
  expandedElement: ClientModel | null;

  constructor(private clientService: ClientService, private formBuilder: FormBuilder){
  }


  ngOnInit(): void {
    this.getClients();
    this.form = this.getForm();
  }

  getForm(): FormGroup {
    return this.formBuilder.group({
      'name': ['', Validators.required],
      'surname': ['', Validators.required],
      'position': ['', Validators.required]
    });
  }

  getClients(): void{
    this.clientService.getClients().subscribe(clientsList => this.clients = clientsList.map( client => ClientModel.from(client)));
  }

  delete(id: any) {
    this.clientService.deleteClient(id).subscribe( (result) => {
      console.log(result);
      this.clients = this.clients.filter( (client) => client.id != id)
    }, (error => console.error(error)));
  }
}
