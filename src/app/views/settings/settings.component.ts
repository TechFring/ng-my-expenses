import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { IUser } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ICurrencyOptions } from 'src/app/models/currency.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public user: IUser;
  public isEdit: boolean;
  public controlSalary: FormControl;
  public currencyOptions: Partial<ICurrencyOptions>;

  constructor(public _authService: AuthService) {
    this.isEdit = false;
    this.controlSalary = new FormControl('', []);
    this.currencyOptions = { align: 'left' };
  }

  ngOnInit(): void {
    this._subscribers();
  }

  private _subscribers(): void {
    this._subscribeUser();
  }

  private _subscribeUser(): void {
    this._authService.user.subscribe((user) => {
      if (user) {
        this.user = user;
        this.controlSalary.patchValue(user.salary);
      }
    });
  }

  public onClickBtnEdit(): void {
    const salary: number = this.controlSalary.value;

    if (this.isEdit && salary != this.user.salary) {
      this._authService.updateSalary(salary).subscribe((user) => {
        this._authService.user.next(user);
      });
    }

    this.isEdit = !this.isEdit;
  }
}
