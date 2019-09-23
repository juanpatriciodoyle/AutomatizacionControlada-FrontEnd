export class MachineModel{
  id: number;
  name: string;
  surname: string;
  position: string;

  static from(json: any): MachineModel {
    return new MachineModel(json.id, json.name, json.surname, MachineModel.enumToSpanish(json.position));
  }

  static fromForm(data: any): MachineModel {
    return new MachineModel(data.id, data.name, data.surname, data.position);
  }

  constructor(id: number, name: string, surname: string, position: string) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.position = position;
  }
  // Enum implementation, service list (add-> lo que retorna lo meto en la lista). Get by id checkeo en la lista primero y sino hago get all
  static enumToSpanish(position: string): string {
    switch (position) {
      case "BOSS":
        return "Jefe";
      case "OWNER":
        return "Dueño/a";
      case "TECHNICIAN":
        return "Técnico";
      case "SALES":
        return "Ventas";
    }
  }

    static enumToEnglish(position): string {
    switch (position) {
      case "Jefe":
        return "BOSS";
      case "Dueño/a":
        return "OWNER";
      case "Técnico":
        return "TECHNICIAN";
      case "Ventas":
        return "SALES";
    }
  }
}
