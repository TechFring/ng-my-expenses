import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { UtilsService } from 'src/app/services/utils.service';
import { IDictExpense, IExpense, IReadExpense } from 'src/app/models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private readonly BASE_URL: string = `${environment.api}/expense/`;
  private _expenses: BehaviorSubject<IExpense[]>;

  constructor(private _http: HttpClient, private _utilsService: UtilsService) {
    this._expenses = new BehaviorSubject<IExpense[]>(null);
    this.refreshExpenseList();
  }

  get expenses(): BehaviorSubject<IExpense[]> {
    return this._expenses;
  }

  private _formatDetails(expense: IExpense): string {
    const format: string = 'shortTime';
    const shortTime = this._utilsService.formatDate(expense.datetime, format);
    return `${shortTime} • ${expense.description}`;
  }

  public refreshExpenseList(): void {
    const format = 'yyyy-MM';
    const datetime = new Date().toISOString();
    const datemonth = this._utilsService.formatDate(datetime, format);

    this.list(datemonth).subscribe((expenses) => {
      this._expenses.next(expenses);
    });
  }

  public list(datemonth?: string): Observable<IExpense[]> {
    let url: string = this.BASE_URL;

    if (datemonth) {
      url += `?date=${datemonth}`;
    }

    return this._http.get<IExpense[]>(url);
  }

  public retrieve(expenseId: number): Observable<IExpense> {
    const url: string = this.BASE_URL + expenseId + '/';
    return this._http.get<IExpense>(url).pipe(
      map((res) => res),
      catchError(() => {
        window.location.href = '/expenses';
        return EMPTY;
      })
    );
  }

  public create(expense): Observable<IExpense> {
    return this._http.post<IExpense>(this.BASE_URL, expense).pipe(
      map((res) => {
        this.refreshExpenseList();
        return res;
      })
    );
  }

  public update(expense): Observable<IExpense> {
    const url: string = this.BASE_URL + expense.id + '/';
    return this._http.patch<IExpense>(url, expense).pipe(
      map((res) => {
        this.refreshExpenseList();
        return res;
      })
    );
  }

  public destroy(expenseId: number): Observable<IExpense> {
    const url: string = this.BASE_URL + expenseId + '/';
    return this._http.delete<IExpense>(url).pipe(
      map((res) => {
        this.refreshExpenseList();
        return res;
      })
    );
  }

  public handleDictExpense(expenses: IExpense[]): IDictExpense {
    if (expenses === null) return;

    const dict: IDictExpense = {};

    expenses.forEach((e) => {
      const { datetime, ...expense } = e;

      const readExpense: IReadExpense = {
        ...expense,
        details: this._formatDetails(e),
      };

      const format: string = 'yyyy-MM-dd';
      const date: string = this._utilsService.formatDate(datetime, format);
      const isInstance: boolean = dict[date] instanceof Array;

      if (!isInstance) {
        dict[date] = [];
      }

      dict[date].push(readExpense);
    });

    return dict;
  }
}
