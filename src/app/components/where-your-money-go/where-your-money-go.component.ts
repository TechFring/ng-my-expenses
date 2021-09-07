import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { IChartOptions, IChartColor } from 'src/app/models/chart.model';
import { IDictExpense, IExpense } from 'src/app/models/expense.model';
import { ChartService } from 'src/app/services/chart.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-where-your-money-go',
  templateUrl: './where-your-money-go.component.html',
  styleUrls: ['./where-your-money-go.component.scss'],
})
export class WhereYourMoneyGoComponent implements OnInit, AfterViewInit {
  public chartOptions: IChartOptions;
  public dictExpense: IDictExpense;

  @ViewChild('main') elMain: ElementRef;

  constructor(
    private _chartService: ChartService,
    private _expenseService: ExpenseService,
    private _walletService: WalletService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this._subscribers();
  }

  private _subscribers(): void {
    this._subscribeExpenses();
    this._subscribeBalance();
  }

  private _subscribeExpenses(): void {
    this._expenseService.expenses.subscribe((expenses) => {
      this._setChartOptions(expenses);
      this._setChartColor();
    });
  }

  private _subscribeBalance(): void {
    this._walletService.balance.subscribe((balance) => {
      this._setChartColor();
    });
  }

  private _setChartOptions(expenses: IExpense[]): void {
    if (expenses === null) return;

    const data: object = this._chartService.formatSideChartData(expenses);
    const series: number[] = Object.values(data);
    const categories: string[] = Object.keys(data);
    const isEmpty: boolean = expenses.length === 0;

    this.chartOptions = this._chartService.getBase(true);
    if (!isEmpty) this.chartOptions.yaxis.labels.show = true;
    this.chartOptions.xaxis.categories = categories;
    this.chartOptions.series[0] = { name: 'value', data: series };
  }

  private _setChartColor(): void {
    const nativeElement: HTMLElement = this.elMain.nativeElement;
    const chartColor: IChartColor = this._walletService.getChartColor();

    if (this.chartOptions) {
      nativeElement.style.backgroundColor = chartColor.bg;
      this.chartOptions['colors'] = [chartColor.color];
    }
  }

  public onClickBtnToggle(): void {
    const nativeElement = this.elMain.nativeElement;
    nativeElement.classList.toggle('show');
  }
}
