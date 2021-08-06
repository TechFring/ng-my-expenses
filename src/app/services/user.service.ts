import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public walletStatus: BehaviorSubject<string>;
  private _user: BehaviorSubject<any>;

  constructor() {
    this.walletStatus = new BehaviorSubject<string>('success');
    this._user = new BehaviorSubject<any>({});
  }

  get user(): BehaviorSubject<any> {
    return this._user;
  }
}
