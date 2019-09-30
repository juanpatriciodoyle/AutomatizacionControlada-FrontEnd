import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../Services/client.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormGroup} from '@angular/forms';
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
  columnsToDisplay = ['id', 'name', 'surname', 'mail', 'phone1', 'phone2', 'options'];
  columnTranslated = {
    id: 'Código Cliente',
    name: 'nombre',
    surname: 'apellido',
    mail: 'correo electrónico',
    phone1: 'teléfono',
    phone2: 'teléfono alternativo',
    options: 'opciones'

  };

  constructor(private clientService: ClientService){
  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void{
    this.clientService.getClients().subscribe(clientsList => this.clients = clientsList.map( client =>  {
      return ClientModel.from(client);
    }));
  }

  delete(id: any) {
    this.clientService.deleteClient(id).subscribe( (result) => {
      this.clients = this.clients.filter( (client) => client.id != id)
    }, (error => console.error(error)));
  }
}
