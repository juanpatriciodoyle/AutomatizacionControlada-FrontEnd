import {Position} from './position.enum';

export class Employee {
  id: number;
  name: string;
  surname: string;
  position: Position;

  static from(json: any): Employee {
    return new Employee(json.id, json.name, json.surname, this.stringToEnum(json.position));
  }

  static fromForm(data: any): Employee {
    return new Employee(data.id, data.name, data.surname, data.position);
  }

  constructor(id: number, name: string, surname: string, position: Position) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.position = position;
  }

  // Enum implementation, service list (add-> lo que retorna lo meto en la lista). Get by id checkeo en la lista primero y sino hago get all
  static enumToSpanish(position: Position): string {
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

  static enumToEnglish(position: Position): string {
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

  static stringToEnum(position: string): Position {
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
