export interface IBeer {
  name: string;
  price: number;
  image?: string;
  rating?: number;
  quantity: number;
  description?: string;
}

export interface IBeers {
  last_updated: string;
  beers: IBeer[];
}

export interface IRoundItem {
  name: string;
  quantity: number;
  price?: number;
  price_per_unit?: number;
  total?: number;
}

export interface IRound {
  created: string;
  items: IRoundItem[];
}

export interface IOrder {
  created: string;
  paid: boolean;
  subtotal: number;
  taxes: number;
  discounts: number;
  rounds: IRound[];
}

export interface IOrderItem {
  name: string;
  quantity: number;
  price_per_unit?: number;
  total?: number;
}

export type TBeerInOrder = {
  name: string;
  price_per_unit: number;
  total: number;
  quantity: number;
};

export type TOrderState = {
  items: TBeerInOrder[];
  addItem: (beer: TBeerInOrder) => void;
  removeItem: (name: string) => void;
  clearOrder: () => void;
  updateQuantity: (name: string, quantity: number) => void;
};
