export class TechnicalService{
  id: number;
  employee: number;
  description: string;
  admissionDate: Date;
  egressDate: Date;
  price: number;
  paymentMethod: string;
  delivered: Boolean;
  status: string;

  //     @OneToOne(cascade = CascadeType.ALL)
  //     private Employee employee;
  //     private Enum<Status> status;


  static from(json: any): TechnicalService {
    return new TechnicalService(json.id, json.employee, json.description, json.admissionDate,
        json.egressDate, json.price, json.paymentMethod, json.delivered, TechnicalService.enumToSpanish(json.status));
  }

  static fromForm(data: any): TechnicalService {
    return new TechnicalService(data.id, data.employee, data.description, data.admissionDate,
      data.egressDate, data.price, data.paymentMethod, data.delivered, data.status);
  }

  constructor(id: number, employee: number, description: string, admissionDate: Date, egressDate: Date, price: number, paymentMethod: string, delivered: Boolean, status: string) {
    this.id = id;
    this.employee = employee;
    this.description = description;
    this.admissionDate = admissionDate;
    this.egressDate = egressDate;
    this.price = price;
    this.paymentMethod = paymentMethod;
    this.delivered = delivered;
    this.status = status;
  }

// Enum implementation, service list (add-> lo que retorna lo meto en la lista). Get by id checkeo en la lista primero y sino hago get all
  static enumToSpanish(position: string): string {
    switch (position) {
      case "ONSERVICE":
        return "En servicio";
      case "DELAYED":
        return "Retrasada";
      case "READY":
        return "Lista";
      case "DELIVERED":
        return "Entregada";
    }
  }

    static enumToEnglish(position): string {
    debugger;
    switch (position) {
      case "En servicio":
        return "ONSERVICE";
      case "Retrasada":
        return "DELAYED";
      case "Lista":
        return "READY";
      case "Entregada":
        return "DELIVERED";
    }
  }
}
