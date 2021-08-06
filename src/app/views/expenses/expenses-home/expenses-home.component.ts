import { Component, OnInit } from '@angular/core';

import { IExpenseHome, EnumExpense } from 'src/app/models/expense';
import { ChartOptions } from 'src/app/models/chart';
import { ChartService } from 'src/app/services/chart.service';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses-home.component.html',
  styleUrls: ['./expenses-home.component.scss'],
})
export class ExpensesHomeComponent implements OnInit {
  public expenses: IExpenseHome[];
  public chartMonthOptions: ChartOptions;

  public yesterday: Date;
  public currDate: Date;

  constructor(
    private chartService: ChartService,
    private expenseService: ExpenseService
  ) {
    const currDate = new Date();
    const yesterday = new Date(
      currDate.getFullYear(),
      currDate.getMonth(),
      currDate.getDate() - 1
    );

    this.currDate = currDate;
    this.yesterday = yesterday;

    this.setChartMonthOptions();
    this.observeExpenses();
    this.expenseService.getExpenseById(1);
  }

  ngOnInit(): void {}

  private setChartMonthOptions(): void {
    const seriesData = [];

    for (let i = 1; i <= 31; i++) {
      seriesData.push(1000);
    }

    this.chartMonthOptions = this.chartService.getBase();
    this.chartMonthOptions.chart.height = 150;
    this.chartMonthOptions.series = [{ name: 'spend', data: seriesData }];
  }

  private observeExpenses(): void {
    this.expenseService.expenses.subscribe((expenses) => {
      this.expenses = expenses.map((e) => {
        const expense: IExpenseHome = {
          id: e.id,
          type: e.type,
          icon: EnumExpense[e.type],
          details: this.expenseService.formatDetails(e),
          value: e.value,
        };

        return expense;
      });
    });
  }
}
