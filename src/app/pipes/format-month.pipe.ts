import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMonth',
})
export class FormatMonthPipe implements PipeTransform {
  transform(date: Date): string {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const monthName = date.toLocaleString('en-US', { month: 'long' });
    const totalDaysMonth = new Date(year, month, 0).getDate();

    return `1 - ${totalDaysMonth} ${monthName}, ${year}`;
  }
}
