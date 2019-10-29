import {PositionEnum} from "./position.enum";

export class EmployeeModel {
  id: number;
  name: string;
  surname: string;
  position: PositionEnum;
  deleted: boolean;

  static from(json: any): EmployeeModel {
    return new EmployeeModel(json.id, json.name, json.surname, this.stringToEnum(json.position), json.deleted);
  }

  static fromForm(data: any): EmployeeModel {
    return new EmployeeModel(data.id, data.name, data.surname, data.position, data.deleted);
  }

  constructor(id: number, name: string, surname: string, position: PositionEnum, deleted: boolean) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.position = position;
    this.deleted = deleted;
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
