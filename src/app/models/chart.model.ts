import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexPlotOptions,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';

export type IChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  colors: string[];
};

export interface IChartColor {
  color: string;
  bg: string;
}

export enum EnumChartColor {
  danger = '#f55c47',
  warning = '#ffaa4c',
  success = '#68e37d',
}

export enum EnumChartBg {
  danger = '#fdddd8',
  warning = '#fff3e5',
  success = '#e9fbec',
}
