import { Injectable } from '@angular/core';

import { IChartOptions } from 'src/app/models/chart';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor() {}

  public getBase(): IChartOptions {
    const base: IChartOptions = {
      colors: [],
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
        bar: {},
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        labels: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
    };

    return base;
  }
}
