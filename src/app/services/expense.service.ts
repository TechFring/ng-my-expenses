import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { TExpenseType, IExpenseService } from 'src/app/models/expense';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private _expenses: BehaviorSubject<IExpenseService[]>;
  private _expenseTypes: BehaviorSubject<TExpenseType[]>;

  constructor() {
    const expenses: IExpenseService[] = [
      {
        id: 1,
        type: 'Grocery',
        description: 'Belanja di pasar',
        datetime: '2021-08-03 11:42:00',
        value: 326.8,
      },
      {
        id: 2,
        type: 'Transportation',
        description: 'Belanja di pasar',
        datetime: '2021-08-03 11:42:00',
        value: 15.0,
      },
      {
        id: 3,
        type: 'Housing',
        description: 'Bayar Listrik',
        datetime: '2021-08-03 11:42:00',
        value: 185.75,
      },
    ];

    const expenseTypes: TExpenseType[] = [
      'Grocery',
      'Housing',
      'Transportation',
    ];

    this._expenses = new BehaviorSubject<IExpenseService[]>(expenses);
    this._expenseTypes = new BehaviorSubject<TExpenseType[]>(expenseTypes);
  }

  get expenses(): BehaviorSubject<IExpenseService[]> {
    return this._expenses;
  }

  get expenseTypes(): BehaviorSubject<TExpenseType[]> {
    return this._expenseTypes;
  }

  public formatDetails(expense: IExpenseService): string {
    const datePipe = new DatePipe('en-us');
    const shortTime = datePipe.transform(expense.datetime, 'shortTime');

    return `${shortTime} • ${expense.description}`;
  }

  public getExpenseById(expenseId: number): IExpenseService {
    let filtered: IExpenseService;

    this._expenses.forEach((expenses) => {
      filtered = expenses.filter((expense) => expense.id === expenseId)[0];
    });

    return filtered;
  }
}
