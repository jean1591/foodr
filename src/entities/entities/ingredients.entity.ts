export class Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: Units;
}

export enum Units {
  Gram = 'g',
  Kilogram = 'Kg',
  Liter = 'L',
  Unit = 'u',
}
