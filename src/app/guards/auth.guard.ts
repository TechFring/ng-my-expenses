import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService) {}

  canActivate(): boolean {
    const isLoggedIn = this._authService.isLoggedIn();

    if (!isLoggedIn) {
      this._authService.logout();
    }

    return isLoggedIn;
  }
}
