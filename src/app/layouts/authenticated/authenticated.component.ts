import { Component, OnInit, ViewChild } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { WhereYourMoneyGoComponent } from 'src/app/components/where-your-money-go/where-your-money-go.component';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss'],
})
export class AuthenticatedComponent implements OnInit {
  @ViewChild(SidebarComponent) childSidebar: SidebarComponent;
  @ViewChild(WhereYourMoneyGoComponent) childWhereYourMoneyGo: WhereYourMoneyGoComponent;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    const userNotDefined: boolean = this._authService.user.value === null;

    if (userNotDefined) {
      this._authService.setOrRefreshAuthUser();
    }
  }
}
