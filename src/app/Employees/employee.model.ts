import {PositionEnum} from "./position.enum";

export class EmployeeModel {
  id: number;
  name: string;
  surname: string;
  position: any;

  static from(json: any): EmployeeModel {
    return new EmployeeModel(json.id, json.name, json.surname, this.stringToEnum(json.position));
  }

  static fromForm(data: any): EmployeeModel {
    return new EmployeeModel(data.id, data.name, data.surname, data.position);
  }

  constructor(id: number, name: string, surname: string, position: PositionEnum) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.position = position;
  }

  // Enum implementation, service list (add-> lo que retorna lo meto en la lista). Get by id checkeo en la lista primero y sino hago get all
  static enumToSpanish(position: PositionEnum): string {
    switch (position) {
      case 0:
        return "Jefe";
      case 1:
        return "Dueño";
      case 2:
        return "Técnico";
      case 3:
        return "Ventas";
    }
  }

  static enumToEnglish(position: PositionEnum): string {
    switch (position) {
      case 0:
        return "BOSS";
      case 1:
        return "OWNER";
      case 2:
        return "TECHNICIAN";
      case 3:
        return "SALES";
    }
  }

  static stringToEnum(position: string): PositionEnum {
    switch (position) {
      case "BOSS":
        return 0;
      case "OWNER":
        return 1;
      case "TECHNICIAN":
        return 2;
      case "SALES":
        return 3;
    }
  }
}
