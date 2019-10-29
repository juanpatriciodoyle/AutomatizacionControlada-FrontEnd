import {Component, Input, OnInit} from '@angular/core';
import {ClientService} from '../../Services/client.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {ClientModel} from "../client.model";
import {phoneMatchValidator} from "../AddClient/phoneMatchValidator";
import {MachineModel} from "../../Machines/machine.model";
import {MachineService} from "../../Services/machine.service";


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
  machineList: MachineModel[];
  form: FormGroup;


  constructor(private machineService: MachineService,private clientService: ClientService, private formBuilder: FormBuilder, private route: ActivatedRoute, private routes: Router) {
  }


  ngOnInit(): void {
    this.getClient();
    this.getMachines();
    this.form = this.getForm();
  }

  getForm(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern('[^1234567890.-:;,(=)/&%@$·!"·*$!]+')]),
      surname: new FormControl('', [Validators.required, Validators.pattern('[^1234567890.-:;,(=)/&%@$·!"·*$!]+') ]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      phone1: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(6), Validators.pattern('[0-9]+')]),
      phone2: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(6), Validators.pattern('[0-9]+'), phoneMatchValidator]),
      machineList: new FormControl('', [Validators.required]),
    });
  }

  getClient(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.clientService.getClient(this.id).subscribe(client => this.oldClient = client);
  }

  getMachines(): void{
    this.machineService.getMachines().subscribe(machinesList => this.machineList = machinesList.map( machine => MachineModel.from(machine)));
  }

  update(){
    if (this.form.invalid) return;
    const data = this.form.getRawValue();
    this.clientService.updateClient(this.id,ClientModel.fromForm(data)).subscribe(client => {
        this.routes.navigate(['clients'])
      }, error => {console.error(error)}
    );
  }
}
