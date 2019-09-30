export class MachineModel{
  id: number;
  internalCode: string;
  brand: string;
  model: string;
  boughtHere: boolean;

  static from(json: any): MachineModel {
    return new MachineModel(json.id, json.internalCode, json.brand, json.model, json.boughtHere);
  }

  static fromForm(data: any): MachineModel {
    return new MachineModel(data.id, data.internalCode, data.brand, data.model, data.boughtHere);
  }

  constructor(id: number, internalCode: string, brand: string, model: string, boughtHere: boolean) {
    this.id = id;
    this.internalCode = internalCode;
    this.brand = brand;
    this.model = model;
    this.boughtHere = boughtHere;
  }
}
