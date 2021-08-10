import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public walletStatus: BehaviorSubject<string>;

  constructor() {
    this.walletStatus = new BehaviorSubject<string>('success');
  }
}
