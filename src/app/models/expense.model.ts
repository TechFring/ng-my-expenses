import { ICategory } from './category.model';

export interface IExpense {
  id?: number;
  user_id: string;
  category: ICategory;
  value: number;
  description: string;
  datetime?: string;
  created_at: string;
  updated_at: string;
}

export interface IReadExpense extends IExpense {
  details: string;
}

export interface IDictExpense {
  [datetime: string]: IReadExpense[];
}

export enum EnumExpense {
  Grocery = 'fa-shopping-cart',
  Transportation = 'fa-bus',
  Housing = 'fa-home',
}
