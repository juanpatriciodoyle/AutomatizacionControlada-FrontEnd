import {StatusEnum} from './status.enum';

export class TechnicalService{
  id: number;
  client: number;
  machine: number;
  employee: number;
  description: string;
  admissionDate: Date;
  egressDate: Date;
  price: number;
  paymentMethod: string;
  status: StatusEnum;

  static from(json: any): TechnicalService {
    return new TechnicalService(json.id, json.client, json.machine, json.employee, json.description, json.admissionDate,
        json.egressDate, json.price, json.paymentMethod, this.stringToEnum(json.status));
  }

  static fromForm(data: any): TechnicalService {
    return new TechnicalService(data.id, data.client, data.machine, data.employee, data.description, data.admissionDate,
      null, data.price, data.paymentMethod, data.status);
  }

  constructor(id: number, client: number, machine: number, employee: number, description: string, admissionDate: Date, egressDate: Date, price: number, paymentMethod: string, status: StatusEnum) {
    this.id = id;
    this.client = client;
    this.machine = machine;
    this.employee = employee;
    this.description = description;
    this.admissionDate = admissionDate;
    this.egressDate = egressDate;
    this.price = price;
    this.paymentMethod = paymentMethod;
    this.status = status;
  }


  static stringToEnum(status: string): StatusEnum{
    switch (status) {
      case "ONSERVICE":
        return 0;
      case "DELAYED":
        return 1;
      case "READY":
        return 2;
      case "DELIVERED":
        return 3;
    }
  }
}
