import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from 'angularx-social-login';

import { CLIENT_AUTH_GOOGLE } from 'src/app/config';

export const socialAuthProviders = {
  provide: 'SocialAuthServiceConfig',
  useValue: {
    autoLogin: false,
    providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(CLIENT_AUTH_GOOGLE),
      },
    ],
  } as SocialAuthServiceConfig,
};
