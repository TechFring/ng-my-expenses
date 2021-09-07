import { Component, OnInit } from '@angular/core';

import { IDictExpense } from 'src/app/models/expense.model';
import { IChartOptions } from 'src/app/models/chart.model';
import { ChartService } from 'src/app/services/chart.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses-home.component.html',
  styleUrls: ['./expenses-home.component.scss'],
})
export class ExpensesHomeComponent implements OnInit {
  public chartOptions: IChartOptions;
  public dictExpense: IDictExpense;
  public currDate: Date;

  constructor(
    private _chartService: ChartService,
    private _expenseService: ExpenseService,
    public utilsService: UtilsService
  ) {
    this.currDate = new Date();
    this._subscribers();
  }

  ngOnInit(): void {}

  private _subscribers(): void {
    this._subscribeExpenses();
  }

  private _subscribeExpenses(): void {
    this._expenseService.expenses.subscribe((expenses) => {
      const dictExpense = this._expenseService.handleDictExpense(expenses);
      const seriesData = this._chartService.formatHomeChartData(dictExpense);

      this.dictExpense = dictExpense;
      this._setChartOptions(seriesData);
    });
  }

  private _setChartOptions(seriesData: number[]): void {
    this.chartOptions = this._chartService.getBase();
    this.chartOptions.chart.height = 150;
    this.chartOptions.series[0] = { name: 'value', data: seriesData };
  }
}
