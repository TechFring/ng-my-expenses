import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import jwt_decode, { JwtPayload } from 'jwt-decode';

import { IUser } from 'src/app/models/user';
import { IAuthUser } from 'src/app/models/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_URL: string = `${environment.api}/auth`;
  private _user: BehaviorSubject<IUser>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
    this._user = new BehaviorSubject<IUser>(null);
  }

  get user(): BehaviorSubject<IUser> {
    return this._user;
  }

  public getToken(): string {
    const token: string = window.localStorage.getItem('@me/token');
    return token;
  }

  private _getTokenExpirationDate(token: string): Date {
    const decoded: JwtPayload = jwt_decode(token);

    if (decoded === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  public setToken(token: string): void {
    window.localStorage.setItem('@me/token', token);
  }

  public setOrRefreshAuthUser(user?: IUser): void {
    if (user) {
      this._user.next(user);
    } else {
      const url: string = `${this.BASE_URL}/user/`;

      this.http.get<IUser>(url).subscribe((user) => {
        this._user.next(user);
      });
    }
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    const date = this._getTokenExpirationDate(token);
    const isTokenExpired: boolean = !(date.valueOf() > new Date().valueOf());

    if (!token || isTokenExpired) {
      this.logout();
      return false;
    } else {
      return true;
    }
  }

  public socialLogin(): void {
    this.socialAuthService
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

  private _apiLogin(user: IUser): void {
    const url: string = `${this.BASE_URL}/token/`;

    this.http.post<IAuthUser>(url, user).subscribe(
      (authUser) => {
        const { token, ...user } = authUser;

        this.setToken(token);
        this.setOrRefreshAuthUser(user);
        this.router.navigate(['expenses']);
      },
      () => {
        this.router.navigate(['login']);
      }
    );
  }
}
