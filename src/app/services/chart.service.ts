import { Injectable } from '@angular/core';

import { IChartOptions } from 'src/app/models/chart.model';
import { IDictExpense, IExpense } from 'src/app/models/expense.model';
import { UtilsService } from 'src/app/services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor(private _utilsService: UtilsService) {}

  public getBase(isSideChart: boolean = false): IChartOptions {
    const base: IChartOptions = {
      colors: null,
      chart: {
        type: 'bar',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0,
        },
      },
      series: [],
      plotOptions: {
        bar: {
          horizontal: false
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        labels: {
          show: false,
        },
        categories: []
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
    };

    if (isSideChart) {
      base.plotOptions.bar.horizontal = true;
      base.chart.height = 300;
    }

    return base;
  }

  public formatHomeChartData(dictExpense: IDictExpense): number[] {
    const currDate: Date = new Date();
    const count: number = this._utilsService.getTotalDaysMonth(currDate);
    const data: number[] = new Array(count).fill(0);

    for (let key in dictExpense) {
      const datetime = new Date(key).toISOString();
      const day = +datetime.slice(8, 10) - 1;

      const total: number = dictExpense[key].reduce((prev, curr) => {
        return prev + +curr.value;
      }, 0);

      data[day] = total;
    }
    
    return data;
  }

  public formatSideChartData(expenses: IExpense[]): Object {
    const data: Object = {};

    expenses.forEach((e) => {
      const key = e.category.name;
      const isNumber: boolean = typeof data[key] === 'number';
      if (!isNumber) data[key] = 0;
      data[key] += +e.value;
    });

    return data;
  }
}
