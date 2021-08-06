import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { ChartService } from 'src/app/services/chart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-where-your-money-go',
  templateUrl: './where-your-money-go.component.html',
  styleUrls: ['./where-your-money-go.component.scss'],
})
export class WhereYourMoneyGoComponent
  implements OnInit, AfterViewChecked, AfterViewInit
{
  readonly COLORS = {
    chart: {
      danger: '#f55c47',
      warning: '#ffaa4c',
      success: '#68e37d',
    },
    bg: {
      danger: '#fdddd8',
      warning: '#fff3e5',
      success: '#e9fbec',
    },
  };

  public chartOptions;

  @ViewChild('app') app: ElementRef;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private chartService: ChartService,
    private userService: UserService
  ) {
    this.setChartOptions();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.observeWalletStatus();
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  private setChartOptions(): void {
    this.chartOptions = this.chartService.getBase();
    this.chartOptions.plotOptions.bar.horizontal = true;
    this.chartOptions.chart.height = 300;

    this.chartOptions.xaxis.labels.show = true;
    this.chartOptions.xaxis.categories = [
      'Grocery',
      'Transportation',
      'Housing',
      'Food and Drink',
      'Entertainment',
      'Shopping',
      'Vehicle',
    ];

    this.chartOptions.yaxis.labels.show = true;

    const seriesData = [1000, 200, 150, 200, 200, 300, 500];
    this.chartOptions.series = [{ name: 'spend', data: seriesData }];
  }

  private observeWalletStatus(): void {
    this.userService.walletStatus.subscribe((status) => {
      const nativeElement = this.app.nativeElement;

      nativeElement.style.backgroundColor = this.COLORS.bg[status];
      this.chartOptions.colors = [this.COLORS.chart[status]];
    });
  }
}
