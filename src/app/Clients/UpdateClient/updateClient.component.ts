import {Component, Input, OnInit} from '@angular/core';
import {ClientService} from '../../Services/client.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {ClientModel} from "../client.model";


@Component({

  selector: 'app-update-client',
  templateUrl: './updateClient.component.html',
  styleUrls: ['./updateClient.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class UpdateClientComponent implements OnInit {
  @Input() oldClient: ClientModel;
  id: number;
  form: FormGroup;
  positionTranslated = {
    BOSS: 'Jefe',
    OWNER: 'Dueño',
    TECHNICIAN: 'Técnico',
    SALES: 'Ventas',
  };

  constructor(private clientService: ClientService, private formBuilder: FormBuilder, private route: ActivatedRoute, private routes: Router) {
  }


  ngOnInit(): void {
    this.getClient();
    this.form = this.getForm();
  }

  getForm(): FormGroup {
    return this.formBuilder.group({
      'name': ['', Validators.required],
      'surname': ['', Validators.required],
      'position': ['', Validators.required]
    });
  }

  getClient(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.clientService.getClient(this.id).subscribe(client => this.oldClient = client);
  }

  update(){
    if (this.form.invalid) return;
    const data = this.form.getRawValue();
    this.clientService.updateClient(this.id,ClientModel.fromForm(data)).subscribe(client => {
      console.log(client);
      this.routes.navigate(['clients'])
    }, error => {console.error(error)}
    );
  }
}
