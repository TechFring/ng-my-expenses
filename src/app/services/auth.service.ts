import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import jwt_decode, { JwtPayload } from 'jwt-decode';

import { IUser } from 'src/app/models/user.model';
import { IAuthUser } from 'src/app/models/auth.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_URL: string = `${environment.api}/auth`;
  private _user: BehaviorSubject<IUser>;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _socialAuthService: SocialAuthService
  ) {
    this._user = new BehaviorSubject<IUser>(null);
  }

  get user(): BehaviorSubject<IUser> {
    return this._user;
  }

  private _apiLogin(user: IUser): void {
    const url: string = `${this.BASE_URL}/token/`;

    this._http.post<IAuthUser>(url, user).subscribe(
      (authUser) => {
        const { token, ...user } = authUser;

        this.setToken(token);
        this.setOrRefreshAuthUser(user);
        this._router.navigate(['expenses']);
      },
      () => {
        this._router.navigate(['login']);
      }
    );
  }

  private _getTokenExpirationDate(token: string): Date {
    const decoded: JwtPayload = jwt_decode(token);
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  public getToken(): string {
    const token: string = window.localStorage.getItem('@me/token');
    return token;
  }

  public setToken(token: string): void {
    window.localStorage.setItem('@me/token', token);
  }

  public setOrRefreshAuthUser(user?: IUser): void {
    if (user) {
      this._user.next(user);
    } else {
      const url: string = `${this.BASE_URL}/user/`;

      this._http.get<IUser>(url).subscribe((user) => {
        this._user.next(user);
      });
    }
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();

    if (token) {
      const date: Date = this._getTokenExpirationDate(token);
      const isTokenExpired: boolean = !(date.valueOf() > new Date().valueOf());
      return !isTokenExpired;
    } else {
      return false;
    }
  }

  public socialLogin(): void {
    this._socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((data: SocialUser) => {
        const user: IUser = {
          username: data.id,
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          photo_url: data.photoUrl,
        };

        this._apiLogin(user);
      });
  }

  public logout(): void {
    window.localStorage.removeItem('@me/token');
    window.location.href = '/home';
  }

  public updateSalary(salary: number): Observable<IUser> {
    const userId: number = this._user.value.id;
    const url: string = `${this.BASE_URL}/user/${userId}/`;
    return this._http.patch<IUser>(url, { salary: salary });
  }
}
