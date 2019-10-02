import {PositionEnum} from "./position.enum";

export class EmployeeModel {
  id: number;
  name: string;
  surname: string;
  position: PositionEnum;

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
