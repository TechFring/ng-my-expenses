import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private readonly DATE_PIPE_FORMAT: string = 'yyyy-MM-ddTHH:mm';

  constructor() {}

  public formatDatetime(datetime: string): string {
    const datePipe = new DatePipe('en-us');
    return datePipe.transform(datetime, this.DATE_PIPE_FORMAT);
  }
}
