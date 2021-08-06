import { BehaviorSubject } from 'rxjs';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _logged: boolean;
  private _user: BehaviorSubject<User>;

  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
    this._logged = false;
  }

  get user(): BehaviorSubject<User> {
    return this._user;
  }

  public isLoggedIn(): boolean {
    return this._logged;
  }

  public login(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((data: SocialUser) => {
        const user: User = {
          id: data.id,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          photoUrl: data.photoUrl,
        };

        this._user = new BehaviorSubject<User>(user);
        this._logged = true;
        this.router.navigate(['expenses']);
      });
  }

  public logout(): void {
    this._logged = false;
    window.location.href = '/home';
    console.log('AQUII');
  }
}
