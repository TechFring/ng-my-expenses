import { Pipe, PipeTransform } from '@angular/core';

import { UtilsService } from 'src/app/services/utils.service';

@Pipe({
  name: 'formatMonth',
})
export class FormatMonthPipe implements PipeTransform {
  constructor(
    private _utilsService: UtilsService
  ) {}

  transform(date: Date): string {
    const totalDaysMonth = this._utilsService.getTotalDaysMonth(date);
    const monthName = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();

    return `1 - ${totalDaysMonth} ${monthName}, ${year}`;
  }
}
