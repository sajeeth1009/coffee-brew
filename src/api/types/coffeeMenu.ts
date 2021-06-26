export interface CoffeeMenu {
  id: string;
  types: CoffeeType[];
  sizes: CoffeeSize[];
  extras: CoffeeExtras[];
}

export interface CoffeeType {
  id: string;
  name: string;
  sizes: string[];
  extras: string[];
}

export interface CoffeeSize {
  id: string;
  name: string;
}

export interface CoffeeExtras {
  id: string;
  name: string;
  subselections: SubSelection[];
}

export interface SubSelection {
  id: string;
  name: string;
}