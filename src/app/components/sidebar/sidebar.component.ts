import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public user: IUser;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.observeAuthenticatedUser();
  }

  private observeAuthenticatedUser(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }
}
