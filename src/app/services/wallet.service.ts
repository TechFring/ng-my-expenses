import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { IUser } from 'src/app/models/user.model';
import { EnumChartBg, EnumChartColor, IChartColor } from 'src/app/models/chart.model';
import { ExpenseService } from 'src/app/services/expense.service';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private readonly DANGER_BALANCE: number = 85;
  private readonly WARNING_BALANCE: number = 60;
  private readonly DANGER_COLORS: IChartColor = { color: EnumChartColor.danger, bg: EnumChartBg.danger };
  private readonly WARNING_COLORS: IChartColor = { color: EnumChartColor.warning, bg: EnumChartBg.warning };
  private readonly SUCCESS_COLORS: IChartColor = { color: EnumChartColor.success, bg: EnumChartBg.success };

  private _balance: BehaviorSubject<number>;
  private _totalExpenses: number;
  private _user: IUser;

  constructor(
    private _authService: AuthService,
    private _expenseService: ExpenseService
  ) {
    this._balance = new BehaviorSubject<number>(0);
    this._subscribers();
  }

  get balance(): BehaviorSubject<number> {
    return this._balance;
  }

  private _subscribers(): void {
    this._subscribeUser();
    this._subscribeExpense();
  }

  private _subscribeUser(): void {
    this._authService.user.subscribe((user) => {
      this._user = user;
      this._calculateBalance();
    });
  }

  private _subscribeExpense(): void {
    this._expenseService.expenses.subscribe((expenses) => {
      if (expenses === null) return;

      this._totalExpenses = expenses.reduce((prev, curr) => {
        return prev + curr.value;
      }, 0);

      this._calculateBalance();
    });
  }

  private _calculateBalance(): void {
    const dataIsLoaded: boolean = this._user != null && this._totalExpenses != null;

    if (dataIsLoaded) {
      const balance: number = this._user.salary - this._totalExpenses;
      this._balance.next(balance);
    }
  }

  public getChartColor(): IChartColor {
    if (!this._user) return this.SUCCESS_COLORS;

    const isDanger: boolean = this._totalExpenses >= (this.DANGER_BALANCE / 100) * this._user.salary;
    const isWarning: boolean = this._totalExpenses >= (this.WARNING_BALANCE / 100) * this._user.salary;

    if (isDanger) return this.DANGER_COLORS;
    else if (isWarning) return this.WARNING_COLORS;
    else return this.SUCCESS_COLORS;
  }
}
