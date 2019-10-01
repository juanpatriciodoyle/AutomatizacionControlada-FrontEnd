import {MachineModel} from "../Machines/machine.model";

export class ClientModel{
  id: number;
  machineList: MachineModel[];
  name: string;
  surname: string;
  mail: string;
  phone1: string;
  phone2: string;


  constructor(id: number, machineList: MachineModel[], name: string, surname: string, mail: string, phone1: string, phone2: string) {
    this.id = id;
    this.machineList = machineList;
    this.name = name;
    this.surname = surname;
    this.mail = mail;
    this.phone1 = phone1;
    this.phone2 = phone2;
  }

  static from(json: any): ClientModel {
    return new ClientModel(json.id, json.machineList, json.name, json.surname, json.mail, json.phone1, json.phone2);
  }

  static fromForm(data: any): ClientModel {
    return new ClientModel(data.id, data.machineList, data.name, data.surname, data.mail, data.phone1, data.phone2);
  }

}
