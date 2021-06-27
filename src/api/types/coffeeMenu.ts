export interface CoffeeMenu {
  _id: string;
  types: CoffeeType[];
  sizes: CoffeeSize[];
  extras: CoffeeExtras[];
}

export interface CoffeeType {
  _id: string;
  name: string;
  sizes: string[];
  extras: string[];
}

export interface CoffeeSize {
  _id: string;
  name: string;
}

export interface CoffeeExtras {
  _id: string;
  name: string;
  subselections: SubSelection[];
}

export interface SubSelection {
  _id: string;
  name: string;
}

export interface SelectedCoffeeExtra {
  _id: string;
  name: string;
  subselections: SubSelection;
}