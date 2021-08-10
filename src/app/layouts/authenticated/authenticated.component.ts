import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss'],
})
export class AuthenticatedComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const userNotDefined: boolean = this.authService.user.value === null;

    if (userNotDefined) {
      this.authService.setOrRefreshAuthUser();
    }
  }
}
