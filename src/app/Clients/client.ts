export class Client{
  id: number;
  name: string;
  surname: string;
  position: string;

  static from(json: any): Client {
    return new Client(json.id, json.name, json.surname, Client.enumToSpanish(json.position));
  }

  static fromForm(data: any): Client {
    return new Client(data.id, data.name, data.surname, data.position);
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
    debugger;
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

enum Position {
  BOSS = "Jefe"
}
