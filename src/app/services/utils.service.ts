import { Injectable } from '@angular/core';
import { DatePipe, KeyValue } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private _datePipe: DatePipe;

  constructor() {
    this._datePipe = new DatePipe('en-us');
  }

  public formatDate(
    datetime: string,
    format: string,
    useTimezone: boolean = true
  ): string {
    return this._datePipe.transform(datetime, format, useTimezone && '+0');
  }

  public getTotalDaysMonth(date: Date): number {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const totalDaysMonth = new Date(year, month, 0).getDate();
    return totalDaysMonth;
  }

  public objectIsEmpty(object: Object): boolean {
    return Object.keys(object).length === 0;
  }

  public originalOrder(
    a: KeyValue<number, string>,
    b: KeyValue<number, string>
  ): number {
    return 0;
  }

  public valueAscOrder(
    a: KeyValue<number, string>,
    b: KeyValue<number, string>
  ): number {
    return a.value.localeCompare(b.value);
  }

  public keyDescOrder(
    a: KeyValue<number, string>,
    b: KeyValue<number, string>
  ): number {
    return a.key > b.key ? -1 : b.key > a.key ? 1 : 0;
  }
}
