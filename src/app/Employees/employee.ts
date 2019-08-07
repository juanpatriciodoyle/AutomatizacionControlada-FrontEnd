export class Employee{
  id: number;
  name: string;
  surname: string;
  position: string;

  static from(json: any): Employee {
    return new Employee(json.id, json.name, json.surname, json.position);
  }
  constructor(id: number, name: string,surname: string, position: string) {

    this.id = id;
    this.name = name;
    this.surname = surname;
    this.position = position;
  }

}
