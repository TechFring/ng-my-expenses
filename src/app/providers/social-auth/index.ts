import { GoogleLoginProvider, SocialAuthServiceConfig } from "angularx-social-login";

export const socialAuthProviders = {
  provide: 'SocialAuthServiceConfig',
  useValue: {
    autoLogin: false,
    providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(
          '491837092561-ak236loph6jtnf0beh307e2724feq2s1.apps.googleusercontent.com'
          // '491837092561-r6mv8smm88v92gm5q6l63fpv5lt6lf1o.apps.googleusercontent.com'
        ),
      },
    ],
  } as SocialAuthServiceConfig,
};
