import {StatusEnum} from './status.enum';
import {PaymentMethodEnum} from "./paymentMethod.enum";

export class TechnicalService{
  id: number;
  client: number;
  machine: number;
  employee: number;
  description: string;
  admissionDate: Date;
  egressDate: Date;
  price: number;
  status: StatusEnum;
  paymentMethod: PaymentMethodEnum;

  static from(json: any): TechnicalService {
    return new TechnicalService(json.id, json.client, json.machine, json.employee, json.description, json.admissionDate,
        json.egressDate, json.price, this.stringToEnumPayment(json.paymentMethod), this.stringToEnum(json.status));
  }

  static fromForm(data: any): TechnicalService {
    return new TechnicalService(data.id, data.client, data.machine, data.employee, data.description, data.admissionDate,
      data.egressDate, data.price, data.paymentMethod, data.status);
  }

  constructor(id: number, client: number, machine: number, employee: number, description: string, admissionDate: Date, egressDate: Date, price: number, paymentMethod: PaymentMethodEnum, status: StatusEnum) {
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

  static stringToEnumPayment(status: string): PaymentMethodEnum{
    switch (status) {
      case "CASH":
        return 0;
      case "DEBIT":
        return 1;
      case "CHECK":
        return 2;
      case "CREDIT":
        return 3;
      case "BILL":
        return 4;
      case "FREE":
        return 5;
      case "NOT_ENTERED":
        return 6;
    }
  }
}
