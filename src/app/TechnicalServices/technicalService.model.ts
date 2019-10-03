import {StatusEnum} from './status.enum';

export class TechnicalService{
  id: number;
  employee: number;
  client: number;
  description: string;
  admissionDate: Date;
  egressDate: Date;
  price: number;
  paymentMethod: string;
  status: StatusEnum;

  static from(json: any): TechnicalService {
    return new TechnicalService(json.id, json.employee, json.client, json.description, json.admissionDate,
        json.egressDate, json.price, json.paymentMethod, this.stringToEnum(json.status));
  }

  static fromForm(data: any): TechnicalService {
    return new TechnicalService(data.id, data.employee, data.client, data.description, data.admissionDate,
      null, data.price, data.paymentMethod, data.status);
  }

  constructor(id: number, employee: number, client: number, description: string, admissionDate: Date, egressDate: Date, price: number, paymentMethod: string, status: StatusEnum) {
    this.id = id;
    this.employee = employee;
    this.client = client;
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
