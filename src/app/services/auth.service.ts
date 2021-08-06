import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _logged: boolean;

  constructor(private router: Router) {
    this._logged = true;
  }

  public isLoggedIn(): boolean {
    return this._logged;
  }

  public login(): void {
    this._logged = true;
  }

  public logout(): void {
    this._logged = false;
    window.location.href = '/home';
    console.log('AQUII');
  }
}
