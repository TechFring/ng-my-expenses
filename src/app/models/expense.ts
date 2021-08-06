export type TExpenseIcon = 'fa-bus' | 'fa-shopping-cart' | 'fa-home';
export type TExpenseType = 'Grocery' | 'Transportation' | 'Housing';

export interface IExpense {
  id: number;
  user_id: string;
  type: TExpenseType;
  value: number;
  description: string;
  datetime: string;
  created_at: string;
  updated_at: string;
  
  details: string;
  icon: TExpenseIcon;
}

export type IExpenseService = Pick<IExpense, "id" | "type" | "description" | "datetime" | "value">;

export type IExpenseHome = Pick<IExpense, "id" | "type" | "icon" | "details" | "value">;


export enum EnumExpense {
  Grocery = 'fa-shopping-cart',
  Transportation = 'fa-bus',
  Housing = 'fa-home'
} 