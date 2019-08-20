export class Employee{
  id: number;
  nombre: string;
  apellido: string;
  posicion: string;

  static from(json: any): Employee {
    return new Employee(json.id, json.name, json.surname, json.position);
  }


  constructor(id: number, nombre: string, apellido: string, posicion: string) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.posicion = this.enumToSpanish(posicion);
  }

  enumToSpanish(position): string {
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

    enumToEnghish(position): string {
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
