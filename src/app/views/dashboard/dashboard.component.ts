import { Component, OnInit } from '@angular/core';

import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public balance: number;

  constructor(public walletService: WalletService) {
    this._subscribers();
  }

  ngOnInit(): void {}

  private _subscribers(): void {
    this._subscribeBalance();
  }

  private _subscribeBalance(): void {
    this.walletService.balance.subscribe((balance) => {
      this.balance = balance;
    });
  }
}
